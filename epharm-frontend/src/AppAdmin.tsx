
import { Toaster } from "@/components/ui/toaster.tsx";
import { Toaster as Sonner } from "@/components/ui/sonner.tsx";
import { TooltipProvider } from "@/components/ui/tooltip.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/AdminView/Index";
import NotFound from "./pages/AdminView/NotFound";
import PrescriptionsPage from "./pages/AdminView/PrescriptionsPage";
import PharmaciesPage from "./pages/AdminView/PharmaciesPage";
import SettingsPage from "./pages/AdminView/SettingsPage";
import DoctorsPage from "./pages/AdminView/DoctorsPage";
import PatientsPage from "./pages/AdminView/PatientsPage";
import MedicinesPage from "./pages/AdminView/MedicinesPage";
import NotificationsPage from "./pages/AdminView/NotificationsPage";
import ReportsPage from "./pages/AdminView/ReportsPage";
import ProfilePage from "./pages/AdminView/ProfilePage";
import { SidebarProvider } from "./components/Layout/AdminComponents/SidebarContext";

const queryClient = new QueryClient();

const App = () => (
    <QueryClientProvider client={queryClient}>
        <TooltipProvider>
            <SidebarProvider>
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
                        <Route path="/reports" element={<ReportsPage />} />
                        <Route path="/profile" element={<ProfilePage />} />
                        <Route path="*" element={<NotFound />} />
                    </Routes>
                </BrowserRouter>
            </SidebarProvider>
        </TooltipProvider>
    </QueryClientProvider>
);

export default App;
