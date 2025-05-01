import React, { useState } from 'react';
import DashboardLayout from '@/components/Layout/DashboardLayout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import { FileText, CheckCircle, Clock, X, Building, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from '@/hooks/use-toast';

const PrescriptionsPage = () => {
  // Mock prescription data
  const prescriptions = [
    { id: '1', patient: 'Sarah Johnson', doctor: 'Dr. Smith', date: '2025-04-10', status: 'active', medications: 3, diagnosis: 'Bacterial Infection' },
    { id: '2', patient: 'Sarah Johnson', doctor: 'Dr. Wilson', date: '2025-04-05', status: 'active', medications: 2, diagnosis: 'Seasonal Allergy' },
    { id: '3', patient: 'Sarah Johnson', doctor: 'Dr. Johnson', date: '2025-04-02', status: 'completed', medications: 1, diagnosis: 'Headache' },
    { id: '4', patient: 'Sarah Johnson', doctor: 'Dr. Williams', date: '2025-03-25', status: 'expired', medications: 4, diagnosis: 'Common Cold' },
  ];

  // State to determine which view to show - for patient or doctor
  const [userRole] = useState('patient');
  
  // Filter prescriptions by status
  const activePrescriptions = prescriptions.filter(p => p.status === 'active');
  const completedPrescriptions = prescriptions.filter(p => p.status === 'completed');
  const expiredPrescriptions = prescriptions.filter(p => p.status === 'expired');

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold">My Prescriptions</h1>
          <p className="text-muted-foreground">
            {userRole === 'patient' 
              ? 'View and manage your prescription history'
              : 'Manage and create prescriptions for your patients'}
          </p>
        </div>

        <Tabs defaultValue="all">
          <div className="flex justify-between items-center flex-wrap gap-4">
            <TabsList>
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="active">Active</TabsTrigger>
              <TabsTrigger value="completed">Completed</TabsTrigger>
              <TabsTrigger value="expired">Expired</TabsTrigger>
            </TabsList>
            {userRole === 'doctor' && (
              <Button>
                <FileText className="mr-2 h-4 w-4" />
                New Prescription
              </Button>
            )}
          </div>

          <TabsContent value="all" className="mt-6">
            <div className="space-y-4">
              {prescriptions.map(prescription => (
                <PrescriptionCard 
                  key={prescription.id} 
                  prescription={prescription}
                  userRole={userRole}
                />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="active" className="mt-6">
            <div className="space-y-4">
              {activePrescriptions.map(prescription => (
                <PrescriptionCard 
                  key={prescription.id} 
                  prescription={prescription}
                  userRole={userRole}
                />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="completed" className="mt-6">
            <div className="space-y-4">
              {completedPrescriptions.map(prescription => (
                <PrescriptionCard 
                  key={prescription.id} 
                  prescription={prescription}
                  userRole={userRole}
                />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="expired" className="mt-6">
            <div className="space-y-4">
              {expiredPrescriptions.map(prescription => (
                <PrescriptionCard 
                  key={prescription.id} 
                  prescription={prescription}
                  userRole={userRole}
                />
              ))}
            </div>
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
    diagnosis: string;
    status: string;
    medications: number;
  };
  userRole: string;
}

const PrescriptionCard: React.FC<PrescriptionCardProps> = ({ prescription, userRole }) => {
  const [selectedPharmacy, setSelectedPharmacy] = useState("");
  const [open, setOpen] = useState(false);
  const [sending, setSending] = useState(false);
  const [prescriptionStatus, setPrescriptionStatus] = useState(prescription.status);

  const pharmacies = [
    { id: "1", name: "MedExpress Pharmacy" },
    { id: "2", name: "HealthPlus Pharmacy" },
    { id: "3", name: "Community Care Pharmacy" },
  ];

  const handleSendToPharmacy = () => {
    if (!selectedPharmacy) {
      toast({
        title: "Please select a pharmacy",
        description: "You need to select a pharmacy to send your prescription to.",
        variant: "destructive"
      });
      return;
    }

    setSending(true);
    
    // Simulate API call and update status
    setTimeout(() => {
      setSending(false);
      setOpen(false);
      setPrescriptionStatus('sent');
      toast({
        title: "Prescription sent successfully",
        description: `Your prescription has been sent to ${pharmacies.find(p => p.id === selectedPharmacy)?.name}`,
      });
    }, 1500);
  };

  const getStatusIcon = () => {
    switch (prescriptionStatus) {
      case 'active':
        return <Clock className="h-5 w-5 text-blue-500" />;
      case 'completed':
      case 'sent':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'expired':
        return <X className="h-5 w-5 text-red-500" />;
      default:
        return <FileText className="h-5 w-5 text-gray-500" />;
    }
  };

  const getStatusColor = () => {
    switch (prescriptionStatus) {
      case 'active':
        return 'border-l-blue-500';
      case 'completed':
      case 'sent':
        return 'border-l-green-500';
      case 'expired':
        return 'border-l-red-500';
      default:
        return 'border-l-gray-500';
    }
  };

  return (
    <Card className={`border-l-4 ${getStatusColor()}`}>
      <CardContent className="p-6">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
              {getStatusIcon()}
            </div>
            <div>
              <h3 className={`font-medium ${prescriptionStatus === 'sent' ? 'text-green-600' : ''}`}>
                {userRole === 'patient' ? prescription.doctor : prescription.patient}
              </h3>
              <p className="text-sm text-muted-foreground">
                {new Date(prescription.date).toLocaleDateString()} • {prescription.diagnosis}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-4 flex-wrap">
            <div className={`px-3 py-1 rounded-full text-xs font-medium capitalize ${
              prescriptionStatus === 'sent' ? 'bg-green-50 text-green-700 border-green-200' :
              prescriptionStatus === 'active' ? 'bg-blue-50 text-blue-700 border-blue-200' :
              prescriptionStatus === 'expired' ? 'bg-red-50 text-red-700 border-red-200' :
              'bg-gray-50 text-gray-700 border-gray-200'
            }`}>
              {prescriptionStatus}
            </div>
            <Badge variant="outline" className="bg-white">{prescription.medications} medications</Badge>
            
            <div className="flex gap-2">
              <Button size="sm" variant="outline">View Details</Button>
              
              {userRole === 'patient' && prescriptionStatus === 'active' && (
                <Dialog open={open} onOpenChange={setOpen}>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Send Prescription to Pharmacy</DialogTitle>
                      <DialogDescription>
                        Choose a pharmacy to send your prescription for fulfillment.
                      </DialogDescription>
                    </DialogHeader>
                    
                    <div className="grid gap-4 py-4">
                      <div className="space-y-2">
                        <label htmlFor="pharmacy" className="text-sm font-medium">Select Pharmacy</label>
                        <Select value={selectedPharmacy} onValueChange={setSelectedPharmacy}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a pharmacy" />
                          </SelectTrigger>
                          <SelectContent>
                            {pharmacies.map((pharmacy) => (
                              <SelectItem key={pharmacy.id} value={pharmacy.id}>
                                {pharmacy.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <DialogFooter>
                      <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
                      <Button onClick={handleSendToPharmacy} disabled={sending}>
                        {sending ? (
                          <>
                            <div className="animate-spin mr-2">⌛</div> 
                            Sending...
                          </>
                        ) : (
                          <>
                            <Building className="mr-2 h-4 w-4" />
                            Send Prescription
                          </>
                        )}
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PrescriptionsPage;
