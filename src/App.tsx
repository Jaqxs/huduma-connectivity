
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Index from "./pages/Index";
import Services from "./pages/Services";
import ServiceDetail from "./pages/ServiceDetail";
import Professionals from "./pages/Professionals";
import ProfessionalDetail from "./pages/ProfessionalDetail";
import Appointments from "./pages/Appointments";
import Wallet from "./pages/Wallet";
import Profile from "./pages/Profile";
import Monetization from "./pages/Monetization";
import Auth from "./pages/Auth";
import NotFound from "./pages/NotFound";
import { UserProvider } from "./context/UserContext";
import { AuthProvider } from "./hooks/use-auth";
import { ProtectedRoute } from "./components/auth/ProtectedRoute";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <UserProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/services" element={<Services />} />
              <Route path="/services/:id" element={<ServiceDetail />} />
              <Route path="/professionals" element={<Professionals />} />
              <Route path="/professionals/:id" element={<ProfessionalDetail />} />
              <Route path="/auth" element={<Auth />} />
              
              {/* Protected Routes */}
              <Route path="/appointments" element={
                <ProtectedRoute>
                  <Appointments />
                </ProtectedRoute>
              } />
              <Route path="/wallet" element={
                <ProtectedRoute>
                  <Wallet />
                </ProtectedRoute>
              } />
              <Route path="/profile" element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              } />
              <Route path="/premium" element={
                <ProtectedRoute>
                  <Monetization />
                </ProtectedRoute>
              } />
              
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </UserProvider>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
