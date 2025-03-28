
import React from 'react';
import { BadgeDollarSign, CircleDollarSign, Zap, Crown, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/hooks/use-auth';
import { cn } from '@/lib/utils';

interface TransactionFeesProps {
  className?: string;
}

const TransactionFees: React.FC<TransactionFeesProps> = ({ className }) => {
  const { subscription } = useAuth();
  
  const userSubscription = subscription?.plan || 'free';
  
  const getFeePercentage = () => {
    switch (userSubscription) {
      case 'premium':
        return 3;
      case 'pro':
        return 1.5;
      default:
        return 5;
    }
  };
  
  const getStatusIcon = () => {
    switch (userSubscription) {
      case 'premium':
        return <Crown size={18} className="text-huduma-yellow animate-pulse-soft" />;
      case 'pro':
        return <Star size={18} className="text-huduma-purple animate-pulse-soft" />;
      default:
        return <CircleDollarSign size={18} />;
    }
  };
  
  return (
    <div className={cn("colorful-card bg-white dark:bg-gray-800 rounded-2xl p-5", className)}>
      <div className="flex items-center gap-3 mb-3">
        <div className="w-10 h-10 bg-gradient-to-br from-huduma-light-green to-huduma-light-teal rounded-full flex items-center justify-center text-huduma-green">
          <CircleDollarSign size={20} className="animate-bounce-subtle" />
        </div>
        <div>
          <h3 className="font-medium">Transaction Fees</h3>
          <p className="text-sm text-foreground/70">For professional withdrawals</p>
        </div>
      </div>
      
      <div className="space-y-3">
        <div className="flex justify-between items-center py-3 px-4 rounded-lg bg-gradient-to-r from-huduma-light-green/50 to-huduma-light-teal/30 dark:from-huduma-green/10 dark:to-huduma-teal/5">
          <div className="flex items-center gap-2">
            <span className="font-medium flex items-center gap-1.5">
              {getStatusIcon()}
              Current Fee Rate:
            </span>
          </div>
          <div className="font-bold text-lg text-huduma-green">{getFeePercentage()}%</div>
        </div>
        
        {userSubscription === 'free' && (
          <div className="flex items-center gap-2 p-3 text-sm border border-huduma-yellow/30 bg-huduma-light-yellow/30 dark:bg-huduma-yellow/5 rounded-lg">
            <Zap size={16} className="text-huduma-yellow animate-pulse-soft" />
            <span>
              <Link to="/premium" className="text-huduma-green font-medium hover:underline">
                Upgrade to Premium
              </Link>{' '}
              for lower transaction fees (3%)
            </span>
          </div>
        )}
        
        {userSubscription === 'premium' && (
          <div className="flex items-center gap-2 p-3 text-sm border border-huduma-purple/30 bg-huduma-light-purple/30 dark:bg-huduma-purple/5 rounded-lg">
            <Star size={16} className="text-huduma-purple animate-pulse-soft" />
            <span>
              <Link to="/premium" className="text-huduma-green font-medium hover:underline">
                Upgrade to Pro
              </Link>{' '}
              for minimum transaction fees (1.5%)
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default TransactionFees;
