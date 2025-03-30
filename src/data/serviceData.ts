
export interface ServiceData {
  id: string;
  title: string;
  category: string;
  description: string;
  image: string;
  rating: number;
  ratingCount: number;
  price: number;
  location: string;
  estimatedTime?: string;
  isPremium?: boolean;
  features?: string[];
  professionalId?: string;
}

// Main service categories
export const serviceCategories = [
  { id: 'plumbing', label: 'Plumbing' },
  { id: 'beauty', label: 'Beauty & Hair' },
  { id: 'business', label: 'Business' },
  { id: 'cleaning', label: 'Cleaning' },
  { id: 'automotive', label: 'Automotive' },
  { id: 'health', label: 'Healthcare' },
  { id: 'education', label: 'Education' },
  { id: 'home', label: 'Home Repair' },
  { id: 'tech', label: 'Technology' },
  { id: 'food', label: 'Food & Catering' },
  { id: 'design', label: 'Design & Creative' },
];

// All services data
export const allServices: ServiceData[] = [
  {
    id: '1',
    title: 'Home Plumbing Services & Repairs',
    category: 'Plumbing',
    description: 'Professional plumbing services for your home including pipe repairs, fixture installation, and drain cleaning. Our experienced plumbers ensure quality workmanship with every job.',
    image: 'https://images.unsplash.com/photo-1607472586893-edb57bdc0e39?ixid=M3wxMjA3fDB8MXxzZWFyY2h8MTB8fHBsdW1iaW5nfGVufDB8fHx8MTY5MDQwMDcwMnww&ixlib=rb-4.0.3&w=600&q=80',
    rating: 4.8,
    ratingCount: 156,
    price: 35000,
    location: 'Dar es Salaam',
    estimatedTime: '1-2 hours',
    features: [
      'Emergency repairs',
      'Leak detection',
      'Fixture installation',
      'Drain cleaning',
      'Water heater services'
    ],
    professionalId: '1'
  },
  {
    id: '2',
    title: 'Professional Haircut & Styling',
    category: 'Beauty & Hair',
    description: 'Get a professional haircut and styling from our experienced hair stylists. We offer a range of services including cutting, styling, coloring, and hair treatments.',
    image: 'https://images.unsplash.com/photo-1562322140-8baeececf3df?ixid=M3wxMjA3fDB8MXxzZWFyY2h8M3x8aGFpcmN1dHxlbnwwfHx8fDE2OTA0MDA3NzR8MA&ixlib=rb-4.0.3&w=600&q=80',
    rating: 4.9,
    ratingCount: 213,
    price: 25000,
    location: 'Arusha',
    estimatedTime: '45 mins',
    features: [
      'Haircut and styling',
      'Hair coloring',
      'Hair treatments',
      'Blowdry',
      'Hair consultation'
    ],
    professionalId: '2'
  },
  {
    id: '3',
    title: 'Business Plan Development',
    category: 'Business',
    description: 'Professional business plan development services to help you launch or grow your business. Our experts will work with you to create a comprehensive business plan.',
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?ixid=M3wxMjA3fDB8MXxzZWFyY2h8MTl8fGJ1c2luZXNzJTIwcGxhbnxlbnwwfHx8fDE2OTA0MDA4NTZ8MA&ixlib=rb-4.0.3&w=600&q=80',
    rating: 4.7,
    ratingCount: 89,
    price: 150000,
    location: 'Dodoma',
    estimatedTime: '3-5 days',
    features: [
      'Market analysis',
      'Financial projections',
      'Business strategy',
      'Marketing plan',
      'Executive summary'
    ],
    professionalId: '3'
  },
  {
    id: '4',
    title: 'Deep Home Cleaning Service',
    category: 'Cleaning',
    description: 'Comprehensive deep cleaning services for your home. Our professional cleaners will ensure every corner of your home is spotless and sanitized.',
    image: 'https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?ixid=M3wxMjA3fDB8MXxzZWFyY2h8Nnx8Y2xlYW5pbmd8ZW58MHx8fHwxNjkwNDAwOTE2fDA&ixlib=rb-4.0.3&w=600&q=80',
    rating: 4.6,
    ratingCount: 132,
    price: 45000,
    location: 'Mwanza',
    estimatedTime: '3-4 hours',
    features: [
      'Deep cleaning',
      'Disinfection',
      'Window cleaning',
      'Kitchen and bathroom sanitizing',
      'Floor washing and polishing'
    ],
    professionalId: '4'
  },
  {
    id: '5',
    title: 'Car Maintenance & Repair',
    category: 'Automotive',
    description: 'Professional car maintenance and repair services. Our certified mechanics provide quality service for all makes and models.',
    image: 'https://images.unsplash.com/photo-1599038064230-17400f8f268f?ixid=M3wxMjA3fDB8MXxzZWFyY2h8MTB8fGNhciUyMG1lY2hhbmljfGVufDB8fHx8MTY5MDQwMDk3MHww&ixlib=rb-4.0.3&w=600&q=80',
    rating: 4.5,
    ratingCount: 78,
    price: 80000,
    location: 'Dar es Salaam',
    estimatedTime: '1-3 hours',
    features: [
      'Engine diagnostics',
      'Oil changes',
      'Brake repairs',
      'Tire replacement',
      'Electrical system repairs'
    ],
    professionalId: '5'
  },
  {
    id: '6',
    title: 'Private Math Tutoring',
    category: 'Education',
    description: 'One-on-one math tutoring sessions tailored to your specific needs. Our experienced tutors help students of all levels improve their math skills.',
    image: 'https://images.unsplash.com/photo-1613312328068-c9b6c0444507?ixid=M3wxMjA3fDB8MXxzZWFyY2h8Mnx8dHV0b3Jpbmd8ZW58MHx8fHwxNjkwNDAxMDI5fDA&ixlib=rb-4.0.3&w=600&q=80',
    rating: 5.0,
    ratingCount: 42,
    price: 30000,
    location: 'Mbeya',
    estimatedTime: '1 hour',
    features: [
      'Personalized lessons',
      'Homework help',
      'Exam preparation',
      'Concept clarification',
      'Practice problems'
    ],
    professionalId: '6'
  },
  {
    id: '7',
    title: 'Basic Health Checkup',
    category: 'Healthcare',
    description: 'Comprehensive health checkup including vital signs, blood tests, and consultation with a healthcare professional.',
    image: 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?ixid=M3wxMjA3fDB8MXxzZWFyY2h8NXx8aGVhbHRoY2FyZXxlbnwwfHx8fDE2OTA0MDEyNjN8MA&ixlib=rb-4.0.3&w=600&q=80',
    rating: 4.9,
    ratingCount: 67,
    price: 50000,
    location: 'Dar es Salaam',
    estimatedTime: '30 mins',
    features: [
      'Vital signs check',
      'Blood pressure monitoring', 
      'Basic blood tests',
      'Medical consultation',
      'Health recommendations'
    ],
    professionalId: '7'
  },
  {
    id: '8',
    title: 'Commercial Cleaning Services',
    category: 'Cleaning',
    description: 'Professional cleaning services for commercial spaces including offices, retail stores, and warehouses.',
    image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?ixid=M3wxMjA3fDB8MXxzZWFyY2h8MTF8fGNsZWFuaW5nfGVufDB8fHx8MTY5MDQwMTMyMXww&ixlib=rb-4.0.3&w=600&q=80',
    rating: 4.7,
    ratingCount: 103,
    price: 120000,
    location: 'Arusha',
    estimatedTime: '4-6 hours',
    features: [
      'Office cleaning',
      'Floor maintenance',
      'Restroom sanitation',
      'Waste removal',
      'Window cleaning' 
    ],
    professionalId: '8'
  },
  {
    id: '9',
    title: 'Car Wash and Detailing',
    category: 'Automotive',
    description: 'Complete car wash and detailing service to make your vehicle look like new again.',
    image: 'https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?ixid=M3wxMjA3fDB8MXxzZWFyY2h8MTB8fGNhciUyMHdhc2h8ZW58MHx8fHwxNjkwNDAxMzc4fDA&ixlib=rb-4.0.3&w=600&q=80',
    rating: 4.6,
    ratingCount: 94,
    price: 25000,
    location: 'Dodoma',
    estimatedTime: '1-2 hours',
    features: [
      'Exterior wash',
      'Interior cleaning',
      'Waxing',
      'Tire shine',
      'Dashboard polishing'
    ],
    professionalId: '9'
  },
  {
    id: '10',
    title: 'Website Development & Design',
    category: 'Technology',
    description: 'Professional website development and design services tailored to your business needs.',
    image: 'https://images.unsplash.com/photo-1547658719-da2b51169166?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8d2ViJTIwZGVzaWdufGVufDB8fDB8fHww&auto=format&fit=crop&w=600&q=80',
    rating: 4.9,
    ratingCount: 124,
    price: 350000,
    location: 'Dar es Salaam',
    estimatedTime: '2-3 weeks',
    isPremium: true,
    features: [
      'Responsive design',
      'CMS integration',
      'E-commerce functionality',
      'SEO optimization',
      'Analytics setup'
    ],
    professionalId: '10'
  },
  {
    id: '11',
    title: 'Professional Photography Services',
    category: 'Design & Creative',
    description: 'Professional photography services for events, portraits, product photography and more.',
    image: 'https://images.unsplash.com/photo-1542038784456-1ea8e935640e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cGhvdG9ncmFwaHl8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=600&q=80',
    rating: 4.7,
    ratingCount: 86,
    price: 180000,
    location: 'Zanzibar',
    estimatedTime: '2-4 hours',
    features: [
      'Event photography',
      'Portrait sessions',
      'Product photography',
      'Photo editing',
      'Digital delivery'
    ],
    professionalId: '11'
  },
  {
    id: '12',
    title: 'Home Renovation & Remodeling',
    category: 'Home Repair',
    description: 'Complete home renovation and remodeling services by experienced professionals.',
    image: 'https://images.unsplash.com/photo-1581477397801-aff66f155b1e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fGhvbWUlMjByZW5vdmF0aW9ufGVufDB8fDB8fHww&auto=format&fit=crop&w=600&q=80',
    rating: 4.8,
    ratingCount: 142,
    price: 500000,
    location: 'Mwanza',
    estimatedTime: '1-2 weeks',
    isPremium: true,
    features: [
      'Kitchen remodeling',
      'Bathroom renovation',
      'Room additions',
      'Flooring installation',
      'Painting services'
    ],
    professionalId: '12'
  },
  {
    id: '13',
    title: 'Mobile App Development',
    category: 'Technology',
    description: 'Custom mobile app development for iOS and Android platforms.',
    image: 'https://images.unsplash.com/photo-1556075798-4825dfaaf498?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8YXBwfGVufDB8fDB8fHww&auto=format&fit=crop&w=600&q=80',
    rating: 4.9,
    ratingCount: 76,
    price: 450000,
    location: 'Dar es Salaam',
    estimatedTime: '4-8 weeks',
    features: [
      'Cross-platform development',
      'UI/UX design',
      'API integration',
      'Testing and debugging',
      'App store publishing'
    ],
    professionalId: '13'
  },
  {
    id: '14',
    title: 'Catering Services for Events',
    category: 'Food & Catering',
    description: 'Professional catering services for weddings, corporate events, and parties.',
    image: 'https://images.unsplash.com/photo-1555244162-803834f70033?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Y2F0ZXJpbmd8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=600&q=80',
    rating: 4.6,
    ratingCount: 112,
    price: 250000,
    location: 'Arusha',
    estimatedTime: 'Varies by event',
    features: [
      'Custom menu planning',
      'Food preparation',
      'Setup and service',
      'Cleanup',
      'Beverage service'
    ],
    professionalId: '14'
  },
  {
    id: '15',
    title: 'Interior Design Consultation',
    category: 'Design & Creative',
    description: 'Professional interior design consultation to transform your living or working space.',
    image: 'https://images.unsplash.com/photo-1558442074-3c19857bc1dc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8aW50ZXJpb3IlMjBkZXNpZ258ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=600&q=80',
    rating: 4.7,
    ratingCount: 95,
    price: 200000,
    location: 'Dodoma',
    estimatedTime: '3-5 hours',
    isPremium: true,
    features: [
      'Space planning',
      'Color consultation',
      'Furniture selection',
      'Lighting design',
      'Decor recommendations'
    ],
    professionalId: '15'
  },
  {
    id: '16',
    title: 'Corporate Event Planning',
    category: 'Business',
    description: 'Complete corporate event planning services including venue selection, catering, and management.',
    image: 'https://images.unsplash.com/photo-1511578314322-379afb476865?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8ZXZlbnQlMjBwbGFubmluZ3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=600&q=80',
    rating: 4.8,
    ratingCount: 67,
    price: 350000,
    location: 'Dar es Salaam',
    estimatedTime: 'Varies by event',
    features: [
      'Venue selection',
      'Vendor coordination',
      'Timeline planning',
      'On-site management',
      'Post-event reporting'
    ],
    professionalId: '16'
  },
  {
    id: '17',
    title: 'Language Tutoring (English, French)',
    category: 'Education',
    description: 'One-on-one language tutoring for English and French with experienced language teachers.',
    image: 'https://images.unsplash.com/photo-1498354178607-a79df2916198?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fGxhbmd1YWdlfGVufDB8fDB8fHww&auto=format&fit=crop&w=600&q=80',
    rating: 4.9,
    ratingCount: 53,
    price: 25000,
    location: 'Online',
    estimatedTime: '1 hour',
    features: [
      'Conversation practice',
      'Grammar instruction',
      'Vocabulary building',
      'Reading comprehension',
      'Writing skills'
    ],
    professionalId: '17'
  },
  {
    id: '18',
    title: 'Residential Electrical Services',
    category: 'Home Repair',
    description: 'Professional electrical services for residential properties including installation and repairs.',
    image: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8ZWxlY3RyaWNhbHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=600&q=80',
    rating: 4.7,
    ratingCount: 128,
    price: 65000,
    location: 'Mbeya',
    estimatedTime: '1-4 hours',
    features: [
      'Electrical repairs',
      'Wiring installation',
      'Lighting fixture installation',
      'Circuit breaker replacement',
      'Electrical safety inspection'
    ],
    professionalId: '18'
  }
];

// Get service by ID
export const getServiceById = (id: string): ServiceData | undefined => {
  return allServices.find(service => service.id === id);
};

// Get services by category
export const getServicesByCategory = (category: string): ServiceData[] => {
  return allServices.filter(service => 
    service.category.toLowerCase().replace(/[^a-z0-9]/g, '') === category.toLowerCase()
  );
};

// Get premium services
export const getPremiumServices = (): ServiceData[] => {
  return allServices.filter(service => service.isPremium);
};
