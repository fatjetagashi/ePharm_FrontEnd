import React, { useEffect, useState } from "react";
import DashboardLayout from "@/components/Layout/AdminComponents/DashboardLayout";
import { Search, Filter, Plus, User, FileText } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
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
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { addPatient, fetchPatients } from "@/api/patient";

interface Patient {
  id: string;
  name?: string;
  age?: number;
  gender?: string;
  conditions?: string[];
  lastVisit?: string;
  status?: string;
  prescriptions?: number;
  email?: string;
  phone?: string;
  address?: string;
  dateOfBirth?: string;
  patients?: any;
}

const PatientsPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [ageGroupFilter, setAgeGroupFilter] = useState("all");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);

  // Form state for adding/editing patient
  const [formData, setFormData] = useState({
    name: "",
    gender: "Male",
    dateOfBirth: "",
    email: "",
    phone: "",
    address: "",
    conditions: "",
  });

  // Mock patient data
  const [patients, setPatients] = useState<Patient[]>([
    {
      id: "1",
      name: "Alice Johnson",
      age: 45,
      gender: "Female",
      conditions: ["Hypertension"],
      lastVisit: "2025-04-05",
      status: "active",
      prescriptions: 2,
      email: "alice@example.com",
      phone: "(555) 123-4567",
      dateOfBirth: "1980-06-15",
      address: "123 Main St, Anytown",
    },
    {
      id: "2",
      name: "Robert Smith",
      age: 32,
      gender: "Male",
      conditions: ["Diabetes Type 2"],
      lastVisit: "2025-04-02",
      status: "active",
      prescriptions: 1,
      email: "robert@example.com",
      phone: "(555) 234-5678",
      dateOfBirth: "1993-03-22",
      address: "456 Oak Ave, Somewhere",
    },
    {
      id: "3",
      name: "Emma Davis",
      age: 28,
      gender: "Female",
      conditions: ["Asthma"],
      lastVisit: "2025-03-30",
      status: "active",
      prescriptions: 3,
      email: "emma@example.com",
      phone: "(555) 345-6789",
      dateOfBirth: "1997-11-08",
      address: "789 Pine St, Nowhere",
    },
    {
      id: "4",
      name: "James Wilson",
      age: 56,
      gender: "Male",
      conditions: ["Arthritis", "Hypertension"],
      lastVisit: "2025-03-25",
      status: "inactive",
      prescriptions: 0,
      email: "james@example.com",
      phone: "(555) 456-7890",
      dateOfBirth: "1969-01-30",
      address: "101 Elm St, Anywhere",
    },
    {
      id: "5",
      name: "Olivia Brown",
      age: 41,
      gender: "Female",
      conditions: ["Migraine"],
      lastVisit: "2025-03-20",
      status: "active",
      prescriptions: 1,
      email: "olivia@example.com",
      phone: "(555) 567-8901",
      dateOfBirth: "1984-09-12",
      address: "202 Maple Dr, Everywhere",
    },
    {
      id: "6",
      name: "Michael Lee",
      age: 37,
      gender: "Male",
      conditions: ["Anxiety"],
      lastVisit: "2025-03-18",
      status: "active",
      prescriptions: 2,
      email: "michael@example.com",
      phone: "(555) 678-9012",
      dateOfBirth: "1988-07-25",
      address: "303 Cedar Ln, Someplace",
    },
    {
      id: "7",
      name: "Sophia Garcia",
      age: 62,
      gender: "Female",
      conditions: ["Osteoporosis", "Hypothyroidism"],
      lastVisit: "2025-03-15",
      status: "active",
      prescriptions: 4,
      email: "sophia@example.com",
      phone: "(555) 789-0123",
      dateOfBirth: "1963-04-18",
      address: "404 Birch Rd, Otherplace",
    },
    {
      id: "8",
      name: "David Taylor",
      age: 29,
      gender: "Male",
      conditions: ["Depression"],
      lastVisit: "2025-03-12",
      status: "inactive",
      prescriptions: 0,
      email: "david@example.com",
      phone: "(555) 890-1234",
      dateOfBirth: "1996-12-03",
      address: "505 Willow Way, Elsewhere",
    },
  ]);

  useEffect(() => {
    const loadPatients = async () => {
      try {
        const data = await fetchPatients();
        console.log(data,"fggg");
        setPatients(data);
      } catch (err) {
        console.error("Failed to fetch patients", err);
      }
    };

    loadPatients();
  }, []);

  const handleInputChange = (
      e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleRadioChange = (value: string) => {
    setFormData((prev) => ({ ...prev, gender: value }));
  };

  const resetFormData = () => {
    setFormData({
      name: "",
      gender: "Male",
      dateOfBirth: "",
      email: "",
      phone: "",
      address: "",
      conditions: "",
    });
  };

  const handleAddPatient = async () => {
    // Calculate age from date of birth
    const dob = new Date(formData.dateOfBirth);
    const today = new Date();
    let age = today.getFullYear() - dob.getFullYear();
    const monthDiff = today.getMonth() - dob.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dob.getDate())) {
      age--;
    }

    // In a real app, this would call an API to add the patient
    const newPatient: Patient = {
      id: `${patients.length + 1}`,
      name: formData.name,
      age: age,
      gender: formData.gender,
      conditions: formData.conditions
          .split(",")
          .map((condition) => condition.trim()),
      lastVisit: new Date().toISOString().split("T")[0],
      status: "active",
      prescriptions: 0,
      email: formData.email,
      phone: formData.phone,
      address: formData.address,
      dateOfBirth: formData.dateOfBirth,
    };

    await addPatient(newPatient);
    setPatients((prev) => [...prev, newPatient]);
    toast.success("Patient added successfully");
    setIsAddDialogOpen(false);
    resetFormData();
  };

  const handleEditPatient = () => {
    if (!selectedPatient) return;

    // Calculate age from date of birth
    const dob = new Date(
        formData.dateOfBirth || selectedPatient.dateOfBirth || ""
    );
    const today = new Date();
    let age = today.getFullYear() - dob.getFullYear();
    const monthDiff = today.getMonth() - dob.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dob.getDate())) {
      age--;
    }

    // In a real app, this would call an API to update the patient
    const updatedPatients = patients.map((patient) => {
      if (patient.id === selectedPatient.id) {
        return {
          ...patient,
          name: formData.name,
          gender: formData.gender,
          age: age,
          conditions: formData.conditions
              .split(",")
              .map((condition) => condition.trim()),
          email: formData.email,
          phone: formData.phone,
          address: formData.address,
          dateOfBirth: formData.dateOfBirth || patient.dateOfBirth,
        };
      }
      return patient;
    });

    setPatients(updatedPatients);
    toast.success("Patient updated successfully");
    setIsEditDialogOpen(false);
    setSelectedPatient(null);
    resetFormData();
  };

  const getAgeGroup = (age: number) => {
    if (age < 18) return "Under 18";
    if (age < 30) return "18-29";
    if (age < 45) return "30-44";
    if (age < 60) return "45-59";
    return "60+";
  };

  // Filter patients based on search and filters
  const filteredPatients = patients.filter((patient) => {
    const matchesSearch =
        patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        patient.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        false;

    const matchesStatus =
        statusFilter === "all" ? true : patient.status === statusFilter;

    const patientAgeGroup = getAgeGroup(patient.age);
    const matchesAgeGroup =
        ageGroupFilter === "all"
            ? true
            : ageGroupFilter === patientAgeGroup.toLowerCase().replace(" ", "");

    return matchesSearch && matchesStatus && matchesAgeGroup;
  });

  return (
      <DashboardLayout>
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold">Patients</h1>
              <p className="text-muted-foreground">
                Manage your patient database
              </p>
            </div>

            <Button onClick={() => setIsAddDialogOpen(true)}>
              <Plus className="mr-2 h-4 w-4" />
              Add Patient
            </Button>
          </div>

          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                  placeholder="Search patients..."
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
                    <SelectItem value="all">All Patients</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="w-[180px]">
                <Select value={ageGroupFilter} onValueChange={setAgeGroupFilter}>
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
                  {filteredPatients.map((patient) => (
                      <TableRow key={patient.id}>
                        <TableCell className="font-medium">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-health-light flex items-center justify-center">
                              <User className="h-5 w-5 text-health-primary" />
                            </div>
                            <div>
                              <p>{patient.name}</p>
                              <p className="text-sm text-muted-foreground">
                                {getAgeGroup(patient.age)}
                              </p>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>{patient.age}</TableCell>
                        <TableCell>{patient.gender ?? 'Male'}</TableCell>
                        <TableCell>
                          <div className="flex flex-wrap gap-1">
                            {patient?.conditions?.map((condition, i) => (
                                <Badge key={i} variant="outline" className="text-xs">
                                  {condition}
                                </Badge>
                            ))}
                          </div>
                        </TableCell>
                        <TableCell>
                          {new Date(patient.lastVisit).toLocaleDateString()}
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1">
                            <FileText className="h-4 w-4 text-muted-foreground" />
                            <span>{patient.prescriptions}</span>
                          </div>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button
                                size="sm"
                                variant="outline"
                                onClick={() => {
                                  setSelectedPatient(patient);
                                  setIsViewDialogOpen(true);
                                }}
                            >
                              View
                            </Button>
                            <Button
                                size="sm"
                                variant="outline"
                                onClick={() => {
                                  setSelectedPatient(patient);
                                  setFormData({
                                    name: patient.name,
                                    gender: patient.gender,
                                    dateOfBirth: patient.dateOfBirth || "",
                                    email: patient.email || "",
                                    phone: patient.phone || "",
                                    address: patient.address || patient.patient?.address || "",
                                    conditions: patient.conditions.join(", "),
                                  });
                                  setIsEditDialogOpen(true);
                                }}
                            >
                              Edit
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

        {/* Add Patient Dialog */}
        <Dialog
            open={isAddDialogOpen}
            onOpenChange={(open) => {
              setIsAddDialogOpen(open);
              if (!open) resetFormData();
            }}
        >
          <DialogContent className="sm:max-w-[550px]">
            <DialogHeader>
              <DialogTitle>Add New Patient</DialogTitle>
              <DialogDescription>
                Enter the patient's information to add them to the database
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                      id="name"
                      name="name"
                      placeholder="John Doe"
                      value={formData.name}
                      onChange={handleInputChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="dateOfBirth">Date of Birth</Label>
                  <Input
                      id="dateOfBirth"
                      name="dateOfBirth"
                      type="date"
                      value={formData.dateOfBirth}
                      onChange={handleInputChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="gender">Gender</Label>
                  <RadioGroup
                      value={formData.gender}
                      onValueChange={handleRadioChange}
                      className="flex gap-4"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="Male" id="male" />
                      <Label htmlFor="male">Male</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="Female" id="female" />
                      <Label htmlFor="female">Female</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="Other" id="other" />
                      <Label htmlFor="other">Other</Label>
                    </div>
                  </RadioGroup>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="conditions">Medical Conditions</Label>
                  <Input
                      id="conditions"
                      name="conditions"
                      placeholder="Hypertension, Diabetes, etc."
                      value={formData.conditions}
                      onChange={handleInputChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="patient@example.com"
                      value={formData.email}
                      onChange={handleInputChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone</Label>
                  <Input
                      id="phone"
                      name="phone"
                      placeholder="(555) 123-4567"
                      value={formData.phone}
                      onChange={handleInputChange}
                  />
                </div>
                <div className="space-y-2 col-span-2">
                  <Label htmlFor="address">Address</Label>
                  <Textarea
                      id="address"
                      name="address"
                      placeholder="123 Main St, City, State, ZIP"
                      value={formData.address}
                      onChange={handleInputChange}
                  />
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleAddPatient}>Add Patient</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* View Patient Dialog */}
        <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Patient Details</DialogTitle>
            </DialogHeader>
            {selectedPatient && (
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-14 h-14 rounded-full bg-health-light flex items-center justify-center">
                      <User className="h-6 w-6 text-health-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium text-lg">
                        {selectedPatient.name}
                      </h3>
                      <p className="text-muted-foreground">
                        {selectedPatient.email}
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 pt-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Age</p>
                      <p className="font-medium">{selectedPatient.age} years</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Gender</p>
                      <p className="font-medium">{selectedPatient.gender}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Date of Birth</p>
                      <p className="font-medium">
                        {selectedPatient.dateOfBirth
                            ? new Date(
                                selectedPatient.dateOfBirth
                            ).toLocaleDateString()
                            : "N/A"}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Phone</p>
                      <p className="font-medium">
                        {selectedPatient.phone || "N/A"}
                      </p>
                    </div>
                    <div className="col-span-2">
                      <p className="text-sm text-muted-foreground">Address</p>
                      <p className="font-medium">
                        {selectedPatient.address || "N/A"}
                      </p>
                    </div>
                    <div className="col-span-2">
                      <p className="text-sm text-muted-foreground">
                        Medical Conditions
                      </p>
                      <div className="flex flex-wrap gap-2 mt-1">
                        {selectedPatient?.conditions?.map((condition, i) => (
                            <Badge key={i} variant="outline">
                              {condition}
                            </Badge>
                        ))}
                      </div>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Last Visit</p>
                      <p className="font-medium">
                        {new Date(selectedPatient.lastVisit).toLocaleDateString()}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Status</p>
                      <Badge
                          variant={
                            selectedPatient.status === "active"
                                ? "default"
                                : "secondary"
                          }
                          className="mt-1"
                      >
                        {selectedPatient?.status?.charAt(0).toUpperCase() +
                            selectedPatient?.status?.slice(1)}
                      </Badge>
                    </div>
                  </div>
                </div>
            )}
            <DialogFooter>
              <Button onClick={() => setIsViewDialogOpen(false)}>Close</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Edit Patient Dialog */}
        <Dialog
            open={isEditDialogOpen}
            onOpenChange={(open) => {
              setIsEditDialogOpen(open);
              if (!open) {
                setSelectedPatient(null);
                resetFormData();
              }
            }}
        >
          <DialogContent className="sm:max-w-[550px]">
            <DialogHeader>
              <DialogTitle>Edit Patient</DialogTitle>
              <DialogDescription>
                Update the patient's information
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-name">Full Name</Label>
                  <Input
                      id="edit-name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-dateOfBirth">Date of Birth</Label>
                  <Input
                      id="edit-dateOfBirth"
                      name="dateOfBirth"
                      type="date"
                      value={formData.dateOfBirth}
                      onChange={handleInputChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-gender">Gender</Label>
                  <RadioGroup
                      value={formData.gender}
                      onValueChange={handleRadioChange}
                      className="flex gap-4"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="Male" id="edit-male" />
                      <Label htmlFor="edit-male">Male</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="Female" id="edit-female" />
                      <Label htmlFor="edit-female">Female</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="Other" id="edit-other" />
                      <Label htmlFor="edit-other">Other</Label>
                    </div>
                  </RadioGroup>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-conditions">Medical Conditions</Label>
                  <Input
                      id="edit-conditions"
                      name="conditions"
                      placeholder="Hypertension, Diabetes, etc."
                      value={formData.conditions}
                      onChange={handleInputChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-email">Email</Label>
                  <Input
                      id="edit-email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-phone">Phone</Label>
                  <Input
                      id="edit-phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                  />
                </div>
                <div className="space-y-2 col-span-2">
                  <Label htmlFor="edit-address">Address</Label>
                  <Textarea
                      id="edit-address"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                  />
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button
                  variant="outline"
                  onClick={() => setIsEditDialogOpen(false)}
              >
                Cancel
              </Button>
              <Button onClick={handleEditPatient}>Save Changes</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </DashboardLayout>
  );
};

export default PatientsPage;