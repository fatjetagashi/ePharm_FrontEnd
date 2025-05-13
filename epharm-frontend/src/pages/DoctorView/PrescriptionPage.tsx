
import React from 'react';
import DashboardLayout from '@/components/Layout/DashboardLayout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FileText, CheckCircle, Clock, X, Calendar, User, Pill } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const PrescriptionsPage = () => {
    const navigate = useNavigate();

    // Mock prescription data with more details
    const prescriptions = [
        {
            id: '1',
            patient: 'Alice Johnson',
            doctor: 'Dr. Smith',
            date: '2025-04-10',
            status: 'active',
            medications: [
                { name: 'Amoxicillin', dosage: '500mg', frequency: '3 times daily', duration: '7 days' },
                { name: 'Ibuprofen', dosage: '400mg', frequency: 'as needed', duration: '5 days' },
                { name: 'Loratadine', dosage: '10mg', frequency: 'once daily', duration: '14 days' }
            ],
            diagnosis: 'Acute sinusitis',
            notes: 'Take with food. Avoid alcohol.'
        },
        {
            id: '2',
            patient: 'Robert Brown',
            doctor: 'Dr. Smith',
            date: '2025-04-05',
            status: 'active',
            medications: [
                { name: 'Metformin', dosage: '850mg', frequency: 'twice daily', duration: '30 days' },
                { name: 'Lisinopril', dosage: '10mg', frequency: 'once daily', duration: '30 days' }
            ],
            diagnosis: 'Type 2 Diabetes, Hypertension',
            notes: 'Monitor blood glucose levels daily.'
        },
        {
            id: '3',
            patient: 'Emma Davis',
            doctor: 'Dr. Johnson',
            date: '2025-04-02',
            status: 'completed',
            medications: [
                { name: 'Fluticasone', dosage: '50mcg', frequency: 'twice daily', duration: '14 days' }
            ],
            diagnosis: 'Allergic rhinitis',
            notes: 'Review in two weeks if symptoms persist.'
        },
        {
            id: '4',
            patient: 'James Wilson',
            doctor: 'Dr. Williams',
            date: '2025-03-25',
            status: 'expired',
            medications: [
                { name: 'Amoxicillin', dosage: '500mg', frequency: '3 times daily', duration: '10 days' },
                { name: 'Codeine', dosage: '15mg', frequency: 'every 6 hours as needed', duration: '5 days' },
                { name: 'Acetaminophen', dosage: '500mg', frequency: 'every 6 hours as needed', duration: '5 days' },
                { name: 'Guaifenesin', dosage: '600mg', frequency: 'every 12 hours', duration: '10 days' }
            ],
            diagnosis: 'Acute bronchitis',
            notes: 'Rest, increased fluid intake.'
        },
    ];

    // Filter prescriptions by status
    const activePrescriptions = prescriptions.filter(p => p.status === 'active');
    const completedPrescriptions = prescriptions.filter(p => p.status === 'completed');
    const expiredPrescriptions = prescriptions.filter(p => p.status === 'expired');

    const [expandedPrescription, setExpandedPrescription] = React.useState<string | null>(null);

    const togglePrescription = (id: string) => {
        if (expandedPrescription === id) {
            setExpandedPrescription(null);
        } else {
            setExpandedPrescription(id);
        }
    };

    return (
        <DashboardLayout>
            <div className="space-y-6">
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-2xl font-bold">Prescriptions</h1>
                        <p className="text-muted-foreground">View and manage patient prescription history</p>
                    </div>
                    <Button onClick={() => navigate("/prescriptions/create")}>
                        <FileText className="mr-2 h-4 w-4" />
                        Write Prescription
                    </Button>
                </div>

                <Tabs defaultValue="all">
                    <TabsList>
                        <TabsTrigger value="all">All</TabsTrigger>
                        <TabsTrigger value="active">Active</TabsTrigger>
                        <TabsTrigger value="completed">Completed</TabsTrigger>
                        <TabsTrigger value="expired">Expired</TabsTrigger>
                    </TabsList>

                    <TabsContent value="all" className="mt-6">
                        <div className="space-y-4">
                            {prescriptions.map(prescription => (
                                <PrescriptionCard
                                    key={prescription.id}
                                    prescription={prescription}
                                    expanded={expandedPrescription === prescription.id}
                                    onToggle={() => togglePrescription(prescription.id)}
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
                                    expanded={expandedPrescription === prescription.id}
                                    onToggle={() => togglePrescription(prescription.id)}
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
                                    expanded={expandedPrescription === prescription.id}
                                    onToggle={() => togglePrescription(prescription.id)}
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
                                    expanded={expandedPrescription === prescription.id}
                                    onToggle={() => togglePrescription(prescription.id)}
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
        status: string;
        medications: {
            name: string;
            dosage: string;
            frequency: string;
            duration: string;
        }[];
        diagnosis: string;
        notes: string;
    };
    expanded: boolean;
    onToggle: () => void;
}

const PrescriptionCard: React.FC<PrescriptionCardProps> = ({ prescription, expanded, onToggle }) => {
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
            <CardContent className="p-0">
                <div className="p-6 cursor-pointer" onClick={onToggle}>
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
                            <span className="text-sm font-medium">{prescription.medications.length} medications</span>
                            <Button size="sm" variant={expanded ? "default" : "outline"}>
                                {expanded ? "Hide Details" : "View Details"}
                            </Button>
                        </div>
                    </div>
                </div>

                {expanded && (
                    <div className="border-t p-6 bg-gray-50">
                        <div className="grid md:grid-cols-2 gap-6">
                            <div>
                                <h4 className="font-medium text-sm text-gray-500 mb-2 flex items-center">
                                    <User className="h-4 w-4 mr-1" />
                                    Patient Information
                                </h4>
                                <div className="bg-white p-4 rounded-md border">
                                    <p className="font-medium">{prescription.patient}</p>
                                    <p className="text-sm text-gray-500">Patient ID: P-{Math.floor(Math.random() * 10000)}</p>
                                </div>
                            </div>

                            <div>
                                <h4 className="font-medium text-sm text-gray-500 mb-2 flex items-center">
                                    <Calendar className="h-4 w-4 mr-1" />
                                    Prescription Details
                                </h4>
                                <div className="bg-white p-4 rounded-md border">
                                    <p><span className="font-medium">Date:</span> {new Date(prescription.date).toLocaleDateString()}</p>
                                    <p><span className="font-medium">Prescribed by:</span> {prescription.doctor}</p>
                                    <p><span className="font-medium">Diagnosis:</span> {prescription.diagnosis}</p>
                                </div>
                            </div>
                        </div>

                        <div className="mt-6">
                            <h4 className="font-medium text-sm text-gray-500 mb-2 flex items-center">
                                <Pill className="h-4 w-4 mr-1" />
                                Medications
                            </h4>
                            <div className="bg-white rounded-md border overflow-hidden">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                    <tr>
                                        <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Medication
                                        </th>
                                        <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Dosage
                                        </th>
                                        <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Frequency
                                        </th>
                                        <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Duration
                                        </th>
                                    </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                    {prescription.medications.map((med, index) => (
                                        <tr key={index} className="hover:bg-gray-50">
                                            <td className="px-4 py-3 whitespace-nowrap text-sm font-medium">
                                                {med.name}
                                            </td>
                                            <td className="px-4 py-3 whitespace-nowrap text-sm">
                                                {med.dosage}
                                            </td>
                                            <td className="px-4 py-3 whitespace-nowrap text-sm">
                                                {med.frequency}
                                            </td>
                                            <td className="px-4 py-3 whitespace-nowrap text-sm">
                                                {med.duration}
                                            </td>
                                        </tr>
                                    ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        {prescription.notes && (
                            <div className="mt-6">
                                <h4 className="font-medium text-sm text-gray-500 mb-2">Notes</h4>
                                <div className="bg-white p-4 rounded-md border">
                                    <p className="text-sm">{prescription.notes}</p>
                                </div>
                            </div>
                        )}

                        <div className="mt-6 flex justify-end gap-3">
                            <Button variant="outline">
                                <FileText className="h-4 w-4 mr-1" />
                                Print
                            </Button>
                            <Button>
                                <FileText className="h-4 w-4 mr-1" />
                                Renew Prescription
                            </Button>
                        </div>
                    </div>
                )}
            </CardContent>
        </Card>
    );
};

export default PrescriptionsPage;
