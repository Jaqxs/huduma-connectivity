
import React from 'react';
import Navbar from '@/components/navigation/Navbar';
import { cn } from '@/lib/utils';

interface LayoutProps {
  children: React.ReactNode;
  className?: string;
}

const Layout: React.FC<LayoutProps> = ({ children, className }) => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Main content area (adjusted for navigation) */}
      <main className={cn(
        "pt-16 pb-16 md:pl-64 md:pb-0 min-h-screen",
        className
      )}>
        <div className="container py-6 md:py-8">
          {children}
        </div>
      </main>
    </div>
  );
};

export default Layout;
