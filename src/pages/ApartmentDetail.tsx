
/**
 * This file is for the Apartment Details page
 * Displays detailed information about a specific apartment listing
 */

import React from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { apartments } from '@/data/apartments';
import { Button } from '@/components/ui/button';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle,
  CardDescription
} from '@/components/ui/card';
import { 
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from '@/components/ui/carousel';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { MapPin, Calendar, Phone, Mail, Heart, ArrowLeft } from 'lucide-react';

const ApartmentDetail = () => {
  // Get apartment ID from URL parameters
  const { id } = useParams<{ id: string }>();
  
  // Find apartment data from the list
  const apartment = apartments.find(apt => apt.id === id);
  
  // Handle case when apartment is not found
  if (!apartment) {
    return (
      <div className="min-h-screen flex flex-col" dir="rtl">
        <Navbar />
        <div className="container-custom py-16 flex-grow flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">العقار غير موجود</h1>
            <p className="text-gray-600 mb-6">العقار الذي تبحث عنه غير موجود أو تمت إزالته</p>
            <Link to="/listings">
              <Button>
                <ArrowLeft className="ml-2 h-4 w-4" /> العودة إلى قائمة العقارات
              </Button>
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col" dir="rtl">
      <Navbar />
      
      <div className="container-custom py-8">
        {/* Back Navigation */}
        <div className="mb-6">
          <Link to="/listings" className="text-gray-600 hover:text-primary flex items-center">
            <ArrowLeft className="ml-2 h-4 w-4" /> العودة إلى قائمة العقارات
          </Link>
        </div>
        
        {/* Apartment Header - Title, Location, Price */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">{apartment.title}</h1>
            <div className="flex items-center text-gray-600">
              <MapPin className="h-4 w-4 ml-1" />
              <span>{apartment.location}</span>
            </div>
          </div>
          <div className="mt-4 md:mt-0">
            <div className="text-2xl font-bold text-primary mb-2">{apartment.price} ريال يمني/شهر</div>
            <div className="flex space-x-2 rtl:space-x-reverse">
              <Button className="flex items-center">
                <Phone className="h-4 w-4 ml-2" />
                اتصل بالمالك
              </Button>
              <Button variant="outline" size="icon">
                <Heart className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
        
        {/* Photo Gallery */}
        <div className="mb-8">
          <Carousel className="w-full">
            <CarouselContent>
              {apartment.images.map((image, index) => (
                <CarouselItem key={index}>
                  <div className="h-[400px] md:h-[500px] w-full overflow-hidden rounded-lg">
                    <img
                      src={image}
                      alt={`${apartment.title} - صورة ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="right-4 left-auto" />
            <CarouselNext className="left-4 right-auto" />
          </Carousel>
        </div>
        
        {/* Main Content - Apartment Details and Contact Info */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Right Column - Contact and Availability */}
          <div className="space-y-6 order-2 lg:order-1">
            {/* Contact Card */}
            <Card>
              <CardHeader>
                <CardTitle>معلومات الاتصال</CardTitle>
                <CardDescription>تواصل مباشرة مع مالك العقار</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="font-medium">المالك</div>
                  <div className="text-gray-700">{apartment.contactName}</div>
                </div>
                
                <div>
                  <div className="font-medium">رقم الهاتف</div>
                  <div className="flex items-center">
                    <Phone className="h-4 w-4 text-primary ml-2" />
                    <a href={`tel:${apartment.contactPhone}`} className="text-primary hover:underline">
                      {apartment.contactPhone}
                    </a>
                  </div>
                </div>
                
                <div>
                  <div className="font-medium">البريد الإلكتروني</div>
                  <div className="flex items-center">
                    <Mail className="h-4 w-4 text-primary ml-2" />
                    <a href={`mailto:${apartment.contactEmail}`} className="text-primary hover:underline">
                      {apartment.contactEmail}
                    </a>
                  </div>
                </div>
                
                <Button className="w-full">إرسال رسالة</Button>
              </CardContent>
            </Card>
            
            {/* Availability Card */}
            <Card>
              <CardHeader>
                <CardTitle>الإتاحة</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="font-medium">الحالة</div>
                  <div className={apartment.available ? "text-green-600 font-medium" : "text-red-600 font-medium"}>
                    {apartment.available ? 'متاح الآن' : 'تم التأجير'}
                  </div>
                </div>
                
                <div>
                  <div className="font-medium">متاح من تاريخ</div>
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 text-gray-600 ml-2" />
                    <span>{apartment.dateAvailable}</span>
                  </div>
                </div>
                
                <Button variant="outline" className="w-full">
                  جدولة موعد للمعاينة
                </Button>
              </CardContent>
            </Card>
          </div>
          
          {/* Left Column - Apartment Details */}
          <div className="lg:col-span-2 space-y-8 order-1 lg:order-2">
            {/* Overview Section */}
            <div>
              <h2 className="text-xl font-bold mb-4">نظرة عامة</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
                <div className="bg-blue-50 p-4 rounded-lg text-center">
                  <div className="text-gray-600 text-sm">غرف النوم</div>
                  <div className="font-bold text-lg">
                    {apartment.bedrooms === 0 ? 'استديو' : apartment.bedrooms}
                  </div>
                </div>
                <div className="bg-blue-50 p-4 rounded-lg text-center">
                  <div className="text-gray-600 text-sm">دورات المياه</div>
                  <div className="font-bold text-lg">{apartment.bathrooms}</div>
                </div>
                <div className="bg-blue-50 p-4 rounded-lg text-center">
                  <div className="text-gray-600 text-sm">الحالة</div>
                  <div className={`font-bold text-lg ${apartment.available ? "text-green-600" : "text-red-600"}`}>
                    {apartment.available ? 'متاح' : 'مؤجر'}
                  </div>
                </div>
              </div>
              <p className="text-gray-700 leading-relaxed">{apartment.description}</p>
            </div>
            
            <Separator />
            
            {/* Additional Info Section */}
            <div>
              <h2 className="text-xl font-bold mb-4">معلومات إضافية</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center">
                  <Badge variant="outline" className={apartment.petFriendly ? "bg-green-50" : "bg-red-50"}>
                    {apartment.petFriendly ? 'يسمح بالحيوانات الأليفة' : 'لا يسمح بالحيوانات الأليفة'}
                  </Badge>
                </div>
                <div className="flex items-center">
                  <Badge variant="outline" className={apartment.furnished ? "bg-green-50" : ""}>
                    {apartment.furnished ? 'مفروش' : 'غير مفروش'}
                  </Badge>
                </div>
                <div className="flex items-center">
                  <Badge variant="outline" className={apartment.parkingIncluded ? "bg-green-50" : ""}>
                    {apartment.parkingIncluded ? 'يتوفر موقف سيارات' : 'لا يتوفر موقف سيارات'}
                  </Badge>
                </div>
                <div className="flex items-center">
                  <Badge variant="outline" className={apartment.utilitiesIncluded ? "bg-green-50" : ""}>
                    {apartment.utilitiesIncluded ? 'الخدمات مشمولة' : 'الخدمات غير مشمولة'}
                  </Badge>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="mt-auto">
        <Footer />
      </div>
    </div>
  );
};

export default ApartmentDetail;
