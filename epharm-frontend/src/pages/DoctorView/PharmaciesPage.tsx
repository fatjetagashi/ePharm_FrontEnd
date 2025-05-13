
import React from 'react';
import DashboardLayout from '@/components/Layout/DashboardLayout';
import PharmacyCard from '@/components/Pharmacy/PharmacyCard';
import { Search, MapPin, Filter } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

const PharmaciesPage = () => {
    // Mock pharmacy data
    const pharmacies = [
        {
            id: '1',
            name: 'MediPharm Plus',
            address: '123 Health Street, Medville',
            distance: '1.2 miles',
            rating: 4.8,
            discount: 20,
            isOpen: true,
            phone: '(555) 123-4567',
            deliveryOptions: ['Fast Delivery', 'Pickup']
        },
        {
            id: '2',
            name: 'City Pharmacy',
            address: '456 Wellness Ave, Medville',
            distance: '2.3 miles',
            rating: 4.5,
            discount: 15,
            isOpen: true,
            phone: '(555) 987-6543',
            deliveryOptions: ['Standard Delivery', 'Pickup']
        },
        {
            id: '3',
            name: 'HealthPoint Pharmacy',
            address: '789 Care Blvd, Healthton',
            distance: '3.5 miles',
            rating: 4.2,
            discount: 20,
            isOpen: false,
            phone: '(555) 456-7890',
            deliveryOptions: ['Pickup']
        },
        {
            id: '4',
            name: 'QuickMeds',
            address: '321 Relief Road, Medville',
            distance: '4.1 miles',
            rating: 4.7,
            discount: 25,
            isOpen: true,
            phone: '(555) 234-5678',
            deliveryOptions: ['Fast Delivery', 'Standard Delivery', 'Pickup']
        },
        {
            id: '5',
            name: 'PharmaExpress',
            address: '654 Recovery Lane, Healthton',
            distance: '5.0 miles',
            rating: 4.0,
            discount: 20,
            isOpen: true,
            phone: '(555) 345-6789',
            deliveryOptions: ['Standard Delivery', 'Pickup']
        },
        {
            id: '6',
            name: 'WellCare Pharmacy',
            address: '987 Vitality Street, Medville',
            distance: '6.2 miles',
            rating: 4.9,
            discount: 15,
            isOpen: true,
            phone: '(555) 567-8901',
            deliveryOptions: ['Fast Delivery', 'Pickup']
        },
    ];

    return (
        <DashboardLayout>
            <div className="space-y-6">
                <div>
                    <h1 className="text-2xl font-bold">Pharmacies</h1>
                    <p className="text-muted-foreground">Find and select pharmacies for your prescriptions</p>
                </div>

                <div className="flex flex-col md:flex-row gap-4">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                        <Input
                            placeholder="Search pharmacies..."
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
                                    <SelectItem value="all">All Pharmacies</SelectItem>
                                    <SelectItem value="open">Currently Open</SelectItem>
                                    <SelectItem value="delivery">With Delivery</SelectItem>
                                    <SelectItem value="highest-rated">Highest Rated</SelectItem>
                                    <SelectItem value="highest-discount">Highest Discount</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="w-[180px]">
                            <Select>
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
                    {pharmacies.map(pharmacy => (
                        <PharmacyCard
                            key={pharmacy.id}
                            pharmacy={pharmacy}
                            onSelect={(id) => console.log(`Selected pharmacy: ${id}`)}
                        />
                    ))}
                </div>
            </div>
        </DashboardLayout>
    );
};

export default PharmaciesPage;
