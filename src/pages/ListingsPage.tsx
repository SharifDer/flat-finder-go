import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ApartmentCard from '@/components/ApartmentCard';
import { apartments, Apartment } from '@/data/apartments';
import { Button } from '@/components/ui/button';
import { MapPin } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Slider from 'react-slider';

const ListingsPage = () => {
  const [searchParams] = useSearchParams();
  const [displayedApartments, setDisplayedApartments] = useState<Apartment[]>(apartments);
  const [sortMode, setSortMode] = useState<'price-asc' | 'price-desc' | 'newest'>('newest');
  const { toast } = useToast();

  // Filter states
  const [priceRange, setPriceRange] = useState([10000, 200000]);
  const [selectedLocation, setSelectedLocation] = useState('');
  const [showPriceSlider, setShowPriceSlider] = useState(false);

  // Locations from SearchBar component
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

  // Get location from URL if available
  const locationParam = searchParams.get('location') || '';
  const typeParam = searchParams.get('type') || '';

  // Apply URL parameters on load
  useEffect(() => {
    if (locationParam) {
      setSelectedLocation(locationParam);
    }
    
    // Apply initial filters from URL
    applyFilters();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [locationParam, typeParam]);

  // Apply filters
  const applyFilters = () => {
    let filtered = apartments;
    let filtersApplied = false;

    // Filter by location if provided
    if (selectedLocation) {
      filtered = filtered.filter(apt => 
        apt.location.toLowerCase().includes(selectedLocation.toLowerCase())
      );
      filtersApplied = true;
    }

    // Filter by type if provided
    if (typeParam) {
      filtered = filtered.filter(apt => 
        apt.type === typeParam
      );
      filtersApplied = true;
    }

    // Filter by price range
    filtered = filtered.filter(apt => 
      apt.price >= priceRange[0] && apt.price <= priceRange[1]
    );
    if (priceRange[0] !== 10000 || priceRange[1] !== 200000) filtersApplied = true;

    // Apply sorting
    switch(sortMode) {
      case 'price-asc':
        filtered = [...filtered].sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        filtered = [...filtered].sort((a, b) => b.price - a.price);
        break;
      case 'newest':
        break;
    }

    setDisplayedApartments(filtered);
    setShowPriceSlider(false); // Close price slider after applying filters
  };

  // Reset all filters
  const resetFilters = () => {
    setPriceRange([10000, 200000]);
    setSortMode('newest');
    setSelectedLocation('');
    setDisplayedApartments(apartments);
    setShowPriceSlider(false);

    toast({
      title: "تم إعادة ضبط المرشحات",
      description: "تم إعادة ضبط جميع المرشحات إلى القيم الافتراضية",
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      {/* Dropdown Filters Section */}
      <section className="bg-blue-50 py-8">
        <div className="container-custom">
          <div className="flex flex-col md:flex-row justify-center items-center gap-4">
            {/* Location Dropdown */}
            <div className="w-full md:w-auto">
              <Select onValueChange={(value) => setSelectedLocation(value)} value={selectedLocation}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="اختر الموقع" />
                </SelectTrigger>
                <SelectContent>
                  {yemenNeighborhoods.map((location) => (
                    <SelectItem key={location} value={location}>
                      {location}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Price Range Dropdown with Slider */}
            <div className="w-full md:w-auto relative">
              <Button 
                variant="outline" 
                className="w-[180px] justify-start"
                onClick={() => setShowPriceSlider(!showPriceSlider)}
              >
                نطاق السعر: ${priceRange[0]} - ${priceRange[1]}
              </Button>
    {showPriceSlider && (
  <div className="absolute z-10 mt-2 p-4 bg-white rounded-md shadow-lg border w-64">
    <Slider
      min={10000}
      max={200000}
      step={1000}
      value={priceRange}
      onChange={(value) => setPriceRange(value)}
      className="mb-4"
      renderTrack={(props, state) => (
        <div
          {...props}
          className="h-2 bg-blue-200 rounded-full"
        />
      )}
      renderThumb={(props, state) => (
        <div
          {...props}
          className="h-4 w-4 bg-blue-600 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      )}
    />
    <div className="flex justify-between text-sm text-gray-600">
      <span>${priceRange[0].toLocaleString()}</span>
      <span>${priceRange[1].toLocaleString()}</span>
    </div>
    <Button 
      size="sm" 
      className="mt-2 w-full"
      onClick={() => setShowPriceSlider(false)}
    >
      تم
    </Button>
  </div>
)}
            </div>

            {/* Price Sorting Dropdown */}
            <div className="w-full md:w-auto">
              <Select onValueChange={(value) => {
                if (value === 'low-to-high') {
                  setSortMode('price-asc');
                } else if (value === 'high-to-low') {
                  setSortMode('price-desc');
                }
              }}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="ترتيب حسب السعر" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low-to-high">من الأقل للأعلى</SelectItem>
                  <SelectItem value="high-to-low">من الأعلى للأقل</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Apply Filters Button */}
            <Button onClick={applyFilters} className="w-full md:w-auto">
              تطبيق الفلاتر
            </Button>
          </div>
        </div>
      </section>

      {/* Apartments Listing */}
      <section className="py-12">
        <div className="container-custom">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-800">الشقق المتاحة</h1>
              {selectedLocation && (
                <div className="flex items-center mt-2 text-gray-600">
                  <MapPin className="h-4 w-4 ml-1" />
                  <span>نتائج البحث عن: {selectedLocation}</span>
                </div>
              )}
            </div>
            <div className="text-gray-600">
              {displayedApartments.length} {displayedApartments.length === 1 ? 'شقة' : 'شقق'}
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
              <h3 className="text-xl font-semibold mb-2">لم يتم العثور على شقق</h3>
              <p className="text-gray-600 mb-6">حاول تعديل المرشحات أو معايير البحث</p>
              <Button onClick={resetFilters}>إعادة ضبط المرشحات</Button>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ListingsPage;