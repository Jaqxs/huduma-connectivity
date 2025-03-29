
import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { Search, Filter, Wrench, Scissors, Briefcase, Brush, Car, Heart, BookOpen, MapPin, ArrowDownUp, Hammer, Home, ChefHat, Code, Music, Camera, Plane, Laptop, Flower } from 'lucide-react';
import CategoryPill from '@/components/ui/CategoryPill';
import ServiceCard from '@/components/ui/ServiceCard';

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
  
  // Extended sample services data with more diverse service types
  const allServices = [
    // Original services
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
    {
      id: '7',
      title: 'Basic Health Checkup',
      category: 'Healthcare',
      image: 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?ixid=M3wxMjA3fDB8MXxzZWFyY2h8NXx8aGVhbHRoY2FyZXxlbnwwfHx8fDE2OTA0MDEyNjN8MA&ixlib=rb-4.0.3&w=600&q=80',
      rating: 4.9,
      ratingCount: 67,
      price: 50000,
      location: 'Dar es Salaam',
      estimatedTime: '30 mins',
    },
    {
      id: '8',
      title: 'Commercial Cleaning Services',
      category: 'Cleaning',
      image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?ixid=M3wxMjA3fDB8MXxzZWFyY2h8MTF8fGNsZWFuaW5nfGVufDB8fHx8MTY5MDQwMTMyMXww&ixlib=rb-4.0.3&w=600&q=80',
      rating: 4.7,
      ratingCount: 103,
      price: 120000,
      location: 'Arusha',
      estimatedTime: '4-6 hours',
    },
    {
      id: '9',
      title: 'Car Wash and Detailing',
      category: 'Automotive',
      image: 'https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?ixid=M3wxMjA3fDB8MXxzZWFyY2h8MTB8fGNhciUyMHdhc2h8ZW58MHx8fHwxNjkwNDAxMzc4fDA&ixlib=rb-4.0.3&w=600&q=80',
      rating: 4.6,
      ratingCount: 94,
      price: 25000,
      location: 'Dodoma',
      estimatedTime: '1-2 hours',
    },
    
    // New services with more variety
    {
      id: '10',
      title: 'Website Development & Design',
      category: 'Technology',
      image: 'https://images.unsplash.com/photo-1547658719-da2b51169166?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8d2ViJTIwZGVzaWdufGVufDB8fDB8fHww&auto=format&fit=crop&w=600&q=80',
      rating: 4.9,
      ratingCount: 124,
      price: 350000,
      location: 'Dar es Salaam',
      estimatedTime: '2-3 weeks',
      isPremium: true,
    },
    {
      id: '11',
      title: 'Professional Photography Services',
      category: 'Design & Creative',
      image: 'https://images.unsplash.com/photo-1542038784456-1ea8e935640e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cGhvdG9ncmFwaHl8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=600&q=80',
      rating: 4.7,
      ratingCount: 86,
      price: 180000,
      location: 'Zanzibar',
      estimatedTime: '2-4 hours',
    },
    {
      id: '12',
      title: 'Home Renovation & Remodeling',
      category: 'Home Repair',
      image: 'https://images.unsplash.com/photo-1581477397801-aff66f155b1e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fGhvbWUlMjByZW5vdmF0aW9ufGVufDB8fDB8fHww&auto=format&fit=crop&w=600&q=80',
      rating: 4.8,
      ratingCount: 142,
      price: 500000,
      location: 'Mwanza',
      estimatedTime: '1-2 weeks',
      isPremium: true,
    },
    {
      id: '13',
      title: 'Mobile App Development',
      category: 'Technology',
      image: 'https://images.unsplash.com/photo-1556075798-4825dfaaf498?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8YXBwfGVufDB8fDB8fHww&auto=format&fit=crop&w=600&q=80',
      rating: 4.9,
      ratingCount: 76,
      price: 450000,
      location: 'Dar es Salaam',
      estimatedTime: '4-8 weeks',
    },
    {
      id: '14',
      title: 'Catering Services for Events',
      category: 'Food & Catering',
      image: 'https://images.unsplash.com/photo-1555244162-803834f70033?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Y2F0ZXJpbmd8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=600&q=80',
      rating: 4.6,
      ratingCount: 112,
      price: 250000,
      location: 'Arusha',
      estimatedTime: 'Varies by event',
    },
    {
      id: '15',
      title: 'Interior Design Consultation',
      category: 'Design & Creative',
      image: 'https://images.unsplash.com/photo-1558442074-3c19857bc1dc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8aW50ZXJpb3IlMjBkZXNpZ258ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=600&q=80',
      rating: 4.7,
      ratingCount: 95,
      price: 200000,
      location: 'Dodoma',
      estimatedTime: '3-5 hours',
      isPremium: true,
    },
    {
      id: '16',
      title: 'Corporate Event Planning',
      category: 'Business',
      image: 'https://images.unsplash.com/photo-1511578314322-379afb476865?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8ZXZlbnQlMjBwbGFubmluZ3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=600&q=80',
      rating: 4.8,
      ratingCount: 67,
      price: 350000,
      location: 'Dar es Salaam',
      estimatedTime: 'Varies by event',
    },
    {
      id: '17',
      title: 'Language Tutoring (English, French)',
      category: 'Education',
      image: 'https://images.unsplash.com/photo-1498354178607-a79df2916198?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fGxhbmd1YWdlfGVufDB8fDB8fHww&auto=format&fit=crop&w=600&q=80',
      rating: 4.9,
      ratingCount: 53,
      price: 25000,
      location: 'Online',
      estimatedTime: '1 hour',
    },
    {
      id: '18',
      title: 'Residential Electrical Services',
      category: 'Home Repair',
      image: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8ZWxlY3RyaWNhbHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=600&q=80',
      rating: 4.7,
      ratingCount: 128,
      price: 65000,
      location: 'Mbeya',
      estimatedTime: '1-4 hours',
    },
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
