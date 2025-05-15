
import React, { useState } from 'react';
import DashboardLayout from '@/components/Layout/DashboardLayout';
import { Calendar, Clock, User, FileText, Search, Filter } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';

const AppointmentsPage = () => {
    const [isNewAppointmentOpen, setIsNewAppointmentOpen] = useState(false);
    const { toast } = useToast();

    // Mock appointment data
    const appointments = [
        { id: 1, patientName: "Michael Brown", time: "09:00 AM", date: "2025-04-25", status: "Completed", notes: "Follow-up checkup" },
        { id: 2, patientName: "Sarah Garcia", time: "10:30 AM", date: "2025-04-25", status: "Completed", notes: "Initial consultation" },
        { id: 3, patientName: "David Lee", time: "01:00 PM", date: "2025-04-25", status: "Upcoming", notes: "Prescription review" },
        { id: 4, patientName: "Lisa Taylor", time: "03:30 PM", date: "2025-04-25", status: "Upcoming", notes: "Regular checkup" },
        { id: 5, patientName: "Robert Johnson", time: "09:30 AM", date: "2025-04-26", status: "Scheduled", notes: "Follow-up on medication" },
        { id: 6, patientName: "Jennifer Wilson", time: "11:00 AM", date: "2025-04-26", status: "Scheduled", notes: "Test results review" },
    ];

    // Group appointments by date
    const appointmentsByDate = appointments.reduce((acc, appointment) => {
        if (!acc[appointment.date]) {
            acc[appointment.date] = [];
        }
        acc[appointment.date].push(appointment);
        return acc;
    }, {});

    const dates = Object.keys(appointmentsByDate).sort();

    const handleCreateAppointment = () => {
        toast({
            title: "Appointment Created",
            description: "The appointment has been scheduled successfully.",
        });
        setIsNewAppointmentOpen(false);
    };

    return (
        <DashboardLayout>
            <div className="space-y-6">
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-2xl font-bold">Appointments</h1>
                        <p className="text-muted-foreground">Manage your appointments and schedule</p>
                    </div>
                    <Button onClick={() => setIsNewAppointmentOpen(true)}>
                        <Calendar className="mr-2 h-4 w-4" />
                        New Appointment
                    </Button>
                </div>

                <Tabs defaultValue="upcoming">
                    <TabsList>
                        <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
                        <TabsTrigger value="past">Past</TabsTrigger>
                        <TabsTrigger value="all">All</TabsTrigger>
                    </TabsList>

                    <TabsContent value="upcoming" className="mt-6 space-y-6">
                        {dates.map((date) => (
                            <div key={date} className="space-y-4">
                                <h2 className="text-lg font-medium">{new Date(date).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}</h2>

                                <Card>
                                    <CardContent className="p-0">
                                        {appointmentsByDate[date]
                                            .filter(app => app.status === "Upcoming" || app.status === "Scheduled")
                                            .map((appointment) => (
                                                <div key={appointment.id}
                                                     className="flex items-center justify-between p-4 border-b last:border-0 hover:bg-gray-50">
                                                    <div className="flex items-center gap-4">
                                                        <div className="w-10 h-10 rounded-full bg-health-light flex items-center justify-center">
                                                            <User className="h-5 w-5 text-health-primary" />
                                                        </div>
                                                        <div>
                                                            <p className="font-medium">{appointment.patientName}</p>
                                                            <div className="flex items-center text-sm text-muted-foreground">
                                                                <Clock className="mr-1 h-3 w-3" />
                                                                <span>{appointment.time}</span>
                                                                <span className="mx-1">•</span>
                                                                <span>{appointment.notes}</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="flex items-center gap-2">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                appointment.status === "Upcoming" ? "bg-blue-100 text-blue-800" :
                                    appointment.status === "Scheduled" ? "bg-purple-100 text-purple-800" :
                                        "bg-gray-100 text-gray-800"
                            }`}>
                              {appointment.status}
                            </span>
                                                    </div>
                                                </div>
                                            ))}
                                    </CardContent>
                                </Card>
                            </div>
                        ))}
                    </TabsContent>

                    <TabsContent value="past" className="mt-6 space-y-6">
                        {dates.map((date) => (
                            <div key={date} className="space-y-4">
                                <h2 className="text-lg font-medium">{new Date(date).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}</h2>

                                <Card>
                                    <CardContent className="p-0">
                                        {appointmentsByDate[date]
                                            .filter(app => app.status === "Completed")
                                            .map((appointment) => (
                                                <div key={appointment.id}
                                                     className="flex items-center justify-between p-4 border-b last:border-0 hover:bg-gray-50">
                                                    <div className="flex items-center gap-4">
                                                        <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                                                            <User className="h-5 w-5 text-gray-500" />
                                                        </div>
                                                        <div>
                                                            <p className="font-medium">{appointment.patientName}</p>
                                                            <div className="flex items-center text-sm text-muted-foreground">
                                                                <Clock className="mr-1 h-3 w-3" />
                                                                <span>{appointment.time}</span>
                                                                <span className="mx-1">•</span>
                                                                <span>{appointment.notes}</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="flex items-center gap-2">
                            <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">
                              Completed
                            </span>
                                                    </div>
                                                </div>
                                            ))}
                                    </CardContent>
                                </Card>
                            </div>
                        ))}
                    </TabsContent>

                    <TabsContent value="all" className="mt-6 space-y-6">
                        {dates.map((date) => (
                            <div key={date} className="space-y-4">
                                <h2 className="text-lg font-medium">{new Date(date).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}</h2>

                                <Card>
                                    <CardContent className="p-0">
                                        {appointmentsByDate[date].map((appointment) => (
                                            <div key={appointment.id}
                                                 className="flex items-center justify-between p-4 border-b last:border-0 hover:bg-gray-50">
                                                <div className="flex items-center gap-4">
                                                    <div className={`w-10 h-10 rounded-full ${
                                                        appointment.status === "Completed" ? "bg-gray-100" : "bg-health-light"
                                                    } flex items-center justify-center`}>
                                                        <User className={`h-5 w-5 ${
                                                            appointment.status === "Completed" ? "text-gray-500" : "text-health-primary"
                                                        }`} />
                                                    </div>
                                                    <div>
                                                        <p className="font-medium">{appointment.patientName}</p>
                                                        <div className="flex items-center text-sm text-muted-foreground">
                                                            <Clock className="mr-1 h-3 w-3" />
                                                            <span>{appointment.time}</span>
                                                            <span className="mx-1">•</span>
                                                            <span>{appointment.notes}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="flex items-center gap-2">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                              appointment.status === "Upcoming" ? "bg-blue-100 text-blue-800" :
                                  appointment.status === "Scheduled" ? "bg-purple-100 text-purple-800" :
                                      appointment.status === "Completed" ? "bg-green-100 text-green-800" :
                                          "bg-gray-100 text-gray-800"
                          }`}>
                            {appointment.status}
                          </span>
                                                </div>
                                            </div>
                                        ))}
                                    </CardContent>
                                </Card>
                            </div>
                        ))}
                    </TabsContent>
                </Tabs>
            </div>

            {/* New Appointment Dialog */}
            <Dialog open={isNewAppointmentOpen} onOpenChange={setIsNewAppointmentOpen}>
                <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                        <DialogTitle>Schedule New Appointment</DialogTitle>
                        <DialogDescription>
                            Enter appointment details to schedule a new appointment.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="patient" className="text-right">
                                Patient
                            </Label>
                            <Select>
                                <SelectTrigger id="patient" className="col-span-3">
                                    <SelectValue placeholder="Select patient" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="p1">Michael Brown</SelectItem>
                                    <SelectItem value="p2">Sarah Garcia</SelectItem>
                                    <SelectItem value="p3">David Lee</SelectItem>
                                    <SelectItem value="p4">Lisa Taylor</SelectItem>
                                    <SelectItem value="p5">Robert Johnson</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="date" className="text-right">
                                Date
                            </Label>
                            <Input id="date" type="date" className="col-span-3" />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="time" className="text-right">
                                Time
                            </Label>
                            <Input id="time" type="time" className="col-span-3" />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="type" className="text-right">
                                Type
                            </Label>
                            <Select>
                                <SelectTrigger id="type" className="col-span-3">
                                    <SelectValue placeholder="Select appointment type" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="consultation">Initial Consultation</SelectItem>
                                    <SelectItem value="followup">Follow-up</SelectItem>
                                    <SelectItem value="checkup">Regular Check-up</SelectItem>
                                    <SelectItem value="prescription">Prescription Review</SelectItem>
                                    <SelectItem value="test">Test Results</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="notes" className="text-right">
                                Notes
                            </Label>
                            <Input id="notes" placeholder="Additional notes" className="col-span-3" />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setIsNewAppointmentOpen(false)}>
                            Cancel
                        </Button>
                        <Button type="submit" onClick={handleCreateAppointment}>
                            Schedule Appointment
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </DashboardLayout>
    );
};

export default AppointmentsPage;
