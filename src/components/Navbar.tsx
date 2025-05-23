
/**
 * This file is for the navbar
 * Displays the main landing page with search functionality and featured listings
 */import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, User, Heart, Plus, Menu, X, ChevronDown, Search, Building, FileText, CalendarDays, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useUserPreference } from '@/contexts/UserPreferenceContext';
import { useIsMobile } from '@/hooks/use-mobile';
import { toast } from "@/hooks/use-toast";
import PropertyAuthModal from './PropertyAuthModal';
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
    toast({
      title: "تم تسجيل الخروج بنجاح",
      description: "نتمنى أن نراك قريبًا",
    });
    setMobileMenuOpen(false);
  };
  
  const handleAuthSuccess = () => {
    // When user successfully logs in or registers
    toast({
      title: "تم تسجيل الدخول بنجاح",
      description: "مرحبًا بك في سكن صنعاء",
    });
    setAuthModalOpen(false);
  };
  
  return (
    <nav className="bg-white shadow-sm py-4 rtl relative z-10">
      <div className="container-custom">
        {/* Authentication Modal */}
        <PropertyAuthModal open={authModalOpen} onOpenChange={setAuthModalOpen} onSuccess={handleAuthSuccess} />
        
        {/* Top Bar - Login/Register Links */}
        {/* 
        <div className="flex justify-start mb-4 text-sm">
          {isLoggedIn ? (
            <div className="flex items-center space-x-4">
              <span className="text-gray-600">مرحبًا</span>
              <button
                onClick={handleLogout}
                className="text-primary hover:underline"
              >
                تسجيل الخروج
              </button>
            </div>
          ) : (
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setAuthModalOpen(true)}
                className="text-primary hover:underline"
              >
                تسجيل الدخول
              </button>
              <span className="text-gray-400">|</span>
              <button
                onClick={() => setAuthModalOpen(true)}
                className="text-primary hover:underline"
              >
                إنشاء حساب
              </button>
              <span className="text-gray-600">
                إذا كان لديك حساب بالفعل, 
                <button
                  onClick={() => setAuthModalOpen(true)}
                  className="text-primary hover:underline mr-1"
                >
                  قم بتسجيل الدخول هنا
                </button>
              </span>
            </div>
          )}
        </div>
        */}
        
        {/* Main Navbar */}
        <div className="flex items-center justify-between flex-row-reverse">
          <Link to="/" className="flex items-center space-x-2">
            <Home className="h-6 w-6 text-primary ml-2" />
            <span className="font-bold text-xl text-gray-800">سكن صنعاء</span>
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
            "md:flex items-center space-x-6 hidden"
          )}>
            <Link 
              to="/" 
              className={cn(
                "text-gray-600 hover:text-primary transition-colors px-3 py-2 relative",
                isActive('/') && "text-primary font-medium after:content-[''] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-primary"
              )}
            >
              الرئيسية
            </Link>
            
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
{/*             
            <Link 
              to="/about" 
              className={cn(
                "text-gray-600 hover:text-primary transition-colors px-3 py-2 relative",
                isActive('/about') && "text-primary font-medium after:content-[''] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-primary"
              )}
            >
              عن الموقع
            </Link>
             */}
            <Link 
              to="/add-apartment" 
              className={cn(
                "text-gray-600 hover:text-primary transition-colors px-3 py-2 relative",
                isActive('/add-apartment') && "text-primary font-medium after:content-[''] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-primary"
              )}
            >
              <span className="flex items-center">
                <Plus className="h-4 w-4 mr-1" />
                إضافة شقتك
              </span>
            </Link>
          </div>
          
          {/* User Actions */}
          <div className="hidden md:flex items-center space-x-4">
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
                  <Button variant="outline" size="sm" className="flex items-center space-x-1">
                    <User className="h-4 w-4 mr-1" />
                    <span>حسابي</span>
                    <ChevronDown className="h-3 w-3 opacity-50 ml-1" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuItem asChild>
                    <Link to="/profile" className="flex items-center gap-2">
                      <User className="h-4 w-4" /> الملف الشخصي
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/favorites" className="flex items-center gap-2">
                      <Heart className="h-4 w-4" /> الشقق المحفوظة
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/application" className="flex items-center gap-2">
                      <FileText className="h-4 w-4" /> الطلبات
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/viewings" className="flex items-center gap-2">
                      <CalendarDays className="h-4 w-4" /> المعاينات
                    </Link>
                  </DropdownMenuItem>
                  {userType === 'landlord' && (
                    <DropdownMenuItem asChild>
                      <Link to="/dashboard" className="flex items-center gap-2">
                        <Building className="h-4 w-4" /> لوحة التحكم
                      </Link>
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuItem onClick={handleLogout} className="text-red-500 hover:text-red-600 hover:bg-red-50">
                    <div className="flex items-center gap-2">
                      <LogOut className="h-4 w-4" /> تسجيل الخروج
                    </div>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button 
                variant="outline" 
                size="sm" 
                className="flex items-center space-x-1"
                onClick={() => setAuthModalOpen(true)}
              >
                <User className="h-4 w-4 mr-1" />
                <span>تسجيل الدخول</span>
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
              الرئيسية
            </Link>
            
            <Link 
              to="/listings"
              className="block py-2 text-gray-800 hover:text-primary"
              onClick={() => setMobileMenuOpen(false)}
            >
              تصفح الشقق
            </Link>
            
            <Link 
              to="/how-it-works"
              className="block py-2 text-gray-800 hover:text-primary"
              onClick={() => setMobileMenuOpen(false)}
            >
              كيف يعمل الموقع
            </Link>
            
            {/* <Link 
              to="/about"
              className="block py-2 text-gray-800 hover:text-primary"
              onClick={() => setMobileMenuOpen(false)}
            >
              عن الموقع
            </Link> */}
            
            <Link 
              to="/add-apartment"
              className="block py-2 text-gray-800 hover:text-primary"
              onClick={() => setMobileMenuOpen(false)}
            >
              إضافة شقتك
            </Link>
            
            <Link 
              to="/favorites"
              className="block py-2 text-gray-800 hover:text-primary"
              onClick={() => setMobileMenuOpen(false)}
            >
              الشقق المحفوظة
            </Link>
            
            {isLoggedIn ? (
              <>
                <Link 
                  to="/profile"
                  className="block py-2 text-gray-800 hover:text-primary"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  الملف الشخصي
                </Link>
                
                <Link 
                  to="/application"
                  className="block py-2 text-gray-800 hover:text-primary"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  الطلبات
                </Link>
                
                <Link 
                  to="/viewings"
                  className="block py-2 text-gray-800 hover:text-primary"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  المعاينات
                </Link>
                
                <button
                  onClick={handleLogout}
                  className="block w-full text-right py-2 text-red-500 hover:text-red-700"
                >
                  تسجيل الخروج
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
                تسجيل الدخول / إنشاء حساب
              </Button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
