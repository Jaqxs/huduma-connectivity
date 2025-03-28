
import React from 'react';
import { BadgeDollarSign, CircleDollarSign } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/hooks/use-auth';

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
  
  return (
    <div className={`bg-white rounded-2xl border border-border p-5 ${className}`}>
      <div className="flex items-center gap-3 mb-3">
        <div className="w-10 h-10 bg-huduma-light-green rounded-full flex items-center justify-center text-huduma-green">
          <CircleDollarSign size={20} />
        </div>
        <div>
          <h3 className="font-medium">Transaction Fees</h3>
          <p className="text-sm text-foreground/70">For professional withdrawals</p>
        </div>
      </div>
      
      <div className="space-y-3">
        <div className="flex justify-between items-center py-2 px-3 rounded-lg bg-huduma-neutral">
          <div className="flex items-center gap-2">
            <span className="font-medium">Current Fee Rate:</span>
          </div>
          <div className="font-bold text-lg">{getFeePercentage()}%</div>
        </div>
        
        {userSubscription === 'free' && (
          <div className="flex items-center gap-2 text-sm text-foreground/70">
            <BadgeDollarSign size={16} className="text-huduma-green" />
            <span>
              <Link to="/premium" className="text-huduma-green hover:underline">
                Upgrade to Premium
              </Link>{' '}
              for lower transaction fees (3%)
            </span>
          </div>
        )}
        
        {userSubscription === 'premium' && (
          <div className="flex items-center gap-2 text-sm text-foreground/70">
            <BadgeDollarSign size={16} className="text-huduma-green" />
            <span>
              <Link to="/premium" className="text-huduma-green hover:underline">
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
