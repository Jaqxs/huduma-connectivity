
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { getServiceById } from '@/data/serviceData';
import { Star, MapPin, Clock, ChevronRight, CheckCircle, BadgeDollarSign } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import BookingForm from '@/components/booking/BookingForm';
import PremiumBadge from '@/components/ui/PremiumBadge';

const ServiceDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [service, setService] = useState(getServiceById(id || ''));
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  
  // Fallback to index if service not found
  useEffect(() => {
    if (!service && !loading) {
      navigate('/services');
    }
  }, [service, navigate, loading]);
  
  if (!service) {
    return null;
  }
  
  // Dummy professional data (in a real app would be fetched from an API)
  const professional = {
    id: service.professionalId || '1',
    name: "John Magufuli",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
    rating: 4.8,
    reviews: 156,
    bio: "Professional plumber with over 10 years of experience serving the Dar es Salaam area. Specializing in residential and commercial plumbing services.",
    location: "Dar es Salaam",
    joinedDate: "June 2019"
  };
  
  // Offered services (in a real app would be fetched based on the professional)
  const offeredServices = [
    {
      id: service.id,
      title: service.title,
      price: service.price,
      estimatedTime: service.estimatedTime,
    }
  ];
  
  return (
    <Layout>
      {/* Breadcrumb */}
      <div className="flex items-center text-sm text-foreground/60 mb-4">
        <button 
          onClick={() => navigate('/services')}
          className="hover:text-foreground transition-colors"
        >
          Services
        </button>
        <ChevronRight size={14} className="mx-2" />
        <button 
          onClick={() => navigate(`/services?category=${service.category.toLowerCase().replace(/[^a-z0-9]/g, '')}`)}
          className="hover:text-foreground transition-colors"
        >
          {service.category}
        </button>
        <ChevronRight size={14} className="mx-2" />
        <span className="text-foreground font-medium truncate">{service.title}</span>
      </div>
      
      {/* Service Header */}
      <div className="mb-8">
        <div className="flex items-start justify-between gap-4 flex-wrap">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold mb-2">{service.title}</h1>
            <div className="flex items-center gap-4 text-sm flex-wrap">
              <div className="flex items-center gap-1">
                <Star size={16} className="fill-huduma-yellow text-huduma-yellow" />
                <span className="font-medium">{service.rating.toFixed(1)}</span>
                <span className="text-foreground/60">({service.ratingCount} reviews)</span>
              </div>
              <div className="flex items-center gap-1 text-foreground/70">
                <MapPin size={14} />
                <span>{service.location}</span>
              </div>
              {service.estimatedTime && (
                <div className="flex items-center gap-1 text-foreground/70">
                  <Clock size={14} />
                  <span>{service.estimatedTime}</span>
                </div>
              )}
              {service.isPremium && (
                <div>
                  <PremiumBadge level="premium" />
                </div>
              )}
            </div>
          </div>
          
          <div className="flex items-center gap-2 flex-shrink-0">
            <div className="text-right">
              <div className="font-semibold text-lg">{new Intl.NumberFormat('en-US').format(service.price)} TZS</div>
              <div className="text-sm text-foreground/60">starting price</div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          {/* Service Image */}
          <div className="rounded-2xl overflow-hidden mb-8 aspect-video">
            <img 
              src={service.image} 
              alt={service.title}
              className="w-full h-full object-cover"
            />
          </div>
          
          <Tabs defaultValue="description">
            <TabsList className="mb-4">
              <TabsTrigger value="description">Description</TabsTrigger>
              <TabsTrigger value="features">What's Included</TabsTrigger>
              <TabsTrigger value="reviews">Reviews</TabsTrigger>
            </TabsList>
            
            <TabsContent value="description" className="space-y-4">
              <div>
                <h2 className="text-xl font-semibold mb-3">About This Service</h2>
                <p className="text-foreground/80 leading-relaxed">
                  {service.description}
                </p>
              </div>
            </TabsContent>
            
            <TabsContent value="features" className="space-y-4">
              <div>
                <h2 className="text-xl font-semibold mb-3">What's Included</h2>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {service.features?.map((feature, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <CheckCircle size={18} className="text-huduma-green" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </TabsContent>
            
            <TabsContent value="reviews" className="space-y-4">
              <div>
                <h2 className="text-xl font-semibold mb-3">Customer Reviews</h2>
                <div className="flex items-center gap-2 mb-4">
                  <div className="bg-huduma-light-green text-huduma-green font-bold text-2xl rounded-lg p-3 flex items-center justify-center w-16 h-16">
                    {service.rating.toFixed(1)}
                  </div>
                  <div>
                    <div className="flex items-center gap-1 mb-1">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star 
                          key={i} 
                          size={16} 
                          className={cn(
                            i < Math.floor(service.rating) 
                              ? "fill-huduma-yellow text-huduma-yellow" 
                              : "text-gray-300"
                          )} 
                        />
                      ))}
                    </div>
                    <div className="text-sm text-foreground/60">
                      Based on {service.ratingCount} reviews
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  {/* Sample reviews - in a real app would be fetched from a database */}
                  <div className="border border-border rounded-xl p-4">
                    <div className="flex items-start gap-3 mb-3">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src="https://randomuser.me/api/portraits/women/24.jpg" />
                        <AvatarFallback>JD</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">Jane Doe</div>
                        <div className="text-sm text-foreground/60">3 days ago</div>
                      </div>
                      <div className="ml-auto flex items-center gap-1">
                        <Star size={14} className="fill-huduma-yellow text-huduma-yellow" />
                        <span className="font-medium">5.0</span>
                      </div>
                    </div>
                    <p className="text-foreground/80">
                      Great service! The professional was on time, courteous, and did an excellent job.
                      Would definitely recommend and use again.
                    </p>
                  </div>
                  
                  <div className="border border-border rounded-xl p-4">
                    <div className="flex items-start gap-3 mb-3">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src="https://randomuser.me/api/portraits/men/44.jpg" />
                        <AvatarFallback>JS</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">John Smith</div>
                        <div className="text-sm text-foreground/60">1 week ago</div>
                      </div>
                      <div className="ml-auto flex items-center gap-1">
                        <Star size={14} className="fill-huduma-yellow text-huduma-yellow" />
                        <span className="font-medium">4.5</span>
                      </div>
                    </div>
                    <p className="text-foreground/80">
                      Very professional service. They did a great job and finished in the estimated timeframe.
                      The only small issue was that they arrived slightly later than scheduled.
                    </p>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
        
        <div>
          {/* Professional Card */}
          <div className="border border-border rounded-2xl p-6 shadow-sm mb-6">
            <div className="flex items-center gap-3 mb-4">
              <Avatar className="h-14 w-14">
                <AvatarImage src={professional.image} />
                <AvatarFallback>{professional.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <h3 className="font-semibold text-lg">{professional.name}</h3>
                <div className="flex items-center gap-1 text-sm">
                  <Star size={14} className="fill-huduma-yellow text-huduma-yellow" />
                  <span className="font-medium">{professional.rating}</span>
                  <span className="text-foreground/60">({professional.reviews} reviews)</span>
                </div>
              </div>
            </div>
            
            <p className="text-foreground/80 text-sm mb-4">
              {professional.bio}
            </p>
            
            <button 
              onClick={() => navigate(`/professionals/${professional.id}`)}
              className="w-full py-2 px-4 bg-white border border-huduma-green text-huduma-green rounded-lg hover:bg-huduma-light-green transition-colors mb-2"
            >
              View Profile
            </button>
          </div>
          
          {/* Service Booking Card */}
          <div className="border border-border rounded-2xl overflow-hidden shadow-sm">
            <div className="bg-gradient-to-r from-huduma-green/10 to-huduma-teal/10 p-4">
              <h3 className="font-semibold">Book This Service</h3>
            </div>
            
            <div className="p-4">
              <div className="space-y-3 mb-4">
                <div className="flex items-center justify-between">
                  <span className="text-foreground/70">Service</span>
                  <span className="font-medium">{service.title}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-foreground/70">Price Starting From</span>
                  <span className="font-medium">{new Intl.NumberFormat('en-US').format(service.price)} TZS</span>
                </div>
                {service.estimatedTime && (
                  <div className="flex items-center justify-between">
                    <span className="text-foreground/70">Estimated Time</span>
                    <span className="font-medium">{service.estimatedTime}</span>
                  </div>
                )}
              </div>
              
              <Separator className="my-4" />
              
              <BookingForm 
                professionalId={professional.id}
                professionalName={professional.name}
                serviceId={service.id}
                services={offeredServices}
              />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ServiceDetail;
