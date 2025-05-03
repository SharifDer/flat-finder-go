
import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SearchBar from '@/components/SearchBar';
import ApartmentCard from '@/components/ApartmentCard';
import { apartments, Apartment } from '@/data/apartments';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Slider } from '@/components/ui/slider';
import { MapPin, Filter } from 'lucide-react';

const ListingsPage = () => {
  const [searchParams] = useSearchParams();
  const [displayedApartments, setDisplayedApartments] = useState<Apartment[]>(apartments);
  const [showFilters, setShowFilters] = useState(false);
  
  // Filter states
  const [priceRange, setPriceRange] = useState([0, 5000]);
  const [bedrooms, setBedrooms] = useState<string[]>([]);
  const [bathrooms, setBathrooms] = useState<string[]>([]);
  const [petFriendly, setPetFriendly] = useState(false);
  const [furnished, setFurnished] = useState(false);
  
  // Get location from URL if available
  const locationParam = searchParams.get('location') || '';
  
  // Apply filters
  const applyFilters = () => {
    let filtered = apartments;
    
    // Filter by location if provided
    if (locationParam) {
      filtered = filtered.filter(apt => 
        apt.location.toLowerCase().includes(locationParam.toLowerCase())
      );
    }
    
    // Filter by price range
    filtered = filtered.filter(apt => 
      apt.price >= priceRange[0] && apt.price <= priceRange[1]
    );
    
    // Filter by bedrooms
    if (bedrooms.length > 0) {
      filtered = filtered.filter(apt => {
        // Special case for studio (0 bedrooms)
        if (bedrooms.includes('studio') && apt.bedrooms === 0) return true;
        return bedrooms.includes(apt.bedrooms.toString());
      });
    }
    
    // Filter by bathrooms
    if (bathrooms.length > 0) {
      filtered = filtered.filter(apt => 
        bathrooms.includes(apt.bathrooms.toString())
      );
    }
    
    // Filter by pet-friendly
    if (petFriendly) {
      filtered = filtered.filter(apt => apt.petFriendly);
    }
    
    // Filter by furnished
    if (furnished) {
      filtered = filtered.filter(apt => apt.furnished);
    }
    
    setDisplayedApartments(filtered);
  };
  
  // Toggle bedroom filter
  const toggleBedroom = (value: string) => {
    setBedrooms(prev => 
      prev.includes(value) 
        ? prev.filter(item => item !== value) 
        : [...prev, value]
    );
  };
  
  // Toggle bathroom filter
  const toggleBathroom = (value: string) => {
    setBathrooms(prev => 
      prev.includes(value) 
        ? prev.filter(item => item !== value) 
        : [...prev, value]
    );
  };
  
  // Reset all filters
  const resetFilters = () => {
    setPriceRange([0, 5000]);
    setBedrooms([]);
    setBathrooms([]);
    setPetFriendly(false);
    setFurnished(false);
    setDisplayedApartments(apartments);
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Search and Filter Bar */}
      <section className="bg-blue-50 py-8">
        <div className="container-custom">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="w-full md:w-auto">
              <SearchBar variant="compact" />
            </div>
            <Button 
              variant="outline" 
              className="flex items-center"
              onClick={() => setShowFilters(!showFilters)}
            >
              <Filter className="h-4 w-4 mr-1" />
              Filters
            </Button>
          </div>
          
          {/* Filter Panel */}
          {showFilters && (
            <div className="mt-6 p-6 bg-white rounded-lg shadow-md">
              <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
                {/* Price Range */}
                <div className="col-span-1">
                  <h3 className="font-medium mb-3">Price Range</h3>
                  <Slider 
                    defaultValue={priceRange} 
                    min={0} 
                    max={5000} 
                    step={100}
                    onValueChange={(value) => setPriceRange(value as number[])} 
                    className="mb-2"
                  />
                  <div className="flex justify-between text-sm text-gray-500">
                    <span>${priceRange[0]}</span>
                    <span>${priceRange[1]}</span>
                  </div>
                </div>
                
                {/* Bedrooms */}
                <div className="col-span-1">
                  <h3 className="font-medium mb-3">Bedrooms</h3>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="studio" 
                        checked={bedrooms.includes('studio')}
                        onCheckedChange={() => toggleBedroom('studio')}
                      />
                      <label htmlFor="studio" className="text-sm">Studio</label>
                    </div>
                    {[1, 2, 3, 4].map(num => (
                      <div key={num} className="flex items-center space-x-2">
                        <Checkbox 
                          id={`bed-${num}`}
                          checked={bedrooms.includes(num.toString())}
                          onCheckedChange={() => toggleBedroom(num.toString())}
                        />
                        <label htmlFor={`bed-${num}`} className="text-sm">{num} {num === 1 ? 'Bedroom' : 'Bedrooms'}</label>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Bathrooms */}
                <div className="col-span-1">
                  <h3 className="font-medium mb-3">Bathrooms</h3>
                  <div className="space-y-2">
                    {[1, 1.5, 2, 2.5, 3].map(num => (
                      <div key={num} className="flex items-center space-x-2">
                        <Checkbox 
                          id={`bath-${num}`}
                          checked={bathrooms.includes(num.toString())}
                          onCheckedChange={() => toggleBathroom(num.toString())}
                        />
                        <label htmlFor={`bath-${num}`} className="text-sm">{num} {num === 1 ? 'Bathroom' : 'Bathrooms'}</label>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* More Filters */}
                <div className="col-span-1">
                  <h3 className="font-medium mb-3">More Filters</h3>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="pet-friendly" 
                        checked={petFriendly}
                        onCheckedChange={(checked) => setPetFriendly(checked === true)}
                      />
                      <label htmlFor="pet-friendly" className="text-sm">Pet Friendly</label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="furnished" 
                        checked={furnished}
                        onCheckedChange={(checked) => setFurnished(checked === true)}
                      />
                      <label htmlFor="furnished" className="text-sm">Furnished</label>
                    </div>
                  </div>
                </div>
                
                {/* Action Buttons */}
                <div className="col-span-1 flex flex-col justify-end">
                  <div className="flex space-x-2">
                    <Button variant="outline" onClick={resetFilters} className="flex-1">Reset</Button>
                    <Button onClick={applyFilters} className="flex-1">Apply</Button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
      
      {/* Apartments Listing */}
      <section className="py-12">
        <div className="container-custom">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Available Apartments</h1>
              {locationParam && (
                <div className="flex items-center mt-2 text-gray-600">
                  <MapPin className="h-4 w-4 mr-1" />
                  <span>Results for: {locationParam}</span>
                </div>
              )}
            </div>
            <div className="text-gray-600">
              {displayedApartments.length} {displayedApartments.length === 1 ? 'apartment' : 'apartments'} found
            </div>
          </div>
          
          {displayedApartments.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {displayedApartments.map((apartment) => (
                <ApartmentCard key={apartment.id} apartment={apartment} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <h3 className="text-xl font-semibold mb-2">No apartments found</h3>
              <p className="text-gray-600 mb-6">Try adjusting your filters or search criteria</p>
              <Button onClick={resetFilters}>Reset Filters</Button>
            </div>
          )}
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default ListingsPage;
