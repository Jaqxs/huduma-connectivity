
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Wrench, Scissors, Briefcase, Brush, Car, Heart, BookOpen } from 'lucide-react';
import CategoryPill from '@/components/ui/CategoryPill';
import ServiceCard from '@/components/ui/ServiceCard';
import { cn } from '@/lib/utils';
import { useUserContext } from '@/context/UserContext';

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
  
  // Sample services data
  const services = [
    {
      id: '1',
      title: 'Home Plumbing Services & Repairs',
      category: 'Plumbing',
      image: 'https://images.unsplash.com/photo-1607472586893-edb57bdc0e39?ixid=M3wxMjA3fDB8MXxzZWFyY2h8MTB8fHBsdW1iaW5nfGVufDB8fHx8MTY5MDQwMDcwMnww&ixlib=rb-4.0.3&w=600&q=80',
      rating: 4.8,
      ratingCount: 156,
      price: 35000,
      location: 'Dar es Salaam',
      estimatedTime: '1-2 hours',
    },
    {
      id: '2',
      title: 'Professional Haircut & Styling',
      category: 'Beauty & Hair',
      image: 'https://images.unsplash.com/photo-1562322140-8baeececf3df?ixid=M3wxMjA3fDB8MXxzZWFyY2h8M3x8aGFpcmN1dHxlbnwwfHx8fDE2OTA0MDA3NzR8MA&ixlib=rb-4.0.3&w=600&q=80',
      rating: 4.9,
      ratingCount: 213,
      price: 25000,
      location: 'Arusha',
      estimatedTime: '45 mins',
    },
    {
      id: '3',
      title: 'Business Plan Development',
      category: 'Business',
      image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?ixid=M3wxMjA3fDB8MXxzZWFyY2h8MTl8fGJ1c2luZXNzJTIwcGxhbnxlbnwwfHx8fDE2OTA0MDA4NTZ8MA&ixlib=rb-4.0.3&w=600&q=80',
      rating: 4.7,
      ratingCount: 89,
      price: 150000,
      location: 'Dodoma',
      estimatedTime: '3-5 days',
    },
    {
      id: '4',
      title: 'Deep Home Cleaning Service',
      category: 'Cleaning',
      image: 'https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?ixid=M3wxMjA3fDB8MXxzZWFyY2h8Nnx8Y2xlYW5pbmd8ZW58MHx8fHwxNjkwNDAwOTE2fDA&ixlib=rb-4.0.3&w=600&q=80',
      rating: 4.6,
      ratingCount: 132,
      price: 45000,
      location: 'Mwanza',
      estimatedTime: '3-4 hours',
    },
    {
      id: '5',
      title: 'Car Maintenance & Repair',
      category: 'Automotive',
      image: 'https://images.unsplash.com/photo-1599038064230-17400f8f268f?ixid=M3wxMjA3fDB8MXxzZWFyY2h8MTB8fGNhciUyMG1lY2hhbmljfGVufDB8fHx8MTY5MDQwMDk3MHww&ixlib=rb-4.0.3&w=600&q=80',
      rating: 4.5,
      ratingCount: 78,
      price: 80000,
      location: 'Dar es Salaam',
      estimatedTime: '1-3 hours',
    },
    {
      id: '6',
      title: 'Private Math Tutoring',
      category: 'Education',
      image: 'https://images.unsplash.com/photo-1613312328068-c9b6c0444507?ixid=M3wxMjA3fDB8MXxzZWFyY2h8Mnx8dHV0b3Jpbmd8ZW58MHx8fHwxNjkwNDAxMDI5fDA&ixlib=rb-4.0.3&w=600&q=80',
      rating: 5.0,
      ratingCount: 42,
      price: 30000,
      location: 'Mbeya',
      estimatedTime: '1 hour',
    },
  ];
  
  // Filter services based on active category
  const filteredServices = activeCategory === 'all' 
    ? services 
    : services.filter(service => service.category.toLowerCase().replace(/[^a-z0-9]/g, '') === activeCategory);
  
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
