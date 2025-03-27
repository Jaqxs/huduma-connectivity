
import React from 'react';
import { Search, TrendingUp, ShieldCheck, Clock } from 'lucide-react';
import { useUserContext } from '@/context/UserContext';
import { cn } from '@/lib/utils';

interface HeroSectionProps {
  className?: string;
}

const HeroSection: React.FC<HeroSectionProps> = ({ className }) => {
  const { userMode } = useUserContext();
  const isCustomer = userMode === 'customer';

  return (
    <section className={cn("relative overflow-hidden py-6 md:py-12", className)}>
      {/* Background decoration */}
      <div className="absolute -top-24 -right-24 w-64 h-64 rounded-full bg-huduma-light-green opacity-50 blur-3xl" />
      <div className="absolute -bottom-32 -left-32 w-80 h-80 rounded-full bg-huduma-light-yellow opacity-40 blur-3xl" />
      
      <div className="relative z-10">
        <div className="flex flex-col items-center text-center mb-8 md:mb-12 animate-fade-in">
          <span className="px-3 py-1 bg-huduma-light-green text-huduma-green rounded-full text-sm font-medium mb-4">
            {isCustomer ? 'Need a service?' : 'Offer your skills'} 
          </span>
          
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold max-w-3xl mb-4 leading-tight">
            {isCustomer 
              ? 'Find skilled professionals for any task' 
              : 'Connect with customers who need your expertise'}
          </h1>
          
          <p className="text-foreground/70 max-w-xl mb-8 md:text-lg">
            {isCustomer 
              ? 'Huduma connects you with verified professionals across Tanzania for any service you need' 
              : 'Join our network of professionals and grow your business across Tanzania'}
          </p>
          
          <div className="w-full max-w-lg">
            <div className="relative">
              <div className="absolute left-3 top-1/2 -translate-y-1/2 text-foreground/50">
                <Search size={20} />
              </div>
              <input 
                type="text" 
                placeholder={isCustomer ? "What service do you need?" : "What skills can you offer?"}
                className="w-full pl-10 pr-28 py-3 rounded-full border border-border focus:border-huduma-green focus:ring-2 focus:ring-huduma-green/10 outline-none transition-all"
              />
              <button className="absolute right-1.5 top-1.5 bg-huduma-green text-white px-5 py-2 rounded-full font-medium transition-all hover:bg-huduma-green/90">
                Search
              </button>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl mx-auto">
          <div className="glass-morphism p-4 rounded-xl flex items-start gap-3 animate-fade-in" style={{ animationDelay: '100ms' }}>
            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-huduma-light-green flex items-center justify-center text-huduma-green">
              <TrendingUp size={20} />
            </div>
            <div>
              <h3 className="font-medium mb-1">Top Rated</h3>
              <p className="text-sm text-foreground/70">Highly rated professionals with verified reviews</p>
            </div>
          </div>
          
          <div className="glass-morphism p-4 rounded-xl flex items-start gap-3 animate-fade-in" style={{ animationDelay: '200ms' }}>
            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-huduma-light-yellow flex items-center justify-center text-huduma-yellow">
              <ShieldCheck size={20} />
            </div>
            <div>
              <h3 className="font-medium mb-1">Verified Skills</h3>
              <p className="text-sm text-foreground/70">All professionals are vetted for quality</p>
            </div>
          </div>
          
          <div className="glass-morphism p-4 rounded-xl flex items-start gap-3 animate-fade-in" style={{ animationDelay: '300ms' }}>
            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-huduma-light-green flex items-center justify-center text-huduma-green">
              <Clock size={20} />
            </div>
            <div>
              <h3 className="font-medium mb-1">Quick Response</h3>
              <p className="text-sm text-foreground/70">Fast service even in urgent situations</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
