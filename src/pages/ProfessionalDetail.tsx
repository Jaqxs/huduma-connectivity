import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { Star, MapPin, Clock, Award, Shield, MessageCircle, CheckCircle, Phone, Mail, User, Briefcase } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/use-auth';
import { useToast } from '@/hooks/use-toast';
import BookingForm from '@/components/booking/BookingForm';

const ProfessionalDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [professional, setProfessional] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const { toast } = useToast();
  
  useEffect(() => {
    const fetchProfessional = async () => {
      try {
        // In a real app, we would fetch this from the API
        // For now, we'll just use a mock
        
        // This is just mockup data
        const mockProfessional = {
          id: '1',
          name: 'John Magufuli',
          profession: 'Master Plumber',
          image: 'https://randomuser.me/api/portraits/men/32.jpg',
          rating: 4.8,
          ratingCount: 156,
          location: 'Dar es Salaam',
          verified: true,
          featured: true,
          available: true,
          bio: 'Professional plumber with over 10 years of experience. Specializing in commercial and residential plumbing services including installations, repairs, and maintenance.',
          services: [
            {
              id: 's1',
              title: 'Water Heater Installation',
              price: 25000
            },
            {
              id: 's2',
              title: 'Drain Cleaning',
              price: 15000
            },
            {
              id: 's3',
              title: 'Pipe Repair',
              price: 20000
            },
            {
              id: 's4',
              title: 'Faucet Installation',
              price: 12000
            },
            {
              id: 's5',
              title: 'Toilet Repair',
              price: 18000
            },
            {
              id: 's6',
              title: 'Sewer Line Services',
              price: 30000
            }
          ],
          availability: 'Monday to Friday, 8 AM - 6 PM',
          hourlyRate: 25000,
          completedJobs: 187,
          yearsOfExperience: 10,
          responseTime: '1-2 hours',
          testimonials: [
            {
              id: '1',
              name: 'Sarah Lweno',
              rating: 5,
              comment: 'John did an excellent job fixing our bathroom. He was prompt, professional, and the quality of his work was outstanding.',
              date: '2023-07-15'
            },
            {
              id: '2',
              name: 'Michael Kijazi',
              rating: 4,
              comment: 'Very professional service. Fixed our leaking pipes quickly and for a reasonable price.',
              date: '2023-06-30'
            },
            {
              id: '3',
              name: 'Grace Makonda',
              rating: 5,
              comment: 'John is reliable and does exceptional work. Highly recommend for any plumbing needs.',
              date: '2023-06-22'
            }
          ],
          gallery: [
            'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cGx1bWJpbmd8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60',
            'https://images.unsplash.com/photo-1583845112239-97ef1341b271?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8cGx1bWJpbmd8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60',
            'https://images.unsplash.com/photo-1607472586893-edb57bdc0e39?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OXx8cGx1bWJpbmd8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60',
            'https://images.unsplash.com/photo-1621275471769-e6aa344546d5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTV8fHBsdW1iaW5nfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60'
          ]
        };
        
        setProfessional(mockProfessional);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching professional details:', error);
        setLoading(false);
      }
    };
    
    fetchProfessional();
  }, [id]);
  
  const handleSendMessage = () => {
    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please sign in to message professionals",
        variant: "destructive"
      });
      return;
    }
    
    toast({
      title: "Message Sent",
      description: "Your message has been sent to the professional",
    });
  };
  
  if (loading) {
    return (
      <Layout>
        <div className="h-96 flex items-center justify-center">
          <div className="w-16 h-16 border-4 border-huduma-green/20 border-t-huduma-green rounded-full animate-spin"></div>
        </div>
      </Layout>
    );
  }
  
  if (!professional) {
    return (
      <Layout>
        <div className="text-center py-12">
          <h2 className="text-2xl font-bold mb-2">Professional Not Found</h2>
          <p className="text-foreground/70 mb-8">The professional you are looking for does not exist or has been removed.</p>
          <Button asChild>
            <a href="/professionals">Browse Professionals</a>
          </Button>
        </div>
      </Layout>
    );
  }
  
  return (
    <Layout>
      <div className="animate-fade-in">
        {/* Hero Section */}
        <div className="relative mb-6 overflow-hidden rounded-2xl bg-gradient-to-r from-huduma-light-green to-huduma-light-teal dark:from-huduma-green/10 dark:to-huduma-teal/5">
          <div className="absolute inset-0 bg-gradient-to-r from-huduma-green/10 to-transparent"></div>
          <div className="relative z-10 p-6 md:p-8">
            <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
              <div className="relative">
                <div className="w-24 h-24 md:w-32 md:h-32 rounded-full border-4 border-white overflow-hidden shadow-lg">
                  <img 
                    src={professional.image} 
                    alt={professional.name} 
                    className="w-full h-full object-cover"
                  />
                </div>
                {professional.verified && (
                  <div className="absolute -bottom-2 -right-2 bg-huduma-green text-white rounded-full p-1 shadow-md">
                    <CheckCircle size={20} />
                  </div>
                )}
              </div>
              
              <div className="flex-1">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <h1 className="text-2xl md:text-3xl font-bold">{professional.name}</h1>
                    <p className="text-foreground/70">{professional.profession}</p>
                    
                    <div className="flex items-center mt-2 gap-4">
                      <div className="flex items-center">
                        <MapPin size={16} className="text-huduma-green mr-1" />
                        <span className="text-sm">{professional.location}</span>
                      </div>
                      
                      <div className="flex items-center">
                        <Star size={16} className="text-huduma-yellow mr-1" />
                        <span className="text-sm">{professional.rating} ({professional.ratingCount} reviews)</span>
                      </div>
                      
                      <div className="hidden md:flex items-center">
                        <Briefcase size={16} className="text-huduma-teal mr-1" />
                        <span className="text-sm">{professional.completedJobs} jobs completed</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-3">
                    <Button 
                      onClick={handleSendMessage}
                      variant="outline" 
                      className="border-huduma-green text-huduma-green hover:bg-huduma-light-green"
                    >
                      <MessageCircle size={18} className="mr-1" />
                      Message
                    </Button>
                    
                    <BookingForm
                      professionalId={professional.id}
                      professionalName={professional.name}
                      services={professional.services}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Main Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Left Column */}
          <div className="md:col-span-2">
            <Tabs defaultValue="about" className="w-full">
              <TabsList className="grid w-full grid-cols-4 rounded-xl bg-huduma-neutral dark:bg-gray-800 p-1">
                <TabsTrigger value="about" className="rounded-lg data-[state=active]:bg-white dark:data-[state=active]:bg-gray-700 data-[state=active]:shadow-sm">About</TabsTrigger>
                <TabsTrigger value="services" className="rounded-lg data-[state=active]:bg-white dark:data-[state=active]:bg-gray-700 data-[state=active]:shadow-sm">Services</TabsTrigger>
                <TabsTrigger value="reviews" className="rounded-lg data-[state=active]:bg-white dark:data-[state=active]:bg-gray-700 data-[state=active]:shadow-sm">Reviews</TabsTrigger>
                <TabsTrigger value="gallery" className="rounded-lg data-[state=active]:bg-white dark:data-[state=active]:bg-gray-700 data-[state=active]:shadow-sm">Gallery</TabsTrigger>
              </TabsList>
              
              <TabsContent value="about" className="mt-6 animate-slide-up">
                <div className="colorful-card p-6 rounded-xl">
                  <h2 className="text-xl font-semibold mb-4">About {professional.name}</h2>
                  <p className="text-foreground/70 mb-6">{professional.bio}</p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <div className="flex items-center gap-3 p-3 bg-huduma-light-green/30 dark:bg-huduma-green/10 rounded-lg">
                      <div className="w-10 h-10 rounded-full bg-huduma-light-green flex items-center justify-center text-huduma-green">
                        <Award size={20} />
                      </div>
                      <div>
                        <div className="text-sm text-foreground/70">Experience</div>
                        <div className="font-medium">{professional.yearsOfExperience} years</div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3 p-3 bg-huduma-light-yellow/30 dark:bg-huduma-yellow/10 rounded-lg">
                      <div className="w-10 h-10 rounded-full bg-huduma-light-yellow flex items-center justify-center text-huduma-yellow">
                        <Briefcase size={20} />
                      </div>
                      <div>
                        <div className="text-sm text-foreground/70">Completed Jobs</div>
                        <div className="font-medium">{professional.completedJobs}</div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3 p-3 bg-huduma-light-teal/30 dark:bg-huduma-teal/10 rounded-lg">
                      <div className="w-10 h-10 rounded-full bg-huduma-light-teal flex items-center justify-center text-huduma-teal">
                        <Clock size={20} />
                      </div>
                      <div>
                        <div className="text-sm text-foreground/70">Response Time</div>
                        <div className="font-medium">{professional.responseTime}</div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3 p-3 bg-huduma-light-coral/30 dark:bg-huduma-coral/10 rounded-lg">
                      <div className="w-10 h-10 rounded-full bg-huduma-light-coral flex items-center justify-center text-huduma-coral">
                        <Shield size={20} />
                      </div>
                      <div>
                        <div className="text-sm text-foreground/70">Verification</div>
                        <div className="font-medium">{professional.verified ? 'Verified Professional' : 'Not Verified'}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="services" className="mt-6 animate-slide-up">
                <div className="colorful-card p-6 rounded-xl">
                  <h2 className="text-xl font-semibold mb-4">Services Offered</h2>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {professional.services.map((service: any, index: number) => (
                      <div 
                        key={service.id} 
                        className="p-4 border border-border bg-background hover:border-huduma-green/30 hover:bg-huduma-light-green/10 rounded-lg transition-colors"
                      >
                        <div className="flex items-center gap-3 mb-3">
                          <div className="w-10 h-10 rounded-full bg-huduma-light-green flex items-center justify-center text-huduma-green">
                            <CheckCircle size={18} />
                          </div>
                          <span className="font-medium">{service.title}</span>
                        </div>
                        <div className="ml-13 flex justify-between items-center">
                          <div className="text-huduma-green font-semibold">
                            TZS {service.price.toLocaleString()}
                          </div>
                          <BookingForm
                            professionalId={professional.id}
                            serviceId={service.id}
                            professionalName={professional.name}
                            services={[service]}
                            trigger={
                              <Button size="sm" variant="outline" className="border-huduma-green text-huduma-green hover:bg-huduma-light-green">
                                Book Service
                              </Button>
                            }
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-6 p-4 rounded-lg bg-huduma-light-yellow/30 dark:bg-huduma-yellow/10 text-foreground/80">
                    <div className="flex items-center gap-2 font-medium mb-2">
                      <Clock size={18} className="text-huduma-yellow" />
                      Availability
                    </div>
                    <p>{professional.availability}</p>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="reviews" className="mt-6 animate-slide-up">
                <div className="colorful-card p-6 rounded-xl">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-semibold">Client Reviews</h2>
                    
                    <div className="flex items-center bg-huduma-light-green/30 dark:bg-huduma-green/10 px-3 py-1.5 rounded-full">
                      <Star size={18} className="text-huduma-yellow mr-1" />
                      <span className="font-medium">{professional.rating}</span>
                      <span className="text-sm text-foreground/70 ml-1">({professional.ratingCount})</span>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    {professional.testimonials.map((testimonial: any) => (
                      <div key={testimonial.id} className="p-4 border border-border rounded-lg hover:border-huduma-green/30 transition-colors">
                        <div className="flex justify-between mb-2">
                          <div className="font-medium">{testimonial.name}</div>
                          <div className="flex items-center">
                            {[...Array(5)].map((_, i) => (
                              <Star 
                                key={i} 
                                size={14} 
                                className={i < testimonial.rating ? "text-huduma-yellow fill-huduma-yellow" : "text-gray-300"} 
                              />
                            ))}
                          </div>
                        </div>
                        <p className="text-foreground/70 text-sm">{testimonial.comment}</p>
                        <div className="text-xs text-foreground/50 mt-2">{testimonial.date}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="gallery" className="mt-6 animate-slide-up">
                <div className="colorful-card p-6 rounded-xl">
                  <h2 className="text-xl font-semibold mb-4">Work Gallery</h2>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-4">
                    {professional.gallery.map((image: string, index: number) => (
                      <div key={index} className="rounded-lg overflow-hidden border border-border hover:border-huduma-green/30 transition-all hover:shadow-md">
                        <img 
                          src={image} 
                          alt={`${professional.name}'s work ${index + 1}`} 
                          className="w-full h-48 object-cover hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
          
          {/* Right Column */}
          <div className="space-y-6">
            {/* Contact Card */}
            <div className="colorful-card p-6 rounded-xl">
              <h3 className="text-lg font-semibold mb-4">Contact Information</h3>
              
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-huduma-light-green/50 flex items-center justify-center text-huduma-green">
                    <Phone size={18} />
                  </div>
                  <div>
                    <div className="text-sm text-foreground/70">Phone</div>
                    <div className="font-medium">+255 712 345 678</div>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-huduma-light-teal/50 flex items-center justify-center text-huduma-teal">
                    <Mail size={18} />
                  </div>
                  <div>
                    <div className="text-sm text-foreground/70">Email</div>
                    <div className="font-medium">johnmagufuli@example.com</div>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-huduma-light-yellow/50 flex items-center justify-center text-huduma-yellow">
                    <MapPin size={18} />
                  </div>
                  <div>
                    <div className="text-sm text-foreground/70">Location</div>
                    <div className="font-medium">Mikocheni, Dar es Salaam</div>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 pt-4 border-t border-border">
                <BookingForm
                  professionalId={professional.id}
                  professionalName={professional.name}
                  services={professional.services}
                  trigger={
                    <Button className="w-full bg-gradient-to-r from-huduma-green to-huduma-teal hover:shadow-glow transition-all">
                      Book Appointment
                    </Button>
                  }
                />
              </div>
            </div>
            
            {/* Price Card */}
            <div className="colorful-card p-6 rounded-xl">
              <h3 className="text-lg font-semibold mb-4">Service Pricing</h3>
              
              <div className="mb-4 p-3 bg-huduma-light-green/30 dark:bg-huduma-green/10 rounded-lg">
                <div className="text-sm text-foreground/70">Hourly Rate</div>
                <div className="text-xl font-bold text-huduma-green">TZS {professional.hourlyRate.toLocaleString()}</div>
              </div>
              
              <div className="space-y-2 text-sm text-foreground/70">
                <div className="flex items-center gap-2">
                  <CheckCircle size={16} className="text-huduma-green" />
                  <span>Free consultation</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle size={16} className="text-huduma-green" />
                  <span>Service guarantee</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle size={16} className="text-huduma-green" />
                  <span>Quality materials</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle size={16} className="text-huduma-green" />
                  <span>Fast response time</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProfessionalDetail;
