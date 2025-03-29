
import React, { useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/hooks/use-auth';
import { Loader2 } from 'lucide-react';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { user, isLoading, isInitialized } = useAuth();
  const location = useLocation();

  // Show loading state while checking authentication
  if (isLoading || !isInitialized) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-huduma-green mb-4" />
        <p className="text-foreground/70">Loading...</p>
      </div>
    );
  }
  
  // Redirect to auth page if not authenticated
  if (!user) {
    return <Navigate to="/auth" state={{ from: location.pathname }} replace />;
  }
  
  // Render children if authenticated
  return <>{children}</>;
};
