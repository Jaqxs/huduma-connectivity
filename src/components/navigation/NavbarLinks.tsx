
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Search, Briefcase, Calendar, CreditCard, User, BadgeDollarSign, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useUserContext } from '@/context/UserContext';

interface NavLink {
  to: string;
  label: string;
  icon: React.ReactNode;
  isPremium?: boolean;
}

const NavbarLinks: React.FC = () => {
  const location = useLocation();
  const { userMode } = useUserContext();
  
  const links: NavLink[] = [
    {
      to: '/',
      label: 'Home',
      icon: <Home size={20} />,
    },
    {
      to: '/services',
      label: 'Services',
      icon: <Search size={20} />,
    },
    {
      to: '/professionals',
      label: 'Professionals',
      icon: <Briefcase size={20} />,
    },
    {
      to: '/appointments',
      label: 'Appointments',
      icon: <Calendar size={20} />,
    },
    {
      to: '/wallet',
      label: 'Wallet',
      icon: <CreditCard size={20} />,
    },
    {
      to: '/premium',
      label: 'Premium',
      icon: <Sparkles size={20} />,
      isPremium: true,
    },
    {
      to: '/profile',
      label: 'Profile',
      icon: <User size={20} />,
    },
  ];
  
  return (
    <>
      {links.map((link) => (
        <Link
          key={link.to}
          to={link.to}
          className={cn(
            'relative flex flex-col items-center gap-1 px-3 py-2 rounded-xl transition-all duration-300',
            location.pathname === link.to
              ? 'text-huduma-green bg-huduma-light-green scale-105 shadow-sm'
              : 'text-foreground/70 hover:bg-huduma-neutral hover:text-foreground hover:scale-105'
          )}
        >
          {link.isPremium && (
            <span className="absolute -top-1 -right-1 w-2 h-2 bg-huduma-yellow rounded-full animate-pulse" />
          )}
          {link.icon}
          <span className="text-xs">{link.label}</span>
        </Link>
      ))}
    </>
  );
};

export default NavbarLinks;
