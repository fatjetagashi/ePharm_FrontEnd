
import React, { useState } from 'react';
import DashboardLayout from '@/components/Layout/PatientComponents/DashboardLayout';
import { Search, Filter, User, FileText } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import AddPatientDialog from '@/components/Patient/AddPatientDialog';
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
import { useToast } from "@/hooks/use-toast";

interface PatientWithPrescription {
  id: string;
  name: string;
  age?: number;
  gender: string;
  conditions: string[];
  lastVisit: string;
  status: string;
  prescriptions: number;
  licenseNumber: string;
}

const PatientsPage = () => {
  const { toast } = useToast();
  const [patients, setPatients] = useState<PatientWithPrescription[]>([
    { id: '1', name: 'Alice Johnson', age: 45, gender: 'Female', conditions: ['Hypertension'], lastVisit: '2025-04-05', status: 'active', prescriptions: 2, licenseNumber: 'LIC12345' },
    { id: '2', name: 'Robert Smith', age: 32, gender: 'Male', conditions: ['Diabetes Type 2'], lastVisit: '2025-04-02', status: 'active', prescriptions: 1, licenseNumber: 'LIC67890' },
    { id: '3', name: 'Emma Davis', age: 28, gender: 'Female', conditions: ['Asthma'], lastVisit: '2025-03-30', status: 'active', prescriptions: 3, licenseNumber: 'LIC24680' },
    { id: '4', name: 'James Wilson', age: 56, gender: 'Male', conditions: ['Arthritis', 'Hypertension'], lastVisit: '2025-03-25', status: 'inactive', prescriptions: 0, licenseNumber: 'LIC13579' },
  ]);

  const getAgeGroup = (age: number | undefined) => {
    if (!age) return 'Unknown';
    if (age < 18) return 'Under 18';
    if (age < 30) return '18-29';
    if (age < 45) return '30-44';
    if (age < 60) return '45-59';
    return '60+';
  };

  const calculateAge = (birthdate: string) => {
    const today = new Date();
    const birth = new Date(birthdate);
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
      age--;
    }
    
    return age;
  };

  const handlePatientSelect = (data: any) => {
    // Process the patient and prescription data
    const { patient, prescription } = data;
    
    // Create the new patient record with prescription data
    const newPatient: PatientWithPrescription = {
      id: patient.id,
      name: patient.name,
      age: patient.birthdate ? calculateAge(patient.birthdate) : undefined,
      gender: patient.gender,
      conditions: [prescription.diagnosis.split(',')[0]], // Use the first part of diagnosis as a condition
      lastVisit: new Date().toISOString().split('T')[0], // Today
      status: 'active',
      prescriptions: prescription.medications.length,
      licenseNumber: patient.licenseNumber,
    };
    
    // Add the new patient to the list
    setPatients([newPatient, ...patients]);
    
    toast({
      title: "Success",
      description: `${patient.name || 'New patient'} has been added with ${prescription.medications.length} medications.`,
    });
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold">Patients</h1>
            <p className="text-muted-foreground">Manage your patient database</p>
          </div>
          
          <AddPatientDialog onPatientSelect={handlePatientSelect} />
        </div>
        
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search patients..."
              className="pl-10"
            />
          </div>
          
          <div className="flex gap-2">
            <div className="w-[180px]">
              <Select>
                <SelectTrigger>
                  <div className="flex items-center">
                    <Filter className="mr-2 h-4 w-4" />
                    <SelectValue placeholder="Status" />
                  </div>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Patients</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="w-[180px]">
              <Select>
                <SelectTrigger>
                  <div className="flex items-center">
                    <Filter className="mr-2 h-4 w-4" />
                    <SelectValue placeholder="Age Group" />
                  </div>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Ages</SelectItem>
                  <SelectItem value="under18">Under 18</SelectItem>
                  <SelectItem value="18-29">18-29</SelectItem>
                  <SelectItem value="30-44">30-44</SelectItem>
                  <SelectItem value="45-59">45-59</SelectItem>
                  <SelectItem value="60+">60+</SelectItem>
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
                  <TableHead>Name</TableHead>
                  <TableHead>Age</TableHead>
                  <TableHead>Gender</TableHead>
                  <TableHead>Conditions</TableHead>
                  <TableHead>Last Visit</TableHead>
                  <TableHead>Prescriptions</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {patients.map((patient) => (
                  <TableRow key={patient.id}>
                    <TableCell className="font-medium">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-health-light flex items-center justify-center">
                          <User className="h-5 w-5 text-health-primary" />
                        </div>
                        <div>
                          <p>{patient.name}</p>
                          <p className="text-sm text-muted-foreground">{patient.licenseNumber}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{patient.age ? `${patient.age} (${getAgeGroup(patient.age)})` : 'Unknown'}</TableCell>
                    <TableCell>{patient.gender}</TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1">
                        {patient.conditions.map((condition, i) => (
                          <Badge key={i} variant="outline" className="text-xs">{condition}</Badge>
                        ))}
                      </div>
                    </TableCell>
                    <TableCell>{new Date(patient.lastVisit).toLocaleDateString()}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <FileText className="h-4 w-4 text-muted-foreground" />
                        <span>{patient.prescriptions}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button size="sm">Add Prescription</Button>
                        <Button size="sm" variant="outline">View</Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default PatientsPage;
