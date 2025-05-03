/**
 * This file is for the Homepage
 * Displays the main landing page with search functionality and featured listings
 */

import React from 'react';
import SearchBar from '@/components/SearchBar';
import FeaturedListings from '@/components/FeaturedListings';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, Home, MapPin, Heart, Search as SearchIcon } from 'lucide-react';
import { useUserPreference } from '@/contexts/UserPreferenceContext';
import UserOnboardingModal from '@/components/UserOnboardingModal';
import LandlordForm from '@/components/LandlordForm';

const Index = () => {
  const { userType } = useUserPreference();
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* First-time user modal */}
      <UserOnboardingModal />
      
      {/* Hero Section */}
      <section className="bg-blue-50 py-16 md:py-24">
        <div className="container-custom text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
            ابحث عن منزل مثالي في <span className="text-primary">صنعاء</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto mb-10">
            الاتصال المباشر مع مالكي العقارات. لا وسطاء، لا رسوم إضافية.
            فقط بحث بسيط عن الشقق استنادًا إلى الموقع.
          </p>
          
          <SearchBar variant="hero" />
          
          <div className="flex flex-wrap justify-center gap-6 mt-8">
            <div className="flex items-center">
              <Home className="h-5 w-5 text-primary mr-2" />
              <span className="text-gray-700">أكثر من 1000 إعلان</span>
            </div>
            <div className="flex items-center">
              <MapPin className="h-5 w-5 text-primary mr-2" />
              <span className="text-gray-700">أكثر من 50 حي</span>
            </div>
            <div className="flex items-center">
              <Heart className="h-5 w-5 text-primary mr-2" />
              <span className="text-gray-700">اتصال مباشر مع المالكين</span>
            </div>
          </div>
        </div>
      </section>
      
      {/* Neighborhoods Section */}
      <section className="py-12 bg-white">
        <div className="container-custom">
          <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-800 mb-8">
            المناطق الشعبية في صنعاء
          </h2>
          {/* This data comes from the backend */}
          {/* Expected data: Popular area names, number of apartments in each area */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {['حده', 'شارع تعز', 'الصنينة', 'شارع الستين', 'الحصبة', 'منطقة الجامعة'].map((area) => (
              <Link 
                key={area} 
                to={`/listings?location=${area}`}
                className="bg-blue-50 hover:bg-blue-100 transition-colors p-4 rounded-lg text-center"
              >
                <div className="font-medium text-primary">{area}</div>
              </Link>
            ))}
          </div>
        </div>
      </section>
      
      {/* Dynamic Content based on User Type */}
      {userType === 'landlord' && <LandlordForm />}
      
      {/* How It Works */}
      <section className="py-16 bg-gray-50">
        <div className="container-custom">
          <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-800 mb-12">
            كيف يعمل الموقع 
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-blue-100 rounded-full h-16 w-16 flex items-center justify-center mx-auto mb-4">
                <SearchIcon className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">البحث عن العقارات</h3>
              <p className="text-gray-600">
                ابحث بسهولة عن الشقق بناءً على الموقع المفضل لديك والميزانية والمرافق.
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-blue-100 rounded-full h-16 w-16 flex items-center justify-center mx-auto mb-4">
                <Heart className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">الاتصال المباشر</h3>
              <p className="text-gray-600">
                تواصل مباشرة مع مالكي العقارات، بدون وسطاء أو رسوم إضافية.
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-blue-100 rounded-full h-16 w-16 flex items-center justify-center mx-auto mb-4">
                <Home className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">الانتقال إلى منزلك الجديد</h3>
              <p className="text-gray-600">
                حدد مواعيد للمعاينة، أنهِ التفاصيل، واستمتع بمنزلك الجديد بدون أي متاعب إضافية.
              </p>
            </div>
          </div>
          
          <div className="text-center mt-10">
            <Link to="/how-it-works">
              <Button variant="outline" className="inline-flex items-center">
                تعرف أكثر <ArrowRight className="mr-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
      
      {/* Featured Listings */}
      <div className="py-0">
        {/* This data comes from the backend */}
        {/* Expected data: Featured apartment data including images, prices, locations, number of rooms, etc. */}
        <FeaturedListings />
      </div>
      
      {/* CTA Section */}
      <section className="bg-primary py-16">
        <div className="container-custom text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">
            هل أنت مستعد للعثور على شقتك المثالية في صنعاء؟
          </h2>
          <p className="text-lg text-white/90 max-w-2xl mx-auto mb-8">
            انضم إلى الآلاف من المستأجرين السعداء الذين وجدوا منازلهم من خلال موقع FindMyFlat.
            ابدأ بتصفح الشقق المتاحة اليوم!
          </p>
          <Link to="/listings">
            <Button size="lg" variant="secondary" className="mx-auto">
              تصفح الشقق
            </Button>
          </Link>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Index;
