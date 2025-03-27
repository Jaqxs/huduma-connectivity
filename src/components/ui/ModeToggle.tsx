
import React from 'react';
import { Switch } from "@/components/ui/switch";
import { useUserContext } from '@/context/UserContext';
import { UserRound, HardHat } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ModeToggleProps {
  className?: string;
}

const ModeToggle: React.FC<ModeToggleProps> = ({ className }) => {
  const { userMode, toggleUserMode } = useUserContext();
  const isProfessional = userMode === 'professional';

  return (
    <div className={cn("flex items-center gap-2 p-1.5 bg-huduma-neutral rounded-full w-fit transition-all duration-300", className)}>
      <button 
        onClick={() => !isProfessional && toggleUserMode()}
        className={cn(
          "flex items-center gap-1.5 py-1.5 px-3 rounded-full transition-all duration-300",
          isProfessional ? "text-foreground/60" : "bg-white text-huduma-green font-medium shadow-sm"
        )}
      >
        <UserRound size={16} />
        <span className="text-sm">Customer</span>
      </button>
      <button 
        onClick={() => isProfessional && toggleUserMode()}
        className={cn(
          "flex items-center gap-1.5 py-1.5 px-3 rounded-full transition-all duration-300",
          !isProfessional ? "text-foreground/60" : "bg-white text-huduma-green font-medium shadow-sm"
        )}
      >
        <HardHat size={16} />
        <span className="text-sm">Professional</span>
      </button>
    </div>
  );
};

export default ModeToggle;
