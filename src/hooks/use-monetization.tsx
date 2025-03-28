
import { useState } from 'react';
import { useToast } from "@/components/ui/use-toast";
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/use-auth';

export interface PaymentMethod {
  id: string;
  type: 'mPesa' | 'tigoPesa' | 'airtelMoney' | 'card';
  name: string;
  number: string;
  isDefault: boolean;
}

export interface SubscriptionPlan {
  id: string;
  name: 'free' | 'premium' | 'pro';
  price: number;
  features: string[];
}

export interface PurchaseItem {
  id: string;
  name: string;
  price: number;
  description: string;
}

export function useMonetization() {
  const { toast } = useToast();
  const [isProcessing, setIsProcessing] = useState(false);
  const { user } = useAuth();
  
  const subscriptionPlans: SubscriptionPlan[] = [
    {
      id: 'free',
      name: 'free',
      price: 0,
      features: [
        'Standard service listings',
        'Basic wallet functionality',
        'Standard transaction fees (5%)'
      ]
    },
    {
      id: 'premium',
      name: 'premium',
      price: 10000,
      features: [
        'All Basic features',
        'Featured listings (top placement)',
        'Lower transaction fees (3%)',
        'Advanced analytics dashboard'
      ]
    },
    {
      id: 'pro',
      name: 'pro',
      price: 25000,
      features: [
        'All Premium features',
        'Priority customer support',
        'Minimal transaction fees (1.5%)',
        'Custom branding options',
        'Unlimited service listings'
      ]
    }
  ];
  
  const oneTimePurchases: PurchaseItem[] = [
    {
      id: 'featured_listing',
      name: 'Featured Listing',
      price: 5000,
      description: '7-day promotion at the top of search results'
    },
    {
      id: 'instant_withdrawal',
      name: 'Instant Withdrawal',
      price: 1000,
      description: 'Skip the waiting period for withdrawals'
    },
    {
      id: 'verified_badge',
      name: 'Verified Badge',
      price: 15000,
      description: 'Get your identity and skills verified'
    }
  ];
  
  const subscribeToPlan = async (planId: string) => {
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please sign in to subscribe to a plan",
        variant: "destructive",
      });
      return false;
    }
    
    setIsProcessing(true);
    
    try {
      // First, make any existing subscriptions inactive
      await supabase
        .from('subscriptions')
        .update({ is_active: false })
        .eq('user_id', user.id)
        .eq('is_active', true);
      
      // Create a new subscription
      const plan = subscriptionPlans.find(p => p.id === planId);
      
      if (!plan) {
        throw new Error('Invalid plan selected');
      }
      
      // Calculate expires_at (1 month from now)
      const expiresAt = new Date();
      expiresAt.setMonth(expiresAt.getMonth() + 1);
      
      // Create a subscription in the database
      const { error } = await supabase
        .from('subscriptions')
        .insert({
          user_id: user.id,
          plan: plan.name,
          starts_at: new Date().toISOString(),
          expires_at: plan.name === 'free' ? null : expiresAt.toISOString(),
          is_active: true,
          payment_id: plan.name === 'free' ? null : `payment_${Date.now()}`,
        });
      
      if (error) throw error;
      
      // Create a transaction record if it's a paid plan
      if (plan.name !== 'free') {
        const { error: transactionError } = await supabase
          .from('transactions')
          .insert({
            user_id: user.id,
            type: 'payment',
            amount: plan.price,
            method: 'card',
            status: 'completed',
            reference: `sub_${Date.now()}`,
            description: `Subscription to ${plan.name} plan`,
          });
        
        if (transactionError) throw transactionError;
      }
      
      toast({
        title: "Subscription Successful",
        description: `You are now subscribed to the ${plan.name} plan!`,
      });
      
      return true;
    } catch (error) {
      console.error('Subscription error:', error);
      toast({
        title: "Subscription Failed",
        description: error instanceof Error ? error.message : "An error occurred during subscription",
        variant: "destructive",
      });
      return false;
    } finally {
      setIsProcessing(false);
    }
  };
  
  const makePurchase = async (itemId: string) => {
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please sign in to make a purchase",
        variant: "destructive",
      });
      return false;
    }
    
    setIsProcessing(true);
    
    try {
      const item = oneTimePurchases.find(i => i.id === itemId);
      
      if (!item) {
        throw new Error('Invalid item selected');
      }
      
      // Create a transaction record
      const { error } = await supabase
        .from('transactions')
        .insert({
          user_id: user.id,
          type: 'payment',
          amount: item.price,
          method: 'card',
          status: 'completed',
          reference: `purchase_${Date.now()}`,
          description: `Purchase of ${item.name}`,
        });
      
      if (error) throw error;
      
      // Update user profile if purchasing verification badge
      if (itemId === 'verified_badge') {
        const { error: profileError } = await supabase
          .from('profiles')
          .update({
            is_verified: true,
            verification_date: new Date().toISOString(),
          })
          .eq('id', user.id);
        
        if (profileError) throw profileError;
      }
      
      // Update service as featured if purchasing featured listing
      if (itemId === 'featured_listing') {
        // In a real app, you would let the user select which service to feature
        // For now, we'll just display a message
        toast({
          title: "Feature Available",
          description: "You can now feature your services from the services page!",
        });
      }
      
      toast({
        title: "Purchase Successful",
        description: `You have successfully purchased ${item.name}!`,
      });
      
      return true;
    } catch (error) {
      console.error('Purchase error:', error);
      toast({
        title: "Purchase Failed",
        description: error instanceof Error ? error.message : "An error occurred during purchase",
        variant: "destructive",
      });
      return false;
    } finally {
      setIsProcessing(false);
    }
  };
  
  return {
    isProcessing,
    subscriptionPlans,
    oneTimePurchases,
    subscribeToPlan,
    makePurchase
  };
}
