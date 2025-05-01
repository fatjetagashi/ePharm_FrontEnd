import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Bell, Calendar, Clock, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useNavigate } from 'react-router-dom';
import { toast } from '@/hooks/use-toast';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const PatientDashboard = () => {
  const navigate = useNavigate();
  const [selectedPrescription, setSelectedPrescription] = React.useState<{id: string} | null>(null);
  const [takenMedications, setTakenMedications] = React.useState<string[]>([]);
  
  const patientData = {
    name: "Sarah Johnson",
    email: "sarah.johnson@example.com",
    patientId: "P-123456",
    avatar: '',
    upcomingReminders: [
      { id: '1', medication: 'Amoxicillin', dosage: '500mg', time: '8:00 AM', date: 'Today' },
      { id: '2', medication: 'Ibuprofen', dosage: '400mg', time: '12:30 PM', date: 'Today' },
      { id: '3', medication: 'Vitamin D', dosage: '1000 IU', time: '8:30 PM', date: 'Today' }
    ],
    latestPrescriptions: [
      { id: '101', doctor: 'Dr. Michael Smith', date: '2025-04-22', diagnosis: 'Bacterial Infection', medications: 2 },
      { id: '102', doctor: 'Dr. Lisa Wong', date: '2025-04-15', diagnosis: 'Seasonal Allergies', medications: 1 }
    ],
    notifications: [
      { id: 'n1', title: 'New Prescription Available', time: '2 hours ago', read: false },
      { id: 'n2', title: 'Medication Reminder: Amoxicillin', time: '4 hours ago', read: true },
      { id: 'n3', title: 'Pharmacy Credit: 50 points earned', time: '1 day ago', read: false }
    ]
  };

  const handleMarkAsTaken = (medicationId: string) => {
    setTakenMedications(prev => [...prev, medicationId]);
    toast({
      title: "Medication marked as taken",
      description: "Great job staying on top of your medications!",
    });
  };

  const handleViewPrescription = (id: string) => {
    setSelectedPrescription({id});
  };

  const handleCloseDialog = () => {
    setSelectedPrescription(null);
  };

  const handleViewNotification = (id: string) => {
    if (id === 'n1') {
      navigate('/prescriptions');
    } else if (id === 'n2') {
      navigate('/medicines');
    } else {
      navigate('/notifications');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-6 items-start">
        <Card className="w-full">
          <CardHeader className="pb-2">
            <div className="flex justify-between items-center">
              <div>
                <CardTitle>Upcoming Reminders</CardTitle>
                <CardDescription>Your next medication schedule</CardDescription>
              </div>
              <Clock className="h-5 w-5 text-blue-500" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {patientData.upcomingReminders.map(reminder => (
                <div key={reminder.id} className="flex justify-between items-center border-b pb-3 last:border-0">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                      <Calendar className="h-5 w-5 text-blue-700" />
                    </div>
                    <div>
                      <p className="font-medium">{reminder.medication} {reminder.dosage}</p>
                      <p className="text-sm text-muted-foreground">{reminder.time}, {reminder.date}</p>
                    </div>
                  </div>
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => handleMarkAsTaken(reminder.id)}
                    disabled={takenMedications.includes(reminder.id)}
                  >
                    {takenMedications.includes(reminder.id) ? 'Taken' : 'Mark as Taken'}
                  </Button>
                </div>
              ))}
            </div>
            <div className="mt-4">
              <Button variant="outline" className="w-full">View All Reminders</Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        <Card className="w-full md:w-1/2">
          <CardHeader className="pb-2">
            <div className="flex justify-between items-center">
              <div>
                <CardTitle>Latest Prescriptions</CardTitle>
                <CardDescription>Your most recent doctor prescriptions</CardDescription>
              </div>
              <FileText className="h-5 w-5 text-green-500" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {patientData.latestPrescriptions.map(prescription => (
                <div key={prescription.id} className="flex justify-between items-center border-b pb-3 last:border-0">
                  <div>
                    <p className="font-medium">{prescription.doctor}</p>
                    <p className="text-sm text-muted-foreground">
                      {new Date(prescription.date).toLocaleDateString()} • {prescription.diagnosis}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline">{prescription.medications} meds</Badge>
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => handleViewPrescription(prescription.id)}
                    >
                      View
                    </Button>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4">
              <Button variant="outline" className="w-full" asChild>
                <a href="/prescriptions">View All Prescriptions</a>
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="w-full md:w-1/2">
          <CardHeader className="pb-2">
            <div className="flex justify-between items-center">
              <div>
                <CardTitle>Notifications</CardTitle>
                <CardDescription>Your latest updates and alerts</CardDescription>
              </div>
              <Bell className="h-5 w-5 text-amber-500" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {patientData.notifications.map(notification => (
                <div key={notification.id} className="flex justify-between items-center border-b pb-3 last:border-0">
                  <div className="flex items-center gap-3">
                    <div className={`h-2 w-2 rounded-full ${notification.read ? 'bg-gray-300' : 'bg-blue-500'}`} />
                    <div>
                      <p className="font-medium">{notification.title}</p>
                      <p className="text-sm text-muted-foreground">{notification.time}</p>
                    </div>
                  </div>
                  <Button 
                    size="sm" 
                    variant="ghost"
                    onClick={() => handleViewNotification(notification.id)}
                  >
                    View
                  </Button>
                </div>
              ))}
            </div>
            <div className="mt-4">
              <Button variant="outline" className="w-full" asChild>
                <a href="/notifications">View All Notifications</a>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <Dialog open={!!selectedPrescription} onOpenChange={handleCloseDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Prescription Details</DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4">
            {selectedPrescription && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-2">
                  <div className="text-sm font-medium">Doctor:</div>
                  <div className="text-sm">
                    {patientData.latestPrescriptions.find(p => p.id === selectedPrescription.id)?.doctor}
                  </div>
                  
                  <div className="text-sm font-medium">Date:</div>
                  <div className="text-sm">
                    {new Date(patientData.latestPrescriptions.find(p => p.id === selectedPrescription.id)?.date || "").toLocaleDateString()}
                  </div>
                  
                  <div className="text-sm font-medium">Diagnosis:</div>
                  <div className="text-sm">
                    {patientData.latestPrescriptions.find(p => p.id === selectedPrescription.id)?.diagnosis}
                  </div>
                  
                  <div className="text-sm font-medium">Medications:</div>
                  <div className="text-sm">
                    {patientData.latestPrescriptions.find(p => p.id === selectedPrescription.id)?.medications} medication(s)
                  </div>
                </div>
                
                <div className="rounded-md bg-muted p-4">
                  <h4 className="text-sm font-medium mb-2">Prescription #{selectedPrescription.id}</h4>
                  <p className="text-xs text-muted-foreground">
                    This prescription contains medications prescribed for your specific condition.
                    Please follow the dosage instructions carefully.
                  </p>
                </div>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PatientDashboard;
