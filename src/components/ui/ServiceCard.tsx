
import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, MapPin, Star, BadgeDollarSign } from 'lucide-react';
import { cn } from '@/lib/utils';
import PremiumBadge from './PremiumBadge';

interface ServiceCardProps {
  id: string;
  title: string;
  category: string;
  image: string;
  rating: number;
  ratingCount: number;
  price: number;
  currency?: string;
  location: string;
  estimatedTime?: string;
  isPremium?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

const ServiceCard: React.FC<ServiceCardProps> = ({
  id,
  title,
  category,
  image,
  rating,
  ratingCount,
  price,
  currency = 'TZS',
  location,
  estimatedTime,
  isPremium = false,
  className,
  style
}) => {
  return (
    <Link 
      to={`/services/${id}`}
      className={cn(
        "group flex flex-col overflow-hidden rounded-2xl bg-white transition-all duration-300",
        "border border-border hover:shadow-md hover:-translate-y-1",
        isPremium && "border-huduma-green/40",
        className
      )}
      style={style}
    >
      <div className="relative w-full aspect-[4/3] overflow-hidden">
        <img 
          src={image} 
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          <span className="inline-block py-1 px-3 bg-white/90 backdrop-blur-sm rounded-full text-xs font-medium">
            {category}
          </span>
          
          {isPremium && (
            <PremiumBadge level="premium" size="sm" />
          )}
        </div>
        
        {isPremium && (
          <div className="absolute inset-0 border-4 border-huduma-green/20 rounded-2xl pointer-events-none" />
        )}
      </div>
      
      <div className="flex flex-col p-4 flex-grow">
        <div className="flex items-start justify-between">
          <h3 className="font-medium text-base line-clamp-2">{title}</h3>
          <div className="flex items-center gap-1 ml-2 flex-shrink-0">
            <Star size={14} className="fill-huduma-yellow text-huduma-yellow" />
            <span className="text-sm font-medium">{rating.toFixed(1)}</span>
            <span className="text-xs text-foreground/60">({ratingCount})</span>
          </div>
        </div>
        
        <div className="mt-3 flex items-center gap-1 text-foreground/70">
          <MapPin size={14} />
          <span className="text-xs">{location}</span>
        </div>
        
        {estimatedTime && (
          <div className="mt-1 flex items-center gap-1 text-foreground/70">
            <Clock size={14} />
            <span className="text-xs">{estimatedTime}</span>
          </div>
        )}
        
        <div className="mt-4 pt-3 border-t flex items-center justify-between">
          <span className="font-semibold">{new Intl.NumberFormat('en-US').format(price)} {currency}</span>
          <button className={cn(
            "py-1.5 px-3 rounded-lg text-sm font-medium transition-colors duration-300",
            isPremium 
              ? "bg-huduma-green text-white hover:bg-huduma-green/90" 
              : "bg-huduma-light-green hover:bg-huduma-green hover:text-white text-huduma-green"
          )}>
            View Details
          </button>
        </div>
      </div>
    </Link>
  );
};

export default ServiceCard;
