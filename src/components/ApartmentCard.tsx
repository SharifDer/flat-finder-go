
import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Apartment } from '@/data/apartments';

interface ApartmentCardProps {
  apartment: Apartment;
}

const ApartmentCard = ({ apartment }: ApartmentCardProps) => {
  return (
    <Card className="overflow-hidden hover:shadow-md transition-shadow">
      <div className="relative">
        <Link to={`/apartment/${apartment.id}`}>
          <img 
            src={apartment.images[0]} 
            alt={apartment.title} 
            className="w-full h-48 object-cover"
          />
        </Link>
        <Button 
          variant="ghost" 
          size="icon" 
          className="absolute top-2 right-2 bg-white/80 hover:bg-white/90 rounded-full h-8 w-8"
        >
          <Heart className="h-5 w-5 text-gray-600" />
        </Button>
        <div className="absolute bottom-0 left-0 bg-primary text-white px-3 py-1 text-sm font-medium">
          ${apartment.price}/month
        </div>
      </div>
      <CardContent className="p-4">
        <Link to={`/apartment/${apartment.id}`}>
          <h3 className="font-semibold text-lg mb-1 hover:text-primary transition-colors">{apartment.title}</h3>
        </Link>
        <div className="flex items-center text-gray-500 mb-2">
          <MapPin className="h-4 w-4 mr-1" />
          <span className="text-sm">{apartment.location}</span>
        </div>
        <div className="flex items-center justify-between text-sm text-gray-600 mb-3">
          <div><span className="font-medium">{apartment.bedrooms}</span> bd</div>
          <div><span className="font-medium">{apartment.bathrooms}</span> ba</div>
          <div><span className="font-medium">{apartment.area}</span> sqft</div>
        </div>
        <Link to={`/apartment/${apartment.id}`}>
          <Button variant="outline" size="sm" className="w-full">
            View Details
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
};

export default ApartmentCard;
