
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Home, Plus } from "lucide-react";
import { useUserPreference } from '@/contexts/UserPreferenceContext';

const UserOnboardingModal = () => {
  const { isFirstVisit, setIsFirstVisit, setUserType } = useUserPreference();
  
  const handleSelection = (type: 'renter' | 'landlord') => {
    setUserType(type);
    setIsFirstVisit(false);
  };

  return (
    <Dialog open={isFirstVisit} onOpenChange={setIsFirstVisit}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center mb-2">مرحباً بك في سكن صنعاء</DialogTitle>
          <DialogDescription className="text-center">
            حدد الخيار الذي يناسب احتياجاتك
          </DialogDescription>
        </DialogHeader>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
          <Button
            variant="outline"
            className="p-6 h-auto flex flex-col items-center space-y-3 border-2 hover:border-primary"
            onClick={() => handleSelection('renter')}
          >
            <Home className="h-12 w-12 text-primary" />
            <span className="text-lg font-medium">أبحث عن شقة</span>
            <span className="text-sm text-gray-500">تصفح الشقق المتاحة للإيجار</span>
          </Button>
          
          <Button
            variant="outline"
            className="p-6 h-auto flex flex-col items-center space-y-3 border-2 hover:border-primary"
            onClick={() => handleSelection('landlord')}
          >
            <Plus className="h-12 w-12 text-primary" />
            <span className="text-lg font-medium">أملك شقة للإيجار</span>
            <span className="text-sm text-gray-500">إضافة شقة جديدة للإيجار</span>
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default UserOnboardingModal;
