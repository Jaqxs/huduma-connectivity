import React, { useState, useEffect } from 'react';
import Layout from '@/components/layout/Layout';
import { Calendar, Clock, MapPin, User, Phone, FileText, CheckCircle, XCircle, AlertTriangle, Loader2 } from 'lucide-react';
import { useUserContext } from '@/context/UserContext';
import { useAuth } from '@/hooks/use-auth';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface Appointment {
  id: string;
  professional_id: string;
  customer_id: string;
  service_id: string;
  appointment_date: string;
  appointment_time: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  price: number;
  created_at: string;
  professional?: {
    id: string;
    name: string;
    image: string;
    phone: string;
  };
  customer?: {
    id: string;
    name: string;
    image: string;
    phone: string;
  };
  service?: {
    id: string;
    title: string;
  };
  cancellationReason?: string;
  review?: {
    rating: number;
    comment: string;
  };
}

const Appointments: React.FC = () => {
  const { userMode } = useUserContext();
  const [activeTab, setActiveTab] = useState<'upcoming' | 'completed' | 'cancelled'>('upcoming');
  const [loading, setLoading] = useState(true);
  const [appointments, setAppointments] = useState<{
    upcoming: Appointment[];
    completed: Appointment[];
    cancelled: Appointment[];
  }>({
    upcoming: [],
    completed: [],
    cancelled: []
  });

  const { user } = useAuth();
  const { toast } = useToast();
  
  useEffect(() => {
    if (user) {
      fetchAppointments();
    }
  }, [user]);
  
  const fetchAppointments = async () => {
    if (!user) return;
    
    setLoading(true);
    
    try {
      // Fetch appointments from the database - with specific column references
      // to avoid the ambiguity between professional_id and customer_id
      const { data, error } = await supabase
        .from('appointments')
        .select(`
          *,
          professional:profiles!professional_id(id, full_name, avatar_url, phone),
          customer:profiles!customer_id(id, full_name, avatar_url, phone),
          service:services(id, title)
        `)
        .or(`professional_id.eq.${user.id},customer_id.eq.${user.id}`)
        .order('appointment_date', { ascending: true });
      
      if (error) throw error;
      
      // Process the appointments
      const fetchedAppointments = data || [];
      
      // For demo purposes, if no appointments are found, we'll use mock data
      let processedAppointments;
      
      if (fetchedAppointments.length === 0) {
        // Use mock data
        processedAppointments = getMockAppointments();
      } else {
        // Map the fetched data to our appointment structure
        processedAppointments = fetchedAppointments.map((appointment) => {
          const isCancelled = appointment.status === 'cancelled';
          const isCompleted = appointment.status === 'completed';
          
          return {
            id: appointment.id,
            professional_id: appointment.professional_id,
            customer_id: appointment.customer_id,
            service_id: appointment.service_id,
            appointment_date: appointment.appointment_date,
            appointment_time: appointment.appointment_time,
            status: appointment.status,
            price: appointment.price,
            created_at: appointment.created_at,
            professional: appointment.professional ? {
              id: appointment.professional.id,
              name: appointment.professional.full_name || 'Unknown Professional',
              image: appointment.professional.avatar_url || 'https://randomuser.me/api/portraits/men/32.jpg',
              phone: appointment.professional.phone || '+255 712 345 678',
            } : undefined,
            customer: appointment.customer ? {
              id: appointment.customer.id,
              name: appointment.customer.full_name || 'Unknown Customer',
              image: appointment.customer.avatar_url || 'https://randomuser.me/api/portraits/women/33.jpg',
              phone: appointment.customer.phone || '+255 756 789 012',
            } : undefined,
            service: appointment.service ? {
              id: appointment.service.id,
              title: appointment.service.title || 'Service'
            } : {
              id: appointment.service_id,
              title: 'Service Title' // In a real app, you would fetch the service title
            },
            cancellationReason: isCancelled ? 'Professional unavailable due to emergency' : undefined,
            review: isCompleted ? {
              rating: 4,
              comment: 'Great work on the business plan, exactly what I needed!',
            } : undefined
          };
        });
      }
      
      // Categorize appointments
      const upcomingAppointments = processedAppointments.filter(
        appointment => appointment.status === 'pending' || appointment.status === 'confirmed'
      );
      
      const completedAppointments = processedAppointments.filter(
        appointment => appointment.status === 'completed'
      );
      
      const cancelledAppointments = processedAppointments.filter(
        appointment => appointment.status === 'cancelled'
      );
      
      setAppointments({
        upcoming: upcomingAppointments,
        completed: completedAppointments,
        cancelled: cancelledAppointments
      });
    } catch (error) {
      console.error('Error fetching appointments:', error);
      toast({
        title: 'Error',
        description: 'Failed to load appointments',
        variant: 'destructive',
      });
      
      // Fallback to mock data
      const mockData = getMockAppointments();
      setAppointments({
        upcoming: mockData.filter(a => a.status === 'pending' || a.status === 'confirmed'),
        completed: mockData.filter(a => a.status === 'completed'),
        cancelled: mockData.filter(a => a.status === 'cancelled')
      });
    } finally {
      setLoading(false);
    }
  };
  
  const getMockAppointments = (): Appointment[] => {
    return [
      {
        id: '1',
        professional_id: '1',
        customer_id: '101',
        service_id: 's1',
        appointment_date: '2023-08-15',
        appointment_time: '10:00 AM',
        status: 'confirmed',
        price: 35000,
        created_at: new Date().toISOString(),
        professional: {
          id: '1',
          name: 'John Magufuli',
          image: 'https://randomuser.me/api/portraits/men/32.jpg',
          phone: '+255 712 345 678',
        },
        customer: {
          id: '101',
          name: 'Sarah Johnson',
          image: 'https://randomuser.me/api/portraits/women/33.jpg',
          phone: '+255 756 789 012',
        },
        service: {
          id: 's1',
          title: 'Home Plumbing Services'
        }
      },
      {
        id: '2',
        professional_id: '2',
        customer_id: '102',
        service_id: 's2',
        appointment_date: '2023-08-18',
        appointment_time: '2:30 PM',
        status: 'pending',
        price: 25000,
        created_at: new Date().toISOString(),
        professional: {
          id: '2',
          name: 'Maria Kimaro',
          image: 'https://randomuser.me/api/portraits/women/44.jpg',
          phone: '+255 787 654 321',
        },
        customer: {
          id: '102',
          name: 'Daniel Masika',
          image: 'https://randomuser.me/api/portraits/men/45.jpg',
          phone: '+255 712 987 654',
        },
        service: {
          id: 's2',
          title: 'Professional Haircut'
        }
      },
      {
        id: '3',
        professional_id: '3',
        customer_id: '103',
        service_id: 's3',
        appointment_date: '2023-07-28',
        appointment_time: '11:00 AM',
        status: 'completed',
        price: 150000,
        created_at: new Date().toISOString(),
        professional: {
          id: '3',
          name: 'James Mbongo',
          image: 'https://randomuser.me/api/portraits/men/86.jpg',
          phone: '+255 754 123 456',
        },
        customer: {
          id: '103',
          name: 'Amina Salim',
          image: 'https://randomuser.me/api/portraits/women/63.jpg',
          phone: '+255 789 123 456',
        },
        service: {
          id: 's3',
          title: 'Business Plan Development'
        },
        review: {
          rating: 4,
          comment: 'Great work on the business plan, exactly what I needed!',
        }
      },
      {
        id: '5',
        professional_id: '5',
        customer_id: '105',
        service_id: 's5',
        appointment_date: '2023-07-15',
        appointment_time: '3:00 PM',
        status: 'cancelled',
        price: 80000,
        created_at: new Date().toISOString(),
        professional: {
          id: '5',
          name: 'Emmanuel Mtui',
          image: 'https://randomuser.me/api/portraits/men/55.jpg',
          phone: '+255 789 876 543',
        },
        customer: {
          id: '105',
          name: 'Victoria Mushi',
          image: 'https://randomuser.me/api/portraits/women/12.jpg',
          phone: '+255 712 345 987',
        },
        service: {
          id: 's5',
          title: 'Car Maintenance'
        },
        cancellationReason: 'Professional unavailable due to emergency',
      }
    ];
  };
  
  const renderAppointments = () => {
    if (loading) {
      return (
        <div className="flex justify-center items-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-huduma-green" />
        </div>
      );
    }
    
    const currentAppointments = appointments[activeTab];
    
    if (currentAppointments.length === 0) {
      return (
        <div className="text-center py-12">
          <div className="mb-4 text-foreground/50">
            <Calendar size={48} className="mx-auto" />
          </div>
          <h3 className="text-xl font-medium mb-2">No {activeTab} appointments</h3>
          <p className="text-foreground/70">
            {activeTab === 'upcoming' 
              ? 'You have no upcoming appointments scheduled' 
              : activeTab === 'completed'
                ? 'You have no completed appointments yet'
                : 'You have no cancelled appointments'}
          </p>
        </div>
      );
    }
    
    return (
      <div className="space-y-4">
        {currentAppointments.map((appointment) => {
          const person = userMode === 'customer' 
            ? appointment.professional 
            : appointment.customer;
          
          if (!person) return null;
          
          const formattedDate = new Date(appointment.appointment_date).toLocaleDateString('en-US', {
            weekday: 'short',
            month: 'short',
            day: 'numeric',
          });
          const formattedPrice = new Intl.NumberFormat('en-US').format(appointment.price);
          
          let statusColor = 'bg-blue-500';
          let statusIcon = <Clock size={16} />;
          
          if (appointment.status === 'confirmed') {
            statusColor = 'bg-green-500';
            statusIcon = <CheckCircle size={16} />;
          } else if (appointment.status === 'cancelled') {
            statusColor = 'bg-red-500';
            statusIcon = <XCircle size={16} />;
          } else if (appointment.status === 'completed') {
            statusColor = 'bg-purple-500';
            statusIcon = <CheckCircle size={16} />;
          }
          
          return (
            <div key={appointment.id} className="bg-white rounded-2xl border border-border overflow-hidden">
              <div className={`${statusColor} h-1 w-full`}></div>
              
              <div className="p-5">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className={`inline-flex items-center gap-1 py-1 px-2 rounded-full text-white text-xs ${statusColor}`}>
                        {statusIcon}
                        <span className="capitalize">{appointment.status}</span>
                      </span>
                      
                      <span className="text-foreground/60 text-sm">#{appointment.id.substring(0, 8)}</span>
                    </div>
                    
                    <h3 className="font-medium text-lg mb-1">{appointment.service?.title || 'Service'}</h3>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    {activeTab === 'upcoming' && (
                      <button className="py-2 px-4 rounded-lg bg-huduma-light-green text-huduma-green hover:bg-huduma-green hover:text-white transition-colors font-medium">
                        {userMode === 'customer' ? 'Reschedule' : 'Confirm'}
                      </button>
                    )}
                    
                    {activeTab === 'completed' && userMode === 'customer' && !appointment.review && (
                      <button className="py-2 px-4 rounded-lg bg-huduma-light-green text-huduma-green hover:bg-huduma-green hover:text-white transition-colors font-medium">
                        Leave Review
                      </button>
                    )}
                    
                    <span className="font-bold">{formattedPrice} TZS</span>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
                      <img 
                        src={person.image} 
                        alt={person.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    
                    <div>
                      <div className="text-sm text-foreground/70">
                        {userMode === 'customer' ? 'Professional' : 'Customer'}
                      </div>
                      <div className="font-medium">{person.name}</div>
                      <div className="text-sm text-foreground/70">{person.phone}</div>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-foreground/70">
                      <Calendar size={16} className="flex-shrink-0" />
                      <span>{formattedDate} at {appointment.appointment_time}</span>
                    </div>
                    
                    <div className="flex items-start gap-2 text-foreground/70">
                      <MapPin size={16} className="flex-shrink-0 mt-0.5" />
                      <span>Service location information</span>
                    </div>
                  </div>
                </div>
                
                {appointment.status === 'cancelled' && appointment.cancellationReason && (
                  <div className="mt-3 flex items-start gap-2 bg-red-50 text-red-600 p-3 rounded-lg">
                    <AlertTriangle size={16} className="flex-shrink-0 mt-0.5" />
                    <span>{appointment.cancellationReason}</span>
                  </div>
                )}
                
                {appointment.status === 'completed' && appointment.review && (
                  <div className="mt-3 p-3 bg-purple-50 rounded-lg">
                    <div className="flex items-center gap-2 mb-1">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <svg 
                          key={i} 
                          xmlns="http://www.w3.org/2000/svg" 
                          width="16" 
                          height="16" 
                          viewBox="0 0 24 24" 
                          fill={i < appointment.review!.rating ? "#FFD700" : "none"} 
                          stroke={i < appointment.review!.rating ? "#FFD700" : "#6B7280"} 
                          strokeWidth="2" 
                          strokeLinecap="round" 
                          strokeLinejoin="round"
                        >
                          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                        </svg>
                      ))}
                      <span className="text-sm text-foreground/60">Customer Review</span>
                    </div>
                    <p className="text-foreground/80">{appointment.review.comment}</p>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    );
  };
  
  return (
    <Layout>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl md:text-3xl font-bold">Appointments</h1>
      </div>
      
      <div className="mb-6">
        <div className="flex border-b border-border">
          <button
            onClick={() => setActiveTab('upcoming')}
            className={`py-3 px-4 border-b-2 font-medium transition-colors ${
              activeTab === 'upcoming' 
                ? 'border-huduma-green text-huduma-green' 
                : 'border-transparent text-foreground/70 hover:text-foreground'
            }`}
          >
            Upcoming
          </button>
          
          <button
            onClick={() => setActiveTab('completed')}
            className={`py-3 px-4 border-b-2 font-medium transition-colors ${
              activeTab === 'completed' 
                ? 'border-huduma-green text-huduma-green' 
                : 'border-transparent text-foreground/70 hover:text-foreground'
            }`}
          >
            Completed
          </button>
          
          <button
            onClick={() => setActiveTab('cancelled')}
            className={`py-3 px-4 border-b-2 font-medium transition-colors ${
              activeTab === 'cancelled' 
                ? 'border-huduma-green text-huduma-green' 
                : 'border-transparent text-foreground/70 hover:text-foreground'
            }`}
          >
            Cancelled
          </button>
        </div>
      </div>
      
      {renderAppointments()}
    </Layout>
  );
};

export default Appointments;
