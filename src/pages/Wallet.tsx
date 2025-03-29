
import React, { useState, useEffect } from 'react';
import Layout from '@/components/layout/Layout';
import { Wallet as WalletIcon, Plus, ArrowDownLeft, ArrowUpRight, CreditCard, Smartphone, Download, Filter, ArrowRight } from 'lucide-react';
import { useUserContext } from '@/context/UserContext';
import { useWallet, WalletTransaction } from '@/hooks/use-wallet';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import TransactionFees from '@/components/wallet/TransactionFees';
import { Skeleton } from '@/components/ui/skeleton';
import { format } from 'date-fns';

const Wallet: React.FC = () => {
  const { userMode } = useUserContext();
  const [activeTab, setActiveTab] = useState<'transactions' | 'methods'>('transactions');
  const [isAddMoneyOpen, setIsAddMoneyOpen] = useState(false);
  const [isWithdrawOpen, setIsWithdrawOpen] = useState(false);
  const [amount, setAmount] = useState<string>('');
  const [paymentMethod, setPaymentMethod] = useState<string>('M-Pesa');
  
  const { 
    balance, 
    transactions, 
    isLoading, 
    fetchTransactions, 
    addMoney, 
    withdrawMoney,
    downloadStatement
  } = useWallet();
  
  // Fetch transactions when component mounts
  useEffect(() => {
    fetchTransactions();
  }, [fetchTransactions]);
  
  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US').format(amount);
  };
  
  // Format date
  const formatDate = (dateString: string) => {
    try {
      return format(new Date(dateString), 'MMM d, yyyy');
    } catch (e) {
      return dateString;
    }
  };
  
  const handleAddMoney = async () => {
    const numAmount = Number(amount);
    if (isNaN(numAmount) || numAmount <= 0) return;
    
    const success = await addMoney(numAmount, paymentMethod);
    if (success) {
      setIsAddMoneyOpen(false);
      setAmount('');
    }
  };
  
  const handleWithdraw = async () => {
    const numAmount = Number(amount);
    if (isNaN(numAmount) || numAmount <= 0) return;
    
    const success = await withdrawMoney(numAmount, paymentMethod);
    if (success) {
      setIsWithdrawOpen(false);
      setAmount('');
    }
  };
  
  const handleDownloadStatement = () => {
    downloadStatement();
  };
  
  // Payment methods (simplified for demo)
  const paymentMethods = [
    {
      id: 'pm1',
      type: 'mobile',
      name: 'M-Pesa',
      number: '**** 5678',
      isDefault: true,
    },
    {
      id: 'pm2',
      type: 'mobile',
      name: 'Tigo Pesa',
      number: '**** 3456',
      isDefault: false,
    },
    {
      id: 'pm3',
      type: 'card',
      name: 'Visa Card',
      number: '**** **** **** 1234',
      expiry: '05/25',
      isDefault: false,
    },
  ];
  
  return (
    <Layout>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl md:text-3xl font-bold">Huduma Wallet</h1>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        {/* Balance Card */}
        <div className="bg-white rounded-2xl border border-border p-5 md:col-span-2">
          <div className="flex items-start justify-between">
            <div>
              <div className="text-foreground/70 mb-1">Current Balance</div>
              {isLoading ? (
                <Skeleton className="h-10 w-32 mb-1" />
              ) : (
                <div className="text-3xl font-bold mb-1">
                  {formatCurrency(balance)} <span className="text-base font-normal">TZS</span>
                </div>
              )}
              
              {/* We can add pending balance logic here in the future */}
            </div>
            
            <div className="w-12 h-12 bg-huduma-light-green rounded-full flex items-center justify-center text-huduma-green">
              <WalletIcon size={24} />
            </div>
          </div>
          
          <div className="mt-6 flex flex-wrap gap-3">
            <Button 
              onClick={() => setIsAddMoneyOpen(true)} 
              className="flex items-center gap-1.5 bg-huduma-green hover:bg-huduma-green/90"
            >
              <Plus size={18} />
              <span>Add Money</span>
            </Button>
            
            {userMode === 'professional' && (
              <Button 
                onClick={() => setIsWithdrawOpen(true)}
                className="flex items-center gap-1.5 bg-huduma-light-green text-huduma-green hover:bg-huduma-green hover:text-white"
                variant="outline"
              >
                <ArrowUpRight size={18} />
                <span>Withdraw</span>
              </Button>
            )}
            
            <Button 
              onClick={handleDownloadStatement}
              className="flex items-center gap-1.5" 
              variant="outline"
            >
              <Download size={18} />
              <span>Download Statement</span>
            </Button>
          </div>
        </div>
        
        {/* Transaction Fees Card */}
        <TransactionFees />
      </div>
      
      <div className="mb-6">
        <div className="flex border-b border-border">
          <button
            onClick={() => setActiveTab('transactions')}
            className={`py-3 px-4 border-b-2 font-medium transition-colors ${
              activeTab === 'transactions' 
                ? 'border-huduma-green text-huduma-green' 
                : 'border-transparent text-foreground/70 hover:text-foreground'
            }`}
          >
            Transactions
          </button>
          
          <button
            onClick={() => setActiveTab('methods')}
            className={`py-3 px-4 border-b-2 font-medium transition-colors ${
              activeTab === 'methods' 
                ? 'border-huduma-green text-huduma-green' 
                : 'border-transparent text-foreground/70 hover:text-foreground'
            }`}
          >
            Payment Methods
          </button>
        </div>
      </div>
      
      {activeTab === 'transactions' ? (
        /* Transactions */
        <div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="font-medium">Recent Transactions</h2>
            
            <button className="flex items-center gap-1.5 py-1.5 px-3 rounded-lg hover:bg-huduma-neutral transition-colors text-sm">
              <Filter size={14} />
              <span>Filter</span>
            </button>
          </div>
          
          {isLoading ? (
            <div className="space-y-3">
              {[1, 2, 3].map(i => (
                <div key={i} className="bg-white rounded-xl border border-border p-4">
                  <div className="flex items-center gap-3">
                    <Skeleton className="w-10 h-10 rounded-full" />
                    <div className="flex-grow">
                      <Skeleton className="h-5 w-48 mb-2" />
                      <Skeleton className="h-4 w-32" />
                    </div>
                    <div className="text-right">
                      <Skeleton className="h-5 w-24 mb-2" />
                      <Skeleton className="h-4 w-16" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : transactions.length > 0 ? (
            <div className="space-y-3">
              {transactions.map(transaction => {
                let icon = <ArrowDownLeft size={20} />;
                let bgColor = 'bg-green-100';
                let textColor = 'text-green-600';
                
                if (transaction.type === 'deposit' || transaction.type === 'refund') {
                  icon = <ArrowDownLeft size={20} />;
                  bgColor = 'bg-green-100';
                  textColor = 'text-green-600';
                } else if (transaction.type === 'withdrawal' || transaction.type === 'payment') {
                  icon = <ArrowUpRight size={20} />;
                  bgColor = transaction.type === 'withdrawal' ? 'bg-orange-100' : 'bg-blue-100';
                  textColor = transaction.type === 'withdrawal' ? 'text-orange-600' : 'text-blue-600';
                }
                
                const getTitle = () => {
                  if (transaction.type === 'deposit') {
                    return `Deposit via ${transaction.method || 'Online'}`;
                  } else if (transaction.type === 'withdrawal') {
                    return `Withdrawal to ${transaction.method || 'Bank Account'}`;
                  } else if (transaction.type === 'payment') {
                    return `Payment for ${transaction.description || 'Service'}`;
                  } else if (transaction.type === 'refund') {
                    return `Refund for ${transaction.description || 'Service'}`;
                  }
                  return '';
                };
                
                return (
                  <div key={transaction.id} className="bg-white rounded-xl border border-border p-4">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-full ${bgColor} flex items-center justify-center ${textColor}`}>
                        {icon}
                      </div>
                      
                      <div className="flex-grow">
                        <div className="flex justify-between items-start">
                          <div>
                            <div className="font-medium">{getTitle()}</div>
                            <div className="text-sm text-foreground/60">{formatDate(transaction.created_at)}</div>
                          </div>
                          
                          <div className="text-right">
                            <div className={`font-bold ${
                              transaction.type === 'deposit' || transaction.type === 'refund'
                                ? 'text-green-600' 
                                : transaction.type === 'withdrawal' || transaction.type === 'payment'
                                  ? 'text-red-600'
                                  : ''
                            }`}>
                              {transaction.type === 'deposit' || transaction.type === 'refund' ? '+' : '-'}
                              {formatCurrency(transaction.amount)} TZS
                            </div>
                            <div className="flex items-center justify-end gap-1 text-xs">
                              <span className={`w-2 h-2 rounded-full ${
                                transaction.status === 'completed' ? 'bg-green-500' : 'bg-orange-500'
                              }`}></span>
                              <span className="capitalize">{transaction.status}</span>
                            </div>
                          </div>
                        </div>
                        
                        <div className="mt-2 pt-2 border-t text-sm text-foreground/60 flex justify-between">
                          <div>Reference: {transaction.reference || transaction.id.substring(0, 8)}</div>
                          {transaction.recipient_id && (
                            <div>Recipient: {transaction.recipient_id.substring(0, 8)}</div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-8 bg-white rounded-xl border border-border">
              <div className="w-16 h-16 mx-auto mb-4 bg-huduma-light-green rounded-full flex items-center justify-center text-huduma-green">
                <WalletIcon size={24} />
              </div>
              <h3 className="text-lg font-medium mb-2">No transactions yet</h3>
              <p className="text-foreground/60 mb-4">Start by adding money to your wallet</p>
              <Button
                onClick={() => setIsAddMoneyOpen(true)}
                className="flex items-center gap-1.5 mx-auto bg-huduma-green hover:bg-huduma-green/90"
              >
                <Plus size={18} />
                <span>Add Money</span>
              </Button>
            </div>
          )}
        </div>
      ) : (
        /* Payment Methods */
        <div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="font-medium">Your Payment Methods</h2>
            
            <Button 
              className="flex items-center gap-1.5 bg-huduma-light-green text-huduma-green hover:bg-huduma-green hover:text-white"
              size="sm"
            >
              <Plus size={14} />
              <span>Add New</span>
            </Button>
          </div>
          
          <div className="space-y-3">
            {paymentMethods.map(method => (
              <div key={method.id} className="bg-white rounded-xl border border-border p-4">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-full ${
                    method.type === 'mobile' ? 'bg-blue-100 text-blue-600' : 'bg-purple-100 text-purple-600'
                  } flex items-center justify-center`}>
                    {method.type === 'mobile' ? <Smartphone size={20} /> : <CreditCard size={20} />}
                  </div>
                  
                  <div className="flex-grow">
                    <div className="flex justify-between">
                      <div>
                        <div className="font-medium flex items-center gap-2">
                          {method.name}
                          {method.isDefault && (
                            <span className="text-xs bg-huduma-light-green text-huduma-green py-0.5 px-2 rounded-full">
                              Default
                            </span>
                          )}
                        </div>
                        <div className="text-sm text-foreground/60">
                          {method.number}
                          {method.type === 'card' && ` • Expires ${method.expiry}`}
                        </div>
                      </div>
                      
                      <div className="flex gap-2">
                        {!method.isDefault && (
                          <button className="text-foreground/70 hover:text-foreground text-sm">
                            Set as Default
                          </button>
                        )}
                        <button className="text-red-600 hover:text-red-700 text-sm">
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      
      {/* Add Money Dialog */}
      <Dialog open={isAddMoneyOpen} onOpenChange={setIsAddMoneyOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add Money to Wallet</DialogTitle>
            <DialogDescription>
              Enter the amount you want to deposit to your wallet
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="amount">Amount (TZS)</Label>
              <Input
                id="amount"
                type="number"
                placeholder="Enter amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <Label>Payment Method</Label>
              <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                <div className="flex items-center space-x-2 p-2 rounded hover:bg-muted">
                  <RadioGroupItem value="M-Pesa" id="mpesa" />
                  <Label htmlFor="mpesa" className="flex-1 cursor-pointer">M-Pesa</Label>
                </div>
                <div className="flex items-center space-x-2 p-2 rounded hover:bg-muted">
                  <RadioGroupItem value="Tigo Pesa" id="tigo" />
                  <Label htmlFor="tigo" className="flex-1 cursor-pointer">Tigo Pesa</Label>
                </div>
                <div className="flex items-center space-x-2 p-2 rounded hover:bg-muted">
                  <RadioGroupItem value="Credit Card" id="card" />
                  <Label htmlFor="card" className="flex-1 cursor-pointer">Credit Card</Label>
                </div>
              </RadioGroup>
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddMoneyOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddMoney} disabled={isLoading}>
              Add Money
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Withdraw Money Dialog */}
      <Dialog open={isWithdrawOpen} onOpenChange={setIsWithdrawOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Withdraw Money</DialogTitle>
            <DialogDescription>
              Enter the amount you want to withdraw from your wallet
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="withdraw-amount">Amount (TZS)</Label>
              <Input
                id="withdraw-amount"
                type="number"
                placeholder="Enter amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
              <p className="text-xs text-muted-foreground">
                Available balance: {formatCurrency(balance)} TZS
              </p>
            </div>
            
            <div className="space-y-2">
              <Label>Withdraw To</Label>
              <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                <div className="flex items-center space-x-2 p-2 rounded hover:bg-muted">
                  <RadioGroupItem value="M-Pesa" id="w-mpesa" />
                  <Label htmlFor="w-mpesa" className="flex-1 cursor-pointer">M-Pesa (**** 5678)</Label>
                </div>
                <div className="flex items-center space-x-2 p-2 rounded hover:bg-muted">
                  <RadioGroupItem value="Tigo Pesa" id="w-tigo" />
                  <Label htmlFor="w-tigo" className="flex-1 cursor-pointer">Tigo Pesa (**** 3456)</Label>
                </div>
                <div className="flex items-center space-x-2 p-2 rounded hover:bg-muted">
                  <RadioGroupItem value="Bank Account" id="w-bank" />
                  <Label htmlFor="w-bank" className="flex-1 cursor-pointer">Bank Account</Label>
                </div>
              </RadioGroup>
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsWithdrawOpen(false)}>
              Cancel
            </Button>
            <Button 
              onClick={handleWithdraw} 
              disabled={isLoading || Number(amount) > balance}
              className="bg-huduma-green hover:bg-huduma-green/90"
            >
              Withdraw
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Layout>
  );
};

export default Wallet;
