
/**
 * This file is for the About Us page
 * Provides information about the platform, team, and contact details
 */

import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Shield, Users, MessageSquare, User, Phone, Mail, MapPin } from 'lucide-react';

const About = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Hero Section */}
      <section className="bg-blue-50 py-16">
        <div className="container-custom text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            About Us
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Sakan Sanaa platform is the ideal solution for those looking for apartments to rent in Sanaa without intermediaries or additional commissions
          </p>
        </div>
      </section>
      
      {/* About Us Content */}
      <section className="py-16">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-2xl font-bold mb-6 text-primary">Our Story</h2>
              <p className="text-gray-600 mb-4">
                Sakan Sanaa platform was established in response to the challenges faced by people searching for housing in Sanaa, where many have to deal with real estate intermediaries and pay high commissions.
              </p>
              <p className="text-gray-600 mb-4">
                We aim to provide a simple and effective platform that directly connects tenants and property owners, eliminating the need for intermediaries and making the housing search process more transparent and less costly.
              </p>
              <p className="text-gray-600">
                We are a local team from Sanaa seeking to improve the housing search experience in our city and make it easy and hassle-free.
              </p>
            </div>
            <div className="bg-blue-50 p-8 rounded-lg">
              <h2 className="text-2xl font-bold mb-6 text-center text-primary">Our Features</h2>
              
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="bg-blue-100 rounded-full p-3 mr-4">
                    <Shield className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-2">Transparency and Security</h3>
                    <p className="text-gray-600">We verify all listings to ensure information accuracy and user protection.</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-blue-100 rounded-full p-3 mr-4">
                    <Users className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-2">Direct Communication</h3>
                    <p className="text-gray-600">We enable direct communication between tenants and owners without any intermediaries.</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-blue-100 rounded-full p-3 mr-4">
                    <MessageSquare className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-2">Local Support</h3>
                    <p className="text-gray-600">Our local team is ready to help you with any inquiries or issues.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Team Section */}
      <section className="py-16 bg-gray-50">
        <div className="container-custom">
          <h2 className="text-3xl font-bold text-center mb-12">Our Team</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-sm text-center">
              <div className="w-24 h-24 bg-blue-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                <User className="h-12 w-12 text-primary" />
              </div>
              <h3 className="font-semibold text-xl mb-1">Ahmed Al-Sanaani</h3>
              <p className="text-primary mb-3">Founder & CEO</p>
              <p className="text-gray-600">Real estate expert with over 10 years of experience in the Yemeni real estate market.</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm text-center">
              <div className="w-24 h-24 bg-blue-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                <User className="h-12 w-12 text-primary" />
              </div>
              <h3 className="font-semibold text-xl mb-1">Sarah Al-Yemeni</h3>
              <p className="text-primary mb-3">Operations Manager</p>
              <p className="text-gray-600">Specializes in business development and improving user experience on digital platforms.</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm text-center">
              <div className="w-24 h-24 bg-blue-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                <User className="h-12 w-12 text-primary" />
              </div>
              <h3 className="font-semibold text-xl mb-1">Mohammed Al-Ezzi</h3>
              <p className="text-primary mb-3">CTO</p>
              <p className="text-gray-600">Software developer with extensive experience in building user-friendly electronic platforms.</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Contact Section */}
      <section className="py-16">
        <div className="container-custom text-center">
          <h2 className="text-3xl font-bold mb-6">Contact Us</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
            Do you have questions or feedback? Our team is ready to help
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto">
            <div className="text-center">
              <div className="bg-blue-100 rounded-full p-4 inline-flex mb-4">
                <Phone className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">Call Us</h3>
              <p className="text-gray-600">+967 1 234 5678</p>
            </div>
            
            <div className="text-center">
              <div className="bg-blue-100 rounded-full p-4 inline-flex mb-4">
                <Mail className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">Email</h3>
              <p className="text-gray-600">info@sakansanaa.com</p>
            </div>
            
            <div className="text-center">
              <div className="bg-blue-100 rounded-full p-4 inline-flex mb-4">
                <MapPin className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">Address</h3>
              <p className="text-gray-600">Al-Zubairi Street, Sanaa, Yemen</p>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default About;
