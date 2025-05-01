
import React, { useState } from 'react';
import DashboardLayout from '@/components/Layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Building, MapPin, Star, Clock, Truck, ShoppingBag, Send } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

// Mock pharmacy data
const pharmaciesData = [
  {
    id: '1',
    name: 'MedExpress Pharmacy',
    address: '123 Health Street, New York, NY 10001',
    phone: '(212) 555-1234',
    rating: 4.8,
    distance: '0.5 miles',
    deliveryOptions: ['pickup', 'delivery', 'express'],
    prescriptionPrice: 89.99,
    logo: '🏥',
  },
  {
    id: '2',
    name: 'HealthPlus Pharmacy',
    address: '456 Wellness Ave, New York, NY 10002',
    phone: '(212) 555-5678',
    rating: 4.5,
    distance: '1.2 miles',
    deliveryOptions: ['pickup', 'delivery'],
    prescriptionPrice: 95.50,
    logo: '💊',
  },
  {
    id: '3',
    name: 'Community Care Pharmacy',
    address: '789 Care Lane, New York, NY 10003',
    phone: '(212) 555-9012',
    rating: 4.9,
    distance: '2.1 miles',
    deliveryOptions: ['pickup', 'express'],
    prescriptionPrice: 82.75,
    logo: '🌡️',
  },
  {
    id: '4',
    name: 'Metro Healthcare Pharmacy',
    address: '101 Metro Blvd, New York, NY 10004',
    phone: '(212) 555-3456',
    rating: 4.2,
    distance: '3.0 miles',
    deliveryOptions: ['pickup', 'delivery'],
    prescriptionPrice: 79.99,
    logo: '🩺',
  },
];

// Mock prescription data for the current user
const userPrescriptions = [
  { 
    id: '101', 
    doctor: 'Dr. Smith', 
    date: '2025-04-20', 
    medications: [
      { name: 'Amoxicillin', dosage: '500mg', quantity: 21 },
      { name: 'Ibuprofen', dosage: '400mg', quantity: 15 }
    ] 
  },
  { 
    id: '102', 
    doctor: 'Dr. Johnson', 
    date: '2025-04-15', 
    medications: [
      { name: 'Loratadine', dosage: '10mg', quantity: 30 }
    ] 
  }
];

const PharmaciesPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPrescription, setSelectedPrescription] = useState<string | null>(null);
  const [selectedDeliveryOption, setSelectedDeliveryOption] = useState<string | null>(null);
  const [selectedPharmacy, setSelectedPharmacy] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);

  // Filter pharmacies based on search query
  const filteredPharmacies = pharmaciesData.filter(pharmacy => 
    pharmacy.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    pharmacy.address.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleSubmitPrescription = () => {
    if (!selectedPrescription || !selectedDeliveryOption) {
      toast({
        title: "Missing information",
        description: "Please select a prescription and delivery option.",
        variant: "destructive"
      });
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setDialogOpen(false);
      
      toast({
        title: "Prescription submitted successfully",
        description: `Your prescription has been sent to ${pharmaciesData.find(p => p.id === selectedPharmacy)?.name}`,
      });
      
      // Reset selections
      setSelectedPrescription(null);
      setSelectedDeliveryOption(null);
      setSelectedPharmacy(null);
    }, 1500);
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold">Pharmacies</h1>
          <p className="text-muted-foreground">Browse nearby pharmacies and send your prescriptions</p>
        </div>

        <div className="flex flex-col md:flex-row gap-4 items-end">
          <div className="w-full">
            <Input
              placeholder="Search pharmacies by name or address..."
              value={searchQuery}
              onChange={handleSearchChange}
              className="w-full"
            />
          </div>
          <div className="flex-shrink-0">
            <Button variant="outline">
              <MapPin className="mr-2 h-4 w-4" />
              Near Me
            </Button>
          </div>
        </div>

        <Tabs defaultValue="nearby">
          <TabsList>
            <TabsTrigger value="nearby">Nearby</TabsTrigger>
            <TabsTrigger value="recommended">Recommended</TabsTrigger>
            <TabsTrigger value="price">Best Price</TabsTrigger>
          </TabsList>
          
          <TabsContent value="nearby" className="mt-6">
            <div className="grid gap-6 md:grid-cols-2">
              {filteredPharmacies.sort((a, b) => 
                parseFloat(a.distance.split(' ')[0]) - parseFloat(b.distance.split(' ')[0])
              ).map(pharmacy => (
                <PharmacyCard 
                  key={pharmacy.id} 
                  pharmacy={pharmacy} 
                  onSelectPharmacy={() => {
                    setSelectedPharmacy(pharmacy.id);
                    setDialogOpen(true);
                  }}
                />
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="recommended" className="mt-6">
            <div className="grid gap-6 md:grid-cols-2">
              {filteredPharmacies.sort((a, b) => b.rating - a.rating).map(pharmacy => (
                <PharmacyCard 
                  key={pharmacy.id} 
                  pharmacy={pharmacy} 
                  onSelectPharmacy={() => {
                    setSelectedPharmacy(pharmacy.id);
                    setDialogOpen(true);
                  }}
                />
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="price" className="mt-6">
            <div className="grid gap-6 md:grid-cols-2">
              {filteredPharmacies.sort((a, b) => a.prescriptionPrice - b.prescriptionPrice).map(pharmacy => (
                <PharmacyCard 
                  key={pharmacy.id} 
                  pharmacy={pharmacy} 
                  onSelectPharmacy={() => {
                    setSelectedPharmacy(pharmacy.id);
                    setDialogOpen(true);
                  }}
                />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Send Prescription</DialogTitle>
            <DialogDescription>
              Send your prescription to {pharmaciesData.find(p => p.id === selectedPharmacy)?.name}
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <h4 className="text-sm font-medium">Select a Prescription</h4>
              <div className="space-y-2">
                {userPrescriptions.map(prescription => (
                  <div 
                    key={prescription.id} 
                    className={`p-3 border rounded-md cursor-pointer hover:bg-gray-50 ${
                      selectedPrescription === prescription.id ? 'bg-blue-50 border-blue-300' : ''
                    }`}
                    onClick={() => setSelectedPrescription(prescription.id)}
                  >
                    <div className="flex justify-between">
                      <div>
                        <p className="font-medium">{prescription.doctor}</p>
                        <p className="text-sm text-muted-foreground">
                          {new Date(prescription.date).toLocaleDateString()}
                        </p>
                      </div>
                      <Badge>{prescription.medications.length} medications</Badge>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="space-y-2">
              <h4 className="text-sm font-medium">Delivery Options</h4>
              <div className="grid grid-cols-3 gap-2">
                {pharmaciesData.find(p => p.id === selectedPharmacy)?.deliveryOptions.includes('pickup') && (
                  <div 
                    className={`p-3 border rounded-md text-center cursor-pointer hover:bg-gray-50 ${
                      selectedDeliveryOption === 'pickup' ? 'bg-blue-50 border-blue-300' : ''
                    }`}
                    onClick={() => setSelectedDeliveryOption('pickup')}
                  >
                    <ShoppingBag className="h-5 w-5 mx-auto mb-1" />
                    <p className="text-sm font-medium">Pickup</p>
                    <p className="text-xs text-muted-foreground">In-store</p>
                  </div>
                )}
                
                {pharmaciesData.find(p => p.id === selectedPharmacy)?.deliveryOptions.includes('delivery') && (
                  <div 
                    className={`p-3 border rounded-md text-center cursor-pointer hover:bg-gray-50 ${
                      selectedDeliveryOption === 'delivery' ? 'bg-blue-50 border-blue-300' : ''
                    }`}
                    onClick={() => setSelectedDeliveryOption('delivery')}
                  >
                    <Truck className="h-5 w-5 mx-auto mb-1" />
                    <p className="text-sm font-medium">Delivery</p>
                    <p className="text-xs text-muted-foreground">1-2 days</p>
                  </div>
                )}
                
                {pharmaciesData.find(p => p.id === selectedPharmacy)?.deliveryOptions.includes('express') && (
                  <div 
                    className={`p-3 border rounded-md text-center cursor-pointer hover:bg-gray-50 ${
                      selectedDeliveryOption === 'express' ? 'bg-blue-50 border-blue-300' : ''
                    }`}
                    onClick={() => setSelectedDeliveryOption('express')}
                  >
                    <Clock className="h-5 w-5 mx-auto mb-1" />
                    <p className="text-sm font-medium">Express</p>
                    <p className="text-xs text-muted-foreground">Same day</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogOpen(false)}>Cancel</Button>
            <Button 
              onClick={handleSubmitPrescription}
              disabled={isSubmitting || !selectedPrescription || !selectedDeliveryOption}
            >
              {isSubmitting ? (
                <>
                  <div className="animate-spin mr-2">⌛</div>
                  Sending...
                </>
              ) : (
                <>
                  <Send className="mr-2 h-4 w-4" />
                  Send Prescription
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
};

interface PharmacyCardProps {
  pharmacy: {
    id: string;
    name: string;
    address: string;
    phone: string;
    rating: number;
    distance: string;
    deliveryOptions: string[];
    prescriptionPrice: number;
    logo: string;
  };
  onSelectPharmacy: () => void;
}

const PharmacyCard: React.FC<PharmacyCardProps> = ({ pharmacy, onSelectPharmacy }) => {
  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex justify-between">
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 rounded-md bg-blue-100 flex items-center justify-center text-2xl">
              {pharmacy.logo}
            </div>
            <div>
              <CardTitle className="text-lg">{pharmacy.name}</CardTitle>
              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                <MapPin className="h-3 w-3" />
                <span>{pharmacy.distance}</span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            <span className="font-medium">{pharmacy.rating}</span>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <p className="text-sm text-muted-foreground">{pharmacy.address}</p>
          
          <div className="flex flex-wrap gap-2">
            {pharmacy.deliveryOptions.includes('pickup') && (
              <Badge variant="outline" className="bg-gray-50">Pickup</Badge>
            )}
            {pharmacy.deliveryOptions.includes('delivery') && (
              <Badge variant="outline" className="bg-gray-50">Delivery</Badge>
            )}
            {pharmacy.deliveryOptions.includes('express') && (
              <Badge variant="outline" className="bg-gray-50">Express Delivery</Badge>
            )}
          </div>
          
          <div className="flex justify-between items-center border-t pt-3">
            <div>
              <p className="text-sm font-medium">Prescription Total</p>
              <p className="text-lg font-bold">${pharmacy.prescriptionPrice.toFixed(2)}</p>
            </div>
            <Button onClick={onSelectPharmacy}>
              <Send className="mr-2 h-4 w-4" />
              Send Prescription
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PharmaciesPage;
