
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Heart, User, Settings, HomeIcon, Bell, Calendar, Check, Clock } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { toast } from "@/components/ui/use-toast";

const UserProfile = () => {
  const [activeTab, setActiveTab] = useState("profile");
  const [savedApartments, setSavedApartments] = useState([
    {
      id: 1,
      title: "شقة فسيحة بغرفتين في وسط المدينة",
      address: "شارع الزهراء، الحي الغربي، عمارة 4، شقة ب",
      price: 80000,
      image: "/placeholder.svg",
    },
    {
      id: 2,
      title: "استوديو عصري مع إطلالة على المدينة",
      address: "شارع الستين، برج النور، الدور 7، شقة ج",
      price: 60000,
      image: "/placeholder.svg",
    },
    {
      id: 3,
      title: "شقة مريحة بغرفة نوم واحدة قرب الجامعة",
      address: "شارع الجامعة، عمارة الطلاب، الدور 2، شقة أ",
      price: 45000,
      image: "/placeholder.svg",
    },
  ]);

  const [applications, setApplications] = useState([
    {
      id: 1,
      propertyName: "شقة فاخرة في برج سكني",
      date: "2023-04-15",
      status: "approved",
      image: "/placeholder.svg",
    },
    {
      id: 2,
      propertyName: "شقة في وسط المدينة",
      date: "2023-04-10",
      status: "pending",
      image: "/placeholder.svg",
    },
    {
      id: 3,
      propertyName: "شقة قرب نهر الملكة أروى",
      date: "2023-03-28",
      status: "declined",
      image: "/placeholder.svg",
    },
  ]);

  const [upcomingViewings, setUpcomingViewings] = useState([
    {
      id: 1,
      propertyName: "شقة استوديو",
      date: "2023-05-12",
      time: "10:00 صباحًا",
      address: "شارع الستين، عمارة النور، شقة 4ب",
      image: "/placeholder.svg",
    },
    {
      id: 2,
      propertyName: "شقة بغرفتين",
      date: "2023-05-15",
      time: "2:30 مساءً",
      address: "شارع الزبيري، مجمع البستان، وحدة ج",
      image: "/placeholder.svg",
    },
  ]);

  // User data state
  const [userData, setUserData] = useState({
    name: "أحمد علي",
    email: "ahmed.ali@example.com",
    phone: "777 123456",
    profileImage: "/placeholder.svg",
    notificationSettings: {
      email: true,
      sms: false,
      app: true,
    }
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleNotificationChange = (type: string) => {
    setUserData((prev) => ({
      ...prev,
      notificationSettings: {
        ...prev.notificationSettings,
        [type]: !prev.notificationSettings[type as keyof typeof prev.notificationSettings],
      }
    }));
  };

  const handleSaveProfile = () => {
    // In a real app, this would send data to an API
    console.log("Profile data saved:", userData);
    // Show success message
    toast({
      title: "تم حفظ البيانات",
      description: "تم تحديث بياناتك الشخصية بنجاح",
    });
  };

  // Handle tab changes
  useEffect(() => {
    // This would typically handle any side effects needed when tabs change
  }, [activeTab]);

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
            <Clock className="h-3 w-3 ml-1" /> مرفوض
          </Badge>
        );
      default:
        return (
          <Badge className="bg-gray-500 hover:bg-gray-600">
            <Clock className="h-3 w-3 ml-1" /> غير معروف
          </Badge>
        );
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 rtl">
      <Navbar />
      
      <main className="flex-grow py-8">
        <div className="container-custom">
          <div className="flex flex-col md:flex-row gap-6">
            {/* Sidebar */}
            <div className="w-full md:w-64">
              <Card>
                <CardContent className="p-4">
                  <div className="flex flex-col items-center mb-6 pt-4">
                    <div className="w-24 h-24 rounded-full overflow-hidden mb-3 bg-gray-100">
                      <img 
                        src={userData.profileImage} 
                        alt="الصورة الشخصية" 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <h3 className="font-medium text-lg">{userData.name}</h3>
                    <p className="text-muted-foreground text-sm">{userData.email}</p>
                  </div>
                  
                  <Tabs 
                    defaultValue="profile" 
                    orientation="vertical"
                    value={activeTab}
                    onValueChange={setActiveTab}
                    className="w-full"
                  >
                    <TabsList className="flex flex-col h-auto space-y-1 bg-transparent p-0">
                      <TabsTrigger
                        value="profile"
                        className="justify-start px-3 data-[state=active]:bg-muted w-full"
                      >
                        <User className="h-4 w-4 ml-2" />
                        الملف الشخصي
                      </TabsTrigger>
                      <TabsTrigger
                        value="saved"
                        className="justify-start px-3 data-[state=active]:bg-muted w-full"
                      >
                        <Heart className="h-4 w-4 ml-2" />
                        الشقق المحفوظة
                      </TabsTrigger>
                      <TabsTrigger
                        value="applications"
                        className="justify-start px-3 data-[state=active]:bg-muted w-full"
                      >
                        <HomeIcon className="h-4 w-4 ml-2" />
                        الطلبات
                      </TabsTrigger>
                      <TabsTrigger
                        value="viewings"
                        className="justify-start px-3 data-[state=active]:bg-muted w-full"
                      >
                        <Calendar className="h-4 w-4 ml-2" />
                        المعاينات
                      </TabsTrigger>
                      <TabsTrigger
                        value="settings"
                        className="justify-start px-3 data-[state=active]:bg-muted w-full"
                      >
                        <Settings className="h-4 w-4 ml-2" />
                        الإعدادات
                      </TabsTrigger>
                    </TabsList>
                  </Tabs>
                </CardContent>
              </Card>
            </div>
            
            {/* Content */}
            <div className="flex-1">
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsContent value="profile" className="mt-0">
                  <Card>
                    <CardHeader>
                      <CardTitle>المعلومات الشخصية</CardTitle>
                      <CardDescription>
                        تحديث بيانات حسابك ومعلوماتك الشخصية.
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <form className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="name">الاسم الكامل</Label>
                            <Input
                              id="name"
                              name="name"
                              value={userData.name}
                              onChange={handleInputChange}
                              className="text-right"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="email">البريد الإلكتروني</Label>
                            <Input
                              id="email"
                              name="email"
                              type="email"
                              value={userData.email}
                              onChange={handleInputChange}
                              className="text-right"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="phone">رقم الهاتف</Label>
                            <Input
                              id="phone"
                              name="phone"
                              type="tel"
                              value={userData.phone}
                              onChange={handleInputChange}
                              className="text-right"
                            />
                          </div>
                        </div>
                        <Button 
                          type="button" 
                          onClick={handleSaveProfile}
                          className="mt-4"
                        >
                          حفظ التغييرات
                        </Button>
                      </form>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="saved" className="mt-0">
                  {/* Saved apartments content */}
                  <Card>
                    <CardHeader>
                      <CardTitle>الشقق المحفوظة</CardTitle>
                      <CardDescription>
                        العقارات التي قمت بحفظها للرجوع إليها لاحقًا.
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 gap-4">
                        {savedApartments.map((apt) => (
                          <div key={apt.id} className="flex border rounded-lg overflow-hidden">
                            <div className="p-4 flex items-start">
                              <Button size="sm" variant="outline">عرض</Button>
                            </div>
                            <div className="flex-1 p-4 text-right">
                              <h3 className="font-medium">{apt.title}</h3>
                              <p className="text-sm text-muted-foreground">{apt.address}</p>
                              <p className="text-sm font-medium mt-1">{apt.price} ريال/شهريًا</p>
                            </div>
                            <div className="w-24 h-24 bg-gray-100">
                              <img 
                                src={apt.image} 
                                alt={apt.title} 
                                className="w-full h-full object-cover"
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="applications" className="mt-0">
                  <Card>
                    <CardHeader>
                      <CardTitle>طلبات الاستئجار</CardTitle>
                      <CardDescription>
                        متابعة طلبات استئجار الشقق الخاصة بك.
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 gap-4">
                        {applications.map((app) => (
                          <div key={app.id} className="flex border rounded-lg overflow-hidden">
                            <div className="p-4 flex items-start">
                              <Button size="sm" variant="outline">التفاصيل</Button>
                            </div>
                            <div className="flex-1 p-4 text-right">
                              <h3 className="font-medium">{app.propertyName}</h3>
                              <p className="text-sm text-muted-foreground">تاريخ الطلب: {app.date}</p>
                              <div className="mt-2">
                                {getStatusBadge(app.status)}
                              </div>
                            </div>
                            <div className="w-24 h-24 bg-gray-100">
                              <img 
                                src={app.image} 
                                alt={app.propertyName} 
                                className="w-full h-full object-cover"
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="viewings" className="mt-0">
                  <Card>
                    <CardHeader>
                      <CardTitle>مواعيد المعاينة</CardTitle>
                      <CardDescription>
                        مواعيد معاينة الشقق المجدولة.
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 gap-4">
                        {upcomingViewings.map((viewing) => (
                          <div key={viewing.id} className="flex border rounded-lg overflow-hidden">
                            <div className="p-4 flex items-start">
                              <Button size="sm" variant="outline">المسار</Button>
                            </div>
                            <div className="flex-1 p-4 text-right">
                              <h3 className="font-medium">{viewing.propertyName}</h3>
                              <p className="text-sm text-muted-foreground">{viewing.address}</p>
                              <p className="text-sm mt-1">
                                {viewing.date} في {viewing.time}
                              </p>
                            </div>
                            <div className="w-24 h-24 bg-gray-100">
                              <img 
                                src={viewing.image} 
                                alt={viewing.propertyName} 
                                className="w-full h-full object-cover"
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="settings" className="mt-0">
                  <Card>
                    <CardHeader>
                      <CardTitle>إعدادات الإشعارات</CardTitle>
                      <CardDescription>
                        ضبط كيفية استلام التحديثات والإشعارات.
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <Button 
                            variant={userData.notificationSettings.email ? "default" : "outline"}
                            onClick={() => handleNotificationChange("email")}
                            className="mr-auto"
                          >
                            {userData.notificationSettings.email ? "مفعّل" : "معطّل"}
                          </Button>
                          <div className="text-right">
                            <h3 className="font-medium">إشعارات البريد الإلكتروني</h3>
                            <p className="text-sm text-muted-foreground">
                              استلام تحديثات حول العروض الجديدة وحالة الطلبات
                            </p>
                          </div>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <Button 
                            variant={userData.notificationSettings.sms ? "default" : "outline"}
                            onClick={() => handleNotificationChange("sms")}
                            className="mr-auto"
                          >
                            {userData.notificationSettings.sms ? "مفعّل" : "معطّل"}
                          </Button>
                          <div className="text-right">
                            <h3 className="font-medium">إشعارات الرسائل القصيرة</h3>
                            <p className="text-sm text-muted-foreground">
                              استلام تنبيهات عبر الرسائل القصيرة للتحديثات العاجلة
                            </p>
                          </div>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <Button 
                            variant={userData.notificationSettings.app ? "default" : "outline"}
                            onClick={() => handleNotificationChange("app")}
                            className="mr-auto"
                          >
                            {userData.notificationSettings.app ? "مفعّل" : "معطّل"}
                          </Button>
                          <div className="text-right">
                            <h3 className="font-medium">إشعارات التطبيق</h3>
                            <p className="text-sm text-muted-foreground">
                              استلام إشعارات عند استخدام التطبيق
                            </p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default UserProfile;
