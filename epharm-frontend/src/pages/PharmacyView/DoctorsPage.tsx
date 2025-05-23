
import React from 'react';
// import DashboardLayout from '@/components/Layout/DashboardLayout';
import { Search, Filter, Plus, Users } from 'lucide-react';
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
import DashboardLayout from '@/components/Layout/PharmacyComponents/DashboardLayout';

const DoctorsPage = () => {
  // Mock doctor data
  const doctors = [
    { id: '1', name: 'Dr. Emily Johnson', specialization: 'Cardiologist', patients: 124, email: 'dr.johnson@epharm.com', status: 'active', licenseNumber: 'MED123456' },
    { id: '2', name: 'Dr. Michael Smith', specialization: 'Pediatrician', patients: 98, email: 'dr.smith@epharm.com', status: 'active', licenseNumber: 'MED234567' },
    { id: '3', name: 'Dr. Sarah Davis', specialization: 'Neurologist', patients: 86, email: 'dr.davis@epharm.com', status: 'verification', licenseNumber: 'MED345678' },
    { id: '4', name: 'Dr. James Wilson', specialization: 'Dermatologist', patients: 112, email: 'dr.wilson@epharm.com', status: 'active', licenseNumber: 'MED456789' },
    { id: '5', name: 'Dr. Emma Brown', specialization: 'Psychiatrist', patients: 75, email: 'dr.brown@epharm.com', status: 'inactive', licenseNumber: 'MED567890' },
    { id: '6', name: 'Dr. Robert Lee', specialization: 'Orthopedic Surgeon', patients: 92, email: 'dr.lee@epharm.com', status: 'active', licenseNumber: 'MED678901' },
    { id: '7', name: 'Dr. Jennifer Taylor', specialization: 'Gynecologist', patients: 104, email: 'dr.taylor@epharm.com', status: 'active', licenseNumber: 'MED789012' },
    { id: '8', name: 'Dr. David Clark', specialization: 'Ophthalmologist', patients: 67, email: 'dr.clark@epharm.com', status: 'active', licenseNumber: 'MED890123' },
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100 border-green-200">Active</Badge>;
      case 'inactive':
        return <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-100 border-gray-200">Inactive</Badge>;
      case 'verification':
        return <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-100 border-amber-200">Pending Verification</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold">Doctors</h1>
            <p className="text-muted-foreground">Manage and view registered doctors</p>
          </div>
          
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add Doctor
          </Button>
        </div>
        
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search doctors..."
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
                  <SelectItem value="all">All Doctors</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                  <SelectItem value="verification">Pending Verification</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="w-[180px]">
              <Select>
                <SelectTrigger>
                  <div className="flex items-center">
                    <Filter className="mr-2 h-4 w-4" />
                    <SelectValue placeholder="Specialization" />
                  </div>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Specializations</SelectItem>
                  <SelectItem value="cardiologist">Cardiologist</SelectItem>
                  <SelectItem value="pediatrician">Pediatrician</SelectItem>
                  <SelectItem value="neurologist">Neurologist</SelectItem>
                  <SelectItem value="dermatologist">Dermatologist</SelectItem>
                  <SelectItem value="psychiatrist">Psychiatrist</SelectItem>
                  <SelectItem value="surgeon">Surgeon</SelectItem>
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
                  <TableHead>Specialization</TableHead>
                  <TableHead>License</TableHead>
                  <TableHead>Patients</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {doctors.map((doctor) => (
                  <TableRow key={doctor.id}>
                    <TableCell className="font-medium">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-health-light flex items-center justify-center">
                          <Users className="h-5 w-5 text-health-primary" />
                        </div>
                        <div>
                          <p>{doctor.name}</p>
                          <p className="text-sm text-muted-foreground">{doctor.email}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{doctor.specialization}</TableCell>
                    <TableCell>{doctor.licenseNumber}</TableCell>
                    <TableCell>{doctor.patients}</TableCell>
                    <TableCell>{getStatusBadge(doctor.status)}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button size="sm" variant="outline">View</Button>
                        <Button size="sm" variant="outline">Edit</Button>
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

export default DoctorsPage;