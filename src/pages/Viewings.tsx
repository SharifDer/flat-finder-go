
import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Calendar, Clock, MapPin, ArrowRight, CalendarDays } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';

const Viewings = () => {
  const [activeTab, setActiveTab] = useState("upcoming");
  
  const upcomingViewings = [
    {
      id: 1,
      propertyName: "شقة استوديو مفروشة",
      date: "12 مايو 2023",
      time: "10:00 صباحًا",
      address: "شارع الستين، عمارة النور، شقة 4ب",
      landlordName: "محمد علي",
      landlordPhone: "777 123456",
      image: "/placeholder.svg",
    },
    {
      id: 2,
      propertyName: "شقة بغرفتين وصالة",
      date: "15 مايو 2023",
      time: "2:30 مساءً",
      address: "شارع الزبيري، مجمع البستان، وحدة ج",
      landlordName: "فاطمة أحمد",
      landlordPhone: "733 654321",
      image: "/placeholder.svg",
    },
  ];
  
  const pastViewings = [
    {
      id: 3,
      propertyName: "شقة مطلة على الحديقة",
      date: "5 مايو 2023",
      time: "11:30 صباحًا",
      address: "شارع الجامعة، عمارة الواحة، الطابق 3",
      landlordName: "علي محمود",
      landlordPhone: "711 987654",
      image: "/placeholder.svg",
    },
    {
      id: 4,
      propertyName: "شقة مفروشة بالكامل",
      date: "2 مايو 2023",
      time: "4:00 مساءً",
      address: "شارع التحرير، برج المستقبل، الطابق 5",
      landlordName: "سارة حسين",
      landlordPhone: "770 456789",
      image: "/placeholder.svg",
    },
  ];
  
  const viewings = activeTab === "upcoming" ? upcomingViewings : pastViewings;

  return (
    <div className="min-h-screen flex flex-col rtl">
      <Navbar />
      
      <section className="bg-blue-50 py-8">
        <div className="container-custom">
          <div className="flex flex-col items-center">
            <div className="bg-blue-100 rounded-full p-4 mb-4">
              <CalendarDays className="h-8 w-8 text-primary" />
            </div>
            <h1 className="text-3xl font-bold mb-2">مواعيد المعاينة</h1>
            <p className="text-gray-600">تابع مواعيد معاينة الشقق المحجوزة</p>
          </div>
        </div>
      </section>
      
      <section className="py-10">
        <div className="container-custom">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <Tabs
                  defaultValue="upcoming"
                  value={activeTab}
                  onValueChange={setActiveTab}
                  className="w-full"
                >
                  <TabsList className="grid grid-cols-2 w-full md:w-auto">
                    <TabsTrigger value="upcoming">المواعيد القادمة</TabsTrigger>
                    <TabsTrigger value="past">المواعيد السابقة</TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>
            </CardHeader>
            <CardContent>
              {viewings.length > 0 ? (
                <div className="space-y-4">
                  {viewings.map((viewing) => (
                    <div key={viewing.id} className="border rounded-lg overflow-hidden">
                      <div className="flex flex-col md:flex-row">
                        <div className="w-full md:w-32 h-32 bg-gray-100">
                          <img 
                            src={viewing.image} 
                            alt={viewing.propertyName} 
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1 p-4">
                          <div className="flex flex-col md:flex-row md:justify-between">
                            <div className="mb-4 md:mb-0">
                              <h3 className="font-medium text-lg">{viewing.propertyName}</h3>
                              <div className="flex items-center mb-1 text-sm text-muted-foreground">
                                <MapPin className="h-4 w-4 ml-1" /> {viewing.address}
                              </div>
                              <div className="flex items-center mb-2 text-sm">
                                <Calendar className="h-4 w-4 ml-1" /> {viewing.date}
                                <Clock className="h-4 w-4 ml-1 mr-2" /> {viewing.time}
                              </div>
                              <p className="text-sm">المؤجر: {viewing.landlordName} | {viewing.landlordPhone}</p>
                            </div>
                            <div className="text-right flex flex-col gap-2">
                              {activeTab === "upcoming" ? (
                                <>
                                  <Button size="sm" variant="default">
                                    <MapPin className="h-4 w-4 ml-1" />
                                    الاتجاهات
                                  </Button>
                                  <Button size="sm" variant="outline">
                                    إعادة جدولة
                                  </Button>
                                  <Button size="sm" variant="outline" className="text-red-500 border-red-200 hover:bg-red-50 hover:text-red-600">
                                    إلغاء
                                  </Button>
                                </>
                              ) : (
                                <Button size="sm">
                                  جدولة معاينة جديدة
                                  <ArrowRight className="h-4 w-4 mr-1" />
                                </Button>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-10">
                  <p className="text-gray-500">لا توجد مواعيد معاينة في هذه الفئة</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </section>
      
      <section className="py-8 bg-gray-50">
        <div className="container-custom">
          <h2 className="text-2xl font-bold mb-4">نصائح لمعاينة الشقق</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="font-semibold mb-2">قبل المعاينة</h3>
              <ul className="text-gray-600 space-y-2">
                <li className="flex items-center">
                  <div className="bg-blue-100 rounded-full h-6 w-6 flex items-center justify-center ml-2">
                    <span className="text-primary font-bold text-xs">1</span>
                  </div>
                  اكتب قائمة بالأسئلة التي تريد طرحها على المالك
                </li>
                <li className="flex items-center">
                  <div className="bg-blue-100 rounded-full h-6 w-6 flex items-center justify-center ml-2">
                    <span className="text-primary font-bold text-xs">2</span>
                  </div>
                  حدد ميزانيتك وأولوياتك قبل الذهاب
                </li>
                <li className="flex items-center">
                  <div className="bg-blue-100 rounded-full h-6 w-6 flex items-center justify-center ml-2">
                    <span className="text-primary font-bold text-xs">3</span>
                  </div>
                  تأكد من الوصول في الموعد المحدد بالضبط
                </li>
              </ul>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="font-semibold mb-2">أثناء المعاينة</h3>
              <ul className="text-gray-600 space-y-2">
                <li className="flex items-center">
                  <div className="bg-blue-100 rounded-full h-6 w-6 flex items-center justify-center ml-2">
                    <span className="text-primary font-bold text-xs">1</span>
                  </div>
                  افحص جميع الغرف والمرافق بعناية
                </li>
                <li className="flex items-center">
                  <div className="bg-blue-100 rounded-full h-6 w-6 flex items-center justify-center ml-2">
                    <span className="text-primary font-bold text-xs">2</span>
                  </div>
                  تحقق من نظام التدفئة والتكييف والسباكة
                </li>
                <li className="flex items-center">
                  <div className="bg-blue-100 rounded-full h-6 w-6 flex items-center justify-center ml-2">
                    <span className="text-primary font-bold text-xs">3</span>
                  </div>
                  التقط صورًا للرجوع إليها لاحقًا واسأل عن شروط العقد
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Viewings;
