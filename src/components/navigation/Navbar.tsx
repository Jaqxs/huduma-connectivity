
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Search, Calendar, Wallet, User, Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import ModeToggle from '@/components/ui/ModeToggle';
import { useUserContext } from '@/context/UserContext';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { userMode } = useUserContext();
  
  // Close menu when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);
  
  const navItems = [
    {
      name: 'Home',
      path: '/',
      icon: <Home size={20} />,
    },
    {
      name: userMode === 'customer' ? 'Services' : 'Jobs',
      path: userMode === 'customer' ? '/services' : '/jobs',
      icon: <Search size={20} />,
    },
    {
      name: 'Appointments',
      path: '/appointments',
      icon: <Calendar size={20} />,
    },
    {
      name: 'Wallet',
      path: '/wallet',
      icon: <Wallet size={20} />,
    },
    {
      name: 'Profile',
      path: '/profile',
      icon: <User size={20} />,
    },
  ];
  
  return (
    <>
      {/* Mobile Top Navbar */}
      <header className="fixed top-0 left-0 right-0 z-40 bg-white/80 backdrop-blur-lg border-b border-border">
        <div className="container flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-huduma-green flex items-center justify-center">
              <span className="text-white font-bold">H</span>
            </div>
            <span className="font-semibold text-lg">Huduma</span>
          </Link>
          
          <div className="flex items-center gap-4">
            <ModeToggle className="hidden md:flex" />
            
            <button 
              onClick={() => setIsOpen(!isOpen)} 
              className="flex md:hidden"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </header>
      
      {/* Mobile Side Menu */}
      <div 
        className={cn(
          "fixed inset-0 z-50 bg-black/50 backdrop-blur-sm md:hidden transition-opacity duration-300",
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
        onClick={() => setIsOpen(false)}
      />
      
      <div 
        className={cn(
          "fixed top-0 right-0 z-50 w-3/4 h-full bg-white shadow-xl md:hidden transition-transform duration-300 ease-in-out transform",
          isOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        <div className="flex flex-col h-full p-4">
          <div className="flex items-center justify-between mb-8 pt-2">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-huduma-green flex items-center justify-center">
                <span className="text-white font-bold">H</span>
              </div>
              <span className="font-semibold text-lg">Huduma</span>
            </div>
            <button onClick={() => setIsOpen(false)}>
              <X size={24} />
            </button>
          </div>
          
          <ModeToggle className="mb-8 self-start" />
          
          <div className="flex flex-col gap-4">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  "flex items-center gap-3 py-3 px-4 rounded-xl transition-colors",
                  location.pathname === item.path
                    ? "bg-huduma-light-green text-huduma-green font-medium"
                    : "text-foreground/70 hover:bg-huduma-neutral"
                )}
              >
                {item.icon}
                <span>{item.name}</span>
              </Link>
            ))}
          </div>
          
          <div className="mt-auto pt-8 border-t">
            <div className="glass-morphism rounded-xl p-4">
              <h3 className="font-medium mb-2">Let Us Be of Your Service</h3>
              <p className="text-sm text-foreground/70 mb-4">Switch to professional mode to offer your skills</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Bottom Navigation for Mobile */}
      <nav className="fixed bottom-0 left-0 right-0 z-40 bg-white/80 backdrop-blur-lg border-t border-border md:hidden">
        <div className="flex items-center justify-around h-16">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "flex flex-col items-center justify-center gap-1 h-full flex-1 transition-colors",
                location.pathname === item.path
                  ? "text-huduma-green"
                  : "text-foreground/60"
              )}
            >
              {item.icon}
              <span className="text-xs">{item.name}</span>
            </Link>
          ))}
        </div>
      </nav>
      
      {/* Desktop Side Navigation */}
      <aside className="hidden md:block fixed left-0 top-0 h-full w-64 bg-white border-r border-border z-30">
        <div className="flex flex-col h-full p-4">
          <Link to="/" className="flex items-center gap-2 py-4 mb-8">
            <div className="w-10 h-10 rounded-lg bg-huduma-green flex items-center justify-center">
              <span className="text-white font-bold text-lg">H</span>
            </div>
            <span className="font-semibold text-xl">Huduma</span>
          </Link>
          
          <ModeToggle className="mb-8" />
          
          <div className="flex flex-col gap-2">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  "flex items-center gap-3 py-3 px-4 rounded-xl transition-colors",
                  location.pathname === item.path
                    ? "bg-huduma-light-green text-huduma-green font-medium"
                    : "text-foreground/70 hover:bg-huduma-neutral"
                )}
              >
                {item.icon}
                <span>{item.name}</span>
              </Link>
            ))}
          </div>
          
          <div className="mt-auto pt-6">
            <div className="glass-morphism rounded-xl p-4 border border-huduma-green/10">
              <h3 className="font-medium mb-2">Let Us Be of Your Service</h3>
              <p className="text-sm text-foreground/70 mb-4">
                {userMode === 'customer' 
                  ? 'Need work done? Find the perfect professional!' 
                  : 'Offer your services to thousands of customers!'}
              </p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Navbar;
