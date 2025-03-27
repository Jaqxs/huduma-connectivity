
import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Star, BadgeCheck } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ProfessionalCardProps {
  id: string;
  name: string;
  profession: string;
  image: string;
  rating: number;
  ratingCount: number;
  location: string;
  verified?: boolean;
  available?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

const ProfessionalCard: React.FC<ProfessionalCardProps> = ({
  id,
  name,
  profession,
  image,
  rating,
  ratingCount,
  location,
  verified = false,
  available = true,
  className,
  style
}) => {
  return (
    <Link 
      to={`/professionals/${id}`}
      className={cn(
        "group flex flex-col overflow-hidden rounded-2xl bg-white transition-all duration-300",
        "border border-border hover:shadow-md hover:-translate-y-1",
        className
      )}
      style={style}
    >
      <div className="p-4 flex items-center gap-4">
        <div className="relative flex-shrink-0">
          <div className="w-16 h-16 rounded-full overflow-hidden">
            <img 
              src={image} 
              alt={name}
              className="w-full h-full object-cover"
            />
          </div>
          {available && (
            <span className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-500 rounded-full border-2 border-white"></span>
          )}
        </div>
        
        <div className="flex-grow min-w-0">
          <div className="flex items-center gap-1">
            <h3 className="font-medium text-base truncate">{name}</h3>
            {verified && (
              <BadgeCheck size={16} className="text-huduma-green flex-shrink-0" />
            )}
          </div>
          
          <p className="text-sm text-foreground/70 mt-0.5">{profession}</p>
          
          <div className="mt-1 flex items-center gap-2">
            <div className="flex items-center gap-1">
              <Star size={14} className="fill-huduma-yellow text-huduma-yellow" />
              <span className="text-sm font-medium">{rating.toFixed(1)}</span>
              <span className="text-xs text-foreground/60">({ratingCount})</span>
            </div>
            
            <span className="text-foreground/30">•</span>
            
            <div className="flex items-center gap-1 text-foreground/70">
              <MapPin size={14} />
              <span className="text-xs truncate">{location}</span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="mt-auto p-4 pt-0 flex justify-between items-center">
        <span className="text-sm text-foreground/70">
          {available ? (
            <span className="text-green-600">Available Now</span>
          ) : (
            <span className="text-foreground/50">Unavailable</span>
          )}
        </span>
        
        <button className="bg-huduma-light-green hover:bg-huduma-green hover:text-white text-huduma-green py-1.5 px-3 rounded-lg text-sm font-medium transition-colors duration-300">
          View Profile
        </button>
      </div>
    </Link>
  );
};

export default ProfessionalCard;
