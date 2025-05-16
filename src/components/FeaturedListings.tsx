
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import ApartmentCard from './ApartmentCard';
import { featuredApartments } from '@/data/apartments';

const FeaturedListings = () => {
  return (
    <section className="py-12 bg-gray-50">
      <div className="container-custom">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800">الشقق المميزة</h2>
          <Link to="/listings">
            <Button variant="outline">عرض جميع الشقق</Button>
          </Link>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredApartments.map((apartment) => (
            <ApartmentCard key={apartment.id} apartment={apartment} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedListings;
