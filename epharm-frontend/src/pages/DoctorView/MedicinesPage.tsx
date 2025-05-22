import React, { useEffect, useState } from 'react';
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
} from '@/components/ui/select';
import api from '@/lib/axios'; // ✅ Uses your configured axios instance
import DashboardLayout from '@/components/Layout/DoctorComponents/DashboardLayout';

// ✅ Use this only if you do NOT import from global `types/index.ts`
interface Medicine {
    id: string; // Changed to string to match your global types
    name: string;
    description: string;
    price: number;
    stock: number;
    expiryDate: string;
    dosage: string;
    pharmacyId: string;
}

const MedicinesPage = () => {
    const [medicines, setMedicines] = useState<Medicine[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            setError('User not authenticated.');
            setLoading(false);
            return;
        }

        api
            .get('/medicines')
            .then((res) => setMedicines(res.data.data))
            .catch((err) => {
                console.error(err);
                setError('Failed to load medicines.');
            })
            .finally(() => setLoading(false));
    }, []);

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
                        <Input placeholder="Search medicines..." className="pl-10" />
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

                {loading && <p className="text-muted-foreground">Loading medicines...</p>}
                {error && <p className="text-red-500">{error}</p>}

                {!loading && !error && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {medicines.map((medicine) => (
                            <MedicineCard
                                key={medicine.id}
                                medicine={medicine}
                                onAdd={() => console.log(`Added medicine: ${medicine.name}`)}
                            />
                        ))}
                    </div>
                )}
            </div>
        </DashboardLayout>
    );
};

export default MedicinesPage;