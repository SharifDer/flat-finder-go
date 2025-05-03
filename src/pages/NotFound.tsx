
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";
import Navbar from "@/components/Navbar";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="flex-1 flex items-center justify-center bg-gray-50">
        <div className="text-center px-4 py-16">
          <h1 className="text-6xl font-bold text-primary mb-4">404</h1>
          <p className="text-2xl text-gray-600 mb-8">عذراً، الصفحة غير موجودة</p>
          <p className="text-gray-500 mb-8 max-w-md mx-auto">
            الصفحة التي تبحث عنها قد تكون محذوفة أو غير متوفرة حالياً أو تم تغيير عنوانها
          </p>
          <Button asChild className="inline-flex items-center gap-2">
            <a href="/">
              <Home className="h-4 w-4 ml-1" />
              العودة للصفحة الرئيسية
            </a>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
