
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useUserPreference } from '@/contexts/UserPreferenceContext';
import { useToast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router-dom";
import PropertyAuthModal from "./PropertyAuthModal";

const LandlordForm = () => {
  const { isLoggedIn, userType } = useUserPreference();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [showAuthModal, setShowAuthModal] = useState(false);
  
  // Show auth modal if user is not logged in
  useEffect(() => {
    if (!isLoggedIn) {
      setShowAuthModal(true);
    }
  }, [isLoggedIn]);
  
  // Set the title based on the user type
  const isAgency = userType === 'agency';
  const formTitle = isAgency ? "أضف عقارات مكتبك للإيجار" : "أضف عقارك للإيجار";
  const formDescription = isAgency 
    ? "أضف تفاصيل العقارات لمكتبك هنا ليتم عرضها للباحثين عن سكن في صنعاء" 
    : "أضف تفاصيل عقارك هنا ليتم عرضه للباحثين عن سكن في صنعاء";
  const submitButtonText = isLoggedIn 
    ? (isAgency ? "إضافة العقارات" : "إضافة العقار") 
    : "تسجيل الدخول لإضافة عقارات";
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isLoggedIn) {
      setShowAuthModal(true);
      return;
    }
    
    // This data goes to the backend
    toast({
      title: "تم إرسال البيانات",
      description: "سيتم مراجعة طلبك ونشره قريبًا",
    });
  };

  const handleAuthSuccess = () => {
    // After successful login or registration, the form can be submitted
    toast({
      title: "يمكنك الآن إضافة عقارك",
      description: "الرجاء ملء النموذج بالمعلومات المطلوبة",
    });
  };
  
  return (
    <section className="py-12 bg-white">
      <PropertyAuthModal 
        open={showAuthModal} 
        onOpenChange={setShowAuthModal} 
        onSuccess={handleAuthSuccess} 
      />
      
      <div className="container-custom">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">{formTitle}</h2>
          <p className="text-center text-gray-600 mb-8">
            {formDescription}
          </p>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-3">
              <Label htmlFor="title">عنوان العقار</Label>
              <Input id="title" placeholder="مثال: شقة مفروشة في حدة" required />
            </div>
            
            <div className="space-y-3">
              <Label htmlFor="location">الموقع</Label>
              <Input id="location" placeholder="مثال: شارع تعز، حدة، إلخ" required />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-3">
                <Label htmlFor="price">السعر الشهري (ريال يمني)</Label>
                <Input id="price" type="number" placeholder="مثال: 30000" required />
              </div>
              
              <div className="space-y-3">
                <Label htmlFor="rooms">عدد الغرف</Label>
                <Input id="rooms" type="number" placeholder="مثال: 3" required />
              </div>
            </div>
            
            <div className="space-y-3">
              <Label htmlFor="description">وصف العقار</Label>
              <Textarea 
                id="description" 
                placeholder="أضف وصفاً تفصيلياً للعقار" 
                rows={5}
                required 
              />
            </div>
            
            <div className="space-y-3">
              <Label htmlFor="images">صور العقار</Label>
              <Input id="images" type="file" multiple accept="image/*" className="cursor-pointer" />
              <p className="text-xs text-gray-500">يمكنك إضافة حتى 10 صور. الصيغ المدعومة: JPG, PNG</p>
            </div>
            
            {isAgency && (
              <div className="space-y-3">
                <Label htmlFor="agencyName">اسم المكتب العقاري</Label>
                <Input id="agencyName" placeholder="مثال: مكتب النجاح العقاري" required />
              </div>
            )}
            
            <Button type="submit" className="w-full">
              {submitButtonText}
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default LandlordForm;
