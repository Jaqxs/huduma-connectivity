
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from '@/hooks/use-auth';

type UserMode = 'customer' | 'professional';

interface UserContextType {
  userMode: UserMode;
  setUserMode: (mode: UserMode) => void;
  toggleUserMode: () => void;
  isInitialized: boolean;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [userMode, setUserMode] = useState<UserMode>('customer');
  const [isInitialized, setIsInitialized] = useState(false);
  const { profile, updateProfile } = useAuth();

  useEffect(() => {
    // Load user mode from local storage on initial render
    const savedMode = localStorage.getItem('huduma-user-mode');
    if (savedMode === 'professional' || savedMode === 'customer') {
      setUserMode(savedMode);
    }
    
    // If the user has a profile and a specific role, use that
    if (profile && (profile.role === 'professional' || profile.role === 'customer')) {
      setUserMode(profile.role);
    }
    
    setIsInitialized(true);
  }, [profile]);

  useEffect(() => {
    // Save user mode to local storage whenever it changes
    if (isInitialized) {
      localStorage.setItem('huduma-user-mode', userMode);
      
      // If user is authenticated, update their profile with the new role
      if (profile) {
        updateProfile({ role: userMode });
      }
    }
  }, [userMode, isInitialized, profile, updateProfile]);

  const toggleUserMode = () => {
    setUserMode(prevMode => prevMode === 'customer' ? 'professional' : 'customer');
  };

  return (
    <UserContext.Provider value={{ userMode, setUserMode, toggleUserMode, isInitialized }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = (): UserContextType => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUserContext must be used within a UserProvider');
  }
  return context;
};
