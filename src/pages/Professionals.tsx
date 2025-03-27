
import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { Search, Filter, ArrowDownUp, MapPin } from 'lucide-react';
import ProfessionalCard from '@/components/ui/ProfessionalCard';

const Professionals: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  
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
    {
      id: '4',
      name: 'Sarah Lweno',
      profession: 'Home Cleaner',
      image: 'https://randomuser.me/api/portraits/women/67.jpg',
      rating: 4.6,
      ratingCount: 132,
      location: 'Mwanza',
      verified: true,
      available: true,
    },
    {
      id: '5',
      name: 'Emmanuel Mtui',
      profession: 'Car Mechanic',
      image: 'https://randomuser.me/api/portraits/men/55.jpg',
      rating: 4.5,
      ratingCount: 78,
      location: 'Dar es Salaam',
      verified: true,
      available: true,
    },
    {
      id: '6',
      name: 'Patricia Mushi',
      profession: 'Math Tutor',
      image: 'https://randomuser.me/api/portraits/women/22.jpg',
      rating: 5.0,
      ratingCount: 42,
      location: 'Mbeya',
      verified: true,
      available: false,
    },
  ];
  
  // Filter professionals by search query
  const filteredProfessionals = searchQuery.trim()
    ? professionals.filter(
        prof => 
          prof.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          prof.profession.toLowerCase().includes(searchQuery.toLowerCase()) ||
          prof.location.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : professionals;
  
  return (
    <Layout>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl md:text-3xl font-bold">Professionals</h1>
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
            placeholder="Search professionals by name, skill, or location"
            className="w-full pl-10 pr-4 py-3 rounded-xl border border-border focus:border-huduma-green focus:ring-2 focus:ring-huduma-green/10 outline-none transition-all"
          />
        </div>
      </div>
      
      <div className="flex justify-end gap-3 mb-6">
        <button 
          onClick={() => setShowFilters(!showFilters)}
          className="flex items-center gap-1.5 py-2 px-4 rounded-full bg-huduma-neutral text-foreground/80 hover:bg-huduma-light-green transition-colors"
        >
          <Filter size={16} />
          <span className="text-sm font-medium">Filters</span>
        </button>
        
        <button 
          className="flex items-center gap-1.5 py-2 px-4 rounded-full bg-huduma-neutral text-foreground/80 hover:bg-huduma-light-green transition-colors"
        >
          <ArrowDownUp size={16} />
          <span className="text-sm font-medium">Sort</span>
        </button>
      </div>
      
      {showFilters && (
        <div className="mb-6 p-4 bg-white border border-border rounded-xl">
          <h3 className="font-medium mb-3">Filter Professionals</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Profession</label>
              <select className="w-full p-2 border border-border rounded-lg">
                <option>Any Profession</option>
                <option>Plumber</option>
                <option>Hair Stylist</option>
                <option>Business Consultant</option>
                <option>Cleaner</option>
                <option>Car Mechanic</option>
                <option>Tutor</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Location</label>
              <select className="w-full p-2 border border-border rounded-lg">
                <option>Any Location</option>
                <option>Dar es Salaam</option>
                <option>Arusha</option>
                <option>Dodoma</option>
                <option>Mwanza</option>
                <option>Mbeya</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Status</label>
              <select className="w-full p-2 border border-border rounded-lg">
                <option>Any Status</option>
                <option>Available Now</option>
                <option>Verified Only</option>
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
      
      {filteredProfessionals.length > 0 ? (
        <>
          <div className="text-foreground/70 mb-4">
            Found {filteredProfessionals.length} professionals
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProfessionals.map((professional, index) => (
              <ProfessionalCard
                key={professional.id}
                {...professional}
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
          <h3 className="text-xl font-medium mb-2">No professionals found</h3>
          <p className="text-foreground/70 mb-6">
            Try adjusting your search or filter criteria
          </p>
          <button 
            onClick={() => setSearchQuery('')}
            className="py-2 px-4 bg-huduma-green text-white rounded-lg hover:bg-huduma-green/90 transition-colors"
          >
            Reset Search
          </button>
        </div>
      )}
    </Layout>
  );
};

export default Professionals;
