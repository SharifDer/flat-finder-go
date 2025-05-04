/**
 * This file is for the About Us page
 * Provides information about the platform, team, and contact details
 */

// import React from 'react';
// import Navbar from '@/components/Navbar';
// import Footer from '@/components/Footer';
// import { Shield, Users, MessageSquare, User, Phone, Mail, MapPin } from 'lucide-react';

// const About = () => {
//   return (
//     <div className="min-h-screen flex flex-col">
//       <Navbar />
      
//       {/* Hero Section */}
//       <section className="bg-blue-50 py-16">
//         <div className="container-custom text-center">
//           <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
//             عن الموقع
//           </h1>
//           <p className="text-lg text-gray-600 max-w-3xl mx-auto">
//             منصة سكن صنعاء هي الحل المثالي لأولئك الذين يبحثون عن شقق للإيجار في صنعاء دون وسطاء أو عمولات إضافية.
//           </p>
//         </div>
//       </section>
      
//       {/* About Us Content */}
//       <section className="py-16">
//         <div className="container-custom">
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
//             <div>
//               <h2 className="text-2xl font-bold mb-6 text-primary">قصتنا</h2>
//               <p className="text-gray-600 mb-4">
//                 تم تأسيس منصة سكن صنعاء استجابة للتحديات التي يواجهها الناس أثناء البحث عن السكن في صنعاء، حيث يضطر الكثيرون للتعامل مع الوسطاء العقاريين ودفع عمولات مرتفعة.
//               </p>
//               <p className="text-gray-600 mb-4">
//                 هدفنا هو تقديم منصة بسيطة وفعالة تربط بين المستأجرين ومالكي العقارات مباشرة، مما يقضي على الحاجة للوسطاء ويجعل عملية البحث عن السكن أكثر شفافية وأقل تكلفة.
//               </p>
//               <p className="text-gray-600">
//                 نحن فريق محلي من صنعاء نسعى لتحسين تجربة البحث عن السكن في مدينتنا وجعلها سهلة ومريحة.
//               </p>
//             </div>
//             <div className="bg-blue-50 p-8 rounded-lg">
//               <h2 className="text-2xl font-bold mb-6 text-center text-primary">مميزاتنا</h2>
              
//               <div className="space-y-6">
//                 <div className="flex items-start">
//                   <div className="bg-blue-100 rounded-full p-3 mr-4">
//                     <Shield className="h-6 w-6 text-primary" />
//                   </div>
//                   <div>
//                     <h3 className="font-semibold text-lg mb-2">الشفافية والأمان</h3>
//                     <p className="text-gray-600">نقوم بالتحقق من جميع الإعلانات لضمان دقة المعلومات وحماية المستخدمين.</p>
//                   </div>
//                 </div>
                
//                 <div className="flex items-start">
//                   <div className="bg-blue-100 rounded-full p-3 mr-4">
//                     <Users className="h-6 w-6 text-primary" />
//                   </div>
//                   <div>
//                     <h3 className="font-semibold text-lg mb-2">التواصل المباشر</h3>
//                     <p className="text-gray-600">نمكن المستأجرين ومالكي العقارات من التواصل مباشرة دون وسطاء.</p>
//                   </div>
//                 </div>
                
//                 <div className="flex items-start">
//                   <div className="bg-blue-100 rounded-full p-3 mr-4">
//                     <MessageSquare className="h-6 w-6 text-primary" />
//                   </div>
//                   <div>
//                     <h3 className="font-semibold text-lg mb-2">الدعم المحلي</h3>
//                     <p className="text-gray-600">فريقنا المحلي جاهز لمساعدتك في أي استفسارات أو مشاكل.</p>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>
      
//       {/* Team Section */}
//       <section className="py-16 bg-gray-50">
//         <div className="container-custom">
//           <h2 className="text-3xl font-bold text-center mb-12">فريقنا</h2>
          
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//             <div className="bg-white p-6 rounded-lg shadow-sm text-center">
//               <div className="w-24 h-24 bg-blue-100 rounded-full mx-auto mb-4 flex items-center justify-center">
//                 <User className="h-12 w-12 text-primary" />
//               </div>
//               <h3 className="font-semibold text-xl mb-1">أحمد الصنعاني</h3>
//               <p className="text-primary mb-3">المؤسس والرئيس التنفيذي</p>
//               <p className="text-gray-600">خبير في العقارات مع أكثر من 10 سنوات من الخبرة في سوق العقارات اليمني.</p>
//             </div>
            
//             <div className="bg-white p-6 rounded-lg shadow-sm text-center">
//               <div className="w-24 h-24 bg-blue-100 rounded-full mx-auto mb-4 flex items-center justify-center">
//                 <User className="h-12 w-12 text-primary" />
//               </div>
//               <h3 className="font-semibold text-xl mb-1">سارة اليمني</h3>
//               <p className="text-primary mb-3">مدير العمليات</p>
//               <p className="text-gray-600">متخصصة في تطوير الأعمال وتحسين تجربة المستخدم على المنصات الرقمية.</p>
//             </div>
            
//             <div className="bg-white p-6 rounded-lg shadow-sm text-center">
//               <div className="w-24 h-24 bg-blue-100 rounded-full mx-auto mb-4 flex items-center justify-center">
//                 <User className="h-12 w-12 text-primary" />
//               </div>
//               <h3 className="font-semibold text-xl mb-1">محمد العزي</h3>
//               <p className="text-primary mb-3">المدير الفني</p>
//               <p className="text-gray-600">مطور برمجيات مع خبرة واسعة في بناء المنصات الإلكترونية سهلة الاستخدام.</p>
//             </div>
//           </div>
//         </div>
//       </section>
      
//       {/* Contact Section */}
//       <section className="py-16">
//         <div className="container-custom text-center">
//           <h2 className="text-3xl font-bold mb-6">تواصل معنا</h2>
//           <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
//             هل لديك أسئلة أو ملاحظات؟ فريقنا جاهز لمساعدتك.
//           </p>
          
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto">
//             <div className="text-center">
//               <div className="bg-blue-100 rounded-full p-4 inline-flex mb-4">
//                 <Phone className="h-6 w-6 text-primary" />
//               </div>
//               <h3 className="font-semibold mb-2">اتصل بنا</h3>
//               <p className="text-gray-600">+967 1 234 5678</p>
//             </div>
            
//             <div className="text-center">
//               <div className="bg-blue-100 rounded-full p-4 inline-flex mb-4">
//                 <Mail className="h-6 w-6 text-primary" />
//               </div>
//               <h3 className="font-semibold mb-2">البريد الإلكتروني</h3>
//               <p className="text-gray-600">info@sakansanaa.com</p>
//             </div>
            
//             <div className="text-center">
//               <div className="bg-blue-100 rounded-full p-4 inline-flex mb-4">
//                 <MapPin className="h-6 w-6 text-primary" />
//               </div>
//               <h3 className="font-semibold mb-2">العنوان</h3>
//               <p className="text-gray-600">شارع الزبيري، صنعاء، اليمن</p>
//             </div>
//           </div>
//         </div>
//       </section>
      
//       <Footer />
//     </div>
//   );
// };

// export default About;
