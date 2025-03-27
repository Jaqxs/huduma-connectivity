
import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { Calendar, Clock, MapPin, User, Phone, FileText, CheckCircle, XCircle, AlertTriangle } from 'lucide-react';
import { useUserContext } from '@/context/UserContext';

const Appointments: React.FC = () => {
  const { userMode } = useUserContext();
  const [activeTab, setActiveTab] = useState<'upcoming' | 'completed' | 'cancelled'>('upcoming');
  
  // Sample appointments data
  const appointments = {
    upcoming: [
      {
        id: '1',
        serviceName: 'Home Plumbing Services',
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
        date: '2023-08-15',
        time: '10:00 AM',
        location: '123 Kariakoo St, Dar es Salaam',
        status: 'confirmed',
        price: 35000,
      },
      {
        id: '2',
        serviceName: 'Professional Haircut',
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
        date: '2023-08-18',
        time: '2:30 PM',
        location: '45 Upanga Road, Dar es Salaam',
        status: 'pending',
        price: 25000,
      },
    ],
    completed: [
      {
        id: '3',
        serviceName: 'Business Plan Development',
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
        date: '2023-07-28',
        time: '11:00 AM',
        location: '78 Mwenge St, Dar es Salaam',
        status: 'completed',
        price: 150000,
        review: {
          rating: 4,
          comment: 'Great work on the business plan, exactly what I needed!',
        },
      },
      {
        id: '4',
        serviceName: 'Deep Home Cleaning',
        professional: {
          id: '4',
          name: 'Sarah Lweno',
          image: 'https://randomuser.me/api/portraits/women/67.jpg',
          phone: '+255 712 234 567',
        },
        customer: {
          id: '104',
          name: 'Joseph Mkunde',
          image: 'https://randomuser.me/api/portraits/men/22.jpg',
          phone: '+255 767 891 234',
        },
        date: '2023-07-22',
        time: '09:00 AM',
        location: '34 Mikocheni B, Dar es Salaam',
        status: 'completed',
        price: 45000,
        review: {
          rating: 5,
          comment: 'My house has never been cleaner. Excellent service!',
        },
      },
    ],
    cancelled: [
      {
        id: '5',
        serviceName: 'Car Maintenance',
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
        date: '2023-07-15',
        time: '3:00 PM',
        location: '56 Tegeta, Dar es Salaam',
        status: 'cancelled',
        price: 80000,
        cancellationReason: 'Professional unavailable due to emergency',
      },
    ],
  };
  
  // Function to render appointments based on active tab
  const renderAppointments = () => {
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
          // Determine which person to show based on user mode
          const person = userMode === 'customer' 
            ? appointment.professional 
            : appointment.customer;
          
          // Format date and price
          const formattedDate = new Date(appointment.date).toLocaleDateString('en-US', {
            weekday: 'short',
            month: 'short',
            day: 'numeric',
          });
          const formattedPrice = new Intl.NumberFormat('en-US').format(appointment.price);
          
          // Status indicator
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
                      
                      <span className="text-foreground/60 text-sm">#{appointment.id}</span>
                    </div>
                    
                    <h3 className="font-medium text-lg mb-1">{appointment.serviceName}</h3>
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
                      <span>{formattedDate} at {appointment.time}</span>
                    </div>
                    
                    <div className="flex items-start gap-2 text-foreground/70">
                      <MapPin size={16} className="flex-shrink-0 mt-0.5" />
                      <span>{appointment.location}</span>
                    </div>
                  </div>
                </div>
                
                {appointment.status === 'cancelled' && (
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
