
import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { Wallet as WalletIcon, Plus, ArrowDownLeft, ArrowUpRight, CreditCard, Smartphone, Download, Filter, Clock, CheckCircle, ArrowRight } from 'lucide-react';
import { useUserContext } from '@/context/UserContext';

const Wallet: React.FC = () => {
  const { userMode } = useUserContext();
  const [activeTab, setActiveTab] = useState<'transactions' | 'methods'>('transactions');
  
  // Sample wallet data
  const wallet = {
    balance: 235000,
    pendingBalance: userMode === 'professional' ? 75000 : 0,
    transactions: [
      {
        id: 'tx1',
        type: 'deposit',
        amount: 100000,
        date: '2023-08-01',
        method: 'M-Pesa',
        status: 'completed',
        reference: 'DEP123456',
      },
      {
        id: 'tx2',
        type: 'payment',
        amount: 35000,
        date: '2023-07-28',
        serviceName: 'Home Plumbing Services',
        recipient: 'John Magufuli',
        status: 'completed',
        reference: 'PAY789012',
      },
      {
        id: 'tx3',
        type: 'deposit',
        amount: 50000,
        date: '2023-07-20',
        method: 'Tigo Pesa',
        status: 'completed',
        reference: 'DEP345678',
      },
      {
        id: 'tx4',
        type: 'payment',
        amount: 25000,
        date: '2023-07-15',
        serviceName: 'Professional Haircut',
        recipient: 'Maria Kimaro',
        status: 'completed',
        reference: 'PAY901234',
      },
      {
        id: 'tx5',
        type: 'withdrawal',
        amount: 75000,
        date: '2023-07-10',
        method: 'M-Pesa',
        status: 'completed',
        reference: 'WIT567890',
      },
    ],
    paymentMethods: [
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
    ],
  };
  
  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US').format(amount);
  };
  
  // Format date
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };
  
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
              <div className="text-3xl font-bold mb-1">
                {formatCurrency(wallet.balance)} <span className="text-base font-normal">TZS</span>
              </div>
              
              {userMode === 'professional' && wallet.pendingBalance > 0 && (
                <div className="text-sm text-foreground/60">
                  <span className="text-orange-500 font-medium">{formatCurrency(wallet.pendingBalance)} TZS</span> pending clearance
                </div>
              )}
            </div>
            
            <div className="w-12 h-12 bg-huduma-light-green rounded-full flex items-center justify-center text-huduma-green">
              <WalletIcon size={24} />
            </div>
          </div>
          
          <div className="mt-6 flex flex-wrap gap-3">
            <button className="flex items-center gap-1.5 py-2 px-4 rounded-lg bg-huduma-green text-white hover:bg-huduma-green/90 transition-colors">
              <Plus size={18} />
              <span>Add Money</span>
            </button>
            
            {userMode === 'professional' && (
              <button className="flex items-center gap-1.5 py-2 px-4 rounded-lg bg-huduma-light-green text-huduma-green hover:bg-huduma-green hover:text-white transition-colors">
                <ArrowUpRight size={18} />
                <span>Withdraw</span>
              </button>
            )}
            
            <button className="flex items-center gap-1.5 py-2 px-4 rounded-lg border border-border hover:bg-huduma-neutral transition-colors">
              <Download size={18} />
              <span>Download Statement</span>
            </button>
          </div>
        </div>
        
        {/* Quick Actions */}
        <div className="bg-white rounded-2xl border border-border p-5">
          <h2 className="font-medium mb-4">Quick Actions</h2>
          
          <div className="space-y-3">
            <button className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-huduma-neutral transition-colors">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                  <Plus size={18} />
                </div>
                <span>Deposit Funds</span>
              </div>
              <ArrowRight size={18} className="text-foreground/60" />
            </button>
            
            {userMode === 'professional' && (
              <button className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-huduma-neutral transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                    <ArrowUpRight size={18} />
                  </div>
                  <span>Withdraw to M-Pesa</span>
                </div>
                <ArrowRight size={18} className="text-foreground/60" />
              </button>
            )}
            
            <button className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-huduma-neutral transition-colors">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-purple-100 flex items-center justify-center text-purple-600">
                  <CreditCard size={18} />
                </div>
                <span>Add Payment Method</span>
              </div>
              <ArrowRight size={18} className="text-foreground/60" />
            </button>
          </div>
        </div>
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
          
          <div className="space-y-3">
            {wallet.transactions.map(transaction => {
              let icon = <Clock size={20} />;
              let bgColor = 'bg-gray-100';
              let textColor = 'text-gray-600';
              
              if (transaction.type === 'deposit') {
                icon = <ArrowDownLeft size={20} />;
                bgColor = 'bg-green-100';
                textColor = 'text-green-600';
              } else if (transaction.type === 'withdrawal') {
                icon = <ArrowUpRight size={20} />;
                bgColor = 'bg-orange-100';
                textColor = 'text-orange-600';
              } else if (transaction.type === 'payment') {
                icon = <CreditCard size={20} />;
                bgColor = 'bg-blue-100';
                textColor = 'text-blue-600';
              }
              
              const getTitle = () => {
                if (transaction.type === 'deposit') {
                  return `Deposit via ${transaction.method}`;
                } else if (transaction.type === 'withdrawal') {
                  return `Withdrawal to ${transaction.method}`;
                } else if (transaction.type === 'payment') {
                  return `Payment for ${transaction.serviceName}`;
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
                          <div className="text-sm text-foreground/60">{formatDate(transaction.date)}</div>
                        </div>
                        
                        <div className="text-right">
                          <div className={`font-bold ${
                            transaction.type === 'deposit' 
                              ? 'text-green-600' 
                              : transaction.type === 'withdrawal' || transaction.type === 'payment'
                                ? 'text-red-600'
                                : ''
                          }`}>
                            {transaction.type === 'deposit' ? '+' : '-'}{formatCurrency(transaction.amount)} TZS
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
                        <div>Reference: {transaction.reference}</div>
                        {transaction.type === 'payment' && (
                          <div>Recipient: {transaction.recipient}</div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          
          <div className="mt-4 text-center">
            <button className="text-huduma-green hover:underline font-medium">View All Transactions</button>
          </div>
        </div>
      ) : (
        /* Payment Methods */
        <div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="font-medium">Your Payment Methods</h2>
            
            <button className="flex items-center gap-1.5 py-1.5 px-3 rounded-lg bg-huduma-light-green text-huduma-green hover:bg-huduma-green hover:text-white transition-colors text-sm">
              <Plus size={14} />
              <span>Add New</span>
            </button>
          </div>
          
          <div className="space-y-3">
            {wallet.paymentMethods.map(method => (
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
    </Layout>
  );
};

export default Wallet;
