
import { useState, useEffect, createContext, useContext } from 'react';
import { 
  User, 
  Session, 
  AuthChangeEvent 
} from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

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

interface AuthContextType {
  user: User | null;
  profile: UserProfile | null;
  subscription: Subscription | null;
  session: Session | null;
  isLoading: boolean;
  isInitialized: boolean;
  signUp: (email: string, password: string, metadata?: { full_name?: string }) => Promise<{ error: any }>;
  signIn: (email: string, password: string) => Promise<{ error: any }>;
  signOut: () => Promise<void>;
  refreshProfile: () => Promise<void>;
  updateProfile: (updates: Partial<UserProfile>) => Promise<{ error: any }>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [subscription, setSubscription] = useState<Subscription | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isInitialized, setIsInitialized] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    let mounted = true;
    
    // Set up auth state listener FIRST to avoid missing auth events
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event: AuthChangeEvent, currentSession: Session | null) => {
        console.log('Auth state changed:', event);
        
        if (!mounted) return;
        
        setSession(currentSession);
        setUser(currentSession?.user ?? null);
        
        if (currentSession?.user) {
          // Use setTimeout to avoid potential deadlocks with Supabase auth
          setTimeout(() => {
            if (mounted) {
              fetchUserProfile(currentSession.user.id);
              fetchUserSubscription(currentSession.user.id);
            }
          }, 0);
        } else {
          setProfile(null);
          setSubscription(null);
        }
      }
    );
    
    // THEN check for existing session
    const initializeAuth = async () => {
      try {
        const { data: { session: currentSession }, error } = await supabase.auth.getSession();
        
        if (error) {
          console.error('Error getting session:', error);
          throw error;
        }
        
        if (!mounted) return;
        
        console.log('Initial session check:', currentSession ? 'Session found' : 'No session');
        setSession(currentSession);
        setUser(currentSession?.user ?? null);
        
        if (currentSession?.user) {
          await fetchUserProfile(currentSession.user.id);
          await fetchUserSubscription(currentSession.user.id);
        }
      } catch (error) {
        console.error('Error initializing auth:', error);
      } finally {
        if (mounted) {
          setIsLoading(false);
          setIsInitialized(true);
        }
      }
    };
    
    initializeAuth();
    
    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);

  const fetchUserProfile = async (userId: string) => {
    try {
      console.log('Fetching user profile for:', userId);
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .maybeSingle();
      
      if (error) {
        console.error('Error fetching profile:', error);
        throw error;
      }
      
      if (data) {
        console.log('Profile found:', data);
        setProfile(data as UserProfile);
      } else {
        console.log('No profile found for user', userId);
        // Create basic profile if none exists
        const { error: createError } = await supabase
          .from('profiles')
          .insert([{ 
            id: userId,
            role: 'customer',
            is_verified: false
          }]);
          
        if (createError) {
          console.error('Error creating profile:', createError);
          throw createError;
        }
        
        // Fetch the newly created profile
        const { data: newProfile, error: fetchError } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', userId)
          .maybeSingle();
        
        if (fetchError) {
          console.error('Error fetching new profile:', fetchError);
          throw fetchError;
        }
          
        console.log('New profile created:', newProfile);
        setProfile(newProfile as UserProfile);
      }
    } catch (error) {
      console.error('Error in fetchUserProfile:', error);
    }
  };

  const fetchUserSubscription = async (userId: string) => {
    try {
      console.log('Fetching subscription for user:', userId);
      const { data, error } = await supabase
        .from('subscriptions')
        .select('*')
        .eq('user_id', userId)
        .eq('is_active', true)
        .order('created_at', { ascending: false })
        .limit(1)
        .maybeSingle();
      
      if (error && error.code !== 'PGRST116') { // Ignore "No rows returned" error
        console.error('Error fetching subscription:', error);
        throw error;
      }
      
      if (!data) {
        console.log('No subscription found, creating default free subscription');
        // Create a default free subscription if none exists
        const { data: newSub, error: createError } = await supabase
          .from('subscriptions')
          .insert([{ 
            user_id: userId,
            plan: 'free',
            is_active: true
          }])
          .select()
          .single();
          
        if (createError) {
          console.error('Error creating subscription:', createError);
          throw createError;
        }
        
        console.log('New subscription created:', newSub);
        setSubscription(newSub as Subscription);
      } else {
        console.log('Subscription found:', data);
        setSubscription(data as Subscription);
      }
    } catch (error) {
      console.error('Error in fetchUserSubscription:', error);
      setSubscription(null);
    }
  };

  const signUp = async (email: string, password: string, metadata?: { full_name?: string }) => {
    try {
      setIsLoading(true);
      console.log('Signing up user with email:', email);
      
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: metadata,
          emailRedirectTo: `${window.location.origin}/auth`
        }
      });
      
      if (error) {
        console.error('Signup error:', error);
        toast({
          title: "Sign up failed",
          description: error.message,
          variant: "destructive",
        });
        return { error };
      }
      
      console.log('Signup successful:', data);
      toast({
        title: "Account created successfully",
        description: "Please check your email for verification.",
      });
      
      return { error: null };
    } catch (error: any) {
      console.error('Error in signUp function:', error);
      toast({
        title: "Sign up failed",
        description: error.message || "An unexpected error occurred",
        variant: "destructive",
      });
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
      
      console.log('Signing in user with email:', email);
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });
      
      if (error) {
        console.error('Sign in error:', error);
        toast({
          title: "Sign in failed",
          description: error.message,
          variant: "destructive",
        });
        return { error };
      }
      
      console.log('Successfully signed in:', data?.user?.id);
      
      toast({
        title: "Signed in successfully",
        description: "Welcome back!",
      });
      
      return { error: null };
    } catch (error: any) {
      console.error('Error in signIn function:', error);
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
      console.log('Signing out user');
      const { error } = await supabase.auth.signOut();
      
      if (error) {
        console.error('Sign out error:', error);
        throw error;
      }
      
      toast({
        title: "Signed out successfully",
      });
    } catch (error: any) {
      console.error('Error signing out:', error);
      toast({
        title: "Error signing out",
        description: error.message || "Please try again",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const refreshProfile = async () => {
    if (user) {
      await fetchUserProfile(user.id);
      await fetchUserSubscription(user.id);
    }
  };

  const updateProfile = async (updates: Partial<UserProfile>) => {
    try {
      if (!user) throw new Error('User not authenticated');
      
      const { error } = await supabase
        .from('profiles')
        .update(updates)
        .eq('id', user.id);
      
      if (error) throw error;
      
      await refreshProfile();
      
      toast({
        title: "Profile updated successfully",
      });
      
      return { error: null };
    } catch (error) {
      console.error('Error updating profile:', error);
      toast({
        title: "Error updating profile",
        description: error instanceof Error ? error.message : "Please try again",
        variant: "destructive",
      });
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
