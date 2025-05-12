
import React, { useState } from 'react';
import DashboardLayout from '../../../../../../Downloads/pharm-nexus-connect-37-main (1)/pharm-nexus-connect-37-main/src/components/Layout/DashboardLayout';
import { Search, Filter, Plus, Users } from 'lucide-react';
import { Input } from '../../../../../../Downloads/pharm-nexus-connect-37-main (1)/pharm-nexus-connect-37-main/src/components/ui/input';
import { Button } from '../../../../../../Downloads/pharm-nexus-connect-37-main (1)/pharm-nexus-connect-37-main/src/components/ui/button';
import { Card, CardContent } from '../../../../../../Downloads/pharm-nexus-connect-37-main (1)/pharm-nexus-connect-37-main/src/components/ui/card';
import { Badge } from '../../../../../../Downloads/pharm-nexus-connect-37-main (1)/pharm-nexus-connect-37-main/src/components/ui/badge';
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../../../../../Downloads/pharm-nexus-connect-37-main (1)/pharm-nexus-connect-37-main/src/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../../../../Downloads/pharm-nexus-connect-37-main (1)/pharm-nexus-connect-37-main/src/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../../../../../../Downloads/pharm-nexus-connect-37-main (1)/pharm-nexus-connect-37-main/src/components/ui/dialog";
import { Label } from "../../../../../../Downloads/pharm-nexus-connect-37-main (1)/pharm-nexus-connect-37-main/src/components/ui/label";
import { Textarea } from "../../../../../../Downloads/pharm-nexus-connect-37-main (1)/pharm-nexus-connect-37-main/src/components/ui/textarea";
import { toast } from "sonner";
import { Doctor } from '../../../../../../Downloads/pharm-nexus-connect-37-main (1)/pharm-nexus-connect-37-main/src/types';

const DoctorsPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [specializationFilter, setSpecializationFilter] = useState('all');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);

  // Mock doctor data
  const [doctors, setDoctors] = useState<Doctor[]>([
    { id: '1', name: 'Dr. Emily Johnson', specialization: 'Cardiologist', licenseNumber: 'MED123456', email: 'dr.johnson@epharm.com', phone: '(555) 123-4567', address: '123 Medical Ave, Cityville', is_verified: true },
    { id: '2', name: 'Dr. Michael Smith', specialization: 'Pediatrician', licenseNumber: 'MED234567', email: 'dr.smith@epharm.com', phone: '(555) 234-5678', address: '456 Healthcare Blvd, Townsville', is_verified: true },
    { id: '3', name: 'Dr. Sarah Davis', specialization: 'Neurologist', licenseNumber: 'MED345678', email: 'dr.davis@epharm.com', phone: '(555) 345-6789', address: '789 Wellness St, Villageton', is_verified: false },
    { id: '4', name: 'Dr. James Wilson', specialization: 'Dermatologist', licenseNumber: 'MED456789', email: 'dr.wilson@epharm.com', phone: '(555) 456-7890', address: '101 Healthy Dr, Hamletville', is_verified: true },
    { id: '5', name: 'Dr. Emma Brown', specialization: 'Psychiatrist', licenseNumber: 'MED567890', email: 'dr.brown@epharm.com', phone: '(555) 567-8901', address: '202 Care Lane, Boroughton', is_verified: false },
    { id: '6', name: 'Dr. Robert Lee', specialization: 'Orthopedic Surgeon', licenseNumber: 'MED678901', email: 'dr.lee@epharm.com', phone: '(555) 678-9012', address: '303 Treatment Way, Districtville', is_verified: true },
    { id: '7', name: 'Dr. Jennifer Taylor', specialization: 'Gynecologist', licenseNumber: 'MED789012', email: 'dr.taylor@epharm.com', phone: '(555) 789-0123', address: '404 Healing Path, Countytown', is_verified: true },
    { id: '8', name: 'Dr. David Clark', specialization: 'Ophthalmologist', licenseNumber: 'MED890123', email: 'dr.clark@epharm.com', phone: '(555) 890-1234', address: '505 Remedy Road, Provinceville', is_verified: true },
  ]);

  // Form state for adding/editing doctor
  const [formData, setFormData] = useState({
    name: '',
    specialization: '',
    licenseNumber: '',
    email: '',
    phone: '',
    address: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const resetFormData = () => {
    setFormData({
      name: '',
      specialization: '',
      licenseNumber: '',
      email: '',
      phone: '',
      address: '',
    });
  };

  const handleAddDoctor = () => {
    // In a real app, this would call an API to add the doctor
    const newDoctor: Doctor = {
      id: `${doctors.length + 1}`,
      name: formData.name,
      specialization: formData.specialization,
      licenseNumber: formData.licenseNumber,
      email: formData.email,
      phone: formData.phone,
      address: formData.address,
      is_verified: false,
    };

    setDoctors(prev => [...prev, newDoctor]);
    toast.success("Doctor added successfully");
    setIsAddDialogOpen(false);
    resetFormData();
  };

  const handleEditDoctor = () => {
    if (!selectedDoctor) return;

    // In a real app, this would call an API to update the doctor
    const updatedDoctors = doctors.map(doctor => {
      if (doctor.id === selectedDoctor.id) {
        return {
          ...doctor,
          name: formData.name,
          specialization: formData.specialization,
          licenseNumber: formData.licenseNumber,
          email: formData.email,
          phone: formData.phone,
          address: formData.address,
        };
      }
      return doctor;
    });

    setDoctors(updatedDoctors);
    toast.success("Doctor updated successfully");
    setIsEditDialogOpen(false);
    setSelectedDoctor(null);
    resetFormData();
  };

  // Filter doctors based on search and filters
  const filteredDoctors = doctors.filter(doctor => {
    const matchesSearch = doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doctor.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doctor.specialization.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' ? true : 
                          statusFilter === 'active' ? doctor.is_verified : 
                          statusFilter === 'inactive' ? !doctor.is_verified : 
                          statusFilter === 'verification' ? !doctor.is_verified : true;
    
    const matchesSpecialization = specializationFilter === 'all' ? true :
                                 doctor.specialization.toLowerCase() === specializationFilter.toLowerCase();
    
    return matchesSearch && matchesStatus && matchesSpecialization;
  });

  const getStatusBadge = (status: boolean) => {
    if (status) {
      return <Badge className="bg-green-100 text-green-800 hover:bg-green-100 border-green-200">Active</Badge>;
    } else {
      return <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-100 border-amber-200">Pending Verification</Badge>;
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
          
          <Button onClick={() => setIsAddDialogOpen(true)}>
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
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="flex gap-2">
            <div className="w-[180px]">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
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
              <Select value={specializationFilter} onValueChange={setSpecializationFilter}>
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
                  <SelectItem value="orthopedic surgeon">Surgeon</SelectItem>
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
                  <TableHead>Contact</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredDoctors.map((doctor) => (
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
                    <TableCell>{doctor.phone}</TableCell>
                    <TableCell>{getStatusBadge(doctor.is_verified || false)}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button size="sm" variant="outline" onClick={() => {
                          setSelectedDoctor(doctor);
                          setFormData({
                            name: doctor.name,
                            specialization: doctor.specialization,
                            licenseNumber: doctor.licenseNumber,
                            email: doctor.email,
                            phone: doctor.phone || '',
                            address: doctor.address || '',
                          });
                          setIsEditDialogOpen(true);
                        }}>Edit</Button>
                        <Button size="sm" variant="outline" onClick={() => {
                          // Verify/unverify logic here
                          const updatedDoctors = doctors.map(d => {
                            if (d.id === doctor.id) {
                              return { ...d, is_verified: !d.is_verified };
                            }
                            return d;
                          });
                          setDoctors(updatedDoctors);
                          toast.success(`Doctor ${doctor.is_verified ? 'unverified' : 'verified'} successfully`);
                        }}>{doctor.is_verified ? 'Unverify' : 'Verify'}</Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>

      {/* Add Doctor Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={(open) => {
        setIsAddDialogOpen(open);
        if (!open) resetFormData();
      }}>
        <DialogContent className="sm:max-w-[550px]">
          <DialogHeader>
            <DialogTitle>Add New Doctor</DialogTitle>
            <DialogDescription>
              Enter the doctor's information to add them to the platform
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input id="name" name="name" placeholder="Dr. John Doe" value={formData.name} onChange={handleInputChange} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="specialization">Specialization</Label>
                <Select value={formData.specialization} onValueChange={(value) => handleSelectChange('specialization', value)}>
                  <SelectTrigger id="specialization">
                    <SelectValue placeholder="Select specialization" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Cardiologist">Cardiologist</SelectItem>
                    <SelectItem value="Pediatrician">Pediatrician</SelectItem>
                    <SelectItem value="Neurologist">Neurologist</SelectItem>
                    <SelectItem value="Dermatologist">Dermatologist</SelectItem>
                    <SelectItem value="Psychiatrist">Psychiatrist</SelectItem>
                    <SelectItem value="Orthopedic Surgeon">Orthopedic Surgeon</SelectItem>
                    <SelectItem value="Gynecologist">Gynecologist</SelectItem>
                    <SelectItem value="Ophthalmologist">Ophthalmologist</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" name="email" type="email" placeholder="doctor@example.com" value={formData.email} onChange={handleInputChange} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone</Label>
                <Input id="phone" name="phone" placeholder="(555) 123-4567" value={formData.phone} onChange={handleInputChange} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="licenseNumber">License Number</Label>
                <Input id="licenseNumber" name="licenseNumber" placeholder="MED123456" value={formData.licenseNumber} onChange={handleInputChange} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="status">Initial Status</Label>
                <Select defaultValue="pending">
                  <SelectTrigger id="status">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="pending">Pending Verification</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2 col-span-2">
                <Label htmlFor="address">Address</Label>
                <Textarea id="address" name="address" placeholder="123 Medical Center Dr, City, State, ZIP" value={formData.address} onChange={handleInputChange} />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleAddDoctor}>Add Doctor</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Doctor Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={(open) => {
        setIsEditDialogOpen(open);
        if (!open) {
          setSelectedDoctor(null);
          resetFormData();
        }
      }}>
        <DialogContent className="sm:max-w-[550px]">
          <DialogHeader>
            <DialogTitle>Edit Doctor</DialogTitle>
            <DialogDescription>
              Update the doctor's information
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="edit-name">Full Name</Label>
                <Input id="edit-name" name="name" placeholder="Dr. John Doe" value={formData.name} onChange={handleInputChange} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-specialization">Specialization</Label>
                <Select value={formData.specialization} onValueChange={(value) => handleSelectChange('specialization', value)}>
                  <SelectTrigger id="edit-specialization">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Cardiologist">Cardiologist</SelectItem>
                    <SelectItem value="Pediatrician">Pediatrician</SelectItem>
                    <SelectItem value="Neurologist">Neurologist</SelectItem>
                    <SelectItem value="Dermatologist">Dermatologist</SelectItem>
                    <SelectItem value="Psychiatrist">Psychiatrist</SelectItem>
                    <SelectItem value="Orthopedic Surgeon">Orthopedic Surgeon</SelectItem>
                    <SelectItem value="Gynecologist">Gynecologist</SelectItem>
                    <SelectItem value="Ophthalmologist">Ophthalmologist</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-email">Email</Label>
                <Input id="edit-email" name="email" type="email" value={formData.email} onChange={handleInputChange} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-phone">Phone</Label>
                <Input id="edit-phone" name="phone" value={formData.phone} onChange={handleInputChange} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-licenseNumber">License Number</Label>
                <Input id="edit-licenseNumber" name="licenseNumber" value={formData.licenseNumber} onChange={handleInputChange} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-status">Status</Label>
                <Select defaultValue={selectedDoctor?.is_verified ? "active" : "pending"}>
                  <SelectTrigger id="edit-status">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="pending">Pending Verification</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2 col-span-2">
                <Label htmlFor="edit-address">Address</Label>
                <Textarea id="edit-address" name="address" value={formData.address} onChange={handleInputChange} />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleEditDoctor}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
};

export default DoctorsPage;
