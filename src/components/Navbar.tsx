
import React from 'react';
import { Link } from 'react-router-dom';
import { Home, User, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Navbar = () => {
  return (
    <nav className="bg-white shadow-sm py-4">
      <div className="container-custom flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <Home className="h-6 w-6 text-primary" />
          <span className="font-bold text-xl text-gray-800">FindMyFlat</span>
        </Link>
        
        <div className="hidden md:flex items-center space-x-6">
          <Link to="/listings" className="text-gray-600 hover:text-primary transition-colors">
            Browse Apartments
          </Link>
          <Link to="/how-it-works" className="text-gray-600 hover:text-primary transition-colors">
            How it Works
          </Link>
          <Link to="/about" className="text-gray-600 hover:text-primary transition-colors">
            About Us
          </Link>
        </div>
        
        <div className="flex items-center space-x-4">
          <Link to="/favorites" className="text-gray-600 hover:text-primary transition-colors p-2 rounded-full hover:bg-gray-100">
            <Heart className="h-5 w-5" />
          </Link>
          <Link to="/profile">
            <Button variant="outline" size="sm" className="flex items-center space-x-1">
              <User className="h-4 w-4 mr-1" />
              <span>Account</span>
            </Button>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
