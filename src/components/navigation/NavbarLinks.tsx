
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Search, Briefcase, Calendar, CreditCard, User, BadgeDollarSign } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useUserContext } from '@/context/UserContext';

interface NavLink {
  to: string;
  label: string;
  icon: React.ReactNode;
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
      icon: <BadgeDollarSign size={20} />,
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
            'flex flex-col items-center gap-1 px-3 py-2 rounded-xl transition-colors',
            location.pathname === link.to
              ? 'text-huduma-green bg-huduma-light-green'
              : 'text-foreground/70 hover:bg-huduma-neutral hover:text-foreground'
          )}
        >
          {link.icon}
          <span className="text-xs">{link.label}</span>
        </Link>
      ))}
    </>
  );
};

export default NavbarLinks;
