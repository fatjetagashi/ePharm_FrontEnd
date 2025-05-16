
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/PharmacyView/Index";

import PharmacyDashboard from "./pages/PharmacyView/PharmacyDashboard";
import PrescriptionsPage from "./pages/PharmacyView/PrescriptionsPage";
import PharmaciesPage from "./pages/PharmacyView/PharmaciesPage";
import SettingsPage from "./pages/PharmacyView/SettingsPage";
import DoctorsPage from "./pages/PharmacyView/DoctorsPage";
import PatientsPage from "./pages/PharmacyView/PatientsPage";
import MedicinesPage from "./pages/PharmacyView/MedicinesPage";
import NotificationsPage from "./pages/PharmacyView/NotificationsPage";
import BillingPage from "./pages/PharmacyView/BillingPage";
import OrdersPage from "./pages/PharmacyView/OrdersPage";
import NotFound from "@/pages/AdminView/NotFound.tsx";

const queryClient = new QueryClient();

const App = () => (
    <QueryClientProvider client={queryClient}>
        <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Index />} />
                    <Route path="/pharmacy-dashboard" element={<PharmacyDashboard />} />
                    <Route path="/prescriptions" element={<PrescriptionsPage />} />
                    <Route path="/pharmacies" element={<PharmaciesPage />} />
                    <Route path="/doctors" element={<DoctorsPage />} />
                    <Route path="/patients" element={<PatientsPage />} />
                    <Route path="/medicines" element={<MedicinesPage />} />
                    <Route path="/orders" element={<OrdersPage />} />
                    <Route path="/billing" element={<BillingPage />} />
                    <Route path="/notifications" element={<NotificationsPage />} />
                    <Route path="/settings" element={<SettingsPage />} />
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </BrowserRouter>
        </TooltipProvider>
    </QueryClientProvider>
);

export default App;
