
/**
 * This file is for the Saved Apartments page
 * Displays apartments that the user has saved/favorited
 */

import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ApartmentCard from '@/components/ApartmentCard';
import { apartments } from '@/data/apartments';
import { Heart, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from "@/hooks/use-toast";

const Favorites = () => {
  // For demo purposes, let's use some random apartments as favorites
  const [favoriteApartments, setFavoriteApartments] = useState(
    apartments.slice(0, 3) // First 3 apartments as favorites for demo
  );
  
  const { toast } = useToast();
  
  const removeFromFavorites = (apartmentId: string) => {
    setFavoriteApartments(favoriteApartments.filter(apt => apt.id !== apartmentId));
    
    toast({
      title: "Removed from favorites",
      description: "The apartment was successfully removed from your favorites",
    });
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Hero Section */}
      <section className="bg-blue-50 py-10">
        <div className="container-custom text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            My Favorite Apartments
          </h1>
          <p className="text-lg text-gray-600">
            Apartments you've saved for later review
          </p>
        </div>
      </section>
      
      {/* Favorites List */}
      <section className="py-12">
        <div className="container-custom">
          {favoriteApartments.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {favoriteApartments.map(apartment => (
                <div key={apartment.id} className="relative">
                  <ApartmentCard apartment={apartment} />
                  <Button
                    variant="outline"
                    size="sm"
                    className="absolute top-4 right-4 bg-white hover:bg-red-50 text-red-500 hover:text-red-600 border-red-200"
                    onClick={() => removeFromFavorites(apartment.id)}
                  >
                    <Heart className="h-4 w-4 mr-1 fill-current" />
                    Remove from favorites
                  </Button>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="bg-blue-50 rounded-full p-6 inline-flex mb-4">
                <Heart className="h-12 w-12 text-gray-400" />
              </div>
              <h2 className="text-2xl font-semibold mb-2">No favorite apartments</h2>
              <p className="text-gray-600 mb-6 max-w-md mx-auto">
                You haven't added any apartments to your favorites yet. Browse apartments and add your favorites.
              </p>
              <Button asChild>
                <a href="/listings">Browse available apartments</a>
              </Button>
            </div>
          )}
        </div>
      </section>
      
      {/* Recommendations Section */}
      {favoriteApartments.length > 0 && (
        <section className="py-12 bg-gray-50">
          <div className="container-custom">
            <h2 className="text-2xl font-bold mb-8">You might also like</h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {apartments.slice(3, 6).map(apartment => (
                <ApartmentCard key={apartment.id} apartment={apartment} />
              ))}
            </div>
          </div>
        </section>
      )}
      
      {/* Tips Section */}
      <section className="py-12">
        <div className="container-custom">
          <div className="bg-blue-50 rounded-lg p-6 md:p-8">
            <div className="flex flex-col md:flex-row items-start md:items-center">
              <div className="bg-blue-100 rounded-full p-3 mb-4 md:mb-0 md:mr-6">
                <AlertCircle className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">Tips for Apartment Hunting</h3>
                <ul className="list-disc list-inside space-y-1 text-gray-600">
                  <li>Compare several options before making a final decision</li>
                  <li>Check the location and its proximity to essential services</li>
                  <li>Make sure to visit the apartment and verify all facilities</li>
                  <li>Read the contract terms carefully before signing</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Favorites;
