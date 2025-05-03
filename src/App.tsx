
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import ListingsPage from "./pages/ListingsPage";
import ApartmentDetail from "./pages/ApartmentDetail";
import UserProfile from "./pages/UserProfile";
import HowItWorks from "./pages/HowItWorks";
import About from "./pages/About";
import AddApartment from "./pages/AddApartment";
import Favorites from "./pages/Favorites";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/listings" element={<ListingsPage />} />
          <Route path="/apartment/:id" element={<ApartmentDetail />} />
          <Route path="/profile" element={<UserProfile />} />
          <Route path="/how-it-works" element={<HowItWorks />} />
          <Route path="/about" element={<About />} />
          <Route path="/add-apartment" element={<AddApartment />} />
          <Route path="/favorites" element={<Favorites />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
