
import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Check, Clock, X, FileText } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';

const Applications = () => {
  const [activeTab, setActiveTab] = useState("all");
  
  const applications = [
    {
      id: 1,
      propertyName: "شقة فاخرة في برج سكني",
      date: "15 أبريل 2023",
      status: "approved",
      landlord: "عبدالرحمن محمد",
      address: "شارع الزبيري، برج السلام، الطابق 10",
      price: 85000,
      image: "/placeholder.svg",
    },
    {
      id: 2,
      propertyName: "شقة في وسط المدينة",
      date: "10 أبريل 2023",
      status: "pending",
      landlord: "سعيد أحمد",
      address: "شارع الستين، عمارة النور، الطابق 3",
      price: 65000,
      image: "/placeholder.svg",
    },
    {
      id: 3,
      propertyName: "شقة قرب نهر الملكة أروى",
      date: "28 مارس 2023",
      status: "declined",
      landlord: "فاطمة محمد",
      address: "شارع الزهراء، مجمع الأمل، الطابق 2",
      price: 50000,
      image: "/placeholder.svg",
    },
    {
      id: 4,
      propertyName: "شقة بإطلالة على الجبل",
      date: "5 مارس 2023",
      status: "approved",
      landlord: "علي محمود",
      address: "شارع الخمسين، عمارة القمة، الطابق 8",
      price: 70000,
      image: "/placeholder.svg",
    },
  ];
  
  const filteredApplications = activeTab === "all" 
    ? applications
    : applications.filter(app => app.status === activeTab);
  
  const getStatusBadge = (status: string) => {
    switch(status) {
      case "approved":
        return (
          <Badge className="bg-green-500 hover:bg-green-600">
            <Check className="h-3 w-3 ml-1" /> تمت الموافقة
          </Badge>
        );
      case "pending":
        return (
          <Badge className="bg-yellow-500 hover:bg-yellow-600">
            <Clock className="h-3 w-3 ml-1" /> قيد المراجعة
          </Badge>
        );
      case "declined":
        return (
          <Badge className="bg-red-500 hover:bg-red-600">
            <X className="h-3 w-3 ml-1" /> مرفوض
          </Badge>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen flex flex-col rtl">
      <Navbar />
      
      <section className="bg-blue-50 py-8">
        <div className="container-custom">
          <div className="flex flex-col items-center">
            <div className="bg-blue-100 rounded-full p-4 mb-4">
              <FileText className="h-8 w-8 text-primary" />
            </div>
            <h1 className="text-3xl font-bold mb-2">طلبات الاستئجار</h1>
            <p className="text-gray-600">تابع حالة طلبات استئجار الشقق التي قدمتها</p>
          </div>
        </div>
      </section>
      
      <section className="py-10">
        <div className="container-custom">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <Tabs
                  defaultValue="all"
                  value={activeTab}
                  onValueChange={setActiveTab}
                  className="w-full"
                >
                  <TabsList className="grid grid-cols-4 w-full md:w-auto">
                    <TabsTrigger value="all">الكل</TabsTrigger>
                    <TabsTrigger value="pending">قيد المراجعة</TabsTrigger>
                    <TabsTrigger value="approved">تمت الموافقة</TabsTrigger>
                    <TabsTrigger value="declined">مرفوض</TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>
            </CardHeader>
            <CardContent>
              {filteredApplications.length > 0 ? (
                <div className="space-y-4">
                  {filteredApplications.map((application) => (
                    <div key={application.id} className="border rounded-lg overflow-hidden">
                      <div className="flex flex-col md:flex-row">
                        <div className="w-full md:w-32 h-32 bg-gray-100">
                          <img 
                            src={application.image} 
                            alt={application.propertyName} 
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1 p-4">
                          <div className="flex flex-col md:flex-row md:justify-between">
                            <div className="mb-4 md:mb-0">
                              <h3 className="font-medium text-lg">{application.propertyName}</h3>
                              <p className="text-sm text-muted-foreground mb-1">{application.address}</p>
                              <p className="text-sm mb-2">المؤجر: {application.landlord}</p>
                              <p className="text-sm font-medium">{application.price} ريال/شهريًا</p>
                            </div>
                            <div className="text-right">
                              <p className="text-sm text-muted-foreground mb-2">تاريخ الطلب: {application.date}</p>
                              <div className="mb-4">
                                {getStatusBadge(application.status)}
                              </div>
                              <Button size="sm">عرض التفاصيل</Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-10">
                  <p className="text-gray-500">لا توجد طلبات في هذه الفئة</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </section>
      
      <section className="py-8 bg-gray-50">
        <div className="container-custom">
          <h2 className="text-2xl font-bold mb-4">كيف تعمل طلبات الاستئجار؟</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="bg-blue-100 rounded-full h-12 w-12 flex items-center justify-center mb-4">
                <span className="text-primary font-bold">1</span>
              </div>
              <h3 className="font-semibold mb-2">تقديم الطلب</h3>
              <p className="text-gray-600">قدم طلب استئجار للشقة التي تناسبك من خلال صفحة تفاصيل الشقة</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="bg-blue-100 rounded-full h-12 w-12 flex items-center justify-center mb-4">
                <span className="text-primary font-bold">2</span>
              </div>
              <h3 className="font-semibold mb-2">مراجعة المالك</h3>
              <p className="text-gray-600">يقوم المالك بمراجعة طلبك والرد عليه بالموافقة أو الرفض</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="bg-blue-100 rounded-full h-12 w-12 flex items-center justify-center mb-4">
                <span className="text-primary font-bold">3</span>
              </div>
              <h3 className="font-semibold mb-2">إتمام التعاقد</h3>
              <p className="text-gray-600">في حال الموافقة، سيتم التواصل معك لإتمام إجراءات التعاقد</p>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Applications;
