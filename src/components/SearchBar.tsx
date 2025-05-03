
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface SearchBarProps {
  variant?: 'hero' | 'compact';
}

const SearchBar = ({ variant = 'hero' }: SearchBarProps) => {
  const navigate = useNavigate();
  const [location, setLocation] = useState('');
  const [propertyType, setPropertyType] = useState('');
  const [priceRange, setPriceRange] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (location) params.append('location', location);
    if (propertyType) params.append('type', propertyType);
    if (priceRange) params.append('price', priceRange);
    
    navigate(`/listings?${params.toString()}`);
  };

  if (variant === 'compact') {
    return (
      <form onSubmit={handleSearch} className="flex items-center w-full max-w-xl">
        <div className="flex items-center w-full bg-white border rounded-l-md px-3">
          <MapPin className="h-4 w-4 text-gray-400" />
          <Input
            type="text"
            placeholder="Search by location"
            className="border-none focus-visible:ring-0 focus-visible:ring-offset-0"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </div>
        <Button type="submit" className="rounded-l-none">
          <Search className="h-4 w-4 mr-1" />
          Search
        </Button>
      </form>
    );
  }

  return (
    <div className="w-full max-w-4xl mx-auto bg-white p-4 rounded-lg shadow-lg">
      <form onSubmit={handleSearch} className="grid grid-cols-1 md:grid-cols-7 gap-4 items-end">
        <div className="col-span-1 md:col-span-3">
          <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">Location</label>
          <div className="flex items-center w-full bg-white border rounded-md px-3">
            <MapPin className="h-4 w-4 text-gray-400" />
            <Input
              id="location"
              type="text"
              placeholder="City, neighborhood, or address"
              className="border-none focus-visible:ring-0 focus-visible:ring-offset-0"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </div>
        </div>
        
        <div className="col-span-1 md:col-span-2">
          <label htmlFor="property-type" className="block text-sm font-medium text-gray-700 mb-1">Property Type</label>
          <Select value={propertyType} onValueChange={setPropertyType}>
            <SelectTrigger id="property-type">
              <SelectValue placeholder="Any Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="apartment">Apartment</SelectItem>
              <SelectItem value="studio">Studio</SelectItem>
              <SelectItem value="house">House</SelectItem>
              <SelectItem value="condo">Condo</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="col-span-1 md:col-span-1">
          <label htmlFor="price-range" className="block text-sm font-medium text-gray-700 mb-1">Price</label>
          <Select value={priceRange} onValueChange={setPriceRange}>
            <SelectTrigger id="price-range">
              <SelectValue placeholder="Any Price" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="0-1000">$0 - $1,000</SelectItem>
              <SelectItem value="1000-2000">$1,000 - $2,000</SelectItem>
              <SelectItem value="2000-3000">$2,000 - $3,000</SelectItem>
              <SelectItem value="3000+">$3,000+</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="col-span-1 md:col-span-1">
          <Button type="submit" className="w-full h-10">
            <Search className="h-4 w-4 mr-1" />
            Search
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SearchBar;
