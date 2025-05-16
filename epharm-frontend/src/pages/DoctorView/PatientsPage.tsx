import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '@/components/Layout/DoctorComponents/DashboardLayout';
import { Search, Filter, Plus, Users, FileText, QrCode } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent } from "@/components/ui/tabs";

const PatientsPage = () => {
    const navigate = useNavigate();
    const [isAddPatientOpen, setIsAddPatientOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterGender, setFilterGender] = useState('all');
    const [selectedPatient, setSelectedPatient] = useState<string | null>(null);
    const [isPrescriptionHistoryOpen, setIsPrescriptionHistoryOpen] = useState(false);

    const patients = [
        { id: '1', name: 'Alice Johnson', gender: 'Female', birthdate: '1980-05-15', patientId: 'PAT123456', condition: 'Hypertension', lastVisit: '2025-04-09' },
        { id: '2', name: 'Robert Smith', gender: 'Male', birthdate: '1992-11-22', patientId: 'PAT234567', condition: 'Diabetes Type 2', lastVisit: '2025-04-08' },
        { id: '3', name: 'Emma Davis', gender: 'Female', birthdate: '1997-02-08', patientId: 'PAT345678', condition: 'Asthma', lastVisit: '2025-04-07' },
        { id: '4', name: 'James Wilson', gender: 'Male', birthdate: '1969-09-30', patientId: 'PAT456789', condition: 'Arthritis', lastVisit: '2025-04-05' },
        { id: '5', name: 'Olivia Brown', gender: 'Female', birthdate: '1985-07-17', patientId: 'PAT567890', condition: 'Migraine', lastVisit: '2025-04-03' },
        { id: '6', name: 'William Taylor', gender: 'Male', birthdate: '1978-12-04', patientId: 'PAT678901', condition: 'High Cholesterol', lastVisit: '2025-04-01' },
        { id: '7', name: 'Sophia Martinez', gender: 'Female', birthdate: '1990-03-25', patientId: 'PAT789012', condition: 'Anxiety', lastVisit: '2025-03-29' },
        { id: '8', name: 'Benjamin Lee', gender: 'Male', birthdate: '1982-08-12', patientId: 'PAT890123', condition: 'Back Pain', lastVisit: '2025-03-27' },
    ];

    const patientPrescriptions = {
        '1': [
            { id: 'p1', date: '2025-04-09', doctor: 'Dr. Smith', diagnosis: 'Hypertension', medications: [
                    { name: 'Lisinopril', dosage: '10mg', frequency: 'once daily', duration: '30 days' },
                    { name: 'Hydrochlorothiazide', dosage: '25mg', frequency: 'once daily', duration: '30 days' }
                ]},
            { id: 'p2', date: '2025-03-10', doctor: 'Dr. Smith', diagnosis: 'Common cold', medications: [
                    { name: 'Acetaminophen', dosage: '500mg', frequency: 'every 6 hours as needed', duration: '5 days' },
                    { name: 'Dextromethorphan', dosage: '30mg', frequency: 'every 6 hours as needed', duration: '5 days' }
                ]}
        ],
        '2': [
            { id: 'p3', date: '2025-04-08', doctor: 'Dr. Johnson', diagnosis: 'Diabetes Type 2', medications: [
                    { name: 'Metformin', dosage: '850mg', frequency: 'twice daily', duration: '90 days' }
                ]},
            { id: 'p4', date: '2025-02-15', doctor: 'Dr. Smith', diagnosis: 'Seasonal allergies', medications: [
                    { name: 'Loratadine', dosage: '10mg', frequency: 'once daily', duration: '14 days' }
                ]}
        ],
        '3': [
            { id: 'p5', date: '2025-04-07', doctor: 'Dr. Williams', diagnosis: 'Asthma exacerbation', medications: [
                    { name: 'Albuterol', dosage: '90mcg', frequency: 'every 4-6 hours as needed', duration: 'ongoing' },
                    { name: 'Prednisone', dosage: '20mg', frequency: 'once daily', duration: '5 days' }
                ]}
        ],
    };

    const filteredPatients = patients.filter(patient => {
        const matchesSearch = patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            patient.patientId.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesGender = filterGender === 'all' || patient.gender.toLowerCase() === filterGender.toLowerCase();

        return matchesSearch && matchesGender;
    });

    const calculateAge = (birthdate: string) => {
        const today = new Date();
        const birthDate = new Date(birthdate);
        let age = today.getFullYear() - birthDate.getFullYear();
        const m = today.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        return age;
    };

    const viewPatientHistory = (patientId: string) => {
        setSelectedPatient(patientId);
        setIsPrescriptionHistoryOpen(true);
    };

    const [isSearchPatientOpen, setIsSearchPatientOpen] = useState(false);
    const [searchPatientId, setSearchPatientId] = useState('');
    const [isQrScannerOpen, setIsQrScannerOpen] = useState(false);

    const handleScanComplete = (patientId: string) => {
        setSearchPatientId(patientId);
        setIsQrScannerOpen(false);
        // Here you would typically fetch patient data from your database using the ID
        // For now, we'll just close the scanner
    };

    return (
        <DashboardLayout>
            <div className="space-y-6">
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-2xl font-bold">My Patients</h1>
                        <p className="text-muted-foreground">Manage and view your patients</p>
                    </div>

                    <Button onClick={() => setIsSearchPatientOpen(true)}>
                        <Plus className="mr-2 h-4 w-4" />
                        Add Patient
                    </Button>
                </div>

                <div className="flex flex-col md:flex-row gap-4">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                        <Input
                            placeholder="Search patients by name or ID..."
                            className="pl-10"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>

                    <div className="flex gap-2">
                        <div className="w-[180px]">
                            <Select value={filterGender} onValueChange={setFilterGender}>
                                <SelectTrigger>
                                    <div className="flex items-center">
                                        <Filter className="mr-2 h-4 w-4" />
                                        <SelectValue placeholder="Gender" />
                                    </div>
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">All Genders</SelectItem>
                                    <SelectItem value="male">Male</SelectItem>
                                    <SelectItem value="female">Female</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="w-[180px]">
                            <Select>
                                <SelectTrigger>
                                    <div className="flex items-center">
                                        <Filter className="mr-2 h-4 w-4" />
                                        <SelectValue placeholder="Condition" />
                                    </div>
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">All Conditions</SelectItem>
                                    <SelectItem value="hypertension">Hypertension</SelectItem>
                                    <SelectItem value="diabetes">Diabetes</SelectItem>
                                    <SelectItem value="asthma">Asthma</SelectItem>
                                    <SelectItem value="arthritis">Arthritis</SelectItem>
                                    <SelectItem value="migraine">Migraine</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                </div>

                <Card>
                    <CardContent className="p-0">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Patient</TableHead>
                                    <TableHead>Patient ID</TableHead>
                                    <TableHead>Condition</TableHead>
                                    <TableHead>Last Visit</TableHead>
                                    <TableHead className="text-right">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {filteredPatients.map((patient) => (
                                    <TableRow key={patient.id}>
                                        <TableCell className="font-medium">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-full bg-health-light flex items-center justify-center">
                                                    <p className="font-medium text-health-primary">
                                                        {patient.name.split(' ').map(n => n[0]).join('')}
                                                    </p>
                                                </div>
                                                <div>
                                                    <p>{patient.name}</p>
                                                    <p className="text-sm text-muted-foreground">
                                                        {calculateAge(patient.birthdate)} years • {patient.gender}
                                                    </p>
                                                </div>
                                            </div>
                                        </TableCell>
                                        <TableCell>{patient.patientId}</TableCell>
                                        <TableCell>{patient.condition}</TableCell>
                                        <TableCell>{patient.lastVisit}</TableCell>
                                        <TableCell className="text-right">
                                            <div className="flex justify-end gap-2">
                                                <Button size="sm" variant="outline" onClick={() => viewPatientHistory(patient.id)}>
                                                    View History
                                                </Button>
                                                <Button size="sm" onClick={() => navigate(`/prescriptions/create?patientId=${patient.id}`)}>
                                                    <FileText className="mr-1 h-4 w-4" />
                                                    Prescribe
                                                </Button>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </div>

            <Dialog open={isSearchPatientOpen} onOpenChange={setIsSearchPatientOpen}>
                <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                        <DialogTitle>Add Patient</DialogTitle>
                        <DialogDescription>
                            Enter patient ID or scan QR code to retrieve patient information.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="patientId" className="text-right">
                                Patient ID
                            </Label>
                            <div className="col-span-3 flex gap-2">
                                <Input
                                    id="patientId"
                                    placeholder="Enter patient ID"
                                    value={searchPatientId}
                                    onChange={(e) => setSearchPatientId(e.target.value)}
                                    className="flex-1"
                                />
                                <Button variant="outline" onClick={() => setIsQrScannerOpen(true)}>
                                    <QrCode className="h-4 w-4" />
                                </Button>
                            </div>
                        </div>
                        {searchPatientId && (
                            <>
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="name" className="text-right">
                                        Full Name
                                    </Label>
                                    <Input id="name" className="col-span-3" value="Auto-filled from database" disabled />
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="birthdate" className="text-right">
                                        Birthdate
                                    </Label>
                                    <Input id="birthdate" type="date" className="col-span-3" value="2000-01-01" disabled />
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="gender" className="text-right">
                                        Gender
                                    </Label>
                                    <Input id="gender" className="col-span-3" value="Auto-filled from database" disabled />
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="address" className="text-right">
                                        Address
                                    </Label>
                                    <Input id="address" className="col-span-3" value="Auto-filled from database" disabled />
                                </div>
                            </>
                        )}
                    </div>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setIsSearchPatientOpen(false)}>
                            Cancel
                        </Button>
                        <Button type="submit" onClick={() => {
                            setIsSearchPatientOpen(false);
                        }}>
                            Add Patient
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            <Dialog open={isPrescriptionHistoryOpen} onOpenChange={setIsPrescriptionHistoryOpen}>
                <DialogContent className="sm:max-w-4xl max-h-[80vh] overflow-y-auto">
                    <DialogHeader>
                        <DialogTitle>
                            {selectedPatient && patients.find(p => p.id === selectedPatient)?.name}'s Prescription History
                        </DialogTitle>
                        <DialogDescription>
                            Complete history of prescriptions for this patient
                        </DialogDescription>
                    </DialogHeader>

                    <div className="space-y-6 py-4">
                        {selectedPatient && patientPrescriptions[selectedPatient] ? (
                            patientPrescriptions[selectedPatient].map(prescription => (
                                <Card key={prescription.id} className="border-l-4 border-l-blue-500">
                                    <CardContent className="p-4">
                                        <div className="flex justify-between mb-4">
                                            <div>
                                                <h3 className="font-medium text-lg">{prescription.diagnosis}</h3>
                                                <p className="text-sm text-muted-foreground">
                                                    {prescription.doctor} • {new Date(prescription.date).toLocaleDateString()}
                                                </p>
                                            </div>
                                            <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">
                                                {prescription.medications.length} medications
                                            </Badge>
                                        </div>

                                        <div className="mt-4">
                                            <h4 className="text-sm font-medium text-gray-500 mb-2">Medications</h4>
                                            <Table>
                                                <TableHeader>
                                                    <TableRow>
                                                        <TableHead>Medication</TableHead>
                                                        <TableHead>Dosage</TableHead>
                                                        <TableHead>Frequency</TableHead>
                                                        <TableHead>Duration</TableHead>
                                                    </TableRow>
                                                </TableHeader>
                                                <TableBody>
                                                    {prescription.medications.map((med, index) => (
                                                        <TableRow key={index}>
                                                            <TableCell>{med.name}</TableCell>
                                                            <TableCell>{med.dosage}</TableCell>
                                                            <TableCell>{med.frequency}</TableCell>
                                                            <TableCell>{med.duration}</TableCell>
                                                        </TableRow>
                                                    ))}
                                                </TableBody>
                                            </Table>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))
                        ) : (
                            <div className="text-center p-6">
                                <p className="text-muted-foreground">No prescription history found for this patient.</p>
                            </div>
                        )}
                    </div>

                    <DialogFooter>
                        <Button onClick={() => setIsPrescriptionHistoryOpen(false)}>Close</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </DashboardLayout>
    );
};

export default PatientsPage;
