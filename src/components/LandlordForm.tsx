
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { useUserPreference } from '@/contexts/UserPreferenceContext';
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

const LandlordForm = () => {
  const { isLoggedIn, userType } = useUserPreference();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isAvailable, setIsAvailable] = useState(true);
  
  // Set the title based on the user type
  const isAgency = userType === 'agency';
  const formTitle = isAgency ? "أضف عقارات مكتبك للإيجار" : "أضف عقارك للإيجار";
  const formDescription = isAgency 
    ? "أضف تفاصيل العقارات لمكتبك هنا ليتم عرضها للباحثين عن سكن في صنعاء" 
    : "أضف تفاصيل عقارك هنا ليتم عرضه للباحثين عن سكن في صنعاء";
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // If not logged in, redirect to add apartment page which will show auth modal
    if (!isLoggedIn) {
      navigate('/add-apartment');
      return;
    }
    
    // This data goes to the backend
    toast({
      title: "تم إرسال البيانات",
      description: "سيتم مراجعة طلبك ونشره قريبًا",
    });
  };
  
  return (
    <section className="py-12 bg-white">
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
              <div className="flex flex-row items-center justify-between rounded-lg border p-4">
                <div className="space-y-0.5">
                  <Label htmlFor="isAvailable">حالة العقار</Label>
                  <p className="text-sm text-gray-500">
                    {isAvailable ? 'متاح للإيجار' : 'تم تأجيره بالفعل'}
                  </p>
                </div>
                <Switch 
                  id="isAvailable" 
                  checked={isAvailable} 
                  onCheckedChange={setIsAvailable}
                  className={isAvailable ? "bg-green-500 data-[state=checked]:bg-green-500 hover:bg-green-600" : "bg-red-500 data-[state=unchecked]:bg-red-500 hover:bg-red-600"}
                />
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
              {!isLoggedIn ? "إضافة عقار جديد" : (isAgency ? "إضافة العقارات" : "إضافة العقار")}
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default LandlordForm;
