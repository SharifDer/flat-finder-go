
import React from 'react';
import SearchBar from '@/components/SearchBar';
import FeaturedListings from '@/components/FeaturedListings';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, Home, MapPin, Heart } from 'lucide-react';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Hero Section */}
      <section className="bg-blue-50 py-16 md:py-24">
        <div className="container-custom text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
            Find Your Perfect Home, <span className="text-primary">Hassle-Free</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto mb-10">
            Direct connections with property owners. No middlemen, no extra fees.
            Just simple, location-first apartment hunting.
          </p>
          
          <SearchBar variant="hero" />
          
          <div className="flex flex-wrap justify-center gap-6 mt-8">
            <div className="flex items-center">
              <Home className="h-5 w-5 text-primary mr-2" />
              <span className="text-gray-700">1000+ Listings</span>
            </div>
            <div className="flex items-center">
              <MapPin className="h-5 w-5 text-primary mr-2" />
              <span className="text-gray-700">50+ Neighborhoods</span>
            </div>
            <div className="flex items-center">
              <Heart className="h-5 w-5 text-primary mr-2" />
              <span className="text-gray-700">Direct Owner Contact</span>
            </div>
          </div>
        </div>
      </section>
      
      {/* How It Works */}
      <section className="py-16 bg-white">
        <div className="container-custom">
          <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-800 mb-12">
            How FindMyFlat Works
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-blue-100 rounded-full h-16 w-16 flex items-center justify-center mx-auto mb-4">
                <Search className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Search Properties</h3>
              <p className="text-gray-600">
                Easily find apartments based on your preferred location, budget, and amenities.
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-blue-100 rounded-full h-16 w-16 flex items-center justify-center mx-auto mb-4">
                <Heart className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Connect Directly</h3>
              <p className="text-gray-600">
                Communicate with property owners directly, no middlemen or additional fees.
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-blue-100 rounded-full h-16 w-16 flex items-center justify-center mx-auto mb-4">
                <Home className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Move In</h3>
              <p className="text-gray-600">
                Schedule viewings, finalize details, and enjoy your new home without the extra hassle.
              </p>
            </div>
          </div>
          
          <div className="text-center mt-10">
            <Link to="/how-it-works">
              <Button variant="outline" className="inline-flex items-center">
                Learn More <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
      
      {/* Featured Listings */}
      <FeaturedListings />
      
      {/* CTA Section */}
      <section className="bg-primary py-16">
        <div className="container-custom text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">
            Ready to find your perfect apartment?
          </h2>
          <p className="text-lg text-white/90 max-w-2xl mx-auto mb-8">
            Join thousands of happy renters who found their home through FindMyFlat.
            Start browsing available apartments today!
          </p>
          <Link to="/listings">
            <Button size="lg" variant="secondary" className="mx-auto">
              Browse Apartments
            </Button>
          </Link>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Index;
