import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useAuth } from "./context/AuthContext";

// AdminView pages
import AdminIndex from "./pages/AdminView/Index";
import AdminNotFound from "./pages/AdminView/NotFound";
import AdminPrescriptionsPage from "./pages/AdminView/PrescriptionsPage";
import AdminPharmaciesPage from "./pages/AdminView/PharmaciesPage";
import AdminSettingsPage from "./pages/AdminView/SettingsPage";
import AdminDoctorsPage from "./pages/AdminView/DoctorsPage";
import AdminPatientsPage from "./pages/AdminView/PatientsPage";
import AdminMedicinesPage from "./pages/AdminView/MedicinesPage";
import AdminNotificationsPage from "./pages/AdminView/NotificationsPage";
import AdminReportsPage from "./pages/AdminView/ReportsPage";
import AdminProfilePage from "./pages/AdminView/ProfilePage";

// PatientView pages
import PatientIndex from "./pages/PatientView/Index";
import PatientNotFound from "./pages/PatientView/NotFound";
import PatientPrescriptionsPage from "./pages/PatientView/PrescriptionsPage";
import PatientPharmaciesPage from "./pages/PatientView/PharmaciesPage";
import PatientSettingsPage from "./pages/PatientView/SettingsPage";
import PatientDoctorsPage from "./pages/PatientView/DoctorsPage";
import PatientPatientsPage from "./pages/PatientView/PatientsPage";
import PatientMedicinesPage from "./pages/PatientView/MedicinesPage";
import PatientNotificationsPage from "./pages/PatientView/NotificationsPage";
import PatientRegisterPage from "./pages/PatientView/PatientRegisterPage";

// DoctorView pages
import DoctorIndex from "./pages/DoctorView/Index";
import DoctorNotFound from "./pages/DoctorView/NotFound";
import DoctorAppointmentsPage from "./pages/DoctorView/AppointmentsPage";
import DoctorCreatePrescriptionPage from "./pages/DoctorView/CreatePrescriptionPage";
import DoctorDoctorsPage from "./pages/DoctorView/DoctorsPage";
import DoctorPatientsPage from "./pages/DoctorView/PatientsPage";
import DoctorMedicinesPage from "./pages/DoctorView/MedicinesPage";
import DoctorNotificationsPage from "./pages/DoctorView/NotificationsPage";
import DoctorSettingsPage from "./pages/DoctorView/SettingsPage";
import DoctorRegisterPage from "./pages/DoctorView/DoctorRegisterPage";
import DoctorRegisterLicense from "./pages/DoctorView/DoctorRegisterLicense";
import PharmacyRegisterPage from "./pages/PharmacyView/PharmcyRegisterPage";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import Index from "./pages/PharmacyView/Index";
import PharmacyDashboardPage from "./pages/PharmacyView/PharmacyDashboard";
import PrescriptionsPage from "./pages/PharmacyView/PrescriptionsPage";
import PharmaciesPage from "./pages/PharmacyView/PharmaciesPage";
import DoctorsPage from "./pages/PharmacyView/DoctorsPage";
import PatientsPage from "./pages/PharmacyView/PatientsPage";
import MedicinesPage from "./pages/PharmacyView/MedicinesPage";
import OrdersPage from "./pages/PharmacyView/OrdersPage";
import BillingPage from "./pages/PharmacyView/BillingPage";
import NotificationsPage from "./pages/PharmacyView/NotificationsPage";
import SettingsPage from "./pages/PharmacyView/SettingsPage";
import NotFound from "./pages/AdminView/NotFound";
import VerifyPatientPage from "./pages/PatientView/VerifyPatientPage";

const queryClient = new QueryClient();
const App = () => {
    const queryClient = new QueryClient();
    const { role } = useAuth(); // ✅ Valid usage of hook inside function
    console.log("👤 Current role in App:", role);
    {console.log(role)}

    {console.log(role)}

    return (
        <QueryClientProvider client={queryClient}>
            <TooltipProvider>
                <Toaster />
                <Sonner />
                <BrowserRouter>
                    <Routes>
                        {role == null && (
                            <>
                                <Route path="/" element={<HomePage />} />
                            </>
                        )}
                        <Route path="/login" element={<LoginPage />} />
                        <Route path="/register/patient" element={<PatientRegisterPage />} />
                        <Route path="/verify-patient-otp/:id" element={<VerifyPatientPage />} />
                        <Route path="/register/doctor/basic" element={<DoctorRegisterPage />} />
                        <Route path="/register/pharmacy" element={<PharmacyRegisterPage />} />

                        {/* Admin View */}
                        {role === "admin" && (
                            <>
                                <Route path="/" element={<AdminIndex />} />
                                <Route path="/prescriptions" element={<AdminPrescriptionsPage />} />
                                <Route path="/pharmacies" element={<AdminPharmaciesPage />} />
                                <Route path="/doctors" element={<AdminDoctorsPage />} />
                                <Route path="/patients" element={<AdminPatientsPage />} />
                                <Route path="/medicines" element={<AdminMedicinesPage />} />
                                <Route path="/notifications" element={<AdminNotificationsPage />} />
                                <Route path="/settings" element={<AdminSettingsPage />} />
                                <Route path="/reports" element={<AdminReportsPage />} />
                                <Route path="/profile" element={<AdminProfilePage />} />
                                <Route path="*" element={<AdminNotFound />} />
                            </>
                        )}

                        {/* Patient View */}
                        {role === "patient" && (
                            <>
                                <Route path="/" element={<PatientIndex />} />
                                <Route path="/prescriptions" element={<PatientPrescriptionsPage />} />
                                <Route path="/pharmacies" element={<PatientPharmaciesPage />} />
                                <Route path="/doctors" element={<PatientDoctorsPage />} />
                                <Route path="/patients" element={<PatientPatientsPage />} />
                                <Route path="/medicines" element={<PatientMedicinesPage />} />
                                <Route path="/notifications" element={<PatientNotificationsPage />} />
                                <Route path="/settings" element={<PatientSettingsPage />} />
                                <Route path="*" element={<PatientNotFound />} />
                            </>
                        )}

                        {/* Doctor View */}
                        {role === "doctor" && (
                            <>
                                <Route path="/" element={<DoctorIndex />} />
                                <Route path="/appointments" element={<DoctorAppointmentsPage />} />
                                <Route path="/create-prescription" element={<DoctorCreatePrescriptionPage />} />
                                <Route path="/doctors" element={<DoctorDoctorsPage />} />
                                <Route path="/patients" element={<DoctorPatientsPage />} />
                                <Route path="/medicines" element={<DoctorMedicinesPage />} />
                                <Route path="/notifications" element={<DoctorNotificationsPage />} />
                                <Route path="/settings" element={<DoctorSettingsPage />} />
                                <Route path="/register/doctor/license" element={<DoctorRegisterLicense />} />
                                <Route path="*" element={<DoctorNotFound />} />
                            </>
                        )}

                        {
                            role == 'pharmacy_owner' && (
                                <>
                                    <Route path="/" element={<Index />} />
                                    <Route path="/pharmacy-dashboard" element={<PharmacyDashboardPage />} />
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
                                </>
                            )
                        }
                    </Routes>
                </BrowserRouter>
            </TooltipProvider>
        </QueryClientProvider>
    );
};

export default App;