
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Wrench, Scissors, Briefcase, Brush, Car, Heart, BookOpen } from 'lucide-react';
import CategoryPill from '@/components/ui/CategoryPill';
import ServiceCard from '@/components/ui/ServiceCard';
import { cn } from '@/lib/utils';
import { useUserContext } from '@/context/UserContext';
import { allServices } from '@/data/serviceData';

interface FeaturedServicesProps {
  className?: string;
}

const FeaturedServices: React.FC<FeaturedServicesProps> = ({ className }) => {
  const navigate = useNavigate();
  const { userMode } = useUserContext();
  const [activeCategory, setActiveCategory] = useState('all');
  
  const categories = [
    { id: 'all', label: 'All Categories', icon: null },
    { id: 'plumbing', label: 'Plumbing', icon: <Wrench size={16} /> },
    { id: 'beauty', label: 'Beauty & Hair', icon: <Scissors size={16} /> },
    { id: 'business', label: 'Business', icon: <Briefcase size={16} /> },
    { id: 'cleaning', label: 'Cleaning', icon: <Brush size={16} /> },
    { id: 'automotive', label: 'Automotive', icon: <Car size={16} /> },
    { id: 'health', label: 'Healthcare', icon: <Heart size={16} /> },
    { id: 'education', label: 'Education', icon: <BookOpen size={16} /> },
  ];
  
  // Filter services based on active category
  const filteredServices = activeCategory === 'all' 
    ? allServices.slice(0, 6) // Only show first 6 services on home page
    : allServices.filter(
        service => service.category.toLowerCase().replace(/[^a-z0-9]/g, '') === activeCategory
      ).slice(0, 6);
  
  return (
    <section className={cn("py-8", className)}>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl md:text-2xl font-bold">
          {userMode === 'customer' ? 'Popular Services' : 'Popular Job Requests'}
        </h2>
        
        <button 
          onClick={() => navigate('/services')}
          className="flex items-center gap-1 text-huduma-green hover:underline"
        >
          <span>View all</span>
          <ArrowRight size={16} />
        </button>
      </div>
      
      <div className="mb-6 overflow-x-auto pb-2 -mx-4 px-4">
        <div className="flex items-center gap-2">
          {categories.map(category => (
            <CategoryPill
              key={category.id}
              label={category.label}
              icon={category.icon}
              isActive={activeCategory === category.id}
              onClick={() => setActiveCategory(category.id)}
            />
          ))}
        </div>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredServices.map((service, index) => (
          <ServiceCard
            key={service.id}
            {...service}
            className="animate-fade-in"
            style={{ animationDelay: `${index * 100}ms` }}
          />
        ))}
      </div>
    </section>
  );
};

export default FeaturedServices;
