import React from "react";
import DashboardLayout from "@/components/Layout/PatientComponents/DashboardLayout";
import PatientDashboard from "@/components/Dashboard/PatientDashboard";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { User } from "lucide-react";
import PatientQRDialog from "@/components/Patient/PatientQRDialog";

const Index = () => {
  // Mock patient data - in a real app this would come from authentication or API
  const patientInfo = {
    name: "Sarah Johnson",
    patientId: "P-123456",
    email: "sarah.johnson@example.com",
  };

  const user = JSON.parse(localStorage.getItem("user") || "{}");

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <Card className="p-6">
          <div className="flex flex-col md:flex-row gap-6 items-center md:items-start">
            <Avatar className="w-24 h-24 bg-health-primary text-white rounded-full">
              <AvatarFallback className="text-3xl">
                <User className="h-12 w-12" />
              </AvatarFallback>
            </Avatar>

            <div className="space-y-2 text-center md:text-left">
              <h1 className="text-2xl font-bold">
                {user?.name ?? patientInfo.name}
              </h1>
              <div>
                <p className="text-gray-500">
                  Patient ID: {user?.id ?? patientInfo.patientId}
                </p>
                <p className="text-gray-500">
                  {user?.email ?? patientInfo.email}
                </p>
              </div>
              <div className="pt-2">
                <PatientQRDialog patientInfo={patientInfo} />
              </div>
            </div>
          </div>
        </Card>

        <PatientDashboard />
      </div>
    </DashboardLayout>
  );
};

export default Index;