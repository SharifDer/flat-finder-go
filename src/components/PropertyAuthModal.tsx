
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useUserPreference } from '@/contexts/UserPreferenceContext';
import { useToast } from "@/hooks/use-toast";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { z } from "zod";

type PropertyAuthModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess: () => void;
};

// Yemen phone validation regex
const yemenPhonePattern = /^(7[0-9]{8}|01[0-9]{7}|05[0-9]{7})$/;

// Form validation schema
const loginSchema = z.object({
  email: z.string().email({ message: "يرجى إدخال بريد إلكتروني صحيح" }),
  password: z.string().min(6, { message: "كلمة المرور يجب أن تكون 6 أحرف على الأقل" }),
});

const registerSchema = z.object({
  name: z.string().min(3, { message: "الاسم يجب أن يكون 3 أحرف على الأقل" }),
  email: z.string().email({ message: "يرجى إدخال بريد إلكتروني صحيح" }),
  phone: z.string().regex(yemenPhonePattern, { message: "يجب إدخال رقم هاتف يمني صحيح" }),
  password: z.string().min(6, { message: "كلمة المرور يجب أن تكون 6 أحرف على الأقل" }),
  confirmPassword: z.string(),
  userType: z.string().optional(),
}).refine(data => data.password === data.confirmPassword, {
  message: "كلمة المرور غير متطابقة",
  path: ["confirmPassword"],
});

const PropertyAuthModal = ({ open, onOpenChange, onSuccess }: PropertyAuthModalProps) => {
  const { setIsLoggedIn, userType, setUserType } = useUserPreference();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState<string>('register');
  
  // Form state for registration
  const [registerForm, setRegisterForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    userType: userType || "landlord",
  });

  // Form state for login
  const [loginForm, setLoginForm] = useState({
    email: "",
    password: "",
  });

  // Form errors
  const [registerErrors, setRegisterErrors] = useState<Record<string, string>>({});
  const [loginErrors, setLoginErrors] = useState<Record<string, string>>({});

  const handleLoginChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginForm(prev => ({ ...prev, [name]: value }));
    // Clear error when user types
    if (loginErrors[name]) {
      setLoginErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  const handleRegisterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setRegisterForm(prev => ({ ...prev, [name]: value }));
    // Clear error when user types
    if (registerErrors[name]) {
      setRegisterErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  const handleUserTypeChange = (value: string) => {
    // Fix: Add a type assertion to make sure value is treated as a UserType
    setRegisterForm(prev => ({ 
      ...prev, 
      userType: value as 'renter' | 'landlord' | 'agency' | null 
    }));
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      loginSchema.parse(loginForm);
      // This data would go to the backend in a real app 
      setIsLoggedIn(true);
      toast({
        title: "تم تسجيل الدخول بنجاح",
        description: "مرحبًا بك في منصة العقارات",
      });
      onOpenChange(false);
      onSuccess();
    } catch (error) {
      if (error instanceof z.ZodError) {
        const errors: Record<string, string> = {};
        error.errors.forEach(err => {
          if (err.path) {
            errors[err.path[0]] = err.message;
          }
        });
        setLoginErrors(errors);
      }
    }
  };
  
  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      registerSchema.parse(registerForm);
      // This data would go to the backend in a real app
      setIsLoggedIn(true);
      // Fix: Convert the string to the proper UserType
      if (registerForm.userType) {
        // Cast the string value to UserType
        const userTypeValue = registerForm.userType as 'renter' | 'landlord' | 'agency' | null;
        setUserType(userTypeValue);
      }
      toast({
        title: "تم إنشاء الحساب بنجاح",
        description: "مرحبًا بك في منصة العقارات",
      });
      onOpenChange(false);
      onSuccess();
    } catch (error) {
      if (error instanceof z.ZodError) {
        const errors: Record<string, string> = {};
        error.errors.forEach(err => {
          if (err.path) {
            errors[err.path[0]] = err.message;
          }
        });
        setRegisterErrors(errors);
      }
    }
  };
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md max-w-[90%] p-4 sm:p-6">
        <DialogHeader>
          <DialogTitle className="text-center text-lg sm:text-xl mb-2">
            {activeTab === 'login' ? 'تسجيل الدخول' : 'إنشاء حساب جديد'}
          </DialogTitle>
          <p className="text-center text-gray-600 text-sm">
            لتتمكن من حفظ معلومات عقارك ومتابعتها لاحقًا، يجب إنشاء حساب
          </p>
        </DialogHeader>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-4">
            <TabsTrigger value="login">تسجيل الدخول</TabsTrigger>
            <TabsTrigger value="register">حساب جديد</TabsTrigger>
          </TabsList>
          
          <TabsContent value="login">
            <form onSubmit={handleLogin} className="space-y-4 pt-2">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm sm:text-base">البريد الإلكتروني</Label>
                <Input 
                  id="email" 
                  name="email"
                  type="email" 
                  placeholder="your@email.com" 
                  value={loginForm.email}
                  onChange={handleLoginChange}
                  required 
                  className="border-2 focus-visible:border-primary"
                />
                {loginErrors.email && (
                  <p className="text-destructive text-xs mt-1">{loginErrors.email}</p>
                )}
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password" className="text-sm sm:text-base">كلمة المرور</Label>
                <Input 
                  id="password" 
                  name="password"
                  type="password" 
                  value={loginForm.password}
                  onChange={handleLoginChange}
                  required 
                  className="border-2 focus-visible:border-primary"
                />
                {loginErrors.password && (
                  <p className="text-destructive text-xs mt-1">{loginErrors.password}</p>
                )}
              </div>
              
              <Button type="submit" className="w-full text-sm sm:text-base">تسجيل الدخول</Button>
              
              <p className="text-sm text-center text-gray-500">
                ليس لديك حساب؟{" "}
                <button 
                  type="button"
                  onClick={() => setActiveTab('register')}
                  className="text-primary hover:underline focus:outline-none"
                >
                  إنشاء حساب جديد
                </button>
              </p>
            </form>
          </TabsContent>
          
          <TabsContent value="register">
            <form onSubmit={handleRegister} className="space-y-4 pt-2">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-sm sm:text-base">اسم المستخدم</Label>
                <Input 
                  id="name" 
                  name="name"
                  placeholder="الاسم الكامل" 
                  value={registerForm.name}
                  onChange={handleRegisterChange}
                  required 
                  className="border-2 focus-visible:border-primary"
                />
                {registerErrors.name && (
                  <p className="text-destructive text-xs mt-1">{registerErrors.name}</p>
                )}
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="register-email" className="text-sm sm:text-base">البريد الإلكتروني</Label>
                <Input 
                  id="register-email" 
                  name="email"
                  type="email" 
                  placeholder="your@email.com" 
                  value={registerForm.email}
                  onChange={handleRegisterChange}
                  required 
                  className="border-2 focus-visible:border-primary"
                />
                {registerErrors.email && (
                  <p className="text-destructive text-xs mt-1">{registerErrors.email}</p>
                )}
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="phone" className="text-sm sm:text-base">رقم الهاتف</Label>
                <Input 
                  id="phone" 
                  name="phone"
                  type="tel"
                  placeholder="777123456" 
                  value={registerForm.phone}
                  onChange={handleRegisterChange}
                  required 
                  className="border-2 focus-visible:border-primary"
                />
                <p className="text-xs text-gray-500">يجب أن يبدأ بـ 7xx أو 01 أو 05 وطوله 9 أرقام</p>
                {registerErrors.phone && (
                  <p className="text-destructive text-xs mt-1">{registerErrors.phone}</p>
                )}
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="userType" className="text-sm sm:text-base">نوع المستخدم</Label>
                <Select 
                  value={registerForm.userType} 
                  onValueChange={handleUserTypeChange}
                >
                  <SelectTrigger className="border-2 focus-visible:border-primary">
                    <SelectValue placeholder="اختر نوع المستخدم" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="landlord">مالك عقار</SelectItem>
                    <SelectItem value="agency">مكتب عقاري</SelectItem>
                    <SelectItem value="renter">باحث عن سكن</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="register-password" className="text-sm sm:text-base">كلمة المرور</Label>
                <Input 
                  id="register-password" 
                  name="password"
                  type="password" 
                  value={registerForm.password}
                  onChange={handleRegisterChange}
                  required 
                  className="border-2 focus-visible:border-primary"
                />
                {registerErrors.password && (
                  <p className="text-destructive text-xs mt-1">{registerErrors.password}</p>
                )}
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="confirmPassword" className="text-sm sm:text-base">تأكيد كلمة المرور</Label>
                <Input 
                  id="confirmPassword" 
                  name="confirmPassword"
                  type="password" 
                  value={registerForm.confirmPassword}
                  onChange={handleRegisterChange}
                  required 
                  className="border-2 focus-visible:border-primary"
                />
                {registerErrors.confirmPassword && (
                  <p className="text-destructive text-xs mt-1">{registerErrors.confirmPassword}</p>
                )}
              </div>
              
              <Button type="submit" className="w-full text-sm sm:text-base">إنشاء حساب</Button>
              
              <p className="text-sm text-center text-gray-500">
                لديك حساب بالفعل؟{" "}
                <button 
                  type="button"
                  onClick={() => setActiveTab('login')}
                  className="text-primary hover:underline focus:outline-none"
                >
                  تسجيل الدخول
                </button>
              </p>
            </form>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default PropertyAuthModal;
