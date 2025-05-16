
import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ApartmentCard from '@/components/ApartmentCard';
import { apartments, Apartment } from '@/data/apartments';
import { Button } from '@/components/ui/button';
import { MapPin, X, SlidersHorizontal, Search, Home } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { useIsMobile } from "@/hooks/use-mobile";
import { RangeSlider } from "@/components/ui/range-slider";
import { useRef } from 'react';
import { Toggle } from "@/components/ui/toggle";

const ListingsPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [displayedApartments, setDisplayedApartments] = useState<Apartment[]>(apartments);
  const [sortMode, setSortMode] = useState<'price-asc' | 'price-desc' | 'newest'>('newest');
  const { toast } = useToast();
  const isMobile = useIsMobile();

  // Filter states
  const [priceRange, setPriceRange] = useState([10000, 200000]);
  const [selectedLocation, setSelectedLocation] = useState('');
  const [showPriceSlider, setShowPriceSlider] = useState(false);
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [activeFilters, setActiveFilters] = useState<{
    location?: string;
    type?: string;
    priceMin?: number;
    priceMax?: number;
    sort?: string;
    status?: string;
  }>({});
  const priceSliderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        priceSliderRef.current &&
        !priceSliderRef.current.contains(event.target as Node)
      ) {
        setShowPriceSlider(false);
      }
    };
  
    if (showPriceSlider) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
  
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showPriceSlider]);
  
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

  // Get URL parameters
  const locationParam = searchParams.get('location') || '';
  const typeParam = searchParams.get('type') || '';

  // Apply URL parameters on load
  useEffect(() => {
    const initialFilters = {};
    
    if (locationParam) {
      setSelectedLocation(locationParam);
      initialFilters['location'] = locationParam;
    }
    
    if (typeParam) {
      initialFilters['type'] = typeParam;
    }
    
    setActiveFilters(initialFilters);
    applyFilters();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [locationParam, typeParam]);

  // Apply filters whenever active filters change
  useEffect(() => {
    applyFilters();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeFilters, sortMode]);

  // Apply filters
  const applyFilters = () => {
    let filtered = apartments;

    // Filter by location if provided
    if (activeFilters.location) {
      filtered = filtered.filter(apt => 
        apt.location.toLowerCase().includes(activeFilters.location.toLowerCase())
      );
    }

    // Filter by type if provided
    if (activeFilters.type) {
      filtered = filtered.filter(apt => 
        apt.type === activeFilters.type
      );
    }
    
    // Filter by status if provided
    if (activeFilters.status) {
      if (activeFilters.status === 'available') {
        filtered = filtered.filter(apt => apt.available === true);
      } else if (activeFilters.status === 'rented') {
        filtered = filtered.filter(apt => apt.available === false);
      }
    }

    // Filter by price range
    if (activeFilters.priceMin || activeFilters.priceMax) {
      const min = activeFilters.priceMin || 10000;
      const max = activeFilters.priceMax || 200000;
      filtered = filtered.filter(apt => 
        apt.price >= min && apt.price <= max
      );
    }

    // Apply sorting
    switch(sortMode) {
      case 'price-asc':
        filtered = [...filtered].sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        filtered = [...filtered].sort((a, b) => b.price - a.price);
        break;
      case 'newest':
        // Keep default sorting
        break;
    }

    setDisplayedApartments(filtered);
    
    // Close price slider after applying filters
    setShowPriceSlider(false);
  };

  // Handle price range change
  const handlePriceRangeChange = (value: number[]) => {
    setPriceRange(value);
  };

  // Handle location change
  const handleLocationChange = (value: string) => {
    setSelectedLocation(value);
    setActiveFilters(prev => ({
      ...prev,
      location: value,
    }));
  };

  // Handle sort mode change
  const handleSortChange = (value: string) => {
    if (value === 'low-to-high') {
      setSortMode('price-asc');
      setActiveFilters(prev => ({
        ...prev,
        sort: 'price-asc',
      }));
    } else if (value === 'high-to-low') {
      setSortMode('price-desc');
      setActiveFilters(prev => ({
        ...prev,
        sort: 'price-desc',
      }));
    }
  };
  
  // Handle status filter change
  const handleStatusFilterChange = (value: string) => {
    setStatusFilter(value);
    setActiveFilters(prev => ({
      ...prev,
      status: value,
    }));
  };

  // Remove filter
  const removeFilter = (filterType: string) => {
    const newFilters = { ...activeFilters };
    
    switch (filterType) {
      case 'location':
        delete newFilters.location;
        setSelectedLocation('');
        break;
      case 'type':
        delete newFilters.type;
        break;
      case 'price':
        delete newFilters.priceMin;
        delete newFilters.priceMax;
        setPriceRange([10000, 200000]);
        break;
      case 'sort':
        delete newFilters.sort;
        setSortMode('newest');
        break;
      case 'status':
        delete newFilters.status;
        setStatusFilter('all');
        break;
    }
    
    setActiveFilters(newFilters);
    
    toast({
      title: "تم إزالة الفلتر",
      description: "تم تحديث النتائج بناءً على الفلاتر الجديدة",
    });
  };

  // Reset all filters
  const resetFilters = () => {
    setPriceRange([10000, 200000]);
    setSortMode('newest');
    setSelectedLocation('');
    setStatusFilter('all');
    setActiveFilters({});
    setShowPriceSlider(false);

    toast({
      title: "تم إعادة ضبط المرشحات",
      description: "تم إعادة ضبط جميع المرشحات إلى القيم الافتراضية",
    });
  };

  // Check if price filter is active (not default values)
  const isPriceFilterActive = () => {
    return (activeFilters.priceMin !== undefined && activeFilters.priceMin !== 10000) || 
           (activeFilters.priceMax !== undefined && activeFilters.priceMax !== 200000);
  };

  // Count active non-default filters
  const countActiveFilters = () => {
    return Object.keys(activeFilters).filter(key => {
      if (key === 'priceMin' || key === 'priceMax') return isPriceFilterActive();
      return true;
    }).length;
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      {/* Dropdown Filters Section */}
      <section className="bg-blue-50 py-6 md:py-8">
        <div className="container-custom">
          <div className="flex flex-col md:flex-row justify-center items-center gap-4">
            {/* Location Dropdown */}
            <div className="w-full md:w-auto">
              <Select onValueChange={handleLocationChange} value={selectedLocation}>
                <SelectTrigger className="w-full md:w-[180px]">
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

            {/* Status Filter */}
            <div className="w-full md:w-auto">
              <Select onValueChange={handleStatusFilterChange} value={statusFilter}>
                <SelectTrigger className="w-full md:w-[180px]">
                  <SelectValue placeholder="حالة العقار" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">جميع العقارات</SelectItem>
                  <SelectItem value="available">متاح للإيجار</SelectItem>
                  <SelectItem value="rented">تم تأجيره</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Price Range Dropdown with Slider */}
            <div className="w-full md:w-auto relative">
              <Button 
                variant="outline" 
                className="w-full md:w-[180px] justify-start"
                onClick={() => setShowPriceSlider(!showPriceSlider)}
              >
                <SlidersHorizontal className="h-4 w-4 mr-1" />
                {priceRange[0] === 10000 && priceRange[1] === 200000 
                  ? "نطاق السعر" 
                  : `${priceRange[0].toLocaleString()} - ${priceRange[1].toLocaleString()} YER`}
              </Button>
              
              {showPriceSlider && (
                <div
                  ref={priceSliderRef}
                  className="absolute z-10 mt-2 p-4 bg-white rounded-md shadow-lg border w-64 md:w-72"
                >
                  <Label className="mb-2 block">نطاق السعر (YER)</Label>
                  <RangeSlider
                    min={10000}
                    max={200000}
                    step={5000}
                    value={priceRange}
                    onValueChange={handlePriceRangeChange}
                    className="my-4"
                  />
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>{priceRange[0].toLocaleString()} YER</span>
                    <span>{priceRange[1].toLocaleString()} YER</span>
                  </div>
                  <div className="flex gap-2 mt-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1"
                      onClick={() => setPriceRange([10000, 200000])}
                    >
                      إعادة تعيين
                    </Button>
                    <Button 
                      size="sm" 
                      className="flex-1 bg-blue-600 hover:bg-blue-700"
                      onClick={() => {
                        // Only set price filters if not default values
                        if (priceRange[0] !== 10000 || priceRange[1] !== 200000) {
                          setActiveFilters(prev => ({
                            ...prev,
                            priceMin: priceRange[0],
                            priceMax: priceRange[1],
                          }));
                        } else {
                          // Remove price filters if they're default values
                          const newFilters = {...activeFilters};
                          delete newFilters.priceMin;
                          delete newFilters.priceMax;
                          setActiveFilters(newFilters);
                        }
                        setShowPriceSlider(false);
                      }}
                    >
                      تم
                    </Button>
                  </div>
                </div>
              )}
            </div>

            {/* Price Sorting Dropdown */}
            <div className="w-full md:w-auto">
              <Select onValueChange={handleSortChange}>
                <SelectTrigger className="w-full md:w-[180px]">
                  <SelectValue placeholder="ترتيب حسب السعر" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low-to-high">من الأقل للأعلى</SelectItem>
                  <SelectItem value="high-to-low">من الأعلى للأقل</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Active Filters Display */}
          {countActiveFilters() > 0 && (
            <div className="mt-4 flex flex-wrap gap-2">
              {activeFilters.location && (
                <div className="flex items-center bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm">
                  <span className="mr-1">الموقع: {activeFilters.location}</span>
                  <Button variant="ghost" size="icon" className="h-5 w-5 p-0 ml-1" onClick={() => removeFilter('location')}>
                    <X className="h-3 w-3" />
                  </Button>
                </div>
              )}
              
              {activeFilters.type && (
                <div className="flex items-center bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm">
                  <span className="mr-1">النوع: {activeFilters.type}</span>
                  <Button variant="ghost" size="icon" className="h-5 w-5 p-0 ml-1" onClick={() => removeFilter('type')}>
                    <X className="h-3 w-3" />
                  </Button>
                </div>
              )}
              
              {activeFilters.status && (
                <div className="flex items-center bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm">
                  <span className="mr-1">
                    الحالة: {activeFilters.status === 'available' ? 'متاح للإيجار' : 'تم تأجيره'}
                  </span>
                  <Button variant="ghost" size="icon" className="h-5 w-5 p-0 ml-1" onClick={() => removeFilter('status')}>
                    <X className="h-3 w-3" />
                  </Button>
                </div>
              )}
              
              {isPriceFilterActive() && (
                <div className="flex items-center bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm">
                  <span className="mr-1">
                    السعر: {activeFilters.priceMin?.toLocaleString()} - {activeFilters.priceMax?.toLocaleString()} YER
                  </span>
                  <Button variant="ghost" size="icon" className="h-5 w-5 p-0 ml-1" onClick={() => removeFilter('price')}>
                    <X className="h-3 w-3" />
                  </Button>
                </div>
              )}
              
              {activeFilters.sort && (
                <div className="flex items-center bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm">
                  <span className="mr-1">
                    الترتيب: {activeFilters.sort === 'price-asc' ? 'تصاعدي' : 'تنازلي'}
                  </span>
                  <Button variant="ghost" size="icon" className="h-5 w-5 p-0 ml-1" onClick={() => removeFilter('sort')}>
                    <X className="h-3 w-3" />
                  </Button>
                </div>
              )}
              
              {countActiveFilters() > 1 && (
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="text-xs h-7"
                  onClick={resetFilters}
                >
                  مسح الكل
                </Button>
              )}
            </div>
          )}
        </div>
      </section>

      {/* Apartments Listing */}
      <section className="py-8 md:py-12 flex-grow">
        <div className="container-custom">
          <div className="flex flex-col md:flex-row justify-between items-center mb-6 md:mb-8">
            <div>
              <h1 className="text-xl md:text-3xl font-bold text-gray-800">الشقق المتاحة</h1>
              {selectedLocation && (
                <div className="flex items-center mt-2 text-gray-600">
                  <MapPin className="h-4 w-4 ml-1" />
                  <span>نتائج البحث عن: {selectedLocation}</span>
                </div>
              )}
            </div>
            <div className="mt-2 md:mt-0 text-gray-600">
              {displayedApartments.length} {displayedApartments.length === 1 ? 'شقة' : 'شقق'}
            </div>
          </div>

          {displayedApartments.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              {displayedApartments.map((apartment) => (
                <ApartmentCard key={apartment.id} apartment={apartment} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 md:py-16">
              <Search className="h-12 w-12 mx-auto text-blue-300 mb-4" />
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
