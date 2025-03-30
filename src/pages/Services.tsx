
import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { Search, Filter, Wrench, Scissors, Briefcase, Brush, Car, Heart, BookOpen, MapPin, ArrowDownUp, Hammer, Home, ChefHat, Code, Music, Camera, Plane, Laptop, Flower } from 'lucide-react';
import CategoryPill from '@/components/ui/CategoryPill';
import ServiceCard from '@/components/ui/ServiceCard';
import { allServices, serviceCategories } from '@/data/serviceData';

const Services: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [activeSort, setActiveSort] = useState('recommended');
  const [showFilters, setShowFilters] = useState(false);
  
  const categories = [
    { id: 'all', label: 'All Categories', icon: null },
    { id: 'plumbing', label: 'Plumbing', icon: <Wrench size={16} /> },
    { id: 'beauty', label: 'Beauty & Hair', icon: <Scissors size={16} /> },
    { id: 'business', label: 'Business', icon: <Briefcase size={16} /> },
    { id: 'cleaning', label: 'Cleaning', icon: <Brush size={16} /> },
    { id: 'automotive', label: 'Automotive', icon: <Car size={16} /> },
    { id: 'health', label: 'Healthcare', icon: <Heart size={16} /> },
    { id: 'education', label: 'Education', icon: <BookOpen size={16} /> },
    { id: 'home', label: 'Home Repair', icon: <Hammer size={16} /> },
    { id: 'tech', label: 'Technology', icon: <Laptop size={16} /> },
    { id: 'food', label: 'Food & Catering', icon: <ChefHat size={16} /> },
    { id: 'design', label: 'Design & Creative', icon: <Flower size={16} /> },
  ];
  
  const sortOptions = [
    { id: 'recommended', label: 'Recommended' },
    { id: 'rating', label: 'Highest Rated' },
    { id: 'price_low', label: 'Price: Low to High' },
    { id: 'price_high', label: 'Price: High to Low' },
    { id: 'newest', label: 'Newest First' },
  ];
  
  // Filter and sort services
  let filteredServices = allServices;
  
  // Filter by category
  if (activeCategory !== 'all') {
    filteredServices = filteredServices.filter(
      service => service.category.toLowerCase().replace(/[^a-z0-9]/g, '') === activeCategory
    );
  }
  
  // Filter by search
  if (searchQuery.trim()) {
    const query = searchQuery.toLowerCase();
    filteredServices = filteredServices.filter(
      service => 
        service.title.toLowerCase().includes(query) || 
        service.category.toLowerCase().includes(query) ||
        service.location.toLowerCase().includes(query)
    );
  }
  
  // Sort services
  switch (activeSort) {
    case 'rating':
      filteredServices.sort((a, b) => b.rating - a.rating);
      break;
    case 'price_low':
      filteredServices.sort((a, b) => a.price - b.price);
      break;
    case 'price_high':
      filteredServices.sort((a, b) => b.price - a.price);
      break;
    case 'newest':
      // In a real app, would sort by date added
      filteredServices.reverse();
      break;
    default:
      // 'recommended' - Default sort (could be more complex in a real app)
      break;
  }
  
  return (
    <Layout>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl md:text-3xl font-bold">Service Marketplace</h1>
      </div>
      
      <div className="mb-6">
        <div className="relative">
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-foreground/50">
            <Search size={20} />
          </div>
          <input 
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)} 
            placeholder="What service are you looking for?"
            className="w-full pl-10 pr-4 py-3 rounded-xl border border-border focus:border-huduma-green focus:ring-2 focus:ring-huduma-green/10 outline-none transition-all"
          />
        </div>
      </div>
      
      <div className="flex flex-col md:flex-row md:items-center gap-4 mb-6">
        <div className="overflow-x-auto pb-2 -mx-4 px-4 md:mx-0 md:px-0 flex-grow">
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
        
        <div className="flex items-center gap-3 flex-shrink-0">
          <button 
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-1.5 py-2 px-4 rounded-full bg-huduma-neutral text-foreground/80 hover:bg-huduma-light-green transition-colors"
          >
            <Filter size={16} />
            <span className="text-sm font-medium">Filters</span>
          </button>
          
          <div className="relative">
            <button 
              className="flex items-center gap-1.5 py-2 px-4 rounded-full bg-huduma-neutral text-foreground/80 hover:bg-huduma-light-green transition-colors"
            >
              <ArrowDownUp size={16} />
              <span className="text-sm font-medium">Sort</span>
            </button>
            
            <div className="absolute right-0 top-full mt-2 w-64 bg-white rounded-xl shadow-lg border border-border z-20 p-2">
              {sortOptions.map(option => (
                <button
                  key={option.id}
                  onClick={() => setActiveSort(option.id)}
                  className={`flex items-center w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                    activeSort === option.id 
                      ? 'bg-huduma-light-green text-huduma-green font-medium' 
                      : 'hover:bg-huduma-neutral'
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      {/* Featured services section */}
      {activeCategory === 'all' && !searchQuery && (
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Featured Services</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {allServices
              .filter(service => service.isPremium)
              .slice(0, 3)
              .map(service => (
                <ServiceCard
                  key={service.id}
                  {...service}
                  isPremium={true}
                  className="animate-fade-in"
                />
              ))}
          </div>
        </div>
      )}
      
      {showFilters && (
        <div className="mb-6 p-4 bg-white border border-border rounded-xl">
          <h3 className="font-medium mb-3">Filter Results</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Location</label>
              <select className="w-full p-2 border border-border rounded-lg">
                <option>Any Location</option>
                <option>Dar es Salaam</option>
                <option>Arusha</option>
                <option>Dodoma</option>
                <option>Mwanza</option>
                <option>Mbeya</option>
                <option>Zanzibar</option>
                <option>Online</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Price Range</label>
              <div className="flex items-center gap-2">
                <input type="number" placeholder="Min" className="w-full p-2 border border-border rounded-lg" />
                <span>-</span>
                <input type="number" placeholder="Max" className="w-full p-2 border border-border rounded-lg" />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Rating</label>
              <select className="w-full p-2 border border-border rounded-lg">
                <option>Any Rating</option>
                <option>4.5 & Above</option>
                <option>4.0 & Above</option>
                <option>3.5 & Above</option>
              </select>
            </div>
          </div>
          
          <div className="mt-4 flex justify-end gap-2">
            <button className="py-2 px-4 rounded-lg text-foreground/70 hover:bg-huduma-neutral transition-colors">
              Reset
            </button>
            <button className="py-2 px-4 rounded-lg bg-huduma-green text-white hover:bg-huduma-green/90 transition-colors">
              Apply Filters
            </button>
          </div>
        </div>
      )}
      
      {filteredServices.length > 0 ? (
        <>
          <div className="text-foreground/70 mb-4">
            Showing {filteredServices.length} services
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredServices.map((service, index) => (
              <ServiceCard
                key={service.id}
                {...service}
                className="animate-fade-in"
                style={{ animationDelay: `${index * 50}ms` }}
              />
            ))}
          </div>
        </>
      ) : (
        <div className="text-center py-12">
          <div className="mb-4 text-foreground/50">
            <Search size={48} className="mx-auto" />
          </div>
          <h3 className="text-xl font-medium mb-2">No services found</h3>
          <p className="text-foreground/70 mb-6">
            Try adjusting your search or filter criteria
          </p>
          <button 
            onClick={() => {
              setSearchQuery('');
              setActiveCategory('all');
            }}
            className="py-2 px-4 bg-huduma-green text-white rounded-lg hover:bg-huduma-green/90 transition-colors"
          >
            Reset Filters
          </button>
        </div>
      )}
    </Layout>
  );
};

export default Services;
