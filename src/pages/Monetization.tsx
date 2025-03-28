
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import { CheckCircle, BadgeDollarSign, CreditCard, Shield, Loader2 } from 'lucide-react';
import { useUserContext } from '@/context/UserContext';
import { useMonetization } from '@/hooks/use-monetization';
import { cn } from '@/lib/utils';
import { useAuth } from '@/hooks/use-auth';
import { useToast } from '@/components/ui/use-toast';

const Monetization: React.FC = () => {
  const { userMode } = useUserContext();
  const { 
    isProcessing, 
    subscriptionPlans, 
    oneTimePurchases, 
    subscribeToPlan, 
    makePurchase 
  } = useMonetization();
  const { user, profile, subscription, refreshProfile } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const { toast } = useToast();
  
  useEffect(() => {
    // Redirect to auth if user is not logged in
    if (!user && !isLoading) {
      toast({
        title: "Authentication required",
        description: "Please sign in to access premium features",
      });
      navigate('/auth');
    }
  }, [user, isLoading, navigate, toast]);
  
  useEffect(() => {
    // Set loading to false once profile and subscription data is loaded
    if (profile !== undefined) {
      setIsLoading(false);
    }
  }, [profile, subscription]);
  
  const getCurrentPlan = () => {
    return subscription?.plan || 'free';
  };
  
  const handleSubscribe = async (planId: string) => {
    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please sign in to subscribe to a plan",
      });
      navigate('/auth');
      return;
    }
    
    const result = await subscribeToPlan(planId);
    if (result) {
      // Refresh profile to get updated subscription data
      await refreshProfile();
    }
  };
  
  const handlePurchase = async (itemId: string) => {
    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please sign in to make a purchase",
      });
      navigate('/auth');
      return;
    }
    
    await makePurchase(itemId);
  };
  
  if (isLoading) {
    return (
      <Layout>
        <div className="flex flex-col items-center justify-center min-h-[50vh]">
          <Loader2 className="h-8 w-8 animate-spin text-huduma-green mb-4" />
          <p className="text-foreground/70">Loading subscription data...</p>
        </div>
      </Layout>
    );
  }
  
  return (
    <Layout>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl md:text-3xl font-bold">Huduma Premium</h1>
      </div>
      
      <div className="mb-8">
        <p className="text-foreground/70 max-w-3xl">
          Enhance your Huduma experience with premium features designed to boost your 
          {userMode === 'professional' ? ' business and increase your earnings.' : ' service experience and save you time.'}
        </p>
      </div>
      
      {/* Current Subscription */}
      <div className="mb-8 p-4 bg-huduma-light-green/20 rounded-xl border border-huduma-green/20">
        <div className="flex items-center gap-4">
          <div className="bg-white p-3 rounded-full">
            <BadgeDollarSign size={24} className="text-huduma-green" />
          </div>
          <div>
            <h3 className="text-lg font-semibold">Current Plan: <span className="capitalize">{getCurrentPlan()}</span></h3>
            <p className="text-sm text-foreground/70">
              {getCurrentPlan() === 'free' 
                ? 'Upgrade to unlock premium features and benefits' 
                : `Your ${getCurrentPlan()} subscription is active`}
            </p>
          </div>
        </div>
      </div>
      
      {/* Subscription Plans */}
      <h2 className="text-xl font-bold mb-4">Subscription Plans</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        {subscriptionPlans.map((plan, index) => (
          <Card 
            key={plan.id}
            className={cn(
              "border-border hover:border-huduma-green hover:shadow-md transition-all",
              plan.name === 'premium' && "border-huduma-green shadow-md relative",
              plan.name === getCurrentPlan() && "bg-huduma-neutral border-huduma-green"
            )}
          >
            {plan.name === 'premium' && (
              <div className="absolute top-0 right-0 bg-huduma-green text-white py-1 px-3 rounded-bl-lg rounded-tr-lg text-xs font-medium">
                POPULAR
              </div>
            )}
            {plan.name === getCurrentPlan() && (
              <div className="absolute top-3 right-3">
                <div className="bg-huduma-green text-white p-1 rounded-full">
                  <CheckCircle size={16} />
                </div>
              </div>
            )}
            <CardHeader className="pb-2">
              <h3 className="text-lg font-bold capitalize">{plan.name}</h3>
              <p className="text-2xl font-bold">
                {plan.price === 0 ? 'Free' : `${plan.price.toLocaleString()} `}
                {plan.price > 0 && <span className="text-sm font-normal">TZS/month</span>}
              </p>
              <p className="text-sm text-foreground/70">
                {index === 0 ? 'Core features' : index === 1 ? 'Enhanced experience' : 'Full professional suite'}
              </p>
            </CardHeader>
            <CardContent className="space-y-2">
              {plan.features.map((feature, i) => (
                <div key={i} className="flex items-start gap-2">
                  <CheckCircle size={18} className="text-huduma-green mt-0.5 flex-shrink-0" />
                  <span>{feature}</span>
                </div>
              ))}
            </CardContent>
            <CardFooter>
              <button 
                onClick={() => handleSubscribe(plan.id)}
                disabled={plan.name === getCurrentPlan() || isProcessing}
                className={cn(
                  "w-full py-2 rounded-lg font-medium",
                  plan.name === getCurrentPlan() 
                    ? "bg-huduma-neutral text-foreground cursor-not-allowed" 
                    : plan.name === 'premium'
                      ? "bg-huduma-green text-white hover:bg-huduma-green/90"
                      : plan.name === 'free'
                        ? "bg-foreground/10 text-foreground hover:bg-foreground/20"
                        : "bg-huduma-light-green text-huduma-green hover:bg-huduma-green hover:text-white",
                  "transition-colors",
                  isProcessing && "opacity-70 cursor-not-allowed"
                )}
              >
                {plan.name === getCurrentPlan() 
                  ? 'Current Plan' 
                  : isProcessing 
                    ? 'Processing...' 
                    : 'Subscribe Now'}
              </button>
            </CardFooter>
          </Card>
        ))}
      </div>
      
      {/* One-time Purchases */}
      <h2 className="text-xl font-bold mb-4">Service Boosts</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {oneTimePurchases.map(item => (
          <Card key={item.id} className="border-border hover:border-huduma-green hover:shadow-md transition-all">
            <CardHeader className="pb-2">
              <div className="flex items-center gap-2 mb-2">
                {item.id === 'featured_listing' ? (
                  <BadgeDollarSign size={20} className="text-huduma-green" />
                ) : item.id === 'instant_withdrawal' ? (
                  <CreditCard size={20} className="text-huduma-green" />
                ) : (
                  <Shield size={20} className="text-huduma-green" />
                )}
                <h3 className="text-lg font-bold">{item.name}</h3>
              </div>
              <p className="text-xl font-bold">{item.price.toLocaleString()} <span className="text-sm font-normal">TZS</span></p>
              <p className="text-sm text-foreground/70">
                {item.id === 'featured_listing' 
                  ? '7-day promotion' 
                  : item.id === 'instant_withdrawal'
                    ? 'Per transaction'
                    : 'One-time verification'
                }
              </p>
            </CardHeader>
            <CardContent>
              <p className="text-sm">{item.description}</p>
            </CardContent>
            <CardFooter>
              <button 
                onClick={() => handlePurchase(item.id)}
                disabled={isProcessing}
                className={cn(
                  "w-full py-2 bg-huduma-light-green text-huduma-green rounded-lg font-medium hover:bg-huduma-green hover:text-white transition-colors",
                  isProcessing && "opacity-70 cursor-not-allowed"
                )}
              >
                {isProcessing ? 'Processing...' : 'Purchase'}
              </button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </Layout>
  );
};

export default Monetization;
