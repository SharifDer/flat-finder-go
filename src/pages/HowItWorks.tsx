
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Home, Search, Heart, Check, Phone } from 'lucide-react';

const HowItWorks = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Hero Section */}
      <section className="bg-blue-50 py-16">
        <div className="container-custom text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            كيف يعمل سكن صنعاء
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            منصتنا تربط بين الباحثين عن سكن وأصحاب العقارات بشكل مباشر، بدون وسطاء أو عمولات إضافية
          </p>
        </div>
      </section>
      
      {/* Steps Section */}
      <section className="py-16">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* For Tenants */}
            <div className="bg-white p-8 rounded-xl shadow-md">
              <h2 className="text-2xl font-bold mb-6 text-center text-primary">للباحثين عن سكن</h2>
              
              <div className="space-y-8">
                <div className="flex items-start">
                  <div className="bg-blue-100 rounded-full p-3 mr-4">
                    <Search className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-2">١. ابحث عن شقتك المثالية</h3>
                    <p className="text-gray-600">استخدم المرشحات المتقدمة للعثور على شقة تناسب ميزانيتك واحتياجاتك في الحي الذي ترغب فيه.</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-blue-100 rounded-full p-3 mr-4">
                    <Heart className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-2">٢. تواصل مع المالك مباشرة</h3>
                    <p className="text-gray-600">اتصل مع المالك بشكل مباشر عبر الهاتف أو الرسائل لطرح أسئلتك وترتيب زيارة للشقة.</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-blue-100 rounded-full p-3 mr-4">
                    <Check className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-2">٣. انتقل إلى منزلك الجديد</h3>
                    <p className="text-gray-600">بعد العثور على الشقة المناسبة، تواصل مع المالك لإتمام التفاصيل والعقد.</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* For Landlords */}
            <div className="bg-white p-8 rounded-xl shadow-md">
              <h2 className="text-2xl font-bold mb-6 text-center text-primary">لأصحاب العقارات</h2>
              
              <div className="space-y-8">
                <div className="flex items-start">
                  <div className="bg-blue-100 rounded-full p-3 mr-4">
                    <Plus className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-2">١. أضف شقتك</h3>
                    <p className="text-gray-600">سجل تفاصيل شقتك، أضف الصور والمعلومات الضرورية عن العقار والموقع والمميزات.</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-blue-100 rounded-full p-3 mr-4">
                    <Phone className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-2">٢. استقبل اتصالات المهتمين</h3>
                    <p className="text-gray-600">سيتواصل معك المستأجرون المحتملون مباشرة دون وسطاء، مما يوفر عليك العمولات.</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-blue-100 rounded-full p-3 mr-4">
                    <Check className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-2">٣. أكمل عملية التأجير</h3>
                    <p className="text-gray-600">رتب مواعيد المعاينة وأتم التفاصيل مع المستأجر الذي تختاره.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* FAQ Section */}
      <section className="py-16 bg-gray-50">
        <div className="container-custom">
          <h2 className="text-3xl font-bold text-center mb-12">الأسئلة الشائعة</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="font-semibold text-xl mb-3">هل هناك رسوم لاستخدام الموقع؟</h3>
              <p className="text-gray-600">لا، استخدام الموقع مجاني تماماً للباحثين عن سكن وأصحاب العقارات.</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="font-semibold text-xl mb-3">كيف أتحقق من مصداقية الإعلانات؟</h3>
              <p className="text-gray-600">نقوم بمراجعة الإعلانات قبل نشرها ونشجع المستخدمين على الإبلاغ عن أي محتوى مشبوه.</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="font-semibold text-xl mb-3">هل يمكنني تعديل إعلاني بعد نشره؟</h3>
              <p className="text-gray-600">نعم، يمكنك تعديل أو حذف إعلانك في أي وقت من خلال حسابك الشخصي.</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="font-semibold text-xl mb-3">هل أحتاج لحساب لمشاهدة الإعلانات؟</h3>
              <p className="text-gray-600">لا، يمكنك تصفح الإعلانات دون تسجيل، لكن التسجيل ضروري للتواصل مع الملاك أو لإضافة إعلان.</p>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default HowItWorks;
