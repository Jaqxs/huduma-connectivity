
import React, { useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/hooks/use-auth';
import { Loader2 } from 'lucide-react';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { user, isLoading, isInitialized, session } = useAuth();
  const location = useLocation();

  useEffect(() => {
    // Log authentication status for debugging
    console.log('ProtectedRoute - Auth Status:', { 
      isInitialized, 
      isLoading, 
      hasUser: !!user, 
      hasSession: !!session,
      path: location.pathname
    });
  }, [isInitialized, isLoading, user, session, location.pathname]);

  // Show loading state while checking authentication
  if (isLoading || !isInitialized) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-huduma-green mb-4" />
        <p className="text-foreground/70">Verifying your credentials...</p>
      </div>
    );
  }
  
  // Redirect to auth page if not authenticated
  if (!session || !user) {
    console.log('Demo auth: Not authenticated, redirecting to /auth');
    return <Navigate to="/auth" state={{ from: location.pathname }} replace />;
  }
  
  // Render children if authenticated
  console.log('Demo auth: User authenticated, rendering protected content');
  return <>{children}</>;
};
