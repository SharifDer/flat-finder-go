
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
import { Eye, EyeOff, Mail, Lock, User, Check } from "lucide-react";

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

  // Password visibility toggle
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

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
    setRegisterForm(prev => ({ 
      ...prev, 
      userType: value as 'renter' | 'landlord' | 'agency' | null 
    }));
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      loginSchema.parse(loginForm);
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
      setIsLoggedIn(true);
      if (registerForm.userType) {
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
      <DialogContent className="sm:max-w-md max-w-[95%] p-4 sm:p-5 rounded-xl bg-white shadow-lg border-0">
        <DialogHeader>
          <DialogTitle className="text-center text-xl font-bold mb-2 text-primary">
            {activeTab === 'login' ? 'تسجيل الدخول' : 'إنشاء حساب جديد'}
          </DialogTitle>
          <p className="text-center text-gray-600 text-sm">
            {activeTab === 'login' 
              ? 'أدخل بياناتك لتتمكن من الوصول إلى حسابك' 
              : 'أنشئ حساب جديد لتتمكن من نشر عقاراتك'
            }
          </p>
        </DialogHeader>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-4">
            <TabsTrigger 
              value="login" 
              className="data-[state=active]:bg-primary data-[state=active]:text-white"
            >
              تسجيل الدخول
            </TabsTrigger>
            <TabsTrigger 
              value="register"
              className="data-[state=active]:bg-primary data-[state=active]:text-white"
            >
              حساب جديد
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="login">
            <form onSubmit={handleLogin} className="space-y-3">
              <div className="space-y-1">
                <Label htmlFor="email" className="text-sm font-medium">البريد الإلكتروني</Label>
                <div className="relative">
                  <Mail className="absolute right-3 top-3 h-4 w-4 text-gray-400" />
                  <Input 
                    id="email" 
                    name="email"
                    type="email" 
                    dir="ltr"
                    placeholder="your@email.com" 
                    value={loginForm.email}
                    onChange={handleLoginChange}
                    required 
                    className="pr-10 focus:border-primary"
                  />
                </div>
                {loginErrors.email && (
                  <p className="text-destructive text-xs mt-1">{loginErrors.email}</p>
                )}
              </div>
              
              <div className="space-y-1">
                <Label htmlFor="password" className="text-sm font-medium">كلمة المرور</Label>
                <div className="relative">
                  <Lock className="absolute right-3 top-3 h-4 w-4 text-gray-400" />
                  <Input 
                    id="password" 
                    name="password"
                    type={showPassword ? "text" : "password"}
                    dir="ltr"
                    value={loginForm.password}
                    onChange={handleLoginChange}
                    required 
                    className="pr-10 focus:border-primary"
                  />
                  <button 
                    type="button"
                    onClick={() => setShowPassword(!showPassword)} 
                    className="absolute left-3 top-3 text-gray-400 hover:text-gray-600"
                    tabIndex={-1}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
                {loginErrors.password && (
                  <p className="text-destructive text-xs mt-1">{loginErrors.password}</p>
                )}
              </div>
              
              <Button 
                type="submit" 
                className="w-full bg-primary hover:bg-primary/90 text-white mt-2"
              >
                تسجيل الدخول
              </Button>
              
              <p className="text-sm text-center text-gray-500 pt-1">
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
            <form onSubmit={handleRegister} className="space-y-3">
              <div className="space-y-1">
                <Label htmlFor="name" className="text-sm font-medium">الاسم</Label>
                <div className="relative">
                  <User className="absolute right-3 top-3 h-4 w-4 text-gray-400" />
                  <Input 
                    id="name" 
                    name="name"
                    placeholder="الاسم الكامل" 
                    value={registerForm.name}
                    onChange={handleRegisterChange}
                    required 
                    className="pr-10 focus:border-primary"
                  />
                </div>
                {registerErrors.name && (
                  <p className="text-destructive text-xs mt-1">{registerErrors.name}</p>
                )}
              </div>
              
              <div className="space-y-1">
                <Label htmlFor="register-email" className="text-sm font-medium">البريد الإلكتروني</Label>
                <div className="relative">
                  <Mail className="absolute right-3 top-3 h-4 w-4 text-gray-400" />
                  <Input 
                    id="register-email" 
                    name="email"
                    type="email" 
                    dir="ltr"
                    placeholder="your@email.com" 
                    value={registerForm.email}
                    onChange={handleRegisterChange}
                    required 
                    className="pr-10 focus:border-primary"
                  />
                </div>
                {registerErrors.email && (
                  <p className="text-destructive text-xs mt-1">{registerErrors.email}</p>
                )}
              </div>
              
              <div className="space-y-1">
                <Label htmlFor="phone" className="text-sm font-medium">رقم الهاتف</Label>
                <Input 
                  id="phone" 
                  name="phone"
                  type="tel"
                  placeholder="777123456"
                  dir="ltr"
                  value={registerForm.phone}
                  onChange={handleRegisterChange}
                  required 
                  className="focus:border-primary"
                />
                <p className="text-xs text-gray-500">يبدأ بـ 7xx أو 01 أو 05 (طوله 9 أرقام)</p>
                {registerErrors.phone && (
                  <p className="text-destructive text-xs mt-1">{registerErrors.phone}</p>
                )}
              </div>
              
              <div className="space-y-1">
                <Label htmlFor="userType" className="text-sm font-medium">نوع المستخدم</Label>
                <Select 
                  value={registerForm.userType} 
                  onValueChange={handleUserTypeChange}
                >
                  <SelectTrigger className="border-2 focus:border-primary">
                    <SelectValue placeholder="اختر نوع المستخدم" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="landlord">مالك عقار</SelectItem>
                    <SelectItem value="agency">مكتب عقاري</SelectItem>
                    <SelectItem value="renter">باحث عن سكن</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-1">
                <Label htmlFor="register-password" className="text-sm font-medium">كلمة المرور</Label>
                <div className="relative">
                  <Lock className="absolute right-3 top-3 h-4 w-4 text-gray-400" />
                  <Input 
                    id="register-password" 
                    name="password"
                    type={showPassword ? "text" : "password"}
                    dir="ltr"
                    value={registerForm.password}
                    onChange={handleRegisterChange}
                    required 
                    className="pr-10 focus:border-primary"
                  />
                  <button 
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute left-3 top-3 text-gray-400 hover:text-gray-600"
                    tabIndex={-1}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
                {registerErrors.password && (
                  <p className="text-destructive text-xs mt-1">{registerErrors.password}</p>
                )}
              </div>
              
              <div className="space-y-1">
                <Label htmlFor="confirmPassword" className="text-sm font-medium">تأكيد كلمة المرور</Label>
                <div className="relative">
                  <Lock className="absolute right-3 top-3 h-4 w-4 text-gray-400" />
                  <Input 
                    id="confirmPassword" 
                    name="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    dir="ltr"
                    value={registerForm.confirmPassword}
                    onChange={handleRegisterChange}
                    required 
                    className="pr-10 focus:border-primary"
                  />
                  <button 
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute left-3 top-3 text-gray-400 hover:text-gray-600"
                    tabIndex={-1}
                  >
                    {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
                {registerErrors.confirmPassword && (
                  <p className="text-destructive text-xs mt-1">{registerErrors.confirmPassword}</p>
                )}
              </div>
              
              <Button 
                type="submit" 
                className="w-full bg-primary hover:bg-primary/90 text-white flex items-center justify-center gap-2 mt-2"
              >
                <Check className="h-4 w-4" /> إنشاء حساب
              </Button>
              
              <p className="text-sm text-center text-gray-500 pt-1">
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
