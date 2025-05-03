
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, User, Heart, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const Navbar = () => {
  const location = useLocation();
  
  // Function to check if a path is active
  const isActive = (path: string) => {
    return location.pathname === path;
  };
  
  return (
    <nav className="bg-white shadow-sm py-4 rtl">
      <div className="container-custom flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2 flex-row-reverse">
          <Home className="h-6 w-6 text-primary mr-2" />
          <span className="font-bold text-xl text-gray-800">سكن صنعاء</span>
        </Link>
        
        <div className="hidden md:flex items-center space-x-6 flex-row-reverse">
          <Link 
            to="/listings" 
            className={cn(
              "text-gray-600 hover:text-primary transition-colors px-3 py-2 relative",
              isActive('/listings') && "text-primary font-medium after:content-[''] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-primary"
            )}
          >
            تصفح الشقق
          </Link>
          <Link 
            to="/how-it-works" 
            className={cn(
              "text-gray-600 hover:text-primary transition-colors px-3 py-2 relative",
              isActive('/how-it-works') && "text-primary font-medium after:content-[''] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-primary"
            )}
          >
            كيف يعمل الموقع
          </Link>
          <Link 
            to="/about" 
            className={cn(
              "text-gray-600 hover:text-primary transition-colors px-3 py-2 relative",
              isActive('/about') && "text-primary font-medium after:content-[''] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-primary"
            )}
          >
            من نحن
          </Link>
          <Link 
            to="/add-apartment" 
            className={cn(
              "text-gray-600 hover:text-primary transition-colors px-3 py-2 relative",
              isActive('/add-apartment') && "text-primary font-medium after:content-[''] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-primary"
            )}
          >
            <span className="flex items-center">
              <Plus className="h-4 w-4 ml-1" />
              أضف شقتك
            </span>
          </Link>
        </div>
        
        <div className="flex items-center space-x-4 flex-row-reverse">
          <Link 
            to="/favorites" 
            className={cn(
              "text-gray-600 hover:text-primary transition-colors p-2 rounded-full hover:bg-gray-100",
              isActive('/favorites') && "text-primary"
            )}
          >
            <Heart className="h-5 w-5" />
          </Link>
          <Link to="/profile">
            <Button variant="outline" size="sm" className="flex items-center space-x-1 flex-row-reverse">
              <User className="h-4 w-4 ml-1" />
              <span>حسابي</span>
            </Button>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
