
import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Camera, Upload, Check } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { useUserPreference } from "@/contexts/UserPreferenceContext";
import PropertyAuthModal from "@/components/PropertyAuthModal";

// Define form schema
const formSchema = z.object({
  title: z.string().min(10, {
    message: "العنوان يجب أن يكون على الأقل 10 أحرف",
  }),
  type: z.string({
    required_error: "يرجى اختيار نوع العقار",
  }),
  location: z.string().min(5, {
    message: "يرجى تحديد الموقع بدقة",
  }),
  price: z.number({
    required_error: "يرجى إدخال السعر",
    invalid_type_error: "يجب أن يكون السعر رقمًا",
  }).min(10000, {
    message: "السعر منخفض جدًا",
  }),
  bedrooms: z.number({
    required_error: "يرجى تحديد عدد غرف النوم",
  }),
  bathrooms: z.number({
    required_error: "يرجى تحديد عدد الحمامات",
  }),
  description: z.string().min(30, {
    message: "يرجى كتابة وصف مفصل للعقار لا يقل عن 30 حرف",
  }),
  status: z.boolean().default(true),
});

const AddApartment = () => {
  const { toast } = useToast();
  const { isLoggedIn } = useUserPreference();
  const [images, setImages] = useState<File[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  
  // Check if user is logged in, if not show auth modal
  useEffect(() => {
    if (!isLoggedIn) {
      setShowAuthModal(true);
    }
  }, [isLoggedIn]);
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      type: "",
      location: "",
      price: 50000,
      bedrooms: 2,
      bathrooms: 1,
      description: "",
      status: true,
    },
  });
  
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);
      if (images.length + filesArray.length > 10) {
        toast({
          title: "الحد الأقصى للصور هو 10 صور",
          description: "يرجى اختيار عدد أقل من الصور",
          variant: "destructive",
        });
        return;
      }
      setImages(prev => [...prev, ...filesArray]);
    }
  };
  
  const removeImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index));
  };
  
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Check if user is logged in before submitting
    if (!isLoggedIn) {
      setShowAuthModal(true);
      return;
    }
    
    setSubmitting(true);
    console.log({ ...values, images });
    
    // Simulate API call
    setTimeout(() => {
      setSubmitting(false);
      toast({
        title: "تم إضافة الشقة بنجاح!",
        description: "سيتم مراجعة إعلانك ونشره قريبًا",
      });
      // Reset form
      form.reset();
      setImages([]);
    }, 2000);
  }
  
  const handleAuthSuccess = () => {
    // When user successfully logs in or registers, 
    // they can continue with the form
    toast({
      title: "تم تسجيل الدخول بنجاح",
      description: "يمكنك الآن إضافة عقارك",
    });
    setShowAuthModal(false);
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Auth Modal - Only shown in AddApartment page */}
      <PropertyAuthModal 
        open={showAuthModal} 
        onOpenChange={setShowAuthModal}
        onSuccess={handleAuthSuccess}
      />
      
      {/* Hero Section */}
      <section className="bg-blue-50 py-10">
        <div className="container-custom text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            أضف شقتك للإيجار
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            أضف تفاصيل شقتك وصور عالية الجودة للوصول إلى مستأجرين محتملين بشكل مباشر
          </p>
        </div>
      </section>
      
      {/* Form Section - Only shown if user is logged in */}
      {isLoggedIn && (
        <section className="py-12">
          <div className="container-custom max-w-4xl">
            <div className="bg-white p-8 rounded-lg shadow-md">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Basic Information */}
                    <div className="md:col-span-2">
                      <h2 className="text-xl font-semibold mb-4 text-primary">المعلومات الأساسية</h2>
                      
                      <FormField
                        control={form.control}
                        name="title"
                        render={({ field }) => (
                          <FormItem className="mb-4">
                            <FormLabel>عنوان الشقة</FormLabel>
                            <FormControl>
                              <Input placeholder="شقة مميزة في حدة عند جسر المدينة" {...field} />
                            </FormControl>
                            <FormDescription>
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name="type"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>نوع العقار</FormLabel>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="اختر نوع العقار" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectItem value="apartment">شقة</SelectItem>
                                  <SelectItem value="house">منزل</SelectItem>
                                  <SelectItem value="villa">فيلا</SelectItem>
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="location"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>الموقع</FormLabel>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="اختر الحي" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectItem value="حدة">حدة</SelectItem>
                                  <SelectItem value="شارع تعز">شارع تعز</SelectItem>
                                  <SelectItem value="السنينة">السنينة</SelectItem>
                                  <SelectItem value="شارع الستين">شارع الستين</SelectItem>
                                  <SelectItem value="الحصبة">الحصبة</SelectItem>
                                  <SelectItem value="حي الجامعة">حي الجامعة</SelectItem>
                                  <SelectItem value="شملان">شملان</SelectItem>
                                  <SelectItem value="عصر">عصر</SelectItem>
                                  <SelectItem value="مذبح">مذبح</SelectItem>
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>
                    
                    {/* Price & Details */}
                    <div className="md:col-span-2">
                      <h2 className="text-xl font-semibold mb-4 text-primary">السعر والتفاصيل</h2>
                      
                      <FormField
                        control={form.control}
                        name="price"
                        render={({ field }) => (
                          <FormItem className="mb-4">
                            <FormLabel>سعر الإيجار الشهري (ريال يمني)</FormLabel>
                            <FormControl>
                              <Input type="number" {...field} onChange={e => field.onChange(Number(e.target.value))} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <div className="grid grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name="bedrooms"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>عدد الغرف </FormLabel>
                              <Select onValueChange={value => field.onChange(Number(value))} defaultValue={field.value.toString()}>
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="العدد" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectItem value="1">1</SelectItem>
                                  <SelectItem value="2">2</SelectItem>
                                  <SelectItem value="3">3</SelectItem>
                                  <SelectItem value="4">4</SelectItem>
                                  <SelectItem value="5">5+</SelectItem>
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="bathrooms"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>الحمامات</FormLabel>
                              <Select onValueChange={value => field.onChange(Number(value))} defaultValue={field.value.toString()}>
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="العدد" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectItem value="1">1</SelectItem>
                                  <SelectItem value="2">2</SelectItem>
                                  <SelectItem value="3">3</SelectItem>
                                  <SelectItem value="4">4+</SelectItem>
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>
                    
                    {/* Status */}
                    <div className="md:col-span-2">
                      <FormField
                        control={form.control}
                        name="status"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                            <div className="space-y-0.5">
                              <FormLabel className="text-base">حالة العقار</FormLabel>
                              <FormDescription>
                                {field.value ? 'متاح للإيجار' : 'تم تأجيره بالفعل'}
                              </FormDescription>
                            </div>
                            <FormControl>
                              <Switch
                                checked={field.value}
                                onCheckedChange={field.onChange}
                                className={field.value ? "bg-green-500 data-[state=checked]:bg-green-500 hover:bg-green-600" : "bg-red-500 data-[state=unchecked]:bg-red-500 hover:bg-red-600"}
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    {/* Description */}
                    <div className="md:col-span-2">
                      <FormField
                        control={form.control}
                        name="description"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>وصف تفصيلي للشقة</FormLabel>
                            <FormControl>
                              <Textarea 
                                placeholder="اكتب وصفًا مفصلاً للشقة... اذكر المميزات والتفاصيل المهمة مثل وجود مصعد، أو قرب المواصلات، أو توفر خدمات في المنطقة." 
                                className="min-h-[150px]"
                                {...field} 
                              />
                            </FormControl>
                            <FormDescription>
                              وصف واضح ومفصل يزيد من فرص تأجير شقتك بسرعة
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    {/* Upload Images */}
                    <div className="md:col-span-2">
                      <h2 className="text-xl font-semibold mb-4 text-primary">صور العقار</h2>
                      
                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                        <Camera className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                        <p className="text-gray-600 mb-2">قم بتحميل صور واضحة وجذابة لشقتك</p>
                        <p className="text-gray-500 text-sm mb-4">الحد الأقصى 10 صور، بحجم أقصى 5 ميجابايت للصورة</p>
                        
                        <div className="mt-2">
                          <label className="inline-flex items-center justify-center px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90 cursor-pointer">
                            <Upload className="h-4 w-4 mr-2" />
                            <span>اختر الصور</span>
                            <input 
                              type="file" 
                              multiple 
                              accept="image/*" 
                              className="hidden" 
                              onChange={handleImageChange}
                            />
                          </label>
                        </div>
                      </div>
                      
                      {images.length > 0 && (
                        <div className="mt-4">
                          <h3 className="font-medium mb-2">الصور المختارة ({images.length}/10)</h3>
                          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
                            {images.map((img, index) => (
                              <div key={index} className="relative rounded-md overflow-hidden h-24 bg-gray-100">
                                <img 
                                  src={URL.createObjectURL(img)} 
                                  alt={`Apartment preview ${index}`}
                                  className="h-full w-full object-cover"
                                />
                                <button
                                  type="button"
                                  onClick={() => removeImage(index)}
                                  className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 text-xs"
                                >
                                  &times;
                                </button>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  {/* Submit Button */}
                  <div className="text-center">
                    <Button type="submit" className="px-10 py-6 text-lg" disabled={submitting}>
                      {submitting ? (
                        <>جاري الإرسال...</>
                      ) : (
                        <>
                          <Check className="h-5 w-5 mr-2" /> إضافة الشقة
                        </>
                      )}
                    </Button>
                  </div>
                </form>
              </Form>
            </div>
          </div>
        </section>
      )}
      
      <Footer />
    </div>
  );
};

export default AddApartment;
