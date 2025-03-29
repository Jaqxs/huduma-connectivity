
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/hooks/use-auth';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { 
  Form, 
  FormControl, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { GradientButton } from '@/components/ui/gradient-button';
import { useToast } from '@/hooks/use-toast';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Loader2, Mail, Lock, User, ArrowRight, ArrowLeft, CheckCircle, AlertCircle, Eye, EyeOff } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

// Enhanced validation schema
const authFormSchema = z.object({
  email: z.string()
    .min(1, 'Email is required')
    .email('Please enter a valid email address'),
  password: z.string()
    .min(6, 'Password must be at least 6 characters'),
  fullName: z.string()
    .min(2, 'Full name must be at least 2 characters')
    .optional()
    .or(z.literal('')),
});

type AuthFormValues = z.infer<typeof authFormSchema>;

const Auth: React.FC = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [formSuccess, setFormSuccess] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const { signIn, signUp, user, isInitialized } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();
  
  const form = useForm<AuthFormValues>({
    resolver: zodResolver(authFormSchema),
    defaultValues: {
      email: '',
      password: '',
      fullName: '',
    },
    mode: 'onChange', // Validate on change for better UX
  });
  
  // Extract return URL from location state
  const from = location.state?.from || '/';
  
  useEffect(() => {
    // Clear form messages when switching between signup and signin
    if (formError || formSuccess) {
      setFormError(null);
      setFormSuccess(null);
    }
  }, [isSignUp]);
  
  useEffect(() => {
    if (user && isInitialized) {
      console.log('User is authenticated, navigating to:', from);
      navigate(from);
    }
  }, [user, navigate, isInitialized, from]);
  
  const onSubmit = async (data: AuthFormValues) => {
    setIsLoading(true);
    setFormError(null);
    setFormSuccess(null);
    
    try {
      console.log(`Attempting to ${isSignUp ? 'sign up' : 'sign in'} with email:`, data.email);
      
      if (isSignUp) {
        const { error } = await signUp(data.email, data.password, { 
          full_name: data.fullName || undefined
        });
        
        if (error) {
          console.error('Signup error details:', error);
          
          if (error.message?.includes('already registered')) {
            setFormError('This email is already registered. Please sign in instead.');
          } else {
            setFormError(error.message || 'Failed to create account');
          }
        } else {
          setFormSuccess('Account created successfully! Please check your email for verification.');
          // Reset form after successful signup
          form.reset({
            email: data.email, // Keep the email for easier login
            password: '',
            fullName: '',
          });
          
          // Automatically switch to login mode after successful signup
          setTimeout(() => {
            setIsSignUp(false);
            setFormSuccess('Account created! You can now sign in with your credentials.');
          }, 1500);
        }
      } else {
        const { error } = await signIn(data.email, data.password);
        
        if (error) {
          console.error('Signin error details:', error);
          
          if (error.message?.includes('Invalid login credentials')) {
            setFormError('Invalid email or password. Please try again.');
          } else if (error.message?.includes('Email not confirmed')) {
            setFormError('Please verify your email address before signing in.');
          } else {
            setFormError(error.message || 'Failed to sign in');
          }
        } else {
          // Will auto-redirect due to the useEffect
          console.log('Sign in successful, waiting for redirect');
        }
      }
    } catch (error: any) {
      console.error('Authentication error:', error);
      setFormError(error.message || 'An unexpected error occurred');
      toast({
        title: 'Authentication error',
        description: error.message || 'Please try again later',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const toggleAuthMode = () => {
    setIsSignUp(!isSignUp);
    setFormError(null);
    setFormSuccess(null);
    form.reset();
  };
  
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  
  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-huduma-light-teal via-white to-huduma-light-green">
      <div className="w-full max-w-md">
        <div className="mb-6 text-center">
          <h1 className="text-3xl font-bold text-huduma-dark-neutral mb-1 font-serif">
            {isSignUp ? 'Join Huduma' : 'Welcome Back'}
          </h1>
          <p className="text-muted-foreground">
            {isSignUp 
              ? 'Create an account to access premium services' 
              : 'Sign in to continue your Huduma experience'}
          </p>
        </div>

        <Card className="w-full backdrop-blur-sm bg-white/90 border-0 shadow-lg hover:shadow-xl transition-all duration-300 animate-fade-in">
          <CardHeader className="pb-4">
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 rounded-full bg-gradient-to-r from-huduma-green to-huduma-teal flex items-center justify-center shadow-glow animate-pulse">
                <span className="text-white font-bold text-2xl">H</span>
              </div>
            </div>
          </CardHeader>
          <CardContent className="px-6 pt-0">
            {formError && (
              <Alert variant="destructive" className="mb-4 animate-fade-in">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{formError}</AlertDescription>
              </Alert>
            )}
            
            {formSuccess && (
              <Alert variant="default" className="mb-4 bg-huduma-light-green/50 text-huduma-green border-huduma-green/20 animate-fade-in">
                <CheckCircle className="h-4 w-4" />
                <AlertTitle>Success</AlertTitle>
                <AlertDescription>{formSuccess}</AlertDescription>
              </Alert>
            )}

            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                {isSignUp && (
                  <FormField
                    control={form.control}
                    name="fullName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-medium text-huduma-dark-neutral">Full Name</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                            <Input 
                              placeholder="John Doe" 
                              {...field} 
                              className="pl-10 border-huduma-neutral/20 focus-visible:ring-huduma-green focus-visible:border-huduma-green/50 transition-all" 
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}
                
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium text-huduma-dark-neutral">Email</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                          <Input 
                            type="email" 
                            placeholder="you@example.com" 
                            {...field} 
                            className="pl-10 border-huduma-neutral/20 focus-visible:ring-huduma-green focus-visible:border-huduma-green/50 transition-all" 
                            autoComplete={isSignUp ? "email" : "username"}
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium text-huduma-dark-neutral">Password</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                          <Input 
                            type={showPassword ? "text" : "password"} 
                            placeholder="••••••••" 
                            {...field} 
                            className="pl-10 pr-10 border-huduma-neutral/20 focus-visible:ring-huduma-green focus-visible:border-huduma-green/50 transition-all" 
                            autoComplete={isSignUp ? "new-password" : "current-password"}
                          />
                          <button 
                            type="button"
                            onClick={togglePasswordVisibility}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
                          >
                            {showPassword ? (
                              <EyeOff className="h-4 w-4" />
                            ) : (
                              <Eye className="h-4 w-4" />
                            )}
                          </button>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <GradientButton
                  type="submit"
                  className="w-full mt-6 py-6"
                  disabled={isLoading}
                  glow={true}
                  size="lg"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      {isSignUp ? 'Creating Account...' : 'Signing In...'}
                    </>
                  ) : (
                    <>
                      {isSignUp ? 'Create Account' : 'Sign In'}
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </>
                  )}
                </GradientButton>
              </form>
            </Form>
          </CardContent>
          <CardFooter className="flex flex-col px-6 pt-0 pb-6">
            <div className="w-full border-t border-huduma-neutral/10 my-4"></div>
            <div className="text-sm text-center">
              <span className="text-muted-foreground">
                {isSignUp ? 'Already have an account?' : "Don't have an account?"}
              </span>{' '}
              <button
                onClick={toggleAuthMode}
                className="text-huduma-green hover:underline font-medium inline-flex items-center"
                type="button"
                disabled={isLoading}
              >
                {isSignUp ? (
                  <>
                    <ArrowLeft className="mr-1 h-3 w-3" />
                    Sign In Instead
                  </>
                ) : (
                  <>
                    Create Account
                    <ArrowRight className="ml-1 h-3 w-3" />
                  </>
                )}
              </button>
            </div>
          </CardFooter>
        </Card>

        <div className="mt-8 text-center">
          <p className="text-xs text-muted-foreground">
            By continuing, you agree to Huduma's <a href="#" className="text-huduma-green hover:underline">Terms of Service</a> and <a href="#" className="text-huduma-green hover:underline">Privacy Policy</a>.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Auth;
