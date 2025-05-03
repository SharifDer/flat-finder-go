
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

const UserProfile = () => {
  const [activeTab, setActiveTab] = useState("profile");
  const [savedApartments, setSavedApartments] = useState([
    {
      id: 1,
      title: "Spacious 2 Bed in Downtown",
      address: "123 Main St, Apartment 4B",
      price: 1800,
      image: "/placeholder.svg",
    },
    {
      id: 2,
      title: "Modern Studio with City Views",
      address: "456 Park Ave, Apartment 7C",
      price: 1200,
      image: "/placeholder.svg",
    },
    {
      id: 3,
      title: "Cozy 1 Bed near Campus",
      address: "789 College Blvd, Apartment 2A",
      price: 950,
      image: "/placeholder.svg",
    },
  ]);

  const [applications, setApplications] = useState([
    {
      id: 1,
      propertyName: "Luxury High-Rise Apartment",
      date: "2023-04-15",
      status: "approved",
      image: "/placeholder.svg",
    },
    {
      id: 2,
      propertyName: "Downtown Loft Space",
      date: "2023-04-10",
      status: "pending",
      image: "/placeholder.svg",
    },
    {
      id: 3,
      propertyName: "Riverside Apartment Complex",
      date: "2023-03-28",
      status: "declined",
      image: "/placeholder.svg",
    },
  ]);

  const [upcomingViewings, setUpcomingViewings] = useState([
    {
      id: 1,
      propertyName: "Studio Apartment",
      date: "2023-05-12",
      time: "10:00 AM",
      address: "123 Main St, Apt 4B",
      image: "/placeholder.svg",
    },
    {
      id: 2,
      propertyName: "2 Bed Townhouse",
      date: "2023-05-15",
      time: "2:30 PM",
      address: "456 Oak Ave, Unit C",
      image: "/placeholder.svg",
    },
  ]);

  // User data state
  const [userData, setUserData] = useState({
    name: "Alex Johnson",
    email: "alex.johnson@example.com",
    phone: "(555) 123-4567",
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
            <Check className="h-3 w-3 mr-1" /> Approved
          </Badge>
        );
      case "pending":
        return (
          <Badge className="bg-yellow-500 hover:bg-yellow-600">
            <Clock className="h-3 w-3 mr-1" /> Pending
          </Badge>
        );
      case "declined":
        return (
          <Badge className="bg-red-500 hover:bg-red-600">
            <Clock className="h-3 w-3 mr-1" /> Declined
          </Badge>
        );
      default:
        return (
          <Badge className="bg-gray-500 hover:bg-gray-600">
            <Clock className="h-3 w-3 mr-1" /> Unknown
          </Badge>
        );
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
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
                        alt="Profile" 
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
                        <User className="h-4 w-4 mr-2" />
                        Profile
                      </TabsTrigger>
                      <TabsTrigger
                        value="saved"
                        className="justify-start px-3 data-[state=active]:bg-muted w-full"
                      >
                        <Heart className="h-4 w-4 mr-2" />
                        Saved Apartments
                      </TabsTrigger>
                      <TabsTrigger
                        value="applications"
                        className="justify-start px-3 data-[state=active]:bg-muted w-full"
                      >
                        <HomeIcon className="h-4 w-4 mr-2" />
                        Applications
                      </TabsTrigger>
                      <TabsTrigger
                        value="viewings"
                        className="justify-start px-3 data-[state=active]:bg-muted w-full"
                      >
                        <Calendar className="h-4 w-4 mr-2" />
                        Viewings
                      </TabsTrigger>
                      <TabsTrigger
                        value="settings"
                        className="justify-start px-3 data-[state=active]:bg-muted w-full"
                      >
                        <Settings className="h-4 w-4 mr-2" />
                        Settings
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
                      <CardTitle>Personal Information</CardTitle>
                      <CardDescription>
                        Update your account details and information.
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <form className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="name">Full Name</Label>
                            <Input
                              id="name"
                              name="name"
                              value={userData.name}
                              onChange={handleInputChange}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                              id="email"
                              name="email"
                              type="email"
                              value={userData.email}
                              onChange={handleInputChange}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="phone">Phone</Label>
                            <Input
                              id="phone"
                              name="phone"
                              type="tel"
                              value={userData.phone}
                              onChange={handleInputChange}
                            />
                          </div>
                        </div>
                        <Button 
                          type="button" 
                          onClick={handleSaveProfile}
                          className="mt-4"
                        >
                          Save Changes
                        </Button>
                      </form>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="saved" className="mt-0">
                  {/* Saved apartments content */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Saved Apartments</CardTitle>
                      <CardDescription>
                        Your bookmarked properties for future reference.
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 gap-4">
                        {savedApartments.map((apt) => (
                          <div key={apt.id} className="flex border rounded-lg overflow-hidden">
                            <div className="w-24 h-24 bg-gray-100">
                              <img 
                                src={apt.image} 
                                alt={apt.title} 
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div className="flex-1 p-4">
                              <h3 className="font-medium">{apt.title}</h3>
                              <p className="text-sm text-muted-foreground">{apt.address}</p>
                              <p className="text-sm font-medium mt-1">${apt.price}/month</p>
                            </div>
                            <div className="p-4 flex items-start">
                              <Button size="sm" variant="outline">View</Button>
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
                      <CardTitle>Applications</CardTitle>
                      <CardDescription>
                        Track your apartment applications.
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 gap-4">
                        {applications.map((app) => (
                          <div key={app.id} className="flex border rounded-lg overflow-hidden">
                            <div className="w-24 h-24 bg-gray-100">
                              <img 
                                src={app.image} 
                                alt={app.propertyName} 
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div className="flex-1 p-4">
                              <h3 className="font-medium">{app.propertyName}</h3>
                              <p className="text-sm text-muted-foreground">Applied on {app.date}</p>
                              <div className="mt-2">
                                {getStatusBadge(app.status)}
                              </div>
                            </div>
                            <div className="p-4 flex items-start">
                              <Button size="sm" variant="outline">Details</Button>
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
                      <CardTitle>Upcoming Viewings</CardTitle>
                      <CardDescription>
                        Your scheduled apartment viewings.
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 gap-4">
                        {upcomingViewings.map((viewing) => (
                          <div key={viewing.id} className="flex border rounded-lg overflow-hidden">
                            <div className="w-24 h-24 bg-gray-100">
                              <img 
                                src={viewing.image} 
                                alt={viewing.propertyName} 
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div className="flex-1 p-4">
                              <h3 className="font-medium">{viewing.propertyName}</h3>
                              <p className="text-sm text-muted-foreground">{viewing.address}</p>
                              <p className="text-sm mt-1">
                                {viewing.date} at {viewing.time}
                              </p>
                            </div>
                            <div className="p-4 flex items-start">
                              <Button size="sm" variant="outline">Directions</Button>
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
                      <CardTitle>Notification Settings</CardTitle>
                      <CardDescription>
                        Configure how you receive updates and alerts.
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="font-medium">Email Notifications</h3>
                            <p className="text-sm text-muted-foreground">
                              Receive updates about new listings and application status
                            </p>
                          </div>
                          <Button 
                            variant={userData.notificationSettings.email ? "default" : "outline"}
                            onClick={() => handleNotificationChange("email")}
                            className="ml-auto"
                          >
                            {userData.notificationSettings.email ? "Enabled" : "Disabled"}
                          </Button>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="font-medium">SMS Notifications</h3>
                            <p className="text-sm text-muted-foreground">
                              Get text alerts for urgent updates
                            </p>
                          </div>
                          <Button 
                            variant={userData.notificationSettings.sms ? "default" : "outline"}
                            onClick={() => handleNotificationChange("sms")}
                            className="ml-auto"
                          >
                            {userData.notificationSettings.sms ? "Enabled" : "Disabled"}
                          </Button>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="font-medium">In-App Notifications</h3>
                            <p className="text-sm text-muted-foreground">
                              Receive notifications when using the app
                            </p>
                          </div>
                          <Button 
                            variant={userData.notificationSettings.app ? "default" : "outline"}
                            onClick={() => handleNotificationChange("app")}
                            className="ml-auto"
                          >
                            {userData.notificationSettings.app ? "Enabled" : "Disabled"}
                          </Button>
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
