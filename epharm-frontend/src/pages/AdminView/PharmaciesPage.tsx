
import React, { useState } from 'react';
import DashboardLayout from '../../../../../../Downloads/pharm-nexus-connect-37-main (1)/pharm-nexus-connect-37-main/src/components/Layout/DashboardLayout';
import { Search, MapPin, Filter, Plus, Check, X } from 'lucide-react';
import { Input } from '../../../../../../Downloads/pharm-nexus-connect-37-main (1)/pharm-nexus-connect-37-main/src/components/ui/input';
import { Button } from '../../../../../../Downloads/pharm-nexus-connect-37-main (1)/pharm-nexus-connect-37-main/src/components/ui/button';
import { Pharmacy } from '../../../../../../Downloads/pharm-nexus-connect-37-main (1)/pharm-nexus-connect-37-main/src/types';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle,
  DialogFooter,
  DialogDescription
} from '../../../../../../Downloads/pharm-nexus-connect-37-main (1)/pharm-nexus-connect-37-main/src/components/ui/dialog';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../../../../../Downloads/pharm-nexus-connect-37-main (1)/pharm-nexus-connect-37-main/src/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../../../../Downloads/pharm-nexus-connect-37-main (1)/pharm-nexus-connect-37-main/src/components/ui/select";
import {
  Badge
} from '../../../../../../Downloads/pharm-nexus-connect-37-main (1)/pharm-nexus-connect-37-main/src/components/ui/badge';
import { toast } from 'sonner';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../../../../../../Downloads/pharm-nexus-connect-37-main (1)/pharm-nexus-connect-37-main/src/components/ui/tabs";
import { Label } from '../../../../../../Downloads/pharm-nexus-connect-37-main (1)/pharm-nexus-connect-37-main/src/components/ui/label';
import { Textarea } from '../../../../../../Downloads/pharm-nexus-connect-37-main (1)/pharm-nexus-connect-37-main/src/components/ui/textarea';

// Extended Pharmacy type with UI-specific properties
interface ExtendedPharmacy extends Pharmacy {
  distance?: string;
  rating?: number;
  discount?: number;
  isOpen?: boolean;
  deliveryOptions?: string[];
}

const PharmaciesPage = () => {
  // States
  const [searchTerm, setSearchTerm] = useState('');
  const [filterValue, setFilterValue] = useState('all');
  const [distanceValue, setDistanceValue] = useState('');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [selectedPharmacy, setSelectedPharmacy] = useState<ExtendedPharmacy | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isVerifyDialogOpen, setIsVerifyDialogOpen] = useState(false);
  
  // Form state for new pharmacy
  const [newPharmacyData, setNewPharmacyData] = useState({
    name: '',
    address: '',
    licenseNumber: '',
    email: '',
    phone: '',
    logo: '/placeholder.svg',
    deliveryOptions: ['Standard Delivery'],
    isOpen: true,
    rating: 0,
    discount: 0,
    distance: '0.0 miles'
  });

  // Mock pharmacy data - in a real app, this would come from an API
  const [pharmacies, setPharmacies] = useState<ExtendedPharmacy[]>([
    { 
      id: '1', 
      name: 'MediPharm Plus', 
      address: '123 Health Street, Medville',
      licenseNumber: 'PH123456',
      email: 'contact@medipharm.com',
      phone: '(555) 123-4567',
      logo: '/placeholder.svg',
      tenant_id: 'tenant1',
      // Additional display properties
      distance: '1.2 miles',
      rating: 4.8,
      discount: 20,
      isOpen: true,
      deliveryOptions: ['Fast Delivery', 'Pickup']
    },
    { 
      id: '2', 
      name: 'City Pharmacy', 
      address: '456 Wellness Ave, Medville',
      licenseNumber: 'PH789012',
      email: 'info@citypharm.com',
      phone: '(555) 987-6543',
      logo: '/placeholder.svg',
      tenant_id: 'tenant2',
      distance: '2.3 miles',
      rating: 4.5,
      discount: 15,
      isOpen: true,
      deliveryOptions: ['Standard Delivery', 'Pickup']
    },
    { 
      id: '3', 
      name: 'HealthPoint Pharmacy', 
      address: '789 Care Blvd, Healthton',
      licenseNumber: 'PH345678',
      email: 'support@healthpoint.com',
      phone: '(555) 456-7890',
      logo: '/placeholder.svg',
      tenant_id: 'tenant3',
      distance: '3.5 miles',
      rating: 4.2,
      discount: 20,
      isOpen: false,
      deliveryOptions: ['Pickup']
    },
    { 
      id: '4', 
      name: 'QuickMeds', 
      address: '321 Relief Road, Medville',
      licenseNumber: 'PH901234',
      email: 'hello@quickmeds.com',
      phone: '(555) 234-5678',
      logo: '/placeholder.svg',
      tenant_id: 'tenant4',
      distance: '4.1 miles',
      rating: 4.7,
      discount: 25,
      isOpen: true,
      deliveryOptions: ['Fast Delivery', 'Standard Delivery', 'Pickup']
    },
    { 
      id: '5', 
      name: 'PharmaExpress', 
      address: '654 Recovery Lane, Healthton',
      licenseNumber: 'PH567890',
      email: 'contact@pharmaexpress.com',
      phone: '(555) 345-6789',
      logo: '/placeholder.svg',
      tenant_id: 'tenant5',
      distance: '5.0 miles',
      rating: 4.0,
      discount: 20,
      isOpen: true,
      deliveryOptions: ['Standard Delivery', 'Pickup']
    },
    { 
      id: '6', 
      name: 'WellCare Pharmacy', 
      address: '987 Vitality Street, Medville',
      licenseNumber: 'PH234567',
      email: 'info@wellcarepharm.com',
      phone: '(555) 567-8901',
      logo: '/placeholder.svg',
      tenant_id: 'tenant6',
      distance: '6.2 miles',
      rating: 4.9,
      discount: 15,
      isOpen: true,
      deliveryOptions: ['Fast Delivery', 'Pickup']
    },
  ]);

  // Filter pharmacies based on search and filters
  const filteredPharmacies = pharmacies.filter(pharmacy => {
    // Search filter
    const matchesSearch = pharmacy.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pharmacy.address.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Status filter
    if (filterValue === 'open' && !pharmacy.isOpen) return false;
    if (filterValue === 'delivery' && !pharmacy.deliveryOptions?.includes('Fast Delivery')) return false;
    if (filterValue === 'highest-rated' && (pharmacy.rating || 0) < 4.5) return false;
    if (filterValue === 'highest-discount' && (pharmacy.discount || 0) < 20) return false;
    
    // Distance filter
    if (distanceValue === '5miles' && parseFloat(pharmacy.distance?.split(' ')[0] || '0') > 5) return false;
    if (distanceValue === '10miles' && parseFloat(pharmacy.distance?.split(' ')[0] || '0') > 10) return false;
    if (distanceValue === '25miles' && parseFloat(pharmacy.distance?.split(' ')[0] || '0') > 25) return false;
    
    return matchesSearch;
  });

  // Handler for adding a new pharmacy
  const handleAddPharmacy = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simple validation
    if (!newPharmacyData.name || !newPharmacyData.address || !newPharmacyData.licenseNumber) {
      toast.error("Please fill out all required fields");
      return;
    }
    
    // Generate unique ID and tenant_id
    const newId = (pharmacies.length + 1).toString();
    const tenantId = `tenant${newId}`;
    
    // Create new pharmacy object
    const newPharmacy: ExtendedPharmacy = {
      id: newId,
      name: newPharmacyData.name,
      address: newPharmacyData.address,
      licenseNumber: newPharmacyData.licenseNumber,
      email: newPharmacyData.email,
      phone: newPharmacyData.phone,
      logo: newPharmacyData.logo,
      tenant_id: tenantId,
      distance: newPharmacyData.distance,
      rating: newPharmacyData.rating,
      discount: newPharmacyData.discount,
      isOpen: newPharmacyData.isOpen,
      deliveryOptions: newPharmacyData.deliveryOptions,
    };
    
    // Update pharmacies list with the new pharmacy
    setPharmacies([newPharmacy, ...pharmacies]);
    
    // Show success message
    toast.success("Pharmacy added successfully");
    
    // Reset form and close dialog
    setNewPharmacyData({
      name: '',
      address: '',
      licenseNumber: '',
      email: '',
      phone: '',
      logo: '/placeholder.svg',
      deliveryOptions: ['Standard Delivery'],
      isOpen: true,
      rating: 0,
      discount: 0,
      distance: '0.0 miles'
    });
    setIsAddDialogOpen(false);
  };

  // Handler for editing a pharmacy
  const handleEditPharmacy = () => {
    if (!selectedPharmacy) return;
    
    // Update the pharmacy in the list
    const updatedPharmacies = pharmacies.map(pharmacy => 
      pharmacy.id === selectedPharmacy.id ? selectedPharmacy : pharmacy
    );
    
    setPharmacies(updatedPharmacies);
    
    // Show success message
    toast.success("Pharmacy updated successfully");
    setIsEditDialogOpen(false);
  };

  // Handler for verifying a pharmacy
  const handleVerifyPharmacy = (action: 'verify' | 'unverify') => {
    if (!selectedPharmacy) return;
    
    // In a real app, this would submit to an API
    toast.success(`Pharmacy ${action === 'verify' ? 'verified' : 'unverified'} successfully`);
    setIsVerifyDialogOpen(false);
  };

  // Handle form input changes for new pharmacy
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setNewPharmacyData({
      ...newPharmacyData,
      [id]: value,
    });
  };

  // Handle select changes for new pharmacy
  const handleDeliveryOptionChange = (value: string) => {
    setNewPharmacyData({
      ...newPharmacyData,
      deliveryOptions: [value],
    });
  };

  // Handle status change for new pharmacy
  const handleStatusChange = (value: string) => {
    setNewPharmacyData({
      ...newPharmacyData,
      isOpen: value === 'active',
    });
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold">Pharmacies</h1>
            <p className="text-muted-foreground">Manage and monitor pharmacies across the platform</p>
          </div>
          <Button onClick={() => setIsAddDialogOpen(true)}>
            <Plus className="mr-2 h-4 w-4" /> Add Pharmacy
          </Button>
        </div>
        
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search pharmacies..."
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="flex gap-2">
            <div className="w-[180px]">
              <Select value={filterValue} onValueChange={setFilterValue}>
                <SelectTrigger>
                  <div className="flex items-center">
                    <Filter className="mr-2 h-4 w-4" />
                    <SelectValue placeholder="Filter" />
                  </div>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Pharmacies</SelectItem>
                  <SelectItem value="open">Currently Open</SelectItem>
                  <SelectItem value="delivery">With Delivery</SelectItem>
                  <SelectItem value="highest-rated">Highest Rated</SelectItem>
                  <SelectItem value="highest-discount">Highest Discount</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="w-[180px]">
              <Select value={distanceValue} onValueChange={setDistanceValue}>
                <SelectTrigger>
                  <div className="flex items-center">
                    <MapPin className="mr-2 h-4 w-4" />
                    <SelectValue placeholder="Distance" />
                  </div>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="nearest">Nearest First</SelectItem>
                  <SelectItem value="5miles">Within 5 miles</SelectItem>
                  <SelectItem value="10miles">Within 10 miles</SelectItem>
                  <SelectItem value="25miles">Within 25 miles</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPharmacies.length > 0 ? (
            filteredPharmacies.map(pharmacy => (
              <Card key={pharmacy.id} className="overflow-hidden">
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle>{pharmacy.name}</CardTitle>
                      <CardDescription>{pharmacy.address}</CardDescription>
                    </div>
                    <Badge variant={pharmacy.isOpen ? "default" : "destructive"}>
                      {pharmacy.isOpen ? "Open" : "Closed"}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="pb-2">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">License:</span>
                      <span className="font-medium">{pharmacy.licenseNumber}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Contact:</span>
                      <span className="font-medium">{pharmacy.phone}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Rating:</span>
                      <span className="font-medium">{pharmacy.rating} / 5</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Delivery:</span>
                      <span className="font-medium">{pharmacy.deliveryOptions?.join(', ')}</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline" size="sm" onClick={() => {
                    setSelectedPharmacy(pharmacy);
                    setIsEditDialogOpen(true);
                  }}>
                    Edit
                  </Button>
                  <Button variant="secondary" size="sm" onClick={() => {
                    setSelectedPharmacy(pharmacy);
                    setIsVerifyDialogOpen(true);
                  }}>
                    Verify
                  </Button>
                  <Button size="sm" onClick={() => {
                    // In a real app this would navigate to a detail view
                    toast.info(`Viewing details for ${pharmacy.name}`);
                  }}>
                    View Details
                  </Button>
                </CardFooter>
              </Card>
            ))
          ) : (
            <div className="col-span-full text-center py-8">
              <p className="text-lg text-muted-foreground">No pharmacies found matching your criteria</p>
            </div>
          )}
        </div>
      </div>

      {/* Add Pharmacy Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Add New Pharmacy</DialogTitle>
            <DialogDescription>
              Fill in the details to register a new pharmacy on the platform
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleAddPharmacy}>
            <Tabs defaultValue="details">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="details">Pharmacy Details</TabsTrigger>
                <TabsTrigger value="contact">Contact & Verification</TabsTrigger>
              </TabsList>
              <TabsContent value="details" className="space-y-4 pt-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Pharmacy Name*</Label>
                    <Input 
                      id="name" 
                      placeholder="Enter pharmacy name" 
                      value={newPharmacyData.name}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="licenseNumber">License Number*</Label>
                    <Input 
                      id="licenseNumber" 
                      placeholder="Enter license number" 
                      value={newPharmacyData.licenseNumber}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="space-y-2 col-span-2">
                    <Label htmlFor="address">Address*</Label>
                    <Textarea 
                      id="address" 
                      placeholder="Enter full address" 
                      value={newPharmacyData.address}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="deliveryOptions">Delivery Options</Label>
                    <Select 
                      onValueChange={handleDeliveryOptionChange}
                      defaultValue="standardDelivery"
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select options" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="fastDelivery">Fast Delivery</SelectItem>
                        <SelectItem value="standardDelivery">Standard Delivery</SelectItem>
                        <SelectItem value="pickup">Pickup</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="status">Initial Status</Label>
                    <Select 
                      defaultValue="active"
                      onValueChange={handleStatusChange}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="active">Active</SelectItem>
                        <SelectItem value="pending">Pending Verification</SelectItem>
                        <SelectItem value="inactive">Inactive</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="contact" className="space-y-4 pt-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email*</Label>
                    <Input 
                      id="email" 
                      type="email" 
                      placeholder="contact@pharmacy.com" 
                      value={newPharmacyData.email}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number*</Label>
                    <Input 
                      id="phone" 
                      placeholder="(555) 123-4567" 
                      value={newPharmacyData.phone}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="logo">Logo URL</Label>
                    <Input 
                      id="logo" 
                      placeholder="Enter logo URL or upload" 
                      value={newPharmacyData.logo}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="tenantId">Tenant ID</Label>
                    <Input id="tenantId" placeholder="System-generated" disabled />
                  </div>
                </div>
              </TabsContent>
            </Tabs>
            <DialogFooter className="mt-6">
              <Button variant="outline" type="button" onClick={() => setIsAddDialogOpen(false)}>Cancel</Button>
              <Button type="submit">Create Pharmacy</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Edit Pharmacy Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Edit Pharmacy</DialogTitle>
            <DialogDescription>
              Update pharmacy information and settings
            </DialogDescription>
          </DialogHeader>
          {selectedPharmacy && (
            <Tabs defaultValue="details">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="details">Pharmacy Details</TabsTrigger>
                <TabsTrigger value="contact">Contact & Verification</TabsTrigger>
              </TabsList>
              <TabsContent value="details" className="space-y-4 pt-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="edit-name">Pharmacy Name</Label>
                    <Input 
                      id="edit-name" 
                      defaultValue={selectedPharmacy.name}
                      onChange={(e) => setSelectedPharmacy({...selectedPharmacy, name: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="edit-license">License Number</Label>
                    <Input 
                      id="edit-license" 
                      defaultValue={selectedPharmacy.licenseNumber}
                      onChange={(e) => setSelectedPharmacy({...selectedPharmacy, licenseNumber: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2 col-span-2">
                    <Label htmlFor="edit-address">Address</Label>
                    <Textarea 
                      id="edit-address" 
                      defaultValue={selectedPharmacy.address}
                      onChange={(e) => setSelectedPharmacy({...selectedPharmacy, address: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="edit-deliveryOptions">Delivery Options</Label>
                    <Select 
                      defaultValue={selectedPharmacy.deliveryOptions?.[0] || ""}
                      onValueChange={(value) => setSelectedPharmacy({...selectedPharmacy, deliveryOptions: [value]})}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="fastDelivery">Fast Delivery</SelectItem>
                        <SelectItem value="standardDelivery">Standard Delivery</SelectItem>
                        <SelectItem value="pickup">Pickup</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="edit-status">Status</Label>
                    <Select 
                      defaultValue={selectedPharmacy.isOpen ? "active" : "inactive"}
                      onValueChange={(value) => setSelectedPharmacy({...selectedPharmacy, isOpen: value === "active"})}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="active">Active</SelectItem>
                        <SelectItem value="inactive">Inactive</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="contact" className="space-y-4 pt-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="edit-email">Email</Label>
                    <Input 
                      id="edit-email" 
                      type="email" 
                      defaultValue={selectedPharmacy.email}
                      onChange={(e) => setSelectedPharmacy({...selectedPharmacy, email: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="edit-phone">Phone Number</Label>
                    <Input 
                      id="edit-phone" 
                      defaultValue={selectedPharmacy.phone}
                      onChange={(e) => setSelectedPharmacy({...selectedPharmacy, phone: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="edit-logo">Logo URL</Label>
                    <Input 
                      id="edit-logo" 
                      defaultValue={selectedPharmacy.logo || ""}
                      onChange={(e) => setSelectedPharmacy({...selectedPharmacy, logo: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="edit-tenantId">Pharmacy ID</Label>
                    <Input 
                      id="edit-tenantId" 
                      defaultValue={selectedPharmacy.tenant_id} 
                      disabled 
                    />
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleEditPharmacy}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Verify Pharmacy Dialog */}
      <Dialog open={isVerifyDialogOpen} onOpenChange={setIsVerifyDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Pharmacy Verification</DialogTitle>
            <DialogDescription>
              Update verification status for this pharmacy
            </DialogDescription>
          </DialogHeader>
          {selectedPharmacy && (
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <h4 className="font-medium">{selectedPharmacy.name}</h4>
                <p className="text-sm text-muted-foreground">License: {selectedPharmacy.licenseNumber}</p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="verify-status">Verification Status</Label>
                <Select defaultValue="verified">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="verified">Verified</SelectItem>
                    <SelectItem value="pending">Pending Review</SelectItem>
                    <SelectItem value="rejected">Rejected</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="verify-notes">Notes</Label>
                <Textarea id="verify-notes" placeholder="Add verification notes" />
              </div>
            </div>
          )}
          <DialogFooter className="flex justify-between">
            <div className="flex gap-2">
              <Button variant="destructive" onClick={() => handleVerifyPharmacy('unverify')}>
                <X className="mr-2 h-4 w-4" /> Unverify
              </Button>
              <Button variant="default" onClick={() => handleVerifyPharmacy('verify')}>
                <Check className="mr-2 h-4 w-4" /> Verify
              </Button>
            </div>
            <Button variant="outline" onClick={() => setIsVerifyDialogOpen(false)}>Cancel</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
};

export default PharmaciesPage;
