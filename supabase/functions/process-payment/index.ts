
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.7'

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL') as string
    const supabaseAnonKey = Deno.env.get('SUPABASE_ANON_KEY') as string
    const supabase = createClient(supabaseUrl, supabaseAnonKey)
    
    // Get the authorization header
    const authHeader = req.headers.get('Authorization')
    if (!authHeader) {
      return new Response(
        JSON.stringify({ error: 'Missing Authorization header' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 401 }
      )
    }
    
    // Extract the token from the Authorization header
    const token = authHeader.replace('Bearer ', '')
    
    // Verify the JWT
    const { data: { user }, error: authError } = await supabase.auth.getUser(token)
    
    if (authError || !user) {
      return new Response(
        JSON.stringify({ error: 'Unauthorized' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 401 }
      )
    }
    
    // Parse request body
    const { amount, type, description, method } = await req.json()
    
    // Validate request
    if (!amount || !type || !method) {
      return new Response(
        JSON.stringify({ error: 'Missing required fields: amount, type, and method are required' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 }
      )
    }
    
    // In a real app, this is where you would integrate with a payment gateway (M-Pesa, Stripe, etc.)
    // For this simulation, we'll just create a transaction record
    
    // Generate a unique reference
    const reference = `trans_${Date.now()}_${Math.floor(Math.random() * 1000)}`
    
    // Insert a new transaction record
    const { data: transaction, error: transactionError } = await supabase
      .from('transactions')
      .insert({
        user_id: user.id,
        type,
        amount,
        method,
        status: 'completed', // In a real app, this would initially be 'pending'
        reference,
        description: description || `${type} of ${amount} via ${method}`,
      })
      .select()
      .single()
    
    if (transactionError) {
      throw transactionError
    }
    
    return new Response(
      JSON.stringify({ 
        success: true, 
        message: 'Payment processed successfully',
        data: transaction
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 200 }
    )
  } catch (error) {
    console.error('Error processing payment:', error)
    
    return new Response(
      JSON.stringify({ 
        error: error.message || 'Error processing payment' 
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
    )
  }
})
