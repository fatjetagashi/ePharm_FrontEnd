
import React from 'react';
import DashboardLayout from '@/components/Layout/AdminComponents/DashboardLayout';
import PrescriptionForm from '@/components/Prescription/PrescriptionForm';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText, CheckCircle, Clock, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

const PrescriptionsPage = () => {
  // Mock prescription data
  const prescriptions = [
    { id: '1', patient: 'Alice Johnson', doctor: 'Dr. Smith', date: '2025-04-10', status: 'active', medications: 3 },
    { id: '2', patient: 'Robert Brown', doctor: 'Dr. Smith', date: '2025-04-05', status: 'active', medications: 2 },
    { id: '3', patient: 'Emma Davis', doctor: 'Dr. Johnson', date: '2025-04-02', status: 'completed', medications: 1 },
    { id: '4', patient: 'James Wilson', doctor: 'Dr. Williams', date: '2025-03-25', status: 'expired', medications: 4 },
  ];

  // Filter prescriptions by status
  const activePrescriptions = prescriptions.filter(p => p.status === 'active');
  const completedPrescriptions = prescriptions.filter(p => p.status === 'completed');
  const expiredPrescriptions = prescriptions.filter(p => p.status === 'expired');

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold">Prescriptions</h1>
          <p className="text-muted-foreground">Manage and create prescriptions for your patients</p>
        </div>

        <Tabs defaultValue="all">
          <div className="flex justify-between items-center">
            <TabsList>
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="active">Active</TabsTrigger>
              <TabsTrigger value="completed">Completed</TabsTrigger>
              <TabsTrigger value="expired">Expired</TabsTrigger>
            </TabsList>
            <Button>
              <FileText className="mr-2 h-4 w-4" />
              New Prescription
            </Button>
          </div>

          <TabsContent value="all" className="mt-6">
            <div className="space-y-4">
              {prescriptions.map(prescription => (
                <PrescriptionCard key={prescription.id} prescription={prescription} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="active" className="mt-6">
            <div className="space-y-4">
              {activePrescriptions.map(prescription => (
                <PrescriptionCard key={prescription.id} prescription={prescription} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="completed" className="mt-6">
            <div className="space-y-4">
              {completedPrescriptions.map(prescription => (
                <PrescriptionCard key={prescription.id} prescription={prescription} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="expired" className="mt-6">
            <div className="space-y-4">
              {expiredPrescriptions.map(prescription => (
                <PrescriptionCard key={prescription.id} prescription={prescription} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="create" className="mt-6">
            <PrescriptionForm />
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

interface PrescriptionCardProps {
  prescription: {
    id: string;
    patient: string;
    doctor: string;
    date: string;
    status: string;
    medications: number;
  };
}

const PrescriptionCard: React.FC<PrescriptionCardProps> = ({ prescription }) => {
  const getStatusIcon = () => {
    switch (prescription.status) {
      case 'active':
        return <Clock className="h-5 w-5 text-blue-500" />;
      case 'completed':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'expired':
        return <X className="h-5 w-5 text-red-500" />;
      default:
        return <FileText className="h-5 w-5 text-gray-500" />;
    }
  };

  const getStatusColor = () => {
    switch (prescription.status) {
      case 'active':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'completed':
        return 'bg-green-50 text-green-700 border-green-200';
      case 'expired':
        return 'bg-red-50 text-red-700 border-red-200';
      default:
        return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  return (
    <Card className={`border-l-4 ${
      prescription.status === 'active' ? 'border-l-blue-500' :
      prescription.status === 'completed' ? 'border-l-green-500' :
      'border-l-red-500'
    }`}>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
              {getStatusIcon()}
            </div>
            <div>
              <h3 className="font-medium">{prescription.patient}</h3>
              <p className="text-sm text-muted-foreground">{prescription.doctor} • {new Date(prescription.date).toLocaleDateString()}</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className={`px-3 py-1 rounded-full text-xs font-medium capitalize ${getStatusColor()}`}>
              {prescription.status}
            </div>
            <span className="text-sm font-medium">{prescription.medications} medications</span>
            <Button size="sm" variant="outline">View</Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PrescriptionsPage;
