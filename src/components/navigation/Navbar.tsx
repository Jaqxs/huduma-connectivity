
import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Home, Search, Calendar, Wallet, User, Menu, X, LogOut, LogIn } from 'lucide-react';
import { cn } from '@/lib/utils';
import ModeToggle from '@/components/ui/ModeToggle';
import { useUserContext } from '@/context/UserContext';
import { useAuth } from '@/hooks/use-auth';
import { Button } from '@/components/ui/button';
import PremiumBadge from '@/components/ui/PremiumBadge';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { userMode } = useUserContext();
  const { user, profile, subscription, signOut } = useAuth();
  
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
      requiresAuth: true,
    },
    {
      name: 'Wallet',
      path: '/wallet',
      icon: <Wallet size={20} />,
      requiresAuth: true,
    },
    {
      name: 'Profile',
      path: '/profile',
      icon: <User size={20} />,
      requiresAuth: true,
    },
  ];
  
  // Filter items based on authentication status
  const filteredNavItems = navItems.filter(item => 
    !item.requiresAuth || (item.requiresAuth && user)
  );
  
  const handleAuthAction = () => {
    if (user) {
      signOut();
    } else {
      navigate('/auth');
    }
  };
  
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
            
            {user ? (
              <div className="hidden md:flex items-center gap-3">
                {subscription && subscription.plan !== 'free' && (
                  <PremiumBadge level={subscription.plan as 'premium' | 'pro'} size="sm" />
                )}
                <span className="text-sm font-medium truncate max-w-[120px]">
                  {profile?.full_name || user.email}
                </span>
                <Button 
                  variant="ghost" 
                  size="icon"
                  onClick={handleAuthAction}
                  className="text-foreground/70 hover:text-foreground"
                >
                  <LogOut size={18} />
                </Button>
              </div>
            ) : (
              <Button 
                variant="outline" 
                size="sm"
                onClick={handleAuthAction}
                className="hidden md:flex gap-1 border-huduma-green text-huduma-green hover:bg-huduma-light-green"
              >
                <LogIn size={16} />
                <span>Sign In</span>
              </Button>
            )}
            
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
          
          {user && (
            <div className="mb-6 p-3 bg-huduma-neutral rounded-xl flex items-center gap-3">
              {profile?.avatar_url ? (
                <img 
                  src={profile.avatar_url} 
                  alt={profile.full_name || ''} 
                  className="w-10 h-10 rounded-full object-cover"
                />
              ) : (
                <div className="w-10 h-10 rounded-full bg-huduma-green/20 flex items-center justify-center">
                  <User size={20} className="text-huduma-green" />
                </div>
              )}
              <div className="flex-1 min-w-0">
                <p className="font-medium truncate">{profile?.full_name || user.email}</p>
                {subscription && subscription.plan !== 'free' && (
                  <PremiumBadge level={subscription.plan as 'premium' | 'pro'} size="sm" />
                )}
              </div>
            </div>
          )}
          
          <ModeToggle className="mb-8 self-start" />
          
          <div className="flex flex-col gap-4">
            {filteredNavItems.map((item) => (
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
            
            {user ? (
              <button
                onClick={handleAuthAction}
                className="flex items-center gap-3 py-3 px-4 rounded-xl transition-colors text-foreground/70 hover:bg-huduma-neutral"
              >
                <LogOut size={20} />
                <span>Sign Out</span>
              </button>
            ) : (
              <Link
                to="/auth"
                className="flex items-center gap-3 py-3 px-4 rounded-xl transition-colors bg-huduma-green text-white"
              >
                <LogIn size={20} />
                <span>Sign In</span>
              </Link>
            )}
          </div>
          
          <div className="mt-auto pt-8 border-t">
            <Link to="/premium" className="glass-morphism rounded-xl p-4 block">
              <h3 className="font-medium mb-2">Upgrade to Premium</h3>
              <p className="text-sm text-foreground/70 mb-4">
                Unlock premium features and boost your Huduma experience
              </p>
            </Link>
          </div>
        </div>
      </div>
      
      {/* Bottom Navigation for Mobile */}
      <nav className="fixed bottom-0 left-0 right-0 z-40 bg-white/80 backdrop-blur-lg border-t border-border md:hidden">
        <div className="flex items-center justify-around h-16">
          {filteredNavItems.map((item) => (
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
          
          {!user && (
            <Link
              to="/auth"
              className="flex flex-col items-center justify-center gap-1 h-full flex-1 transition-colors text-foreground/60"
            >
              <LogIn size={20} />
              <span className="text-xs">Sign In</span>
            </Link>
          )}
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
          
          {user && (
            <div className="mb-6 p-3 bg-huduma-neutral rounded-xl flex items-center gap-3">
              {profile?.avatar_url ? (
                <img 
                  src={profile.avatar_url} 
                  alt={profile.full_name || ''} 
                  className="w-10 h-10 rounded-full object-cover"
                />
              ) : (
                <div className="w-10 h-10 rounded-full bg-huduma-green/20 flex items-center justify-center">
                  <User size={20} className="text-huduma-green" />
                </div>
              )}
              <div className="flex-1 min-w-0">
                <p className="font-medium truncate">{profile?.full_name || user.email}</p>
                {subscription && subscription.plan !== 'free' && (
                  <div className="mt-1">
                    <PremiumBadge level={subscription.plan as 'premium' | 'pro'} size="sm" />
                  </div>
                )}
              </div>
            </div>
          )}
          
          <ModeToggle className="mb-8" />
          
          <div className="flex flex-col gap-2">
            {filteredNavItems.map((item) => (
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
            
            {user ? (
              <button
                onClick={handleAuthAction}
                className="flex items-center gap-3 py-3 px-4 rounded-xl transition-colors text-foreground/70 hover:bg-huduma-neutral mt-2"
              >
                <LogOut size={20} />
                <span>Sign Out</span>
              </button>
            ) : (
              <Link
                to="/auth"
                className="flex items-center gap-3 py-3 px-4 rounded-xl transition-colors bg-huduma-green text-white mt-2"
              >
                <LogIn size={20} />
                <span>Sign In</span>
              </Link>
            )}
          </div>
          
          <div className="mt-auto pt-6">
            <Link to="/premium" className="glass-morphism rounded-xl p-4 block border border-huduma-green/10">
              <h3 className="font-medium mb-2">Upgrade to Premium</h3>
              <p className="text-sm text-foreground/70 mb-4">
                Unlock premium features and boost your Huduma experience
              </p>
            </Link>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Navbar;
