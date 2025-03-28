
import React from 'react';
import { Search, TrendingUp, ShieldCheck, Clock, Sparkles } from 'lucide-react';
import { useUserContext } from '@/context/UserContext';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

interface HeroSectionProps {
  className?: string;
}

const HeroSection: React.FC<HeroSectionProps> = ({ className }) => {
  const { userMode } = useUserContext();
  const isCustomer = userMode === 'customer';

  return (
    <section className={cn("relative overflow-hidden py-10 md:py-16", className)}>
      {/* Background decorations */}
      <div className="absolute -top-24 -right-24 w-64 h-64 rounded-full bg-huduma-light-green opacity-50 blur-3xl animate-pulse-soft" />
      <div className="absolute -bottom-32 -left-32 w-80 h-80 rounded-full bg-huduma-light-yellow opacity-40 blur-3xl" />
      <div className="absolute top-1/2 left-1/4 w-40 h-40 rounded-full bg-huduma-light-teal opacity-30 blur-2xl animate-pulse-soft" />
      <div className="absolute bottom-1/4 right-1/3 w-24 h-24 rounded-full bg-huduma-light-coral opacity-20 blur-xl animate-float" />
      
      <div className="relative z-10 max-w-5xl mx-auto">
        <div className="flex flex-col items-center text-center mb-10 md:mb-14 animate-fade-in">
          <span className="px-4 py-1.5 bg-gradient-to-r from-huduma-light-green to-huduma-light-teal text-huduma-green rounded-full text-sm font-medium mb-5 flex items-center gap-1.5 shadow-sm">
            <Sparkles size={14} className="text-huduma-green animate-pulse-soft" />
            {isCustomer ? 'Need a service?' : 'Offer your skills'} 
          </span>
          
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold max-w-3xl mb-6 leading-tight">
            <span className="gradient-text font-serif">Let Us Be</span>{' '}
            <span className="relative">
              of Your Service
              <span className="absolute bottom-0 left-0 w-full h-1 bg-huduma-yellow rounded-full animate-pulse-soft opacity-80"></span>
            </span>
          </h1>
          
          <p className="text-foreground/70 max-w-xl mb-10 md:text-lg">
            {isCustomer 
              ? 'Huduma connects you with verified professionals across Tanzania for any service you need' 
              : 'Join our network of professionals and grow your business across Tanzania'}
          </p>
          
          <div className="w-full max-w-lg relative">
            <div className="relative animate-slide-up" style={{ animationDelay: '300ms' }}>
              <div className="absolute left-3 top-1/2 -translate-y-1/2 text-foreground/50">
                <Search size={20} />
              </div>
              <input 
                type="text" 
                placeholder={isCustomer ? "What service do you need?" : "What skills can you offer?"}
                className="w-full pl-10 pr-28 py-3.5 rounded-full border border-border focus:border-huduma-green focus:ring-2 focus:ring-huduma-green/10 outline-none transition-all shadow-sm"
              />
              <Button 
                className="absolute right-1.5 top-1.5 bg-gradient-to-r from-huduma-green to-huduma-teal text-white px-5 py-5 rounded-full font-medium hover:shadow-glow transition-all duration-300"
              >
                Search
              </Button>
            </div>
            
            <div className="absolute -bottom-3 w-full flex justify-center">
              <div className="text-xs text-foreground/50 px-3 py-1 bg-background rounded-full border border-border/50 animate-slide-up" style={{ animationDelay: '600ms' }}>
                Popular: Plumbing, Cleaning, Tutoring, Repairs
              </div>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl mx-auto mt-14">
          <div className="colorful-card p-4 rounded-xl flex items-start gap-3 animate-fade-in hover-lift" style={{ animationDelay: '100ms' }}>
            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-huduma-light-green to-huduma-green/30 flex items-center justify-center text-huduma-green shadow-sm">
              <TrendingUp size={20} className="animate-bounce-subtle" style={{ animationDelay: '0ms' }} />
            </div>
            <div>
              <h3 className="font-semibold mb-1 text-lg">Top Rated</h3>
              <p className="text-sm text-foreground/70">Highly rated professionals with verified reviews</p>
            </div>
          </div>
          
          <div className="colorful-card p-4 rounded-xl flex items-start gap-3 animate-fade-in hover-lift" style={{ animationDelay: '200ms' }}>
            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-huduma-light-yellow to-huduma-yellow/30 flex items-center justify-center text-huduma-yellow shadow-sm">
              <ShieldCheck size={20} className="animate-bounce-subtle" style={{ animationDelay: '300ms' }} />
            </div>
            <div>
              <h3 className="font-semibold mb-1 text-lg">Verified Skills</h3>
              <p className="text-sm text-foreground/70">All professionals are vetted for quality</p>
            </div>
          </div>
          
          <div className="colorful-card p-4 rounded-xl flex items-start gap-3 animate-fade-in hover-lift" style={{ animationDelay: '300ms' }}>
            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-huduma-light-teal to-huduma-teal/30 flex items-center justify-center text-huduma-teal shadow-sm">
              <Clock size={20} className="animate-bounce-subtle" style={{ animationDelay: '600ms' }} />
            </div>
            <div>
              <h3 className="font-semibold mb-1 text-lg">Quick Response</h3>
              <p className="text-sm text-foreground/70">Fast service even in urgent situations</p>
            </div>
          </div>
        </div>
        
        <div className="mt-20 text-center">
          <Link to="/services" className="btn-gradient inline-flex items-center gap-2 py-3 px-6 text-lg">
            Explore Services
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
