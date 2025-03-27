
import React from 'react';
import { cn } from '@/lib/utils';

interface CategoryPillProps {
  icon?: React.ReactNode;
  label: string;
  isActive?: boolean;
  onClick?: () => void;
  className?: string;
}

const CategoryPill: React.FC<CategoryPillProps> = ({
  icon,
  label,
  isActive = false,
  onClick,
  className
}) => {
  return (
    <button
      onClick={onClick}
      className={cn(
        "flex items-center gap-2 py-2 px-4 rounded-full transition-all duration-300 whitespace-nowrap",
        isActive 
          ? "bg-huduma-green text-white shadow-md" 
          : "bg-huduma-neutral text-foreground/80 hover:bg-huduma-light-green",
        className
      )}
    >
      {icon && <span className="flex-shrink-0">{icon}</span>}
      <span className="text-sm font-medium">{label}</span>
    </button>
  );
};

export default CategoryPill;
