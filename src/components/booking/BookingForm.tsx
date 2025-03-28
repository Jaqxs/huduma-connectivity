
import React, { useState } from 'react';
import { useAuth } from '@/hooks/use-auth';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Calendar as CalendarIcon, Clock, CheckCircle, Loader2 } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface BookingFormProps {
  professionalId: string;
  serviceId?: string; 
  services?: { id: string; title: string }[];
  professionalName: string;
  trigger?: React.ReactNode;
  onSuccess?: () => void;
}

const availableTimeSlots = [
  '08:00 AM', '09:00 AM', '10:00 AM', '11:00 AM', 
  '12:00 PM', '01:00 PM', '02:00 PM', '03:00 PM', 
  '04:00 PM', '05:00 PM', '06:00 PM'
];

const BookingForm: React.FC<BookingFormProps> = ({ 
  professionalId, 
  serviceId,
  services = [],
  professionalName,
  trigger,
  onSuccess
}) => {
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [timeSlot, setTimeSlot] = useState<string>('');
  const [selectedServiceId, setSelectedServiceId] = useState<string>(serviceId || '');
  const [notes, setNotes] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [open, setOpen] = useState(false);
  
  const { user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleBookAppointment = async () => {
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please sign in to book an appointment",
        variant: "destructive"
      });
      setOpen(false);
      navigate('/auth');
      return;
    }

    if (!date || !timeSlot || !selectedServiceId) {
      toast({
        title: "Missing Information",
        description: "Please select a date, time and service",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);
    
    try {
      const { data, error } = await supabase
        .from('appointments')
        .insert([
          { 
            professional_id: professionalId,
            customer_id: user.id,
            service_id: selectedServiceId,
            appointment_date: format(date, 'yyyy-MM-dd'),
            appointment_time: timeSlot,
            status: 'pending',
            price: 0, // This would typically come from the service price
          }
        ])
        .select();
      
      if (error) throw error;
      
      setIsSuccess(true);
      
      toast({
        title: "Appointment Booked Successfully",
        description: `Your appointment with ${professionalName} has been scheduled`,
      });
      
      // Reset form after success
      setTimeout(() => {
        setDate(undefined);
        setTimeSlot('');
        setNotes('');
        setIsSuccess(false);
        setOpen(false);
        if (onSuccess) onSuccess();
      }, 2000);
      
    } catch (error: any) {
      console.error('Error booking appointment:', error);
      toast({
        title: "Booking Error",
        description: error.message || "Failed to book appointment. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const defaultTrigger = (
    <Button className="bg-gradient-to-r from-huduma-green to-huduma-teal hover:shadow-glow transition-all">
      <CalendarIcon size={18} className="mr-2" />
      Book Now
    </Button>
  );
  
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || defaultTrigger}
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Book Appointment with {professionalName}</DialogTitle>
        </DialogHeader>
        
        {isSuccess ? (
          <div className="py-8 text-center">
            <div className="mb-4 flex justify-center">
              <div className="w-16 h-16 bg-huduma-light-green rounded-full flex items-center justify-center">
                <CheckCircle className="h-8 w-8 text-huduma-green" />
              </div>
            </div>
            <h3 className="text-lg font-semibold mb-2">Booking Confirmed!</h3>
            <p className="text-muted-foreground">
              Your appointment has been successfully scheduled.
            </p>
          </div>
        ) : (
          <div className="py-4 space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Select Service</label>
              <Select
                value={selectedServiceId}
                onValueChange={setSelectedServiceId}
                disabled={Boolean(serviceId) || isSubmitting}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a service" />
                </SelectTrigger>
                <SelectContent>
                  {services.map((service) => (
                    <SelectItem key={service.id} value={service.id}>
                      {service.title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Select Date</label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !date && "text-muted-foreground"
                    )}
                    disabled={isSubmitting}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, "PPP") : "Select a date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    disabled={(date) => 
                      date < new Date(new Date().setHours(0, 0, 0, 0)) || 
                      date > new Date(new Date().setMonth(new Date().getMonth() + 2))
                    }
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Select Time</label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !timeSlot && "text-muted-foreground"
                    )}
                    disabled={isSubmitting}
                  >
                    <Clock className="mr-2 h-4 w-4" />
                    {timeSlot || "Select a time"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <div className="grid grid-cols-3 gap-2 p-2 max-h-[300px] overflow-y-auto">
                    {availableTimeSlots.map((time) => (
                      <Button
                        key={time}
                        variant="outline"
                        className={cn(
                          "justify-center",
                          timeSlot === time && "bg-huduma-light-green text-huduma-green"
                        )}
                        onClick={() => setTimeSlot(time)}
                      >
                        {time}
                      </Button>
                    ))}
                  </div>
                </PopoverContent>
              </Popover>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Additional Notes</label>
              <Textarea 
                placeholder="Describe what you need help with..." 
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="resize-none"
                disabled={isSubmitting}
              />
            </div>
          </div>
        )}
        
        <DialogFooter>
          {!isSuccess && (
            <>
              <DialogClose asChild>
                <Button variant="outline" disabled={isSubmitting}>
                  Cancel
                </Button>
              </DialogClose>
              <Button 
                onClick={handleBookAppointment} 
                className="bg-gradient-to-r from-huduma-green to-huduma-teal hover:shadow-glow"
                disabled={isSubmitting || !date || !timeSlot || !selectedServiceId}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Processing...
                  </>
                ) : (
                  'Confirm Booking'
                )}
              </Button>
            </>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default BookingForm;
