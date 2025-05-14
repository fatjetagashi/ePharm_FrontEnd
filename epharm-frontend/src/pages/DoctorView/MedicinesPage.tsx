
import React from 'react';
import DashboardLayout from '@/components/Layout/DoctorComponents/DashboardLayout';
import MedicineCard from '@/components/Medicine/MedicineCard';
import { Search, Filter, Plus } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

const MedicinesPage = () => {
    // Mock medicine data
    const medicines = [
        {
            id: '1',
            name: 'Amoxicillin 500mg',
            description: 'Antibiotic used to treat bacterial infections',
            price: 12.99,
            stock: 45,
            expiryDate: '2025-12-15',
            dosage: '500mg',
            pharmacyId: '1'
        },
        {
            id: '2',
            name: 'Lisinopril 10mg',
            description: 'ACE inhibitor used to treat high blood pressure and heart failure',
            price: 8.99,
            stock: 32,
            expiryDate: '2025-11-20',
            dosage: '10mg',
            pharmacyId: '1'
        },
        {
            id: '3',
            name: 'Atorvastatin 20mg',
            description: 'Statin used to prevent cardiovascular disease and treat abnormal lipid levels',
            price: 15.99,
            stock: 28,
            expiryDate: '2025-10-05',
            dosage: '20mg',
            pharmacyId: '1'
        },
        {
            id: '4',
            name: 'Metformin 500mg',
            description: 'Anti-diabetic medication used in the treatment of type 2 diabetes',
            price: 7.99,
            stock: 8,
            expiryDate: '2025-09-18',
            dosage: '500mg',
            pharmacyId: '1'
        },
        {
            id: '5',
            name: 'Ibuprofen 200mg',
            description: 'Non-steroidal anti-inflammatory drug used for treating pain, fever, and inflammation',
            price: 5.99,
            stock: 62,
            expiryDate: '2025-08-30',
            dosage: '200mg',
            pharmacyId: '1'
        },
        {
            id: '6',
            name: 'Cetirizine 10mg',
            description: 'Antihistamine used to relieve allergy symptoms such as sneezing and runny nose',
            price: 6.99,
            stock: 0,
            expiryDate: '2025-07-22',
            dosage: '10mg',
            pharmacyId: '1'
        },
        {
            id: '7',
            name: 'Azithromycin 250mg',
            description: 'Antibiotic used to treat various bacterial infections',
            price: 14.99,
            stock: 3,
            expiryDate: '2025-04-08',
            dosage: '250mg',
            pharmacyId: '1'
        },
        {
            id: '8',
            name: 'Paracetamol 500mg',
            description: 'Pain reliever and fever reducer',
            price: 4.99,
            stock: 86,
            expiryDate: '2025-12-01',
            dosage: '500mg',
            pharmacyId: '1'
        },
    ];

    return (
        <DashboardLayout>
            <div className="space-y-6">
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-2xl font-bold">Medicines</h1>
                        <p className="text-muted-foreground">Browse and manage available medications</p>
                    </div>

                    <Button>
                        <Plus className="mr-2 h-4 w-4" />
                        Add Medicine
                    </Button>
                </div>

                <div className="flex flex-col md:flex-row gap-4">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                        <Input
                            placeholder="Search medicines..."
                            className="pl-10"
                        />
                    </div>

                    <div className="flex gap-2">
                        <div className="w-[180px]">
                            <Select>
                                <SelectTrigger>
                                    <div className="flex items-center">
                                        <Filter className="mr-2 h-4 w-4" />
                                        <SelectValue placeholder="Filter" />
                                    </div>
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">All Medicines</SelectItem>
                                    <SelectItem value="in-stock">In Stock</SelectItem>
                                    <SelectItem value="low-stock">Low Stock</SelectItem>
                                    <SelectItem value="expiring-soon">Expiring Soon</SelectItem>
                                    <SelectItem value="expired">Expired</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="w-[180px]">
                            <Select>
                                <SelectTrigger>
                                    <div className="flex items-center">
                                        <Filter className="mr-2 h-4 w-4" />
                                        <SelectValue placeholder="Sort By" />
                                    </div>
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="name-asc">Name (A-Z)</SelectItem>
                                    <SelectItem value="name-desc">Name (Z-A)</SelectItem>
                                    <SelectItem value="price-asc">Price (Low-High)</SelectItem>
                                    <SelectItem value="price-desc">Price (High-Low)</SelectItem>
                                    <SelectItem value="expiry-asc">Expiry (Soonest)</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {medicines.map(medicine => (
                        <MedicineCard
                            key={medicine.id}
                            medicine={medicine}
                            onAdd={(med) => console.log(`Added medicine: ${med.name}`)}
                        />
                    ))}
                </div>
            </div>
        </DashboardLayout>
    );
};

export default MedicinesPage;
