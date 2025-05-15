import React, { useEffect, useState } from 'react';
import DashboardLayout from '@/components/Layout/DashboardLayout';
import { Calendar, Clock, User } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { getAppointments } from '@/api/Doctor/appointments';

const AppointmentsPage = () => {
    const [isNewAppointmentOpen, setIsNewAppointmentOpen] = useState(false);
    const [appointments, setAppointments] = useState([]);
    const [form, setForm] = useState({
        patient: '',
        date: '',
        time: '',
        type: '',
        notes: '',
    });

    const { toast } = useToast();

    useEffect(() => {
        const fetchAppointments = async () => {
            try {
                const data = await getAppointments();
                setAppointments(data);
            } catch (error) {
                console.error("Failed to fetch appointments", error);
                toast({
                    title: "Error",
                    description: "Could not load appointments.",
                    variant: "destructive",
                });
            }
        };
        fetchAppointments();
    }, []);

    const appointmentsByDate = appointments.reduce((acc, appointment) => {
        if (!acc[appointment.appointment_date]) {
            acc[appointment.appointment_date] = [];
        }
        acc[appointment.appointment_date].push(appointment);
        return acc;
    }, {});

    const dates = Object.keys(appointmentsByDate).sort();

    const handleCreateAppointment = () => {
        console.log("Form Data:", form);
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
                                                <div key={appointment.id} className="flex items-center justify-between p-4 border-b last:border-0 hover:bg-gray-50">
                                                    <div className="flex items-center gap-4">
                                                        <div className="w-10 h-10 rounded-full bg-health-light flex items-center justify-center">
                                                            <User className="h-5 w-5 text-health-primary" />
                                                        </div>
                                                        <div>
                                                            <p className="font-medium">{appointment.patient_name}</p>
                                                            <div className="flex items-center text-sm text-muted-foreground">
                                                                <Clock className="mr-1 h-3 w-3" />
                                                                <span>{appointment.time}</span>
                                                                <span className="mx-1">•</span>
                                                                <span>{appointment.description}</span>
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
                </Tabs>
            </div>

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
                            <Label htmlFor="patient" className="text-right">Patient</Label>
                            <Select onValueChange={(value) => setForm(prev => ({ ...prev, patient: value }))}>
                                <SelectTrigger id="patient" className="col-span-3">
                                    <SelectValue placeholder="Select patient" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="Michael Brown">Michael Brown</SelectItem>
                                    <SelectItem value="Sarah Garcia">Sarah Garcia</SelectItem>
                                    <SelectItem value="David Lee">David Lee</SelectItem>
                                    <SelectItem value="Lisa Taylor">Lisa Taylor</SelectItem>
                                    <SelectItem value="Robert Johnson">Robert Johnson</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="date" className="text-right">Date</Label>
                            <Input id="date" type="date" className="col-span-3" onChange={(e) => setForm(prev => ({ ...prev, date: e.target.value }))} />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="time" className="text-right">Time</Label>
                            <Input id="time" type="time" className="col-span-3" onChange={(e) => setForm(prev => ({ ...prev, time: e.target.value }))} />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="type" className="text-right">Type</Label>
                            <Select onValueChange={(value) => setForm(prev => ({ ...prev, type: value }))}>
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
                            <Label htmlFor="notes" className="text-right">Notes</Label>
                            <Input id="notes" placeholder="Additional notes" className="col-span-3" onChange={(e) => setForm(prev => ({ ...prev, notes: e.target.value }))} />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setIsNewAppointmentOpen(false)}>Cancel</Button>
                        <Button type="submit" onClick={handleCreateAppointment}>Schedule Appointment</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </DashboardLayout>
    );
};

export default AppointmentsPage;
