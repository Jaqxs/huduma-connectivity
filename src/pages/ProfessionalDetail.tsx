
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { ArrowLeft, Star, MapPin, Clock, CheckCircle, Calendar, BadgeCheck, Award, BookOpen, MessageCircle, Share2 } from 'lucide-react';
import ServiceCard from '@/components/ui/ServiceCard';

const ProfessionalDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  
  // Sample professional data (in a real app, fetch based on id)
  const professional = {
    id: '1',
    name: 'John Magufuli',
    profession: 'Master Plumber',
    image: 'https://randomuser.me/api/portraits/men/32.jpg',
    rating: 4.8,
    ratingCount: 156,
    location: 'Dar es Salaam',
    verified: true,
    available: true,
    about: `I am a certified master plumber with over 10 years of experience in residential and commercial plumbing services. I specialize in fixing leaks, installing new fixtures, and troubleshooting complex plumbing issues.
    
    I take pride in my work and always ensure customer satisfaction. I use only high-quality materials and provide warranties for all my services.`,
    languages: ['English', 'Swahili'],
    experience: '10+ years',
    completedJobs: 246,
    education: 'Certificate in Plumbing, Dar Technical College',
    certifications: ['Master Plumber License', 'Water System Specialist'],
    workingHours: 'Mon-Fri: 8am-6pm, Sat: 9am-3pm',
    services: [
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
        id: '10',
        title: 'Emergency Plumbing Repairs',
        category: 'Plumbing',
        image: 'https://images.unsplash.com/photo-1573599852326-2d4da0bbe613?ixid=M3wxMjA3fDB8MXxzZWFyY2h8MTR8fHBsdW1iaW5nfGVufDB8fHx8MTY5MDQwMDcwMnww&ixlib=rb-4.0.3&w=600&q=80',
        rating: 4.9,
        ratingCount: 78,
        price: 50000,
        location: 'Dar es Salaam',
        estimatedTime: '1 hour',
      },
      {
        id: '11',
        title: 'Bathroom Installation & Renovation',
        category: 'Plumbing',
        image: 'https://images.unsplash.com/photo-1584622781867-1c5e55395a6f?ixid=M3wxMjA3fDB8MXxzZWFyY2h8MjB8fHBsdW1iaW5nfGVufDB8fHx8MTY5MDQwMDcwMnww&ixlib=rb-4.0.3&w=600&q=80',
        rating: 4.7,
        ratingCount: 42,
        price: 200000,
        location: 'Dar es Salaam',
        estimatedTime: '1-3 days',
      },
    ],
    reviews: [
      {
        id: '101',
        name: 'Ahmed Hassan',
        rating: 5,
        date: '2023-07-15',
        comment: 'John was very professional and fixed our leaking pipes quickly. He even gave us advice on how to prevent future issues. Highly recommend!',
        serviceType: 'Home Plumbing Services'
      },
      {
        id: '102',
        name: 'Grace Mwakio',
        rating: 4,
        date: '2023-06-22',
        comment: 'Good job installing our new bathroom fixtures. Arrived on time and completed the work as promised.',
        serviceType: 'Bathroom Installation'
      },
      {
        id: '103',
        name: 'David Mkumbo',
        rating: 5,
        date: '2023-05-10',
        comment: 'Responded quickly to our emergency call when our water heater broke. Fixed it the same day and charged a fair price.',
        serviceType: 'Emergency Repairs'
      },
    ]
  };
  
  return (
    <Layout>
      <div className="mb-6">
        <Link to="/professionals" className="flex items-center gap-2 text-foreground/70 hover:text-foreground transition-colors">
          <ArrowLeft size={18} />
          <span>Back to professionals</span>
        </Link>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left column - professional info */}
        <div className="lg:col-span-2 space-y-8">
          {/* Professional header info */}
          <div className="bg-white rounded-2xl border border-border p-6">
            <div className="flex flex-col md:flex-row md:items-center gap-6">
              <div className="relative flex-shrink-0">
                <div className="w-24 h-24 rounded-full overflow-hidden">
                  <img 
                    src={professional.image} 
                    alt={professional.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                {professional.verified && (
                  <div className="absolute -right-1 -bottom-1 bg-huduma-green text-white p-1 rounded-full">
                    <BadgeCheck size={20} />
                  </div>
                )}
              </div>
              
              <div className="flex-grow">
                <div className="flex items-center flex-wrap gap-2 mb-1">
                  <h1 className="text-2xl font-bold">{professional.name}</h1>
                  {professional.verified && (
                    <span className="bg-huduma-light-green text-huduma-green text-xs px-2 py-0.5 rounded-full font-medium">
                      Verified
                    </span>
                  )}
                  {professional.available && (
                    <span className="bg-green-100 text-green-700 text-xs px-2 py-0.5 rounded-full font-medium">
                      Available Now
                    </span>
                  )}
                </div>
                
                <p className="text-foreground/70 mb-3">{professional.profession}</p>
                
                <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
                  <div className="flex items-center gap-1 text-huduma-yellow">
                    <Star size={18} className="fill-huduma-yellow" />
                    <span className="font-medium">{professional.rating.toFixed(1)}</span>
                    <span className="text-foreground/60">({professional.ratingCount} reviews)</span>
                  </div>
                  
                  <div className="flex items-center gap-1 text-foreground/70">
                    <MapPin size={16} />
                    <span>{professional.location}</span>
                  </div>
                  
                  <div className="flex items-center gap-1 text-foreground/70">
                    <Clock size={16} />
                    <span>{professional.experience} experience</span>
                  </div>
                </div>
              </div>
              
              <div className="flex gap-2 md:self-start flex-shrink-0">
                <button className="p-2 rounded-full bg-huduma-neutral text-foreground/70 hover:bg-huduma-light-green hover:text-huduma-green transition-colors">
                  <Share2 size={20} />
                </button>
                <button className="p-2 rounded-full bg-huduma-neutral text-foreground/70 hover:bg-huduma-light-green hover:text-huduma-green transition-colors">
                  <MessageCircle size={20} />
                </button>
              </div>
            </div>
          </div>
          
          {/* About section */}
          <div className="bg-white rounded-2xl border border-border p-6">
            <h2 className="text-xl font-bold mb-4">About</h2>
            <p className="whitespace-pre-line text-foreground/80 mb-6">{professional.about}</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h3 className="font-medium text-foreground/70 mb-1">Languages</h3>
                <p>{professional.languages.join(', ')}</p>
              </div>
              
              <div>
                <h3 className="font-medium text-foreground/70 mb-1">Working Hours</h3>
                <p>{professional.workingHours}</p>
              </div>
              
              <div>
                <h3 className="font-medium text-foreground/70 mb-1">Completed Jobs</h3>
                <p>{professional.completedJobs}</p>
              </div>
              
              <div>
                <h3 className="font-medium text-foreground/70 mb-1">Education</h3>
                <p>{professional.education}</p>
              </div>
            </div>
          </div>
          
          {/* Certifications section */}
          <div className="bg-white rounded-2xl border border-border p-6">
            <h2 className="text-xl font-bold mb-4">Certifications</h2>
            <div className="flex flex-wrap gap-3">
              {professional.certifications.map((cert, index) => (
                <div 
                  key={index}
                  className="flex items-center gap-2 bg-huduma-light-green text-huduma-green rounded-full py-2 px-4"
                >
                  <Award size={16} />
                  <span>{cert}</span>
                </div>
              ))}
            </div>
          </div>
          
          {/* Services section */}
          <div>
            <h2 className="text-xl font-bold mb-4">Services Offered</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {professional.services.map((service) => (
                <ServiceCard
                  key={service.id}
                  {...service}
                />
              ))}
            </div>
          </div>
          
          {/* Reviews section */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold">Reviews</h2>
              <span className="text-foreground/70">{professional.reviews.length} reviews</span>
            </div>
            
            <div className="space-y-4">
              {professional.reviews.map((review) => (
                <div key={review.id} className="bg-white rounded-2xl border border-border p-4">
                  <div className="flex justify-between mb-2">
                    <div className="font-medium">{review.name}</div>
                    <div className="text-sm text-foreground/60">{review.date}</div>
                  </div>
                  
                  <div className="flex items-center gap-1 mb-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star 
                        key={i} 
                        size={16} 
                        className={i < review.rating ? "fill-huduma-yellow text-huduma-yellow" : "text-foreground/30"} 
                      />
                    ))}
                    <span className="text-sm text-foreground/60 ml-2">{review.serviceType}</span>
                  </div>
                  
                  <p className="text-foreground/80">{review.comment}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Right column - booking */}
        <div className="lg:col-span-1">
          <div className="sticky top-20">
            <div className="bg-white rounded-2xl border border-border p-5 mb-6">
              <h2 className="text-lg font-bold mb-4">Book an Appointment</h2>
              
              <div className="space-y-4 mb-6">
                <div>
                  <label className="block text-sm font-medium mb-1">Select Service</label>
                  <select className="w-full p-2 border border-border rounded-lg">
                    <option>Select a service</option>
                    {professional.services.map(service => (
                      <option key={service.id} value={service.id}>
                        {service.title} - {new Intl.NumberFormat('en-US').format(service.price)} TZS
                      </option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Select Date</label>
                  <div className="relative">
                    <input type="date" className="w-full p-2 border border-border rounded-lg" />
                    <div className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none">
                      <Calendar size={16} className="text-foreground/50" />
                    </div>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Select Time</label>
                  <select className="w-full p-2 border border-border rounded-lg">
                    <option>Select a time</option>
                    <option>09:00 AM</option>
                    <option>10:00 AM</option>
                    <option>11:00 AM</option>
                    <option>01:00 PM</option>
                    <option>02:00 PM</option>
                    <option>03:00 PM</option>
                    <option>04:00 PM</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Additional Notes</label>
                  <textarea 
                    rows={3}
                    placeholder="Describe your specific requirements..."
                    className="w-full p-2 border border-border rounded-lg resize-none"
                  ></textarea>
                </div>
              </div>
              
              <button className="w-full py-3 bg-huduma-green text-white rounded-xl font-medium transition-colors hover:bg-huduma-green/90">
                Book Appointment
              </button>
            </div>
            
            <div className="bg-white rounded-2xl border border-border p-5">
              <h3 className="font-medium mb-3">Why Choose {professional.name.split(' ')[0]}</h3>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <CheckCircle size={18} className="text-huduma-green flex-shrink-0 mt-0.5" />
                  <span>Completed {professional.completedJobs}+ jobs successfully</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle size={18} className="text-huduma-green flex-shrink-0 mt-0.5" />
                  <span>Verified professional with certifications</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle size={18} className="text-huduma-green flex-shrink-0 mt-0.5" />
                  <span>{professional.experience} of professional experience</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle size={18} className="text-huduma-green flex-shrink-0 mt-0.5" />
                  <span>High customer satisfaction rating</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProfessionalDetail;
