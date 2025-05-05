
import { useState, useEffect, createContext, useContext } from 'react';
import { useToast } from '@/hooks/use-toast';

// Demo user types
interface UserProfile {
  id: string;
  full_name: string | null;
  avatar_url: string | null;
  phone: string | null;
  location: string | null;
  bio: string | null;
  profession: string | null;
  role: 'customer' | 'professional' | 'admin';
  is_verified: boolean;
}

interface Subscription {
  id: string;
  plan: 'free' | 'premium' | 'pro';
  is_active: boolean;
  expires_at: string | null;
}

// Demo user - normally this would come from Supabase
const DEMO_USER = {
  id: 'demo-user-123',
  email: 'demo@example.com',
  userMetadata: {
    full_name: 'Demo User'
  }
};

const DEMO_PROFILE: UserProfile = {
  id: 'demo-user-123',
  full_name: 'Demo User',
  avatar_url: null,
  phone: '+255 712 345 678',
  location: 'Dar es Salaam, Tanzania',
  bio: 'This is a demo user profile for testing purposes',
  profession: 'Developer',
  role: 'customer',
  is_verified: true
};

const DEMO_SUBSCRIPTION: Subscription = {
  id: 'demo-sub-123',
  plan: 'free',
  is_active: true,
  expires_at: null
};

interface AuthContextType {
  user: typeof DEMO_USER | null;
  profile: UserProfile | null;
  subscription: Subscription | null;
  session: { user: typeof DEMO_USER } | null;
  isLoading: boolean;
  isInitialized: boolean;
  signUp: (email: string, password: string, metadata?: { full_name?: string }) => Promise<{ error: any, isNewUser?: boolean }>;
  signIn: (email: string, password: string) => Promise<{ error: any }>;
  signOut: () => Promise<void>;
  refreshProfile: () => Promise<void>;
  updateProfile: (updates: Partial<UserProfile>, showNotification?: boolean) => Promise<{ error: any }>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Demo credentials
const DEMO_CREDENTIALS = {
  email: 'demo@example.com',
  password: 'password123'
};

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<typeof DEMO_USER | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [subscription, setSubscription] = useState<Subscription | null>(null);
  const [session, setSession] = useState<{ user: typeof DEMO_USER } | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isInitialized, setIsInitialized] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    // Initialize with the demo user session from localStorage if available
    const initAuth = async () => {
      try {
        const storedSession = localStorage.getItem('demoSession');
        
        if (storedSession) {
          // User is already logged in
          setUser(DEMO_USER);
          setProfile(DEMO_PROFILE);
          setSubscription(DEMO_SUBSCRIPTION);
          setSession({ user: DEMO_USER });
          console.log('Demo session restored from localStorage');
        }
      } catch (error) {
        console.error('Error initializing auth:', error);
      } finally {
        // Always set these to true to indicate we've finished checking
        setIsLoading(false);
        setIsInitialized(true);
      }
    };
    
    initAuth();
  }, []);

  const signUp = async (email: string, password: string, metadata?: { full_name?: string }) => {
    try {
      setIsLoading(true);
      console.log('Demo signup with:', { email, metadata });
      
      // In demo mode, we'll always succeed but with a delay to simulate network
      await new Promise(resolve => setTimeout(resolve, 800));
      
      toast({
        title: "Account created successfully",
        description: "Please sign in with your demo credentials",
      });
      
      return { error: null, isNewUser: true };
    } catch (error: any) {
      console.error('Error in demo signUp:', error);
      return { error };
    } finally {
      setIsLoading(false);
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      setIsLoading(true);
      
      if (!email || !password) {
        return { error: { message: "Email and password are required" } };
      }
      
      // Check against demo credentials
      if (email === DEMO_CREDENTIALS.email && password === DEMO_CREDENTIALS.password) {
        console.log('Demo sign-in successful');
        
        // Set up the demo session
        localStorage.setItem('demoSession', 'true');
        setUser(DEMO_USER);
        setProfile(DEMO_PROFILE);
        setSubscription(DEMO_SUBSCRIPTION);
        setSession({ user: DEMO_USER });
        
        // Show success toast
        toast({
          title: "Signed in successfully",
          description: "Welcome to the demo!",
        });
        
        return { error: null };
      } else {
        console.log('Demo sign-in failed: invalid credentials');
        toast({
          title: "Sign in failed",
          description: "Invalid credentials. Try demo@example.com / password123",
          variant: "destructive",
        });
        return { error: { message: "Invalid login credentials" } };
      }
    } catch (error: any) {
      console.error('Error in demo signIn:', error);
      toast({
        title: "Sign in failed",
        description: error.message || "An unexpected error occurred",
        variant: "destructive",
      });
      return { error };
    } finally {
      setIsLoading(false);
    }
  };

  const signOut = async () => {
    try {
      setIsLoading(true);
      console.log('Demo sign-out');
      
      // Clear the demo session
      localStorage.removeItem('demoSession');
      setUser(null);
      setProfile(null);
      setSubscription(null);
      setSession(null);
      
      toast({
        title: "Signed out successfully",
      });
    } catch (error: any) {
      console.error('Error in demo signOut:', error);
      toast({
        title: "Error signing out",
        description: "Please try again",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const refreshProfile = async () => {
    if (user) {
      // In demo mode, we just return the existing profile
      console.log('Refreshing demo profile');
    }
  };

  const updateProfile = async (updates: Partial<UserProfile>, showNotification = true) => {
    try {
      if (!user) throw new Error('User not authenticated');
      
      console.log('Demo profile update:', updates);
      
      // Update the demo profile in memory
      setProfile(prevProfile => ({
        ...prevProfile!,
        ...updates
      }));
      
      // Show a success notification if requested
      if (showNotification) {
        toast({
          title: "Profile updated successfully",
          description: "Your profile has been updated.",
        });
      }
      
      return { error: null };
    } catch (error) {
      console.error('Error updating demo profile:', error);
      
      if (showNotification) {
        toast({
          title: "Error updating profile",
          description: error instanceof Error ? error.message : "Please try again",
          variant: "destructive",
        });
      }
      
      return { error };
    }
  };

  const value = {
    user,
    profile,
    subscription,
    session,
    isLoading,
    isInitialized,
    signUp,
    signIn,
    signOut,
    refreshProfile,
    updateProfile,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
