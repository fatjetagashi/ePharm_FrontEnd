
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "@/pages/DoctorView/Index";
import NotFound from "./pages/DoctorView/NotFound";
import PrescriptionsPage from "./pages/DoctorView/PrescriptionPage";
import CreatePrescriptionPage from "./pages/DoctorView/CreatePrescriptionPage";
import SettingsPage from "./pages/DoctorView/SettingsPage";
import DoctorsPage from "./pages/DoctorView/DoctorsPage";
import AddDoctorPage from "./pages/DoctorView/AddDoctorPage";
import PatientsPage from "./pages/DoctorView/PatientsPage";
import MedicinesPage from "./pages/DoctorView/MedicinesPage";
import NotificationsPage from "./pages/DoctorView/NotificationsPage";
import ChatPage from "./pages/DoctorView/ChatPage";
import AppointmentsPage from "./pages/DoctorView/AppointmentsPage"; // New page added

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
                    <Route path="/prescriptions/create" element={<CreatePrescriptionPage />} />
                    <Route path="/doctors" element={<DoctorsPage />} />
                    <Route path="/doctors/add" element={<AddDoctorPage />} />
                    <Route path="/patients" element={<PatientsPage />} />
                    <Route path="/medicines" element={<MedicinesPage />} />
                    <Route path="/notifications" element={<NotificationsPage />} />
                    <Route path="/chat" element={<ChatPage />} />
                    <Route path="/settings" element={<SettingsPage />} />
                    <Route path="/appointments" element={<AppointmentsPage />} /> {/* New route */}
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </BrowserRouter>
        </TooltipProvider>
    </QueryClientProvider>
);

export default App;
