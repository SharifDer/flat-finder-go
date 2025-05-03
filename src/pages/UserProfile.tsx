
import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Label } from '@/components/ui/label';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { User, Heart, Calendar, Home, Settings, MapPin } from 'lucide-react';
import { featuredApartments } from '@/data/apartments';

const UserProfile = () => {
  // Mock user data for the profile
  const user = {
    name: 'Alex Johnson',
    email: 'alex.johnson@example.com',
    phone: '(555) 123-4567',
    joinDate: 'March 2024',
    profileImage: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1480&q=80',
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="container-custom py-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Profile Sidebar */}
          <div className="w-full md:w-64">
            <Card>
              <CardContent className="p-6">
                <div className="flex flex-col items-center text-center">
                  <div className="relative w-24 h-24 mb-4">
                    <img 
                      src={user.profileImage} 
                      alt={user.name} 
                      className="rounded-full w-full h-full object-cover border-2 border-primary"
                    />
                    <Button 
                      variant="outline" 
                      size="icon" 
                      className="absolute bottom-0 right-0 h-8 w-8 rounded-full bg-white"
                    >
                      <Settings className="h-4 w-4" />
                    </Button>
                  </div>
                  <h2 className="text-xl font-bold mb-1">{user.name}</h2>
                  <p className="text-sm text-gray-500 mb-4">Member since {user.joinDate}</p>
                  
                  <Button variant="outline" className="w-full mb-2">Edit Profile</Button>
                </div>
                
                <Separator className="my-4" />
                
                <nav className="space-y-1">
                  <Link to="#personal-info" className="flex items-center py-2 px-3 rounded-md bg-blue-50 text-primary font-medium">
                    <User className="h-4 w-4 mr-2" />
                    Personal Info
                  </Link>
                  <Link to="#saved-apartments" className="flex items-center py-2 px-3 rounded-md hover:bg-gray-100 text-gray-700">
                    <Heart className="h-4 w-4 mr-2" />
                    Saved Apartments
                  </Link>
                  <Link to="#appointments" className="flex items-center py-2 px-3 rounded-md hover:bg-gray-100 text-gray-700">
                    <Calendar className="h-4 w-4 mr-2" />
                    Appointments
                  </Link>
                  <Link to="#applications" className="flex items-center py-2 px-3 rounded-md hover:bg-gray-100 text-gray-700">
                    <Home className="h-4 w-4 mr-2" />
                    Applications
                  </Link>
                  <Link to="#settings" className="flex items-center py-2 px-3 rounded-md hover:bg-gray-100 text-gray-700">
                    <Settings className="h-4 w-4 mr-2" />
                    Account Settings
                  </Link>
                </nav>
              </CardContent>
            </Card>
          </div>
          
          {/* Main Content Area */}
          <div className="flex-1">
            <Tabs defaultValue="personal-info" className="w-full">
              <TabsList className="grid grid-cols-4 mb-8">
                <TabsTrigger value="personal-info">Info</TabsTrigger>
                <TabsTrigger value="saved">Saved</TabsTrigger>
                <TabsTrigger value="appointments">Appointments</TabsTrigger>
                <TabsTrigger value="applications">Applications</TabsTrigger>
              </TabsList>
              
              {/* Personal Info Tab */}
              <TabsContent value="personal-info">
                <Card>
                  <CardHeader>
                    <CardTitle>Personal Information</CardTitle>
                    <CardDescription>Update your personal details here</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Full Name</Label>
                        <Input id="name" defaultValue={user.name} />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email Address</Label>
                        <Input id="email" type="email" defaultValue={user.email} />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input id="phone" defaultValue={user.phone} />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="location">Preferred Location</Label>
                        <Input id="location" placeholder="Enter your preferred location" />
                      </div>
                    </div>
                    
                    <Separator />
                    
                    <div className="space-y-2">
                      <h3 className="font-medium">Notification Preferences</h3>
                      <div className="flex flex-col space-y-2">
                        <div className="flex items-center space-x-2">
                          <input type="checkbox" id="email-notifications" defaultChecked />
                          <label htmlFor="email-notifications">Email Notifications</label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <input type="checkbox" id="sms-notifications" />
                          <label htmlFor="sms-notifications">SMS Notifications</label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <input type="checkbox" id="new-listings" defaultChecked />
                          <label htmlFor="new-listings">New Listings Alerts</label>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button>Save Changes</Button>
                  </CardFooter>
                </Card>
              </TabsContent>
              
              {/* Saved Apartments Tab */}
              <TabsContent value="saved">
                <Card>
                  <CardHeader>
                    <CardTitle>Saved Apartments</CardTitle>
                    <CardDescription>Apartments you've saved for later</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {featuredApartments.map(apt => (
                        <div key={apt.id} className="flex border rounded-lg overflow-hidden">
                          <div className="w-1/3">
                            <img 
                              src={apt.images[0]} 
                              alt={apt.title} 
                              className="h-full w-full object-cover"
                            />
                          </div>
                          <div className="w-2/3 p-4">
                            <h3 className="font-semibold text-sm mb-1">{apt.title}</h3>
                            <div className="flex items-center text-xs text-gray-500 mb-2">
                              <MapPin className="h-3 w-3 mr-1" />
                              <span>{apt.location}</span>
                            </div>
                            <div className="text-primary font-medium mb-2">${apt.price}/mo</div>
                            <div className="flex space-x-2 text-xs">
                              <Link to={`/apartment/${apt.id}`}>
                                <Button size="sm" variant="outline">View</Button>
                              </Link>
                              <Button size="sm" variant="ghost">Remove</Button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              {/* Appointments Tab */}
              <TabsContent value="appointments">
                <Card>
                  <CardHeader>
                    <CardTitle>Viewing Appointments</CardTitle>
                    <CardDescription>Manage your scheduled apartment viewings</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="rounded-lg border bg-card p-4">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h3 className="font-semibold">Modern Downtown Apartment</h3>
                            <div className="flex items-center text-sm text-gray-500">
                              <MapPin className="h-3 w-3 mr-1" />
                              <span>123 Main St, Downtown</span>
                            </div>
                          </div>
                          <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">Upcoming</Badge>
                        </div>
                        <div className="flex items-center text-sm mb-3">
                          <Calendar className="h-4 w-4 mr-1 text-gray-500" />
                          <span>May 15, 2024 - 2:00 PM</span>
                        </div>
                        <div className="flex space-x-2">
                          <Button size="sm" variant="outline">Reschedule</Button>
                          <Button size="sm" variant="ghost" className="text-red-500 hover:text-red-600 hover:bg-red-50">
                            Cancel
                          </Button>
                        </div>
                      </div>
                      
                      <div className="rounded-lg border bg-card p-4">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h3 className="font-semibold">Spacious 2BR Townhouse</h3>
                            <div className="flex items-center text-sm text-gray-500">
                              <MapPin className="h-3 w-3 mr-1" />
                              <span>567 Maple Dr, Eastside</span>
                            </div>
                          </div>
                          <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Completed</Badge>
                        </div>
                        <div className="flex items-center text-sm mb-3">
                          <Calendar className="h-4 w-4 mr-1 text-gray-500" />
                          <span>April 28, 2024 - 10:00 AM</span>
                        </div>
                        <div className="flex space-x-2">
                          <Link to="/apartment/5">
                            <Button size="sm" variant="outline">View Apartment</Button>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              {/* Applications Tab */}
              <TabsContent value="applications">
                <Card>
                  <CardHeader>
                    <CardTitle>Rental Applications</CardTitle>
                    <CardDescription>Track the status of your rental applications</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="rounded-lg border bg-card p-4">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h3 className="font-semibold">Luxury 3BR with Balcony</h3>
                            <div className="flex items-center text-sm text-gray-500">
                              <MapPin className="h-3 w-3 mr-1" />
                              <span>789 Oak Ave, Riverside</span>
                            </div>
                          </div>
                          <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">In Review</Badge>
                        </div>
                        <div className="text-sm text-gray-600 mb-3">
                          Application submitted on April 30, 2024
                        </div>
                        <div className="flex space-x-2">
                          <Button size="sm" variant="outline">View Details</Button>
                        </div>
                      </div>
                      
                      <div className="rounded-lg border bg-card p-4 text-center py-12">
                        <h3 className="font-medium text-gray-600 mb-4">No other applications yet</h3>
                        <Link to="/listings">
                          <Button>Browse Apartments</Button>
                        </Link>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
      
      <div className="mt-auto">
        <Footer />
      </div>
    </div>
  );
};

export default UserProfile;
