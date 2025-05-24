
import React, { useState } from 'react';
import DashboardLayout from '@/components/Layout/PharmacyComponents/DashboardLayout';
import { FileText, Filter, Search, Clock } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
// import PrescriptionList from '@/components/Prescription/PrescriptionList';
import { Prescription } from '@/types';

// Mock data for prescriptions
const mockPrescriptions: Prescription[] = [
  {
    id: '1',
    tenant_id: '1',
    doctor_id: '1',
    patient_id: '1',
    diagnosis: 'Bacterial infection',
    notes: 'Take with food',
    is_sent_to_patient: true,
    created_at: '2025-04-25T10:30:00.000Z',
    doctor: {
      id: '1',
      user: {
        id: '1',
        name: 'Dr. Michael Smith',
        email: 'dr.smith@example.com',
        username: 'drsmith',
        phone: '555-123-4567',
        user_type: 'doctor',
        tenant_id: '1',
        created_at: '2024-01-01T00:00:00.000Z',
        updated_at: '2024-01-01T00:00:00.000Z',
      }
    },
    patient: {
      id: '1',
      user: {
        id: '2',
        name: 'Alice Johnson',
        email: 'alice@example.com',
        username: 'alicejohnson',
        phone: '555-987-6543',
        user_type: 'patient',
        tenant_id: '1',
        created_at: '2024-01-02T00:00:00.000Z',
        updated_at: '2024-01-02T00:00:00.000Z',
      }
    },
    items: [
      {
        id: '101',
        prescription_id: '1',
        medication_name: 'Amoxicillin',
        dosage: '500mg',
        capsule_count: 21,
        frequency_per_day: 3,
        intake_times: 'With meals',
        duration_days: 7,
      }
    ],
    delivery: {
      id: '201',
      prescription_id: '1',
      pharmacy_id: '1',
      delivery_type: 'take-out',
      status: 'pending',
      discount_applied: 0,
    }
  },
  {
    id: '2',
    tenant_id: '1',
    doctor_id: '2',
    patient_id: '3',
    diagnosis: 'Hypertension',
    notes: 'Monitor blood pressure regularly',
    is_sent_to_patient: true,
    created_at: '2025-04-24T14:15:00.000Z',
    doctor: {
      id: '2',
      user: {
        id: '3',
        name: 'Dr. Lisa Wong',
        email: 'dr.wong@example.com',
        username: 'drwong',
        phone: '555-222-3333',
        user_type: 'doctor',
        tenant_id: '1',
        created_at: '2024-01-01T00:00:00.000Z',
        updated_at: '2024-01-01T00:00:00.000Z',
      }
    },
    patient: {
      id: '3',
      user: {
        id: '4',
        name: 'Robert Smith',
        email: 'robert@example.com',
        username: 'robertsmith',
        phone: '555-444-5555',
        user_type: 'patient',
        tenant_id: '1',
        created_at: '2024-01-03T00:00:00.000Z',
        updated_at: '2024-01-03T00:00:00.000Z',
      }
    },
    items: [
      {
        id: '102',
        prescription_id: '2',
        medication_name: 'Lisinopril',
        dosage: '10mg',
        capsule_count: 30,
        frequency_per_day: 1,
        intake_times: 'Morning',
        duration_days: 30,
      }
    ],
    delivery: {
      id: '202',
      prescription_id: '2',
      pharmacy_id: '1',
      delivery_type: 'online_fast',
      status: 'processing',
      discount_applied: 5,
    }
  },
  {
    id: '3',
    tenant_id: '1',
    doctor_id: '1',
    patient_id: '4',
    diagnosis: 'Seasonal allergies',
    notes: 'Take as needed for symptoms',
    is_sent_to_patient: true,
    created_at: '2025-04-23T09:45:00.000Z',
    doctor: {
      id: '1',
      user: {
        id: '1',
        name: 'Dr. Michael Smith',
        email: 'dr.smith@example.com',
        username: 'drsmith',
        phone: '555-123-4567',
        user_type: 'doctor',
        tenant_id: '1',
        created_at: '2024-01-01T00:00:00.000Z',
        updated_at: '2024-01-01T00:00:00.000Z',
      }
    },
    patient: {
      id: '4',
      user: {
        id: '5',
        name: 'Emma Davis',
        email: 'emma@example.com',
        username: 'emmadavis',
        phone: '555-666-7777',
        user_type: 'patient',
        tenant_id: '1',
        created_at: '2024-01-04T00:00:00.000Z',
        updated_at: '2024-01-04T00:00:00.000Z',
      }
    },
    items: [
      {
        id: '103',
        prescription_id: '3',
        medication_name: 'Cetirizine',
        dosage: '10mg',
        capsule_count: 14,
        frequency_per_day: 1,
        intake_times: 'Evening',
        duration_days: 14,
      }
    ],
    delivery: {
      id: '203',
      prescription_id: '3',
      pharmacy_id: '1',
      delivery_type: 'take-out',
      status: 'ready',
      discount_applied: 0,
    }
  },
  {
    id: '4',
    tenant_id: '1',
    doctor_id: '2',
    patient_id: '1',
    diagnosis: 'Acid reflux',
    notes: 'Take 30 minutes before meals',
    is_sent_to_patient: true,
    created_at: '2025-04-22T16:30:00.000Z',
    doctor: {
      id: '2',
      user: {
        id: '3',
        name: 'Dr. Lisa Wong',
        email: 'dr.wong@example.com',
        username: 'drwong',
        phone: '555-222-3333',
        user_type: 'doctor',
        tenant_id: '1',
        created_at: '2024-01-01T00:00:00.000Z',
        updated_at: '2024-01-01T00:00:00.000Z',
      }
    },
    patient: {
      id: '1',
      user: {
        id: '2',
        name: 'Alice Johnson',
        email: 'alice@example.com',
        username: 'alicejohnson',
        phone: '555-987-6543',
        user_type: 'patient',
        tenant_id: '1',
        created_at: '2024-01-02T00:00:00.000Z',
        updated_at: '2024-01-02T00:00:00.000Z',
      }
    },
    items: [
      {
        id: '104',
        prescription_id: '4',
        medication_name: 'Omeprazole',
        dosage: '20mg',
        capsule_count: 28,
        frequency_per_day: 1,
        intake_times: 'Before breakfast',
        duration_days: 28,
      }
    ],
    delivery: {
      id: '204',
      prescription_id: '4',
      pharmacy_id: '1',
      delivery_type: 'online_general',
      status: 'delivered',
      discount_applied: 10,
      delivered_at: '2025-04-23T14:00:00.000Z',
    }
  }
];

const PrescriptionsPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [prescriptions, setPrescriptions] = useState<Prescription[]>(mockPrescriptions);

  const handleStatusChange = (prescriptionId: string, newStatus: 'pending' | 'processing' | 'ready' | 'delivered' | 'cancelled') => {
    setPrescriptions(prescriptions.map(prescription => {
      if (prescription.id === prescriptionId && prescription.delivery) {
        return {
          ...prescription,
          delivery: {
            ...prescription.delivery,
            status: newStatus,
            ...(newStatus === 'delivered' ? { delivered_at: new Date().toISOString() } : {})
          }
        };
      }
      return prescription;
    }));
  };

  const filteredPrescriptions = prescriptions.filter((prescription) => {
    // Apply search filter
    const patientName = prescription.patient?.user.name.toLowerCase() || '';
    const doctorName = prescription.doctor?.user.name.toLowerCase() || '';
    const medications = prescription.items?.map(i => i.medication_name.toLowerCase()).join(' ') || '';

    const matchesSearch =
      patientName.includes(searchQuery.toLowerCase()) ||
      doctorName.includes(searchQuery.toLowerCase()) ||
      medications.includes(searchQuery.toLowerCase());

    // Apply status filter
    const matchesStatus = statusFilter === 'all' || (prescription.delivery && prescription.delivery.status === statusFilter);

    return matchesSearch && matchesStatus;
  });

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold flex items-center gap-2">
              <FileText className="h-6 w-6 text-pharmacy-primary" />
              Prescriptions
            </h1>
            <p className="text-muted-foreground">
              Manage and process patient prescriptions
            </p>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search prescriptions by patient, doctor or medication..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-muted-foreground" />
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="processing">Processing</SelectItem>
                <SelectItem value="ready">Ready</SelectItem>
                <SelectItem value="delivered">Delivered</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <Tabs defaultValue="active">
          <TabsList>
            <TabsTrigger value="active">Active</TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
            <TabsTrigger value="all">All</TabsTrigger>
          </TabsList>

          <TabsContent value="active" className="mt-6">
            {/* <PrescriptionList
              prescriptions={filteredPrescriptions.filter(p =>
                p.delivery?.status !== 'delivered' && p.delivery?.status !== 'cancelled'
              )}
              onStatusChange={handleStatusChange}
            /> */}
          </TabsContent>

          <TabsContent value="completed" className="mt-6">
            {/* <PrescriptionList
              prescriptions={filteredPrescriptions.filter(p =>
                p.delivery?.status === 'delivered' || p.delivery?.status === 'cancelled'
              )}
              onStatusChange={handleStatusChange}
            /> */}
          </TabsContent>

          <TabsContent value="all" className="mt-6">
            <PrescriptionList
              prescriptions={filteredPrescriptions}
              onStatusChange={handleStatusChange}
            />
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default PrescriptionsPage;