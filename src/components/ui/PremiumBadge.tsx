
import React from 'react';
import { BadgeDollarSign } from 'lucide-react';
import { cn } from '@/lib/utils';

interface PremiumBadgeProps {
  level: 'premium' | 'pro';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const PremiumBadge: React.FC<PremiumBadgeProps> = ({ 
  level,
  size = 'md',
  className 
}) => {
  const sizeClasses = {
    sm: 'text-xs py-0.5 px-1.5',
    md: 'text-sm py-0.5 px-2',
    lg: 'text-base py-1 px-3'
  };
  
  const colors = {
    premium: 'bg-huduma-light-green text-huduma-green',
    pro: 'bg-gradient-to-r from-huduma-green to-huduma-light-green text-white'
  };
  
  return (
    <div className={cn(
      'flex items-center gap-1 rounded-full font-medium',
      sizeClasses[size],
      colors[level],
      className
    )}>
      <BadgeDollarSign size={size === 'sm' ? 12 : size === 'md' ? 14 : 16} className="flex-shrink-0" />
      <span className="capitalize">{level}</span>
    </div>
  );
};

export default PremiumBadge;
