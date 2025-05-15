
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Home, Plus, Building } from "lucide-react";
import { useUserPreference } from '@/contexts/UserPreferenceContext';

const UserOnboardingModal = () => {
  const { isFirstVisit, setIsFirstVisit, setUserType } = useUserPreference();
  
  const handleSelection = (type: 'renter' | 'landlord' | 'agency') => {
    setUserType(type);
    setIsFirstVisit(false);
  };

  return (
    <Dialog open={isFirstVisit} onOpenChange={setIsFirstVisit}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center mb-2 text-xl md:text-2xl">مرحباً بك في سكن صنعاء</DialogTitle>
          <DialogDescription className="text-center">
            حدد الخيار الذي يناسب احتياجاتك
          </DialogDescription>
        </DialogHeader>
        <div className="grid grid-cols-1 gap-4 pt-4">
          <Button
            variant="outline"
            className="p-4 h-auto flex flex-col items-center space-y-2 border-2 hover:border-primary"
            onClick={() => handleSelection('renter')}
          >
            <Home className="h-8 w-8 text-primary" />
            <span className="text-base font-medium">أبحث عن شقة</span>
            <p className="text-xs text-gray-500 max-w-[180px]">تصفح الشقق المتاحة للإيجار</p>
          </Button>
          
          <Button
            variant="outline"
            className="p-4 h-auto flex flex-col items-center space-y-2 border-2 hover:border-primary"
            onClick={() => handleSelection('landlord')}
          >
            <Plus className="h-8 w-8 text-primary" />
            <span className="text-base font-medium">أملك شقة للإيجار</span>
            <p className="text-xs text-gray-500 max-w-[180px]">إضافة شقة جديدة للإيجار</p>
          </Button>

          <Button
            variant="outline"
            className="p-4 h-auto flex flex-col items-center space-y-2 border-2 hover:border-primary"
            onClick={() => handleSelection('agency')}
          >
            <Building className="h-8 w-8 text-primary" />
            <span className="text-base font-medium">أنا مكتب عقاري</span>
            <p className="text-xs text-gray-500 max-w-[180px]">إدارة عدة عقارات للإيجار</p>
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default UserOnboardingModal;
