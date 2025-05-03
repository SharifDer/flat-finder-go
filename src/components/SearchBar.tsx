
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
  const [bedrooms, setBedrooms] = useState('');

  const yemenNeighborhoods = [
    'حدة',
    'شارع تعز',
    'السنينة',
    'شارع الستين',
    'الحصبة', 
    'حي الجامعة',
    'المطار',
    'عصر',
    'الزبيري',
    'الدائري'
  ];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (location) params.append('location', location);
    if (propertyType) params.append('type', propertyType);
    if (priceRange) params.append('price', priceRange);
    if (bedrooms) params.append('bedrooms', bedrooms);
    
    navigate(`/listings?${params.toString()}`);
  };

  if (variant === 'compact') {
    return (
      <form onSubmit={handleSearch} className="flex items-center w-full max-w-xl">
        <div className="flex items-center w-full bg-white border rounded-l-md px-3">
          <MapPin className="h-4 w-4 text-gray-400" />
          <Input
            type="text"
            placeholder="البحث حسب الموقع"
            className="border-none focus-visible:ring-0 focus-visible:ring-offset-0"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            list="neighborhoods"
          />
          <datalist id="neighborhoods">
            {yemenNeighborhoods.map((neighborhood) => (
              <option key={neighborhood} value={neighborhood} />
            ))}
          </datalist>
        </div>
        <Button type="submit" className="rounded-l-none">
          <Search className="h-4 w-4 mr-1" />
          بحث
        </Button>
      </form>
    );
  }

  return (
    <div className="w-full max-w-4xl mx-auto bg-white p-4 rounded-lg shadow-lg">
      <form onSubmit={handleSearch} className="grid grid-cols-1 md:grid-cols-8 gap-4 items-end">
        <div className="col-span-1 md:col-span-3">
          <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">الموقع</label>
          <div className="flex items-center w-full bg-white border rounded-md px-3">
            <MapPin className="h-4 w-4 text-gray-400" />
            <Input
              id="location"
              type="text"
              placeholder="المنطقة، الحي، أو العنوان"
              className="border-none focus-visible:ring-0 focus-visible:ring-offset-0"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              list="neighborhoods-full"
            />
            <datalist id="neighborhoods-full">
              {yemenNeighborhoods.map((neighborhood) => (
                <option key={neighborhood} value={neighborhood} />
              ))}
            </datalist>
          </div>
        </div>
        
        <div className="col-span-1 md:col-span-2">
          <label htmlFor="property-type" className="block text-sm font-medium text-gray-700 mb-1">نوع العقار</label>
          <Select value={propertyType} onValueChange={setPropertyType}>
            <SelectTrigger id="property-type">
              <SelectValue placeholder="أي نوع" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="apartment">شقة</SelectItem>
              <SelectItem value="studio">استوديو</SelectItem>
              <SelectItem value="house">منزل</SelectItem>
              <SelectItem value="condo">كوندو</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="col-span-1 md:col-span-1">
          <label htmlFor="bedrooms" className="block text-sm font-medium text-gray-700 mb-1">الغرف</label>
          <Select value={bedrooms} onValueChange={setBedrooms}>
            <SelectTrigger id="bedrooms">
              <SelectValue placeholder="العدد" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="studio">استوديو</SelectItem>
              <SelectItem value="1">1</SelectItem>
              <SelectItem value="2">2</SelectItem>
              <SelectItem value="3">3</SelectItem>
              <SelectItem value="4+">4+</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="col-span-1 md:col-span-1">
          <label htmlFor="price-range" className="block text-sm font-medium text-gray-700 mb-1">السعر</label>
          <Select value={priceRange} onValueChange={setPriceRange}>
            <SelectTrigger id="price-range">
              <SelectValue placeholder="أي سعر" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="0-50000">$0 - $50,000</SelectItem>
              <SelectItem value="50000-100000">$50,000 - $100,000</SelectItem>
              <SelectItem value="100000-200000">$100,000 - $200,000</SelectItem>
              <SelectItem value="200000+">$200,000+</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="col-span-1 md:col-span-1">
          <Button type="submit" className="w-full h-10">
            <Search className="h-4 w-4 mr-1" />
            بحث
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SearchBar;
