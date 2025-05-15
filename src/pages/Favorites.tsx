
/**
 * This file is for the Saved Apartments page
 * Displays apartments that the user has saved/favorited
 */

import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ApartmentCard from '@/components/ApartmentCard';
import { apartments } from '@/data/apartments';
import { Heart, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from "@/hooks/use-toast";

const Favorites = () => {
  // For demo purposes, let's use some random apartments as favorites
  const [favoriteApartments, setFavoriteApartments] = useState(
    apartments.slice(0, 3).map(apt => ({
      ...apt,
      title: apt.id === "1" ? "شقة فسيحة بغرفتين في وسط المدينة" :
             apt.id === "2" ? "استوديو عصري مع إطلالة على المدينة" :
             "شقة مريحة بغرفة نوم واحدة قرب الجامعة",
      location: apt.id === "1" ? "شارع الزهراء، صنعاء" :
                apt.id === "2" ? "شارع الستين، صنعاء" :
                "شارع الجامعة، صنعاء",
      price: apt.id === "1" ? 80000 : apt.id === "2" ? 60000 : 45000,
      description: "شقة جميلة ومؤثثة بالكامل في موقع مميز"
    }))
  );
  
  const { toast } = useToast();
  
  const removeFromFavorites = (apartmentId: string) => {
    setFavoriteApartments(favoriteApartments.filter(apt => apt.id !== apartmentId));
    
    toast({
      title: "تمت الإزالة من المفضلة",
      description: "تم إزالة الشقة بنجاح من قائمة المفضلة",
    });
  };
  
  return (
    <div className="min-h-screen flex flex-col rtl">
      <Navbar />
      
      {/* Hero Section */}
      <section className="bg-blue-50 py-10">
        <div className="container-custom text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            الشقق المفضلة
          </h1>
          <p className="text-lg text-gray-600">
            الشقق التي قمت بحفظها للمراجعة لاحقًا
          </p>
        </div>
      </section>
      
      {/* Favorites List */}
      <section className="py-12">
        <div className="container-custom">
          {favoriteApartments.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {favoriteApartments.map(apartment => (
                <div key={apartment.id} className="relative">
                  <ApartmentCard apartment={apartment} />
                  <Button
                    variant="outline"
                    size="sm"
                    className="absolute top-4 left-4 bg-white hover:bg-red-50 text-red-500 hover:text-red-600 border-red-200"
                    onClick={() => removeFromFavorites(apartment.id)}
                  >
                    <Heart className="h-4 w-4 ml-1 fill-current" />
                    إزالة من المفضلة
                  </Button>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="bg-blue-50 rounded-full p-6 inline-flex mb-4">
                <Heart className="h-12 w-12 text-gray-400" />
              </div>
              <h2 className="text-2xl font-semibold mb-2">لا توجد شقق مفضلة</h2>
              <p className="text-gray-600 mb-6 max-w-md mx-auto">
                لم تقم بإضافة أية شقق إلى المفضلة بعد. تصفح الشقق وأضف ما يعجبك إلى المفضلة.
              </p>
              <Button asChild>
                <a href="/listings">تصفح الشقق المتاحة</a>
              </Button>
            </div>
          )}
        </div>
      </section>
      
      {/* Recommendations Section */}
      {favoriteApartments.length > 0 && (
        <section className="py-12 bg-gray-50">
          <div className="container-custom">
            <h2 className="text-2xl font-bold mb-8">قد يعجبك أيضاً</h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {apartments.slice(3, 6).map(apartment => {
                // Convert English data to Arabic for demonstration
                const arabicApartment = {
                  ...apartment,
                  title: "شقة فاخرة في موقع مميز",
                  location: "شارع التحرير، صنعاء",
                  price: 55000,
                  description: "شقة راقية بتشطيبات حديثة وتصميم عصري"
                };
                return <ApartmentCard key={apartment.id} apartment={arabicApartment} />;
              })}
            </div>
          </div>
        </section>
      )}
      
      {/* Tips Section */}
      <section className="py-12">
        <div className="container-custom">
          <div className="bg-blue-50 rounded-lg p-6 md:p-8">
            <div className="flex flex-col md:flex-row items-start md:items-center">
              <div className="md:mr-6 bg-blue-100 rounded-full p-3 mb-4 md:mb-0">
                <AlertCircle className="h-6 w-6 text-primary" />
              </div>
              <div className="text-right">
                <h3 className="text-lg font-semibold mb-2">نصائح للبحث عن شقة</h3>
                <ul className="list-disc list-inside space-y-1 text-gray-600">
                  <li>قارن بين عدة خيارات قبل اتخاذ القرار النهائي</li>
                  <li>تحقق من الموقع وقربه من الخدمات الأساسية</li>
                  <li>تأكد من زيارة الشقة والتحقق من جميع المرافق</li>
                  <li>اقرأ شروط العقد بعناية قبل التوقيع</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Favorites;
