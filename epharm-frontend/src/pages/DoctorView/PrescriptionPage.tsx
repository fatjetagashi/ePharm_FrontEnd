import React, { useEffect, useState } from 'react';
import DashboardLayout from '@/components/Layout/DashboardLayout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FileText, CheckCircle, Clock, X, Calendar, User, Pill } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { fetchPrescriptions, Prescription } from '@/api/prescription';

const PrescriptionsPage = () => {
    const navigate = useNavigate();

    const [prescriptions, setPrescriptions] = useState<Prescription[]>([]);
    const [expandedPrescription, setExpandedPrescription] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadPrescriptions = async () => {
            try {
                const data = await fetchPrescriptions();
                setPrescriptions(data);
            } catch (err) {
                console.error("Failed to fetch prescriptions", err);
            } finally {
                setLoading(false);
            }
        };
        loadPrescriptions();
    }, []);

    const togglePrescription = (id: string) => {
        setExpandedPrescription(prev => (prev === id ? null : id));
    };

    const filterPrescriptions = (status?: string) => {
        return status ? prescriptions.filter(p => p.status === status) : prescriptions;
    };

    if (loading) {
        return (
            <DashboardLayout>
                <div className="p-6">Loading prescriptions...</div>
            </DashboardLayout>
        );
    }

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

                    {["all", "active", "completed", "expired"].map(tab => (
                        <TabsContent value={tab} key={tab} className="mt-6">
                            <div className="space-y-4">
                                {filterPrescriptions(tab === "all" ? undefined : tab).map(prescription => (
                                    <PrescriptionCard
                                        key={prescription.id}
                                        prescription={prescription}
                                        expanded={expandedPrescription === prescription.id}
                                        onToggle={() => togglePrescription(prescription.id)}
                                    />
                                ))}
                            </div>
                        </TabsContent>
                    ))}
                </Tabs>
            </div>
        </DashboardLayout>
    );
};

interface PrescriptionCardProps {
    prescription: Prescription;
    expanded: boolean;
    onToggle: () => void;
}

const PrescriptionCard: React.FC<PrescriptionCardProps> = ({ prescription, expanded, onToggle }) => {
    const getStatusIcon = () => {
        switch (prescription.status) {
            case 'active': return <Clock className="h-5 w-5 text-blue-500" />;
            case 'completed': return <CheckCircle className="h-5 w-5 text-green-500" />;
            case 'expired': return <X className="h-5 w-5 text-red-500" />;
            default: return <FileText className="h-5 w-5 text-gray-500" />;
        }
    };

    const getStatusColor = () => {
        switch (prescription.status) {
            case 'active': return 'bg-blue-50 text-blue-700 border-blue-200';
            case 'completed': return 'bg-green-50 text-green-700 border-green-200';
            case 'expired': return 'bg-red-50 text-red-700 border-red-200';
            default: return 'bg-gray-50 text-gray-700 border-gray-200';
        }
    };

    return (
        <Card className={`border-l-4 ${
            prescription.status === 'active' ? 'border-l-blue-500' :
                prescription.status === 'completed' ? 'border-l-green-500' : 'border-l-red-500'
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
                                <p className="text-sm text-muted-foreground">
                                    {prescription.doctor} • {new Date(prescription.date).toLocaleDateString()}
                                </p>
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
                                    <p className="text-sm text-gray-500">Patient ID: N/A</p>
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
                                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Medication</th>
                                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Dosage</th>
                                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Frequency</th>
                                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Duration</th>
                                    </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                    {prescription.medications.map((med, idx) => (
                                        <tr key={idx}>
                                            <td className="px-4 py-3 text-sm">{med.name}</td>
                                            <td className="px-4 py-3 text-sm">{med.dosage}</td>
                                            <td className="px-4 py-3 text-sm">{med.frequency}</td>
                                            <td className="px-4 py-3 text-sm">{med.duration}</td>
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
