
import React, { useState } from 'react';
import DashboardLayout from '@/components/Layout/PharmacyComponents/DashboardLayout';
import { Users, Search, Filter } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import PatientList from '@/components/Patient/PatientList';
import { Patient, User, PharmacyCredit } from '@/types';

// Mock data for patients
const mockUsers: User[] = [
  {
    id: '1',
    name: 'Alice Johnson',
    email: 'alice@example.com',
    username: 'alice',
    phone: '555-123-4567',
    user_type: 'patient',
    tenant_id: '1',
    created_at: '2024-01-10T00:00:00.000Z',
    updated_at: '2024-01-10T00:00:00.000Z',
  },
  {
    id: '2',
    name: 'Robert Smith',
    email: 'robert@example.com',
    username: 'robert',
    phone: '555-234-5678',
    user_type: 'patient',
    tenant_id: '1',
    created_at: '2024-01-15T00:00:00.000Z',
    updated_at: '2024-01-15T00:00:00.000Z',
  },
  {
    id: '3',
    name: 'Emma Davis',
    email: 'emma@example.com',
    username: 'emma',
    phone: '555-345-6789',
    user_type: 'patient',
    tenant_id: '1',
    created_at: '2024-01-20T00:00:00.000Z',
    updated_at: '2024-01-20T00:00:00.000Z',
  },
  {
    id: '4',
    name: 'James Wilson',
    email: 'james@example.com',
    username: 'james',
    phone: '555-456-7890',
    user_type: 'patient',
    tenant_id: '1',
    created_at: '2024-01-25T00:00:00.000Z',
    updated_at: '2024-01-25T00:00:00.000Z',
  },
  {
    id: '5',
    name: 'Sophia Martinez',
    email: 'sophia@example.com',
    username: 'sophia',
    phone: '555-567-8901',
    user_type: 'patient',
    tenant_id: '1',
    created_at: '2024-02-01T00:00:00.000Z',
    updated_at: '2024-02-01T00:00:00.000Z',
  }
];

const mockPatients: Patient[] = [
  {
    id: '1',
    user_id: '1',
    license_number: 'PAT12345',
    birthdate: '1985-05-15',
    gender: 'Female',
    address: '123 Main St, Anytown, AT 12345',
    created_at: '2024-01-10T00:00:00.000Z',
    user: mockUsers[0],
  },
  {
    id: '2',
    user_id: '2',
    license_number: 'PAT23456',
    birthdate: '1978-08-22',
    gender: 'Male',
    address: '456 Oak Ave, Somecity, SC 23456',
    created_at: '2024-01-15T00:00:00.000Z',
    user: mockUsers[1],
  },
  {
    id: '3',
    user_id: '3',
    license_number: 'PAT34567',
    birthdate: '1990-03-10',
    gender: 'Female',
    address: '789 Pine Rd, Othertown, OT 34567',
    created_at: '2024-01-20T00:00:00.000Z',
    user: mockUsers[2],
  },
  {
    id: '4',
    user_id: '4',
    license_number: 'PAT45678',
    birthdate: '1965-11-30',
    gender: 'Male',
    address: '101 Cedar Ln, Newcity, NC 45678',
    created_at: '2024-01-25T00:00:00.000Z',
    user: mockUsers[3],
  },
  {
    id: '5',
    user_id: '5',
    license_number: 'PAT56789',
    birthdate: '1995-07-08',
    gender: 'Female',
    address: '202 Birch St, Oldtown, OT 56789',
    created_at: '2024-02-01T00:00:00.000Z',
    user: mockUsers[4],
  }
];

// Mock data for pharmacy credits
const mockCredits: PharmacyCredit[] = [
  {
    id: '1',
    pharmacy_id: '1',
    patient_id: '1',
    credit_points: 150,
    earned_at: '2025-03-15T00:00:00.000Z',
  },
  {
    id: '2',
    pharmacy_id: '1',
    patient_id: '2',
    credit_points: 75,
    earned_at: '2025-03-20T00:00:00.000Z',
  },
  {
    id: '3',
    pharmacy_id: '1',
    patient_id: '3',
    credit_points: 200,
    earned_at: '2025-03-25T00:00:00.000Z',
  },
  {
    id: '4',
    pharmacy_id: '1',
    patient_id: '4',
    credit_points: 50,
    earned_at: '2025-04-01T00:00:00.000Z',
  },
  {
    id: '5',
    pharmacy_id: '1',
    patient_id: '5',
    credit_points: 125,
    earned_at: '2025-04-05T00:00:00.000Z',
  }
];

const PatientsPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('name');
  const [patients] = useState<Patient[]>(mockPatients);
  const [pharmacyCredits] = useState<PharmacyCredit[]>(mockCredits);

  // Combine patient data with their credits
  const patientsWithCredits = patients.map(patient => {
    const patientCredits = pharmacyCredits.filter(credit => credit.patient_id === patient.id);
    const totalCredits = patientCredits.reduce((sum, credit) => sum + credit.credit_points, 0);
    return {
      ...patient,
      totalCredits
    };
  });

  const filteredPatients = patientsWithCredits.filter((patient) => {
    // Apply search filter across multiple fields
    const searchableContent = [
      patient.user?.name.toLowerCase(),
      patient.user?.email.toLowerCase(),
      patient.license_number.toLowerCase(),
      patient.address.toLowerCase(),
    ].join(' ');

    return searchableContent.includes(searchQuery.toLowerCase());
  });

  // Apply sorting
  const sortedPatients = [...filteredPatients].sort((a, b) => {
    switch (sortBy) {
      case 'name':
        return a.user?.name.localeCompare(b.user?.name || '') || 0;
      case 'date':
        return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
      case 'credits':
        return (b.totalCredits || 0) - (a.totalCredits || 0);
      default:
        return 0;
    }
  });

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold flex items-center gap-2">
              <Users className="h-6 w-6 text-pharmacy-primary" />
              Patients
            </h1>
            <p className="text-muted-foreground">
              View and manage patient information and prescription history
            </p>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search patients by name, email, or license..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-muted-foreground" />
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Sort By" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="name">Name (A-Z)</SelectItem>
                <SelectItem value="date">Date Added (Newest)</SelectItem>
                <SelectItem value="credits">Credits (Highest)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <PatientList patients={sortedPatients} />
      </div>
    </DashboardLayout>
  );
};

export default PatientsPage;