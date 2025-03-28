
import React from 'react';
import Navbar from '@/components/navigation/Navbar';
import { cn } from '@/lib/utils';
import { Toaster } from '@/components/ui/toaster';

interface LayoutProps {
  children: React.ReactNode;
  className?: string;
  fullWidth?: boolean;
}

const Layout: React.FC<LayoutProps> = ({ children, className, fullWidth = false }) => {
  return (
    <div className="min-h-screen bg-background relative overflow-x-hidden">
      {/* Background decorations for visual interest */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-huduma-light-green/20 rounded-full blur-3xl opacity-30 animate-pulse-soft" style={{ animationDuration: '15s' }}></div>
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-huduma-light-yellow/10 rounded-full blur-3xl opacity-20 animate-pulse-soft" style={{ animationDuration: '20s' }}></div>
        <div className="absolute top-1/3 left-1/4 w-[300px] h-[300px] bg-huduma-light-teal/10 rounded-full blur-3xl opacity-20 animate-float" style={{ animationDuration: '25s' }}></div>
      </div>
      
      {/* Main content */}
      <div className="relative z-10">
        <Navbar />
        
        {/* Main content area (adjusted for navigation) */}
        <main className={cn(
          "pt-16 pb-16 md:pl-64 md:pb-0 min-h-screen",
          className
        )}>
          <div className={cn(
            "py-6 md:py-8 px-4 md:px-6",
            fullWidth ? "max-w-full" : "container"
          )}>
            {children}
          </div>
        </main>
      </div>
      
      {/* Toaster for notifications */}
      <Toaster />
    </div>
  );
};

export default Layout;
