
import { useState } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/use-auth';

// Import the Supabase URL from the client file
import { SUPABASE_URL } from '@/integrations/supabase/client';

export interface WalletTransaction {
  id: string;
  user_id: string;
  type: 'deposit' | 'withdrawal' | 'payment' | 'refund';
  amount: number;
  method?: string;
  status: 'pending' | 'completed' | 'failed';
  reference?: string;
  description?: string;
  recipient_id?: string;
  created_at: string;
}

export function useWallet() {
  const [isLoading, setIsLoading] = useState(false);
  const [transactions, setTransactions] = useState<WalletTransaction[]>([]);
  const [balance, setBalance] = useState(0);
  const { user, session } = useAuth();
  const { toast } = useToast();
  
  const fetchTransactions = async () => {
    if (!user) return;
    
    setIsLoading(true);
    
    try {
      const { data, error } = await supabase
        .from('transactions')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      
      setTransactions(data as WalletTransaction[]);
      
      // Calculate balance from transactions
      let calculatedBalance = 0;
      data.forEach((transaction: any) => {
        if (transaction.status !== 'completed') return;
        
        if (transaction.type === 'deposit' || transaction.type === 'refund') {
          calculatedBalance += transaction.amount;
        } else if (transaction.type === 'withdrawal' || transaction.type === 'payment') {
          calculatedBalance -= transaction.amount;
        }
      });
      
      setBalance(calculatedBalance);
    } catch (error) {
      console.error('Error fetching transactions:', error);
      toast({
        title: 'Error',
        description: 'Failed to load transactions',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  const addMoney = async (amount: number, method: string) => {
    if (!user || !session) {
      toast({
        title: 'Authentication required',
        description: 'Please sign in to add money',
        variant: 'destructive',
      });
      return false;
    }
    
    if (amount <= 0) {
      toast({
        title: 'Invalid amount',
        description: 'Amount must be greater than zero',
        variant: 'destructive',
      });
      return false;
    }
    
    setIsLoading(true);
    
    try {
      // In a real app, this would go through a payment gateway
      // For this demo, we'll use our edge function
      const response = await fetch(`${SUPABASE_URL}/functions/v1/process-payment`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${session.access_token}`,
        },
        body: JSON.stringify({
          amount,
          type: 'deposit',
          method,
          description: `Deposit ${amount} TZS via ${method}`,
        }),
      });
      
      const result = await response.json();
      
      if (!response.ok) {
        throw new Error(result.error || 'Failed to process payment');
      }
      
      toast({
        title: 'Deposit successful',
        description: `${amount.toLocaleString()} TZS has been added to your wallet`,
      });
      
      // Refresh transactions to update balance
      await fetchTransactions();
      
      return true;
    } catch (error) {
      console.error('Error adding money:', error);
      toast({
        title: 'Transaction failed',
        description: error instanceof Error ? error.message : 'Please try again later',
        variant: 'destructive',
      });
      return false;
    } finally {
      setIsLoading(false);
    }
  };
  
  const withdrawMoney = async (amount: number, method: string) => {
    if (!user || !session) {
      toast({
        title: 'Authentication required',
        description: 'Please sign in to withdraw money',
        variant: 'destructive',
      });
      return false;
    }
    
    if (amount <= 0) {
      toast({
        title: 'Invalid amount',
        description: 'Amount must be greater than zero',
        variant: 'destructive',
      });
      return false;
    }
    
    if (amount > balance) {
      toast({
        title: 'Insufficient balance',
        description: 'You do not have enough funds for this withdrawal',
        variant: 'destructive',
      });
      return false;
    }
    
    setIsLoading(true);
    
    try {
      // In a real app, this would go through a payment gateway
      // For this demo, we'll use our edge function
      const response = await fetch(`${SUPABASE_URL}/functions/v1/process-payment`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${session.access_token}`,
        },
        body: JSON.stringify({
          amount,
          type: 'withdrawal',
          method,
          description: `Withdrawal ${amount} TZS via ${method}`,
        }),
      });
      
      const result = await response.json();
      
      if (!response.ok) {
        throw new Error(result.error || 'Failed to process withdrawal');
      }
      
      toast({
        title: 'Withdrawal initiated',
        description: `${amount.toLocaleString()} TZS will be sent to your ${method} account`,
      });
      
      // Refresh transactions to update balance
      await fetchTransactions();
      
      return true;
    } catch (error) {
      console.error('Error withdrawing money:', error);
      toast({
        title: 'Transaction failed',
        description: error instanceof Error ? error.message : 'Please try again later',
        variant: 'destructive',
      });
      return false;
    } finally {
      setIsLoading(false);
    }
  };
  
  return {
    isLoading,
    transactions,
    balance,
    fetchTransactions,
    addMoney,
    withdrawMoney,
  };
}
