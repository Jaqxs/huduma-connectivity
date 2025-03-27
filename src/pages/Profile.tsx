
import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { User, MapPin, Phone, Mail, Calendar, Star, Edit, LogOut, Settings, Shield, Award, BookOpen, Languages, Upload, Save, Plus } from 'lucide-react';
import { useUserContext } from '@/context/UserContext';

const Profile: React.FC = () => {
  const { userMode } = useUserContext();
  const [activeTab, setActiveTab] = useState<'profile' | 'settings'>('profile');
  const [isEditing, setIsEditing] = useState(false);
  
  // Sample user data
  const user = {
    name: userMode === 'professional' ? 'John Magufuli' : 'Sarah Johnson',
    email: userMode === 'professional' ? 'john.magufuli@example.com' : 'sarah.johnson@example.com',
    phone: userMode === 'professional' ? '+255 712 345 678' : '+255 756 789 012',
    location: 'Dar es Salaam, Tanzania',
    joinDate: 'June 2021',
    image: userMode === 'professional' 
      ? 'https://randomuser.me/api/portraits/men/32.jpg' 
      : 'https://randomuser.me/api/portraits/women/33.jpg',
    rating: 4.8,
    ratingCount: 156,
    bio: userMode === 'professional' 
      ? `I am a certified master plumber with over 10 years of experience in residential and commercial plumbing services. I specialize in fixing leaks, installing new fixtures, and troubleshooting complex plumbing issues.

I take pride in my work and always ensure customer satisfaction. I use only high-quality materials and provide warranties for all my services.` 
      : `Passionate about finding reliable professionals for all my home needs. I value quality service and timely completion of projects.`,
    profession: userMode === 'professional' ? 'Master Plumber' : null,
    languages: ['English', 'Swahili'],
    certifications: userMode === 'professional' 
      ? ['Master Plumber License', 'Water System Specialist'] 
      : [],
    education: userMode === 'professional' ? 'Certificate in Plumbing, Dar Technical College' : 'Bachelor of Business, University of Dar es Salaam',
  };
  
  return (
    <Layout>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl md:text-3xl font-bold">Profile</h1>
        
        {!isEditing ? (
          <button 
            onClick={() => setIsEditing(true)}
            className="flex items-center gap-1.5 py-2 px-4 rounded-lg bg-huduma-light-green text-huduma-green hover:bg-huduma-green hover:text-white transition-colors"
          >
            <Edit size={18} />
            <span>Edit Profile</span>
          </button>
        ) : (
          <button 
            onClick={() => setIsEditing(false)}
            className="flex items-center gap-1.5 py-2 px-4 rounded-lg bg-huduma-green text-white hover:bg-huduma-green/90 transition-colors"
          >
            <Save size={18} />
            <span>Save Changes</span>
          </button>
        )}
      </div>
      
      <div className="mb-6">
        <div className="flex border-b border-border">
          <button
            onClick={() => setActiveTab('profile')}
            className={`py-3 px-4 border-b-2 font-medium transition-colors ${
              activeTab === 'profile' 
                ? 'border-huduma-green text-huduma-green' 
                : 'border-transparent text-foreground/70 hover:text-foreground'
            }`}
          >
            Profile
          </button>
          
          <button
            onClick={() => setActiveTab('settings')}
            className={`py-3 px-4 border-b-2 font-medium transition-colors ${
              activeTab === 'settings' 
                ? 'border-huduma-green text-huduma-green' 
                : 'border-transparent text-foreground/70 hover:text-foreground'
            }`}
          >
            Settings
          </button>
        </div>
      </div>
      
      {activeTab === 'profile' ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left column - Profile Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl border border-border p-5 sticky top-20">
              <div className="flex flex-col items-center text-center mb-6">
                <div className="relative mb-4">
                  <div className="w-24 h-24 rounded-full overflow-hidden">
                    <img 
                      src={user.image} 
                      alt={user.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  {isEditing && (
                    <button className="absolute bottom-0 right-0 p-1.5 bg-huduma-green text-white rounded-full">
                      <Upload size={16} />
                    </button>
                  )}
                </div>
                
                <h2 className="text-xl font-bold">{user.name}</h2>
                
                {userMode === 'professional' && (
                  <div className="mt-1 text-foreground/70">{user.profession}</div>
                )}
                
                {userMode === 'professional' && (
                  <div className="flex items-center justify-center gap-1 mt-2 text-huduma-yellow">
                    <Star size={16} className="fill-huduma-yellow" />
                    <span className="font-medium">{user.rating.toFixed(1)}</span>
                    <span className="text-foreground/60 text-sm">({user.ratingCount} reviews)</span>
                  </div>
                )}
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-huduma-light-green flex items-center justify-center text-huduma-green">
                    <MapPin size={16} />
                  </div>
                  
                  {isEditing ? (
                    <input 
                      type="text" 
                      defaultValue={user.location}
                      className="flex-grow p-2 border border-border rounded-lg"
                    />
                  ) : (
                    <div>{user.location}</div>
                  )}
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-huduma-light-green flex items-center justify-center text-huduma-green">
                    <Phone size={16} />
                  </div>
                  
                  {isEditing ? (
                    <input 
                      type="tel" 
                      defaultValue={user.phone}
                      className="flex-grow p-2 border border-border rounded-lg"
                    />
                  ) : (
                    <div>{user.phone}</div>
                  )}
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-huduma-light-green flex items-center justify-center text-huduma-green">
                    <Mail size={16} />
                  </div>
                  
                  {isEditing ? (
                    <input 
                      type="email" 
                      defaultValue={user.email}
                      className="flex-grow p-2 border border-border rounded-lg"
                    />
                  ) : (
                    <div>{user.email}</div>
                  )}
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-huduma-light-green flex items-center justify-center text-huduma-green">
                    <Calendar size={16} />
                  </div>
                  <div>Member since {user.joinDate}</div>
                </div>
              </div>
              
              <div className="mt-6 pt-6 border-t">
                <button className="w-full flex items-center justify-center gap-1.5 py-2 rounded-lg text-red-600 hover:bg-red-50 transition-colors">
                  <LogOut size={18} />
                  <span>Log Out</span>
                </button>
              </div>
            </div>
          </div>
          
          {/* Right column - Profile Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Bio section */}
            <div className="bg-white rounded-2xl border border-border p-5">
              <h2 className="text-lg font-bold mb-3">About Me</h2>
              
              {isEditing ? (
                <textarea 
                  defaultValue={user.bio}
                  rows={6}
                  className="w-full p-3 border border-border rounded-lg"
                ></textarea>
              ) : (
                <p className="whitespace-pre-line text-foreground/80">{user.bio}</p>
              )}
            </div>
            
            {/* Additional details */}
            <div className="bg-white rounded-2xl border border-border p-5">
              <h2 className="text-lg font-bold mb-4">Additional Information</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <div className="flex items-start gap-3 mb-4">
                    <div className="w-8 h-8 mt-0.5 rounded-full bg-huduma-light-green flex items-center justify-center text-huduma-green">
                      <Languages size={16} />
                    </div>
                    
                    <div>
                      <h3 className="font-medium mb-2">Languages</h3>
                      
                      {isEditing ? (
                        <div className="space-y-2">
                          {user.languages.map((lang, index) => (
                            <div key={index} className="flex items-center gap-2">
                              <input 
                                type="text" 
                                defaultValue={lang}
                                className="p-2 border border-border rounded-lg"
                              />
                              <button className="text-red-500">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
                              </button>
                            </div>
                          ))}
                          <button className="text-huduma-green flex items-center gap-1 mt-2">
                            <Plus size={14} />
                            <span>Add Language</span>
                          </button>
                        </div>
                      ) : (
                        <ul className="space-y-1">
                          {user.languages.map((lang, index) => (
                            <li key={index}>{lang}</li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 mt-0.5 rounded-full bg-huduma-light-green flex items-center justify-center text-huduma-green">
                      <BookOpen size={16} />
                    </div>
                    
                    <div>
                      <h3 className="font-medium mb-2">Education</h3>
                      
                      {isEditing ? (
                        <input 
                          type="text" 
                          defaultValue={user.education}
                          className="w-full p-2 border border-border rounded-lg"
                        />
                      ) : (
                        <div>{user.education}</div>
                      )}
                    </div>
                  </div>
                </div>
                
                {userMode === 'professional' && (
                  <div>
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 mt-0.5 rounded-full bg-huduma-light-green flex items-center justify-center text-huduma-green">
                        <Award size={16} />
                      </div>
                      
                      <div>
                        <h3 className="font-medium mb-2">Certifications</h3>
                        
                        {isEditing ? (
                          <div className="space-y-2">
                            {user.certifications.map((cert, index) => (
                              <div key={index} className="flex items-center gap-2">
                                <input 
                                  type="text" 
                                  defaultValue={cert}
                                  className="flex-grow p-2 border border-border rounded-lg"
                                />
                                <button className="text-red-500">
                                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
                                </button>
                              </div>
                            ))}
                            <button className="text-huduma-green flex items-center gap-1 mt-2">
                              <Plus size={14} />
                              <span>Add Certification</span>
                            </button>
                          </div>
                        ) : (
                          <ul className="space-y-1">
                            {user.certifications.map((cert, index) => (
                              <li key={index}>{cert}</li>
                            ))}
                          </ul>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
            
            {userMode === 'professional' && (
              <div className="bg-white rounded-2xl border border-border p-5">
                <h2 className="text-lg font-bold mb-4">Professional Information</h2>
                
                <div className="space-y-4">
                  <div>
                    <label className="block font-medium mb-2">Professional Title</label>
                    {isEditing ? (
                      <input 
                        type="text" 
                        defaultValue={user.profession}
                        className="w-full p-2 border border-border rounded-lg"
                      />
                    ) : (
                      <div>{user.profession}</div>
                    )}
                  </div>
                  
                  <div>
                    <label className="block font-medium mb-2">Services Offered</label>
                    {isEditing ? (
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <input 
                            type="text" 
                            defaultValue="Home Plumbing Services & Repairs"
                            className="flex-grow p-2 border border-border rounded-lg"
                          />
                          <button className="text-red-500">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
                          </button>
                        </div>
                        <div className="flex items-center gap-2">
                          <input 
                            type="text" 
                            defaultValue="Emergency Plumbing Repairs"
                            className="flex-grow p-2 border border-border rounded-lg"
                          />
                          <button className="text-red-500">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
                          </button>
                        </div>
                        <button className="text-huduma-green flex items-center gap-1 mt-2">
                          <Plus size={14} />
                          <span>Add Service</span>
                        </button>
                      </div>
                    ) : (
                      <ul className="space-y-1">
                        <li>Home Plumbing Services & Repairs</li>
                        <li>Emergency Plumbing Repairs</li>
                        <li>Bathroom Installation & Renovation</li>
                      </ul>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      ) : (
        /* Settings Tab */
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl border border-border p-5 sticky top-20">
              <div className="flex flex-col space-y-1">
                <button className="flex items-center gap-2 py-2 px-3 rounded-lg bg-huduma-light-green text-huduma-green">
                  <User size={18} />
                  <span>Account Settings</span>
                </button>
                
                <button className="flex items-center gap-2 py-2 px-3 rounded-lg hover:bg-huduma-neutral text-foreground/70">
                  <Shield size={18} />
                  <span>Privacy & Security</span>
                </button>
                
                <button className="flex items-center gap-2 py-2 px-3 rounded-lg hover:bg-huduma-neutral text-foreground/70">
                  <Settings size={18} />
                  <span>Preferences</span>
                </button>
              </div>
            </div>
          </div>
          
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl border border-border p-5">
              <h2 className="text-lg font-bold mb-4">Account Settings</h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block font-medium mb-2">Full Name</label>
                  <input 
                    type="text" 
                    defaultValue={user.name}
                    className="w-full p-2 border border-border rounded-lg"
                  />
                </div>
                
                <div>
                  <label className="block font-medium mb-2">Email Address</label>
                  <input 
                    type="email" 
                    defaultValue={user.email}
                    className="w-full p-2 border border-border rounded-lg"
                  />
                </div>
                
                <div>
                  <label className="block font-medium mb-2">Phone Number</label>
                  <input 
                    type="tel" 
                    defaultValue={user.phone}
                    className="w-full p-2 border border-border rounded-lg"
                  />
                </div>
                
                <div className="pt-4 border-t">
                  <h3 className="font-medium mb-3">Change Password</h3>
                  
                  <div className="space-y-3">
                    <div>
                      <label className="block text-sm mb-1">Current Password</label>
                      <input 
                        type="password" 
                        className="w-full p-2 border border-border rounded-lg"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm mb-1">New Password</label>
                      <input 
                        type="password" 
                        className="w-full p-2 border border-border rounded-lg"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm mb-1">Confirm New Password</label>
                      <input 
                        type="password" 
                        className="w-full p-2 border border-border rounded-lg"
                      />
                    </div>
                  </div>
                </div>
                
                <div className="pt-4 flex justify-end">
                  <button className="py-2 px-4 bg-huduma-green text-white rounded-lg hover:bg-huduma-green/90 transition-colors">
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default Profile;
