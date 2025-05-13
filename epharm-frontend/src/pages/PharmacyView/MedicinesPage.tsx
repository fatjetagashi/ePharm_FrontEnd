
import React, { useState } from 'react';
import DashboardLayout from '@/components/Layout/DashboardLayout';
import { Beaker, Plus, Search, Filter } from 'lucide-react';
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
import AddMedicineDialog from '@/components/Medicine/AddMedicineDialog';
import MedicineList from '@/components/Medicine/MedicineList';
import { Medicine } from '@/types';

// Mock data for medicines
const mockMedicines: Medicine[] = [
  {
    id: '1',
    tenant_id: '1',
    name: 'Amoxicillin',
    description: 'Antibiotic used to treat bacterial infections',
    price: 15.99,
    dosage: '500mg',
    stock: 120,
    expiryDate: '2025-12-31',
    created_by: '1',
    updated_by: '1',
    created_at: '2025-01-15T00:00:00.000Z',
    manufacturer: 'PharmaCorp',
    category: 'Antibiotics',
  },
  {
    id: '2',
    tenant_id: '1',
    name: 'Lisinopril',
    description: 'Used to treat high blood pressure and heart failure',
    price: 22.50,
    dosage: '10mg',
    stock: 85,
    expiryDate: '2025-10-15',
    created_by: '1',
    updated_by: '1',
    created_at: '2025-01-20T00:00:00.000Z',
    manufacturer: 'HealthPharm',
    category: 'Cardiovascular',
  },
  {
    id: '3',
    tenant_id: '1',
    name: 'Paracetamol',
    description: 'Pain reliever and fever reducer',
    price: 5.99,
    dosage: '500mg',
    stock: 200,
    expiryDate: '2026-03-15',
    created_by: '1',
    updated_by: '1',
    created_at: '2025-01-10T00:00:00.000Z',
    manufacturer: 'MediRelief',
    category: 'Pain Relief',
  },
  {
    id: '4',
    tenant_id: '1',
    name: 'Ibuprofen',
    description: 'Nonsteroidal anti-inflammatory drug',
    price: 7.99,
    dosage: '200mg',
    stock: 150,
    expiryDate: '2025-11-20',
    created_by: '1',
    updated_by: '1',
    created_at: '2025-01-12T00:00:00.000Z',
    manufacturer: 'MediRelief',
    category: 'Pain Relief',
  },
  {
    id: '5',
    tenant_id: '1',
    name: 'Metformin',
    description: 'Used to treat type 2 diabetes',
    price: 18.75,
    dosage: '500mg',
    stock: 90,
    expiryDate: '2025-09-10',
    created_by: '1',
    updated_by: '1',
    created_at: '2025-01-25T00:00:00.000Z',
    manufacturer: 'DiabeCare',
    category: 'Diabetes',
  },
  {
    id: '6',
    tenant_id: '1',
    name: 'Atorvastatin',
    description: 'Used to lower cholesterol levels',
    price: 26.99,
    dosage: '20mg',
    stock: 5,
    expiryDate: '2025-06-15',
    created_by: '1',
    updated_by: '1',
    created_at: '2025-02-01T00:00:00.000Z',
    manufacturer: 'CardioHealth',
    category: 'Cardiovascular',
  },
  {
    id: '7',
    tenant_id: '1',
    name: 'Cetirizine',
    description: 'Antihistamine for allergy relief',
    price: 12.99,
    dosage: '10mg',
    stock: 80,
    expiryDate: '2026-01-25',
    created_by: '1',
    updated_by: '1',
    created_at: '2025-02-05T00:00:00.000Z',
    manufacturer: 'AllerCare',
    category: 'Allergy',
  },
  {
    id: '8',
    tenant_id: '1',
    name: 'Omeprazole',
    description: 'Proton pump inhibitor used to treat acid reflux',
    price: 19.50,
    dosage: '20mg',
    stock: 3,
    expiryDate: '2025-08-30',
    created_by: '1',
    updated_by: '1',
    created_at: '2025-02-10T00:00:00.000Z',
    manufacturer: 'GastroHelp',
    category: 'Gastrointestinal',
  },
];

const MedicinesPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [stockFilter, setStockFilter] = useState('all');
  const [isAddMedicineOpen, setIsAddMedicineOpen] = useState(false);
  const [medicines, setMedicines] = useState<Medicine[]>(mockMedicines);

  const handleAddMedicine = (newMedicine: Medicine) => {
    setMedicines([newMedicine, ...medicines]);
    setIsAddMedicineOpen(false);
  };

  const filteredMedicines = medicines.filter((medicine) => {
    // Apply search filter
    const matchesSearch = medicine.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          medicine.description.toLowerCase().includes(searchQuery.toLowerCase());

    // Apply category filter
    const matchesCategory = categoryFilter === 'all' || medicine.category === categoryFilter;

    // Apply stock filter
    const matchesStock =
      stockFilter === 'all' ||
      (stockFilter === 'low' && medicine.stock < 10) ||
      (stockFilter === 'normal' && medicine.stock >= 10 && medicine.stock < 50) ||
      (stockFilter === 'high' && medicine.stock >= 50);

    return matchesSearch && matchesCategory && matchesStock;
  });

  // Get unique categories for the filter
  const categories = Array.from(new Set(medicines.map(m => m.category))).filter(Boolean) as string[];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold flex items-center gap-2">
              <Beaker className="h-6 w-6 text-pharmacy-primary" />
              Medicines Inventory
            </h1>
            <p className="text-muted-foreground">
              Manage your pharmacy's medicine inventory
            </p>
          </div>
          <Button
            onClick={() => setIsAddMedicineOpen(true)}
            className="bg-pharmacy-primary hover:bg-pharmacy-dark flex items-center gap-2"
          >
            <Plus className="h-4 w-4" />
            Add New Medicine
          </Button>
        </div>

        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search medicines..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-muted-foreground" />
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={stockFilter} onValueChange={setStockFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Stock Level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Stock Levels</SelectItem>
                <SelectItem value="low">Low Stock (&lt;10)</SelectItem>
                <SelectItem value="normal">Normal (10-50)</SelectItem>
                <SelectItem value="high">High Stock (&gt;50)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <Tabs defaultValue="grid" className="w-full">
          <div className="flex justify-end mb-4">
            <TabsList>
              <TabsTrigger value="grid">Grid View</TabsTrigger>
              <TabsTrigger value="list">List View</TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="grid" className="mt-0">
            <MedicineList
              medicines={filteredMedicines}
              view="grid"
              onEdit={(id) => console.log(`Edit medicine ${id}`)}
              onDelete={(id) => {
                setMedicines(medicines.filter(m => m.id !== id));
              }}
            />
          </TabsContent>

          <TabsContent value="list" className="mt-0">
            <MedicineList
              medicines={filteredMedicines}
              view="list"
              onEdit={(id) => console.log(`Edit medicine ${id}`)}
              onDelete={(id) => {
                setMedicines(medicines.filter(m => m.id !== id));
              }}
            />
          </TabsContent>
        </Tabs>
      </div>

      <AddMedicineDialog
        open={isAddMedicineOpen}
        onOpenChange={setIsAddMedicineOpen}
        onSave={handleAddMedicine}
      />
    </DashboardLayout>
  );
};

export default MedicinesPage;