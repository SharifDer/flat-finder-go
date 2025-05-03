
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Users, Building, Home, Activity } from 'lucide-react';

// هذي بيانات قادمة من السيرفر من الباك ايند
// البيانات المتوقعة: عدد المستخدمين المسجلين، عدد الشقق المعروضة، عدد الزوار، إحصائيات أخرى
const mockStatsData = {
  totalUsers: 1245,
  registeredUsers: 872,
  totalApartments: 534,
  newUsersToday: 24,
  newApartmentsToday: 12,
  viewsToday: 1543,
};

// هذي بيانات قادمة من السيرفر من الباك ايند
// البيانات المتوقعة: بيانات زمنية لإحصائيات الموقع مثل عدد المستخدمين والشقق
const mockChartData = [
  { name: 'يناير', users: 400, apartments: 240, views: 2400 },
  { name: 'فبراير', users: 500, apartments: 250, views: 2800 },
  { name: 'مارس', users: 600, apartments: 270, views: 3200 },
  { name: 'أبريل', users: 680, apartments: 290, views: 3600 },
  { name: 'مايو', users: 750, apartments: 320, views: 4000 },
  { name: 'يونيو', users: 830, apartments: 350, views: 4300 },
];

const Dashboard = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="py-8 bg-gray-50 flex-grow">
        <div className="container-custom">
          <h1 className="text-3xl font-bold mb-8">لوحة التحكم</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">إجمالي المستخدمين</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{mockStatsData.totalUsers}</div>
                <p className="text-xs text-muted-foreground">
                  +{mockStatsData.newUsersToday} اليوم
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">المستخدمين المسجلين</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{mockStatsData.registeredUsers}</div>
                <p className="text-xs text-muted-foreground">
                  {Math.round((mockStatsData.registeredUsers / mockStatsData.totalUsers) * 100)}% من إجمالي الزوار
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">الشقق المعروضة</CardTitle>
                <Building className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{mockStatsData.totalApartments}</div>
                <p className="text-xs text-muted-foreground">
                  +{mockStatsData.newApartmentsToday} اليوم
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">المشاهدات اليومية</CardTitle>
                <Activity className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{mockStatsData.viewsToday}</div>
                <p className="text-xs text-muted-foreground">
                  ~{Math.round(mockStatsData.viewsToday / 24)} في الساعة
                </p>
              </CardContent>
            </Card>
          </div>
          
          <Tabs defaultValue="overview" className="space-y-6">
            <TabsList>
              <TabsTrigger value="overview">نظرة عامة</TabsTrigger>
              <TabsTrigger value="users">المستخدمون</TabsTrigger>
              <TabsTrigger value="apartments">الشقق</TabsTrigger>
            </TabsList>
            
            <TabsContent value="overview" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>إحصائيات النشاط</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={mockChartData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="users" stroke="#8884d8" activeDot={{ r: 8 }} />
                        <Line type="monotone" dataKey="apartments" stroke="#82ca9d" />
                        <Line type="monotone" dataKey="views" stroke="#ffc658" />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="users" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>نمو المستخدمين</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={mockChartData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="users" fill="#8884d8" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="apartments" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>نمو الشقق المعروضة</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={mockChartData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="apartments" fill="#82ca9d" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Dashboard;
