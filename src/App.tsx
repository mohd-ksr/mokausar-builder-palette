import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import CertificationsPage from './pages/CertificationsPage';
import { useEffect } from "react";
const queryClient = new QueryClient();
import WaterBackground from './components/WaterBackground';
import KausarBot from './components/KausarBot';

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToTop />
        {/* <WaterBackground /> */}
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/certifications" element={<CertificationsPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <KausarBot />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
