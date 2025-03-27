
import React, { createContext, useContext, useState, useEffect } from 'react';

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

  useEffect(() => {
    // Load user mode from local storage on initial render
    const savedMode = localStorage.getItem('huduma-user-mode');
    if (savedMode === 'professional' || savedMode === 'customer') {
      setUserMode(savedMode);
    }
    setIsInitialized(true);
  }, []);

  useEffect(() => {
    // Save user mode to local storage whenever it changes
    if (isInitialized) {
      localStorage.setItem('huduma-user-mode', userMode);
    }
  }, [userMode, isInitialized]);

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
