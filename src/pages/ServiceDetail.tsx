
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { ArrowLeft, Star, MapPin, Clock, Calendar, CheckCircle, AlertCircle, Banknote, Share2 } from 'lucide-react';

const ServiceDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  
  // Sample service data (in a real app, fetch based on id)
  const service = {
    id: '1',
    title: 'Home Plumbing Services & Repairs',
    category: 'Plumbing',
    images: [
      'https://images.unsplash.com/photo-1607472586893-edb57bdc0e39?ixid=M3wxMjA3fDB8MXxzZWFyY2h8MTB8fHBsdW1iaW5nfGVufDB8fHx8MTY5MDQwMDcwMnww&ixlib=rb-4.0.3&w=600&q=80',
      'https://images.unsplash.com/photo-1573599852326-2d4da0bbe613?ixid=M3wxMjA3fDB8MXxzZWFyY2h8MTR8fHBsdW1iaW5nfGVufDB8fHx8MTY5MDQwMDcwMnww&ixlib=rb-4.0.3&w=600&q=80',
      'https://images.unsplash.com/photo-1611796327023-95b23fb4ab08?ixid=M3wxMjA3fDB8MXxzZWFyY2h8MzZ8fHBsdW1iaW5nfGVufDB8fHx8MTY5MDQwMDcwMnww&ixlib=rb-4.0.3&w=600&q=80',
    ],
    rating: 4.8,
    ratingCount: 156,
    price: 35000,
    location: 'Dar es Salaam',
    estimatedTime: '1-2 hours',
    description: `
      Professional plumbing services for all your home needs. I offer expertise in:
      
      - Fixing leaky faucets and pipes
      - Unclogging drains and toilets
      - Installing new fixtures
      - Water heater repair and installation
      - Pipe replacement and repair
      
      I use high-quality materials and guarantee my work for 3 months. Available for both routine maintenance and emergency repairs.
    `,
    features: [
      'Free consultation',
      'Same-day service availability',
      '3-month warranty on all repairs',
      'Transparent pricing',
      'Professional-grade tools and parts',
    ],
    professional: {
      id: '1',
      name: 'John Magufuli',
      profession: 'Master Plumber',
      image: 'https://randomuser.me/api/portraits/men/32.jpg',
      rating: 4.8,
      ratingCount: 156,
      verified: true,
      joiningDate: 'June 2021',
      completedJobs: 246,
    },
    availableDates: [
      { date: '2023-08-10', slots: ['09:00', '11:00', '14:00', '16:00'] },
      { date: '2023-08-11', slots: ['10:00', '13:00', '15:00'] },
      { date: '2023-08-12', slots: ['09:00', '12:00', '17:00'] },
    ],
  };
  
  const [selectedImage, setSelectedImage] = React.useState(service.images[0]);
  const [selectedDate, setSelectedDate] = React.useState('');
  const [selectedTime, setSelectedTime] = React.useState('');
  
  const formattedPrice = new Intl.NumberFormat('en-US').format(service.price);
  
  return (
    <Layout>
      <div className="mb-6">
        <Link to="/services" className="flex items-center gap-2 text-foreground/70 hover:text-foreground transition-colors">
          <ArrowLeft size={18} />
          <span>Back to services</span>
        </Link>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left column - images and details */}
        <div className="lg:col-span-2 space-y-8">
          {/* Image gallery */}
          <div className="space-y-3">
            <div className="aspect-[4/3] w-full overflow-hidden rounded-2xl">
              <img 
                src={selectedImage} 
                alt={service.title}
                className="w-full h-full object-cover"
              />
            </div>
            
            <div className="flex items-center gap-3 overflow-x-auto pb-2">
              {service.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(image)}
                  className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                    selectedImage === image ? 'border-huduma-green' : 'border-transparent'
                  }`}
                >
                  <img 
                    src={image} 
                    alt={`${service.title} - image ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>
          
          {/* Service info */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="bg-huduma-light-green px-3 py-1 rounded-full text-xs text-huduma-green font-medium">
                {service.category}
              </span>
              <div className="flex items-center gap-1 text-huduma-yellow">
                <Star size={16} className="fill-huduma-yellow" />
                <span className="font-medium">{service.rating.toFixed(1)}</span>
                <span className="text-foreground/60 text-sm">({service.ratingCount} reviews)</span>
              </div>
            </div>
            
            <h1 className="text-2xl md:text-3xl font-bold mb-4">{service.title}</h1>
            
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mb-6">
              <div className="flex items-center gap-1">
                <MapPin size={16} className="text-foreground/70" />
                <span>{service.location}</span>
              </div>
              
              <div className="flex items-center gap-1">
                <Clock size={16} className="text-foreground/70" />
                <span>{service.estimatedTime}</span>
              </div>
            </div>
            
            <div className="prose max-w-none">
              <p className="whitespace-pre-line">{service.description}</p>
            </div>
          </div>
          
          {/* Features */}
          <div>
            <h2 className="text-xl font-bold mb-4">Service Features</h2>
            <ul className="space-y-2">
              {service.features.map((feature, index) => (
                <li key={index} className="flex items-center gap-2">
                  <CheckCircle size={18} className="text-huduma-green flex-shrink-0" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Provider info */}
          <div>
            <h2 className="text-xl font-bold mb-4">About the Professional</h2>
            <div className="bg-white rounded-2xl p-5 border border-border">
              <div className="flex items-center gap-4 mb-4">
                <div className="relative">
                  <div className="w-16 h-16 rounded-full overflow-hidden">
                    <img 
                      src={service.professional.image} 
                      alt={service.professional.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  {service.professional.verified && (
                    <div className="absolute -right-1 -bottom-1 bg-huduma-green text-white p-0.5 rounded-full">
                      <CheckCircle size={16} />
                    </div>
                  )}
                </div>
                
                <div>
                  <div className="flex items-center gap-1">
                    <h3 className="font-medium text-lg">{service.professional.name}</h3>
                    {service.professional.verified && (
                      <span className="bg-huduma-light-green text-huduma-green text-xs px-2 py-0.5 rounded-full">
                        Verified
                      </span>
                    )}
                  </div>
                  
                  <p className="text-foreground/70">{service.professional.profession}</p>
                  
                  <div className="flex items-center gap-1 text-huduma-yellow mt-1">
                    <Star size={14} className="fill-huduma-yellow" />
                    <span className="font-medium">{service.professional.rating.toFixed(1)}</span>
                    <span className="text-foreground/60 text-xs">({service.professional.ratingCount} reviews)</span>
                  </div>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-4">
                <div className="flex-1 min-w-[120px]">
                  <div className="text-foreground/70 text-sm">Member Since</div>
                  <div className="font-medium">{service.professional.joiningDate}</div>
                </div>
                
                <div className="flex-1 min-w-[120px]">
                  <div className="text-foreground/70 text-sm">Completed Jobs</div>
                  <div className="font-medium">{service.professional.completedJobs}</div>
                </div>
              </div>
              
              <div className="mt-4 pt-4 border-t flex justify-between">
                <Link 
                  to={`/professionals/${service.professional.id}`}
                  className="text-huduma-green font-medium hover:underline"
                >
                  View Full Profile
                </Link>
                
                <button className="text-foreground/70 hover:text-foreground flex items-center gap-1">
                  <Share2 size={16} />
                  <span>Share</span>
                </button>
              </div>
            </div>
          </div>
        </div>
        
        {/* Right column - booking */}
        <div className="lg:col-span-1">
          <div className="sticky top-20">
            <div className="bg-white rounded-2xl border border-border p-5 mb-6">
              <h2 className="text-lg font-bold mb-4">Book This Service</h2>
              
              <div className="mb-4">
                <div className="text-foreground/70 mb-1">Price</div>
                <div className="text-2xl font-bold">{formattedPrice} <span className="text-sm font-normal">TZS</span></div>
                <div className="text-sm text-foreground/70">Per service ({service.estimatedTime})</div>
              </div>
              
              <div className="space-y-4 mb-6">
                <div>
                  <label className="block text-sm font-medium mb-1">Select Date</label>
                  <select 
                    value={selectedDate} 
                    onChange={(e) => {
                      setSelectedDate(e.target.value);
                      setSelectedTime('');
                    }}
                    className="w-full p-2 border border-border rounded-lg"
                  >
                    <option value="">Select a date</option>
                    {service.availableDates.map((dateOption) => (
                      <option key={dateOption.date} value={dateOption.date}>
                        {new Date(dateOption.date).toLocaleDateString('en-US', { 
                          weekday: 'short', 
                          month: 'short', 
                          day: 'numeric' 
                        })}
                      </option>
                    ))}
                  </select>
                </div>
                
                {selectedDate && (
                  <div>
                    <label className="block text-sm font-medium mb-1">Select Time</label>
                    <div className="grid grid-cols-3 gap-2">
                      {service.availableDates
                        .find(d => d.date === selectedDate)?.slots
                        .map((slot) => (
                          <button
                            key={slot}
                            onClick={() => setSelectedTime(slot)}
                            className={`py-2 rounded-lg text-sm transition-colors ${
                              selectedTime === slot 
                                ? 'bg-huduma-green text-white' 
                                : 'bg-huduma-neutral text-foreground hover:bg-huduma-light-green'
                            }`}
                          >
                            {slot}
                          </button>
                        ))}
                    </div>
                  </div>
                )}
              </div>
              
              <button 
                disabled={!selectedDate || !selectedTime}
                className="w-full py-3 bg-huduma-green text-white rounded-xl font-medium transition-colors hover:bg-huduma-green/90 disabled:bg-foreground/20 disabled:text-foreground/40 disabled:cursor-not-allowed"
              >
                Book Now
              </button>
              
              <div className="mt-4 text-sm text-foreground/70 flex items-center gap-1">
                <AlertCircle size={14} />
                <span>No payment will be charged until service is complete</span>
              </div>
            </div>
            
            <div className="bg-white rounded-2xl border border-border p-5">
              <h3 className="font-medium mb-3">Payment Methods</h3>
              <div className="flex items-center gap-2 mb-1">
                <Banknote size={16} className="text-foreground/70" />
                <span>Secure payment via Huduma Wallet</span>
              </div>
              <div className="text-xs text-foreground/70">
                Connect with M-Pesa, Tigo Pesa, Airtel Money
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ServiceDetail;
