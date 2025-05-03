
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useUserPreference } from '@/contexts/UserPreferenceContext';

type AuthModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

const AuthModal = ({ open, onOpenChange }: AuthModalProps) => {
  const { setIsLoggedIn } = useUserPreference();
  const [activeTab, setActiveTab] = useState<string>('login');
  
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // هذي البيانات تذهب للباك ايند
    // البيانات المتوقعة: البريد الالكتروني، كلمة المرور
    setIsLoggedIn(true);
    onOpenChange(false);
  };
  
  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    // هذي البيانات تذهب للباك ايند
    // البيانات المتوقعة: الاسم، البريد الالكتروني، كلمة المرور
    setIsLoggedIn(true);
    onOpenChange(false);
  };
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center">
            {activeTab === 'login' ? 'تسجيل الدخول' : 'إنشاء حساب جديد'}
          </DialogTitle>
        </DialogHeader>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="login">تسجيل الدخول</TabsTrigger>
            <TabsTrigger value="register">حساب جديد</TabsTrigger>
          </TabsList>
          
          <TabsContent value="login">
            <form onSubmit={handleLogin} className="space-y-4 pt-4">
              <div className="space-y-2">
                <Label htmlFor="email-login">البريد الإلكتروني</Label>
                <Input id="email-login" type="email" placeholder="your@email.com" required />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password-login">كلمة المرور</Label>
                <Input id="password-login" type="password" required />
              </div>
              
              <Button type="submit" className="w-full">تسجيل الدخول</Button>
              
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
            <form onSubmit={handleRegister} className="space-y-4 pt-4">
              <div className="space-y-2">
                <Label htmlFor="name-register">الاسم</Label>
                <Input id="name-register" placeholder="الاسم الكامل" required />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email-register">البريد الإلكتروني</Label>
                <Input id="email-register" type="email" placeholder="your@email.com" required />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password-register">كلمة المرور</Label>
                <Input id="password-register" type="password" required />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password-confirm">تأكيد كلمة المرور</Label>
                <Input id="password-confirm" type="password" required />
              </div>
              
              <Button type="submit" className="w-full">إنشاء حساب</Button>
              
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

export default AuthModal;
