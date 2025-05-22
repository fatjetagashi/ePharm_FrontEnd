import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useAuth } from "./context/AuthContext";

// AdminView pages
import AdminIndex from "./pages/AdminView/Index";
@@ -28,6 +28,7 @@ import PatientDoctorsPage from "./pages/PatientView/DoctorsPage";
import PatientPatientsPage from "./pages/PatientView/PatientsPage";
import PatientMedicinesPage from "./pages/PatientView/MedicinesPage";
import PatientNotificationsPage from "./pages/PatientView/NotificationsPage";
import PatientRegisterPage from "./pages/PatientView/PatientRegisterPage";

// DoctorView pages
import DoctorIndex from "./pages/DoctorView/Index";
@@ -39,69 +40,87 @@ import DoctorPatientsPage from "./pages/DoctorView/PatientsPage";
import DoctorMedicinesPage from "./pages/DoctorView/MedicinesPage";
import DoctorNotificationsPage from "./pages/DoctorView/NotificationsPage";
import DoctorSettingsPage from "./pages/DoctorView/SettingsPage";
import DoctorRegisterPage from "./pages/DoctorView/DoctorRegisterPage";
import DoctorRegisterLiscense from "./pages/DoctorView/DoctorRegisterLiscense";
import PharmacyRegisterPage from "./pages/PharmacyView/PharmcyRegisterPage";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";

const queryClient = new QueryClient();
const App = () => {
    const queryClient = new QueryClient();
    const { role } = useAuth(); // ✅ Valid usage of hook inside function
    console.log("👤 Current role in App:", role);

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
                                <Route path="/register/doctor/license" element={<DoctorRegisterLiscense />} />
                                <Route path="*" element={<DoctorNotFound />} />
                            </>
                        )}
                    </Routes>
                </BrowserRouter>
            </TooltipProvider>
        </QueryClientProvider>
    );
};

export default App;