
import React from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useUserPreference } from '@/contexts/UserPreferenceContext';
import { useToast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router-dom";

const LandlordForm = () => {
  const { isLoggedIn } = useUserPreference();
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isLoggedIn) {
      toast({
        title: "يرجى تسجيل الدخول",
        description: "يجب عليك تسجيل الدخول أو إنشاء حساب لإضافة شقة",
        variant: "destructive",
      });
      // Redirect to login page
      navigate("/login");
      return;
    }
    
    // هذي البيانات تذهب للباك ايند
    // البيانات المتوقعة: عنوان الشقة، الوصف، السعر، عدد الغرف، الصور، معلومات المالك، إلخ
    toast({
      title: "تم إرسال البيانات",
      description: "سيتم مراجعة طلبك ونشره قريبًا",
    });
  };
  
  return (
    <section className="py-12 bg-white">
      <div className="container-custom">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">أضف شقتك للإيجار</h2>
          <p className="text-center text-gray-600 mb-8">
            أضف تفاصيل شقتك هنا ليتم عرضها للباحثين عن سكن في صنعاء
          </p>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-3">
              <Label htmlFor="title">عنوان الإعلان</Label>
              <Input id="title" placeholder="مثال: شقة مفروشة في حدة" required />
            </div>
            
            <div className="space-y-3">
              <Label htmlFor="location">الموقع</Label>
              <Input id="location" placeholder="مثال: شارع تعز، حدة، إلخ" required />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-3">
                <Label htmlFor="price">السعر الشهري (دولار)</Label>
                <Input id="price" type="number" placeholder="مثال: 200" required />
              </div>
              
              <div className="space-y-3">
                <Label htmlFor="rooms">عدد الغرف</Label>
                <Input id="rooms" type="number" placeholder="مثال: 3" required />
              </div>
            </div>
            
            <div className="space-y-3">
              <Label htmlFor="description">وصف الشقة</Label>
              <Textarea 
                id="description" 
                placeholder="أضف وصفاً تفصيلياً للشقة" 
                rows={5}
                required 
              />
            </div>
            
            <div className="space-y-3">
              <Label htmlFor="images">صور الشقة</Label>
              <Input id="images" type="file" multiple accept="image/*" className="cursor-pointer" />
              <p className="text-xs text-gray-500">يمكنك إضافة حتى 10 صور. الصيغ المدعومة: JPG, PNG</p>
            </div>
            
            <Button type="submit" className="w-full">
              {isLoggedIn ? "إضافة الشقة" : "تسجيل الدخول لإضافة الشقة"}
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default LandlordForm;
