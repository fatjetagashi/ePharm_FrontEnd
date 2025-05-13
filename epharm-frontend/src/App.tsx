
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/PatientView/Index";
import NotFound from "./pages/PatientView/NotFound";
import PrescriptionsPage from "./pages/PatientView/PrescriptionsPage";
import PharmaciesPage from "./pages/PatientView/PharmaciesPage";
import SettingsPage from "./pages/PatientView/SettingsPage";
import DoctorsPage from "./pages/PatientView/DoctorsPage";
import PatientsPage from "./pages/PatientView/PatientsPage";
import MedicinesPage from "./pages/PatientView/MedicinesPage";
import NotificationsPage from "./pages/PatientView/NotificationsPage";
import PharmacyList from './pages/PharmacyList';

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/prescriptions" element={<PrescriptionsPage />} />
          <Route path="/pharmacies" element={<PharmaciesPage />} />
          <Route path="/doctors" element={<DoctorsPage />} />
          <Route path="/patients" element={<PatientsPage />} />
          <Route path="/medicines" element={<MedicinesPage />} />
          <Route path="/notifications" element={<NotificationsPage />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/pharmacy-test" element={<PharmacyList />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
