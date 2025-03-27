
import React from 'react';
import Layout from '@/components/layout/Layout';
import HeroSection from '@/components/home/HeroSection';
import FeaturedServices from '@/components/home/FeaturedServices';
import ProfessionalCard from '@/components/ui/ProfessionalCard';
import { ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useUserContext } from '@/context/UserContext';

const Index: React.FC = () => {
  const navigate = useNavigate();
  const { userMode } = useUserContext();
  const isCustomer = userMode === 'customer';
  
  // Sample professionals data
  const professionals = [
    {
      id: '1',
      name: 'John Magufuli',
      profession: 'Master Plumber',
      image: 'https://randomuser.me/api/portraits/men/32.jpg',
      rating: 4.8,
      ratingCount: 156,
      location: 'Dar es Salaam',
      verified: true,
      available: true,
    },
    {
      id: '2',
      name: 'Maria Kimaro',
      profession: 'Hair Stylist',
      image: 'https://randomuser.me/api/portraits/women/44.jpg',
      rating: 4.9,
      ratingCount: 213,
      location: 'Arusha',
      verified: true,
      available: true,
    },
    {
      id: '3',
      name: 'James Mbongo',
      profession: 'Business Consultant',
      image: 'https://randomuser.me/api/portraits/men/86.jpg',
      rating: 4.7,
      ratingCount: 89,
      location: 'Dodoma',
      verified: false,
      available: false,
    },
  ];
  
  return (
    <Layout>
      <HeroSection />
      
      <FeaturedServices className="mb-12" />
      
      {isCustomer && (
        <section className="py-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl md:text-2xl font-bold">Top Professionals</h2>
            
            <button 
              onClick={() => navigate('/professionals')}
              className="flex items-center gap-1 text-huduma-green hover:underline"
            >
              <span>View all</span>
              <ArrowRight size={16} />
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {professionals.map((professional, index) => (
              <ProfessionalCard
                key={professional.id}
                {...professional}
                className="animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              />
            ))}
          </div>
        </section>
      )}
      
      {!isCustomer && (
        <section className="py-8">
          <div className="glass-morphism p-6 rounded-2xl border border-huduma-green/10 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-huduma-light-green rounded-full opacity-20 -translate-x-1/2 -translate-y-1/2" />
            
            <div className="relative z-10">
              <h2 className="text-xl md:text-2xl font-bold mb-4">Ready to grow your business?</h2>
              <p className="text-foreground/70 mb-6 max-w-xl">
                Complete your professional profile to start receiving job requests from customers in your area.
              </p>
              
              <button
                onClick={() => navigate('/profile')}
                className="bg-huduma-green text-white px-6 py-3 rounded-xl font-medium transition-colors hover:bg-huduma-green/90"
              >
                Complete Your Profile
              </button>
            </div>
          </div>
        </section>
      )}
      
      <section className="py-12 text-center">
        <div className="max-w-xl mx-auto">
          <h2 className="text-xl md:text-2xl font-bold mb-4">Let Us Be of Your Service</h2>
          <p className="text-foreground/70 mb-6">
            Huduma connects skilled professionals with customers in Tanzania and beyond. Join our community today.
          </p>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
