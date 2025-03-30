import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/use-auth';
import { useToast } from '@/hooks/use-toast';
import Layout from '@/components/layout/Layout';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Loader2, Save, User, MapPin, Phone, BookOpen, Languages } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useUserContext } from '@/context/UserContext';

const profileFormSchema = z.object({
  full_name: z.string().min(2, 'Full name must be at least 2 characters'),
  phone: z.string().min(9, 'Phone number must be at least 9 characters'),
  location: z.string().min(2, 'Location must be at least 2 characters'),
  bio: z.string().optional(),
  profession: z.string().optional(),
  education: z.string().optional(),
  languages: z.string().optional(),
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;

const ProfileSetup = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { user, profile, updateProfile, refreshProfile } = useAuth();
  const { userMode } = useUserContext();
  const navigate = useNavigate();
  const { toast } = useToast();

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      full_name: profile?.full_name || '',
      phone: profile?.phone || '',
      location: profile?.location || '',
      bio: profile?.bio || '',
      profession: profile?.profession || '',
      education: '',
      languages: '',
    },
    mode: 'onChange',
  });

  useEffect(() => {
    if (user && profile) {
      // If the profile is already populated with required fields, redirect to profile page
      if (profile.full_name && profile.phone && profile.location) {
        navigate('/profile');
      } else {
        // Otherwise update form with any existing profile data
        form.reset({
          full_name: profile.full_name || '',
          phone: profile.phone || '',
          location: profile.location || '',
          bio: profile.bio || '',
          profession: profile.profession || '',
          education: '',
          languages: '',
        });
      }
    }
  }, [user, profile, navigate, form]);

  useEffect(() => {
    if (user) {
      refreshProfile();
    }
  }, [user, refreshProfile]);

  const onSubmit = async (data: ProfileFormValues) => {
    if (!user) {
      toast({
        title: 'Authentication required',
        description: 'Please sign in to update your profile',
        variant: 'destructive',
      });
      return;
    }

    setIsSubmitting(true);

    try {
      let languagesArray;
      if (data.languages) {
        languagesArray = data.languages.split(',').map(lang => lang.trim());
      }

      const updates = {
        full_name: data.full_name,
        phone: data.phone,
        location: data.location,
        bio: data.bio,
        profession: userMode === 'professional' ? data.profession : null,
      };

      const { error } = await updateProfile(updates);

      if (error) {
        throw error;
      }

      toast({
        title: 'Profile updated successfully',
        description: 'Your profile information has been saved',
      });

      navigate('/profile');
    } catch (error) {
      console.error('Error updating profile:', error);
      toast({
        title: 'Failed to update profile',
        description: error instanceof Error ? error.message : 'Please try again later',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!user) {
    return (
      <Layout>
        <div className="flex justify-center items-center h-[60vh]">
          <Card>
            <CardHeader>
              <CardTitle>Authentication Required</CardTitle>
              <CardDescription>
                Please sign in to set up your profile
              </CardDescription>
            </CardHeader>
            <CardFooter>
              <Button onClick={() => navigate('/auth')}>Sign In</Button>
            </CardFooter>
          </Card>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container max-w-3xl py-8">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Complete Your Profile</CardTitle>
            <CardDescription>
              Please provide some information about yourself to complete your profile
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="full_name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Full Name</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                            <Input placeholder="John Doe" {...field} className="pl-10" />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone Number</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                            <Input placeholder="+255 712 345 678" {...field} className="pl-10" />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="location"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Location</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                            <Input placeholder="Dar es Salaam, Tanzania" {...field} className="pl-10" />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {userMode === 'professional' && (
                    <FormField
                      control={form.control}
                      name="profession"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Profession</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select your profession" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="Plumber">Plumber</SelectItem>
                              <SelectItem value="Electrician">Electrician</SelectItem>
                              <SelectItem value="Carpenter">Carpenter</SelectItem>
                              <SelectItem value="Painter">Painter</SelectItem>
                              <SelectItem value="Hair Stylist">Hair Stylist</SelectItem>
                              <SelectItem value="Cleaner">Cleaner</SelectItem>
                              <SelectItem value="Cook">Cook</SelectItem>
                              <SelectItem value="Driver">Driver</SelectItem>
                              <SelectItem value="Teacher">Teacher</SelectItem>
                              <SelectItem value="Doctor">Doctor</SelectItem>
                              <SelectItem value="Lawyer">Lawyer</SelectItem>
                              <SelectItem value="Accountant">Accountant</SelectItem>
                              <SelectItem value="Business Consultant">Business Consultant</SelectItem>
                              <SelectItem value="Other">Other</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  )}
                </div>

                <FormField
                  control={form.control}
                  name="bio"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Bio</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder={userMode === 'professional' 
                            ? "Tell customers about your expertise and experience..." 
                            : "Share a little about yourself..."
                          }
                          {...field}
                          rows={5}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="languages"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Languages (separated by commas)</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Languages className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                          <Input placeholder="English, Swahili" {...field} className="pl-10" />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {userMode === 'professional' && (
                  <FormField
                    control={form.control}
                    name="education"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Education/Certification</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <BookOpen className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                            <Input placeholder="Your educational background or professional certifications" {...field} className="pl-10" />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}

                <div className="flex justify-end">
                  <Button
                    type="submit"
                    className="bg-huduma-green hover:bg-huduma-green/90 text-white w-full md:w-auto"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Saving...
                      </>
                    ) : (
                      <>
                        <Save className="mr-2 h-4 w-4" />
                        Complete Profile
                      </>
                    )}
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default ProfileSetup;
