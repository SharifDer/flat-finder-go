
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, User, Heart, Plus, Menu, X, ChevronDown, Search, Building, FileText, CalendarDays } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useUserPreference } from '@/contexts/UserPreferenceContext';
import { useIsMobile } from '@/hooks/use-mobile';
import AuthModal from './AuthModal';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

/**
 * This component is the main navigation bar for Sakan Sanaa application
 * It provides navigation to different pages and user authentication options
 */
const Navbar = () => {
  const location = useLocation();
  const isMobile = useIsMobile();
  const { userType, isLoggedIn, setIsLoggedIn } = useUserPreference();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  
  // Function to check if a path is active
  const isActive = (path: string) => {
    return location.pathname === path;
  };
  
  const handleLogout = () => {
    setIsLoggedIn(false);
  };
  
  return (
    <nav className="bg-white shadow-sm py-4 rtl relative z-10">
      <div className="container-custom">
        {/* Authentication Modal */}
        <AuthModal open={authModalOpen} onOpenChange={setAuthModalOpen} />
        
        {/* Top Bar - Login/Register Links */}
        {/* 
        <div className="flex justify-end mb-4 text-sm">
          {isLoggedIn ? (
            <div className="flex items-center space-x-4 flex-row-reverse">
              <span className="text-gray-600">Welcome</span>
              <button
                onClick={handleLogout}
                className="text-primary hover:underline"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="flex items-center space-x-4 flex-row-reverse">
              <button
                onClick={() => setAuthModalOpen(true)}
                className="text-primary hover:underline"
              >
                Login
              </button>
              <span className="text-gray-400">|</span>
              <button
                onClick={() => setAuthModalOpen(true)}
                className="text-primary hover:underline"
              >
                Create Account
              </button>
              <span className="text-gray-600">
                If you already have an account, 
                <button
                  onClick={() => setAuthModalOpen(true)}
                  className="text-primary hover:underline mr-1"
                >
                  login here
                </button>
              </span>
            </div>
          )}
        </div>
        */}
        
        {/* Main Navbar */}
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2 flex-row-reverse">
            <Home className="h-6 w-6 text-primary mr-2" />
            <span className="font-bold text-xl text-gray-800">Sakan Sanaa</span>
          </Link>
          
          {/* Mobile menu button */}
          <button
            className="md:hidden p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? 
              <X className="h-6 w-6 text-gray-600" /> : 
              <Menu className="h-6 w-6 text-gray-600" />
            }
          </button>
          
          {/* Desktop Navigation */}
          <div className={cn(
            "md:flex items-center space-x-6 flex-row-reverse hidden"
          )}>
            <Link 
              to="/" 
              className={cn(
                "text-gray-600 hover:text-primary transition-colors px-3 py-2 relative",
                isActive('/') && "text-primary font-medium after:content-[''] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-primary"
              )}
            >
              Home
            </Link>
            
            <Link 
              to="/listings" 
              className={cn(
                "text-gray-600 hover:text-primary transition-colors px-3 py-2 relative",
                isActive('/listings') && "text-primary font-medium after:content-[''] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-primary"
              )}
            >
              Browse Apartments
            </Link>
            
            <Link 
              to="/how-it-works" 
              className={cn(
                "text-gray-600 hover:text-primary transition-colors px-3 py-2 relative",
                isActive('/how-it-works') && "text-primary font-medium after:content-[''] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-primary"
              )}
            >
              How It Works
            </Link>
            
            <Link 
              to="/about" 
              className={cn(
                "text-gray-600 hover:text-primary transition-colors px-3 py-2 relative",
                isActive('/about') && "text-primary font-medium after:content-[''] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-primary"
              )}
            >
              About Us
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
                Add Your Apartment
              </span>
            </Link>
          </div>
          
          {/* User Actions */}
          <div className="hidden md:flex items-center space-x-4 flex-row-reverse">
            <Link 
              to="/favorites" 
              className={cn(
                "text-gray-600 hover:text-primary transition-colors p-2 rounded-full hover:bg-gray-100",
                isActive('/favorites') && "text-primary"
              )}
            >
              <Heart className="h-5 w-5" />
            </Link>
            
            {isLoggedIn ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm" className="flex items-center space-x-1 flex-row-reverse">
                    <User className="h-4 w-4 ml-1" />
                    <span>My Account</span>
                    <ChevronDown className="h-3 w-3 opacity-50 mr-1" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuItem asChild>
                    <Link to="/profile" className="flex items-center gap-2">
                      <User className="h-4 w-4" /> Profile
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/favorites" className="flex items-center gap-2">
                      <Heart className="h-4 w-4" /> Saved Apartments
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/application" className="flex items-center gap-2">
                      <FileText className="h-4 w-4" /> Applications
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/viewings" className="flex items-center gap-2">
                      <CalendarDays className="h-4 w-4" /> Viewings
                    </Link>
                  </DropdownMenuItem>
                  {userType === 'landlord' && (
                    <DropdownMenuItem asChild>
                      <Link to="/dashboard" className="flex items-center gap-2">
                        <Building className="h-4 w-4" /> Dashboard
                      </Link>
                    </DropdownMenuItem>
                  )}
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button 
                variant="outline" 
                size="sm" 
                className="flex items-center space-x-1 flex-row-reverse"
                onClick={() => setAuthModalOpen(true)}
              >
                <User className="h-4 w-4 ml-1" />
                <span>Login</span>
              </Button>
            )}
          </div>
        </div>
        
        {/* Mobile Navigation Menu */}
        <div className={cn(
          "md:hidden absolute left-0 right-0 bg-white shadow-md py-4 px-6 z-50 transition-all duration-300 ease-in-out",
          mobileMenuOpen ? "top-full opacity-100" : "-top-[500px] opacity-0"
        )}>
          <div className="space-y-4">
            <Link 
              to="/"
              className="block py-2 text-gray-800 hover:text-primary"
              onClick={() => setMobileMenuOpen(false)}
            >
              Home
            </Link>
            
            <Link 
              to="/listings"
              className="block py-2 text-gray-800 hover:text-primary"
              onClick={() => setMobileMenuOpen(false)}
            >
              Browse Apartments
            </Link>
            
            <Link 
              to="/how-it-works"
              className="block py-2 text-gray-800 hover:text-primary"
              onClick={() => setMobileMenuOpen(false)}
            >
              How It Works
            </Link>
            
            <Link 
              to="/about"
              className="block py-2 text-gray-800 hover:text-primary"
              onClick={() => setMobileMenuOpen(false)}
            >
              About Us
            </Link>
            
            <Link 
              to="/add-apartment"
              className="block py-2 text-gray-800 hover:text-primary"
              onClick={() => setMobileMenuOpen(false)}
            >
              Add Your Apartment
            </Link>
            
            <Link 
              to="/favorites"
              className="block py-2 text-gray-800 hover:text-primary"
              onClick={() => setMobileMenuOpen(false)}
            >
              Saved Apartments
            </Link>
            
            {isLoggedIn ? (
              <>
                <Link 
                  to="/profile"
                  className="block py-2 text-gray-800 hover:text-primary"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Profile
                </Link>
                
                <Link 
                  to="/application"
                  className="block py-2 text-gray-800 hover:text-primary"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Applications
                </Link>
                
                <Link 
                  to="/viewings"
                  className="block py-2 text-gray-800 hover:text-primary"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Viewings
                </Link>
                
                <button
                  onClick={() => {
                    handleLogout();
                    setMobileMenuOpen(false);
                  }}
                  className="block w-full text-right py-2 text-red-500 hover:text-red-700"
                >
                  Logout
                </button>
              </>
            ) : (
              <Button 
                onClick={() => {
                  setAuthModalOpen(true);
                  setMobileMenuOpen(false);
                }}
                className="w-full mt-2"
              >
                Login / Create Account
              </Button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
