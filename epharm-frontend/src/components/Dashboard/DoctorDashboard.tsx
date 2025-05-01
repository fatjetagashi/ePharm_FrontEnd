
import React from 'react';
import { Users, FileText, Clock, Calendar, Clipboard, Activity } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const DoctorDashboard = () => {
  // Mock data
  const stats = {
    totalPatients: 124,
    activePrescriptions: 38,
    pendingReviews: 7,
    appointmentsToday: 8,
  };

  // Mock patient data
  const recentPatients = [
    { id: 1, name: "Alice Johnson", age: 45, lastVisit: "2025-04-09", condition: "Hypertension" },
    { id: 2, name: "Robert Smith", age: 32, lastVisit: "2025-04-08", condition: "Diabetes Type 2" },
    { id: 3, name: "Emma Davis", age: 28, lastVisit: "2025-04-07", condition: "Asthma" },
    { id: 4, name: "James Wilson", age: 56, lastVisit: "2025-04-05", condition: "Arthritis" },
  ];

  // Mock appointment data
  const todayAppointments = [
    { id: 1, name: "Michael Brown", time: "09:00 AM", status: "Completed" },
    { id: 2, name: "Sarah Garcia", time: "10:30 AM", status: "Completed" },
    { id: 3, name: "David Lee", time: "01:00 PM", status: "Upcoming" },
    { id: 4, name: "Lisa Taylor", time: "03:30 PM", status: "Upcoming" },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Doctor Dashboard</h1>
        <p className="text-muted-foreground">Welcome back, Dr. Johnson!</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Patients</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalPatients}</div>
            <p className="text-xs text-muted-foreground">
              +8 from last month
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Prescriptions</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.activePrescriptions}</div>
            <p className="text-xs text-muted-foreground">
              12 expire this week
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Reviews</CardTitle>
            <Clipboard className="h-4 w-4 text-warning" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.pendingReviews}</div>
            <p className="text-xs text-muted-foreground">
              Needs your attention
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Today's Appointments</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.appointmentsToday}</div>
            <p className="text-xs text-muted-foreground">
              Next at 1:00 PM
            </p>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Your Patients</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentPatients.map((patient) => (
                <div key={patient.id} className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-health-light rounded-full flex items-center justify-center">
                    <p className="font-medium text-health-primary">
                      {patient.name.split(' ').map(n => n[0]).join('')}
                    </p>
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">{patient.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {patient.age} years • {patient.condition}
                    </p>
                  </div>
                  <div>
                    <Button variant="outline" size="sm">View</Button>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4">
              <Button variant="outline" className="w-full">View All Patients</Button>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Today's Schedule</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {todayAppointments.map((appointment) => (
                <div key={appointment.id} className="flex items-center gap-3">
                  <div className="w-2 h-full">
                    <div className={`w-2 h-2 rounded-full ${
                      appointment.status === "Completed" ? "bg-gray-300" : "bg-health-primary"
                    }`}></div>
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">{appointment.name}</p>
                    <div className="flex items-center text-sm text-muted-foreground gap-2">
                      <Clock className="h-3 w-3" />
                      <span>{appointment.time}</span>
                    </div>
                  </div>
                  <div>
                    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                      appointment.status === "Completed" 
                        ? "bg-gray-100 text-gray-800" 
                        : "bg-blue-100 text-blue-800"
                    }`}>
                      {appointment.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4">
              <Button variant="outline" className="w-full">Full Schedule</Button>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button className="h-auto py-4 flex flex-col items-center gap-2">
              <FileText className="h-5 w-5" />
              <span>New Prescription</span>
            </Button>
            <Button variant="outline" className="h-auto py-4 flex flex-col items-center gap-2">
              <Users className="h-5 w-5" />
              <span>Add Patient</span>
            </Button>
            <Button variant="outline" className="h-auto py-4 flex flex-col items-center gap-2">
              <Calendar className="h-5 w-5" />
              <span>Schedule</span>
            </Button>
            <Button variant="outline" className="h-auto py-4 flex flex-col items-center gap-2">
              <Activity className="h-5 w-5" />
              <span>Reports</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DoctorDashboard;
