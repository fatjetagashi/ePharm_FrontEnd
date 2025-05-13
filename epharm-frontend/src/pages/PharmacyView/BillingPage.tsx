
import React, { useState } from 'react';
import DashboardLayout from '@/components/Layout/DashboardLayout';
import { Receipt, Search, Filter, Calendar, CreditCard } from 'lucide-react';
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
import { format } from 'date-fns';
import SalesList from '@/components/Sales/SalesList';
import BillsList from '@/components/Sales/BillsList';
import { PharmacySale, Bill } from '@/types';

// Mock data for sales
const mockSales: PharmacySale[] = [
  {
    id: '1',
    pharmacy_id: '1',
    patient_id: '1',
    total_amount: 45.99,
    credit_awarded: 5,
    sale_date: '2025-04-25T10:30:00.000Z',
    processed_by: 'Jane Smith',
    patient: {
      id: '1',
      user_id: '1',
      license_number: 'PAT12345',
      birthdate: '1985-05-15',
      gender: 'Female',
      address: '123 Main St, Anytown, AT 12345',
      created_at: '2024-01-10T00:00:00.000Z',
      user: {
        id: '1',
        name: 'Alice Johnson',
        email: 'alice@example.com',
        username: 'alice',
        phone: '555-123-4567',
        user_type: 'patient',
        tenant_id: '1',
        created_at: '2024-01-10T00:00:00.000Z',
        updated_at: '2024-01-10T00:00:00.000Z',
      }
    },
    items: [
      {
        id: '101',
        sale_id: '1',
        medicine_id: '1',
        quantity: 1,
        unit_price: 15.99,
        subtotal: 15.99,
        medicine: {
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
        }
      },
      {
        id: '102',
        sale_id: '1',
        medicine_id: '3',
        quantity: 2,
        unit_price: 5.99,
        subtotal: 11.98,
        medicine: {
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
        }
      },
      {
        id: '103',
        sale_id: '1',
        medicine_id: '4',
        quantity: 3,
        unit_price: 6.01,
        subtotal: 18.02,
        medicine: {
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
        }
      }
    ]
  },
  {
    id: '2',
    pharmacy_id: '1',
    patient_id: '2',
    total_amount: 22.50,
    credit_awarded: 2,
    sale_date: '2025-04-24T14:15:00.000Z',
    processed_by: 'Jane Smith',
    patient: {
      id: '2',
      user_id: '2',
      license_number: 'PAT23456',
      birthdate: '1978-08-22',
      gender: 'Male',
      address: '456 Oak Ave, Somecity, SC 23456',
      created_at: '2024-01-15T00:00:00.000Z',
      user: {
        id: '2',
        name: 'Robert Smith',
        email: 'robert@example.com',
        username: 'robert',
        phone: '555-234-5678',
        user_type: 'patient',
        tenant_id: '1',
        created_at: '2024-01-15T00:00:00.000Z',
        updated_at: '2024-01-15T00:00:00.000Z',
      }
    },
    items: [
      {
        id: '201',
        sale_id: '2',
        medicine_id: '2',
        quantity: 1,
        unit_price: 22.50,
        subtotal: 22.50,
        medicine: {
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
        }
      }
    ]
  },
  {
    id: '3',
    pharmacy_id: '1',
    patient_id: '3',
    total_amount: 12.99,
    credit_awarded: 1,
    sale_date: '2025-04-23T09:45:00.000Z',
    processed_by: 'John Doe',
    patient: {
      id: '3',
      user_id: '3',
      license_number: 'PAT34567',
      birthdate: '1990-03-10',
      gender: 'Female',
      address: '789 Pine Rd, Othertown, OT 34567',
      created_at: '2024-01-20T00:00:00.000Z',
      user: {
        id: '3',
        name: 'Emma Davis',
        email: 'emma@example.com',
        username: 'emma',
        phone: '555-345-6789',
        user_type: 'patient',
        tenant_id: '1',
        created_at: '2024-01-20T00:00:00.000Z',
        updated_at: '2024-01-20T00:00:00.000Z',
      }
    },
    items: [
      {
        id: '301',
        sale_id: '3',
        medicine_id: '7',
        quantity: 1,
        unit_price: 12.99,
        subtotal: 12.99,
        medicine: {
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
        }
      }
    ]
  }
];

// Mock data for bills
const mockBills: Bill[] = [
  {
    id: '1',
    pharmacy_id: '1',
    patient_id: '1',
    sale_id: '1',
    payment_method: 'Credit Card',
    total_price: 45.99,
    created_at: '2025-04-25T10:35:00.000Z',
    patient: {
      id: '1',
      user: {
        id: '1',
        name: 'Alice Johnson',
        email: 'alice@example.com',
        username: 'alice',
        phone: '555-123-4567',
        user_type: 'patient',
        tenant_id: '1',
        created_at: '2024-01-10T00:00:00.000Z',
        updated_at: '2024-01-10T00:00:00.000Z',
      }
    },
    sale: mockSales[0]
  },
  {
    id: '2',
    pharmacy_id: '1',
    patient_id: '2',
    sale_id: '2',
    payment_method: 'Cash',
    total_price: 22.50,
    created_at: '2025-04-24T14:20:00.000Z',
    patient: {
      id: '2',
      user: {
        id: '2',
        name: 'Robert Smith',
        email: 'robert@example.com',
        username: 'robert',
        phone: '555-234-5678',
        user_type: 'patient',
        tenant_id: '1',
        created_at: '2024-01-15T00:00:00.000Z',
        updated_at: '2024-01-15T00:00:00.000Z',
      }
    },
    sale: mockSales[1]
  },
  {
    id: '3',
    pharmacy_id: '1',
    patient_id: '3',
    sale_id: '3',
    payment_method: 'Insurance',
    total_price: 12.99,
    created_at: '2025-04-23T09:50:00.000Z',
    patient: {
      id: '3',
      user: {
        id: '3',
        name: 'Emma Davis',
        email: 'emma@example.com',
        username: 'emma',
        phone: '555-345-6789',
        user_type: 'patient',
        tenant_id: '1',
        created_at: '2024-01-20T00:00:00.000Z',
        updated_at: '2024-01-20T00:00:00.000Z',
      }
    },
    sale: mockSales[2]
  }
];

const BillingPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [dateFilter, setDateFilter] = useState('all');
  const [paymentMethodFilter, setPaymentMethodFilter] = useState('all');

  const filteredSales = mockSales.filter((sale) => {
    // Apply search filter
    const patientName = sale.patient?.user?.name.toLowerCase() || '';
    const patientEmail = sale.patient?.user?.email.toLowerCase() || '';

    const matchesSearch =
      patientName.includes(searchQuery.toLowerCase()) ||
      patientEmail.includes(searchQuery.toLowerCase()) ||
      sale.id.toLowerCase().includes(searchQuery.toLowerCase());

    // Apply date filter
    let matchesDate = true;
    if (dateFilter !== 'all') {
      const saleDate = new Date(sale.sale_date);
      const today = new Date();

      if (dateFilter === 'today') {
        matchesDate = format(saleDate, 'yyyy-MM-dd') === format(today, 'yyyy-MM-dd');
      } else if (dateFilter === 'week') {
        const oneWeekAgo = new Date(today);
        oneWeekAgo.setDate(today.getDate() - 7);
        matchesDate = saleDate >= oneWeekAgo;
      } else if (dateFilter === 'month') {
        const oneMonthAgo = new Date(today);
        oneMonthAgo.setMonth(today.getMonth() - 1);
        matchesDate = saleDate >= oneMonthAgo;
      }
    }

    return matchesSearch && matchesDate;
  });

  const filteredBills = mockBills.filter((bill) => {
    // Apply search filter
    const patientName = bill.patient?.user?.name.toLowerCase() || '';

    const matchesSearch =
      patientName.includes(searchQuery.toLowerCase()) ||
      bill.id.toLowerCase().includes(searchQuery.toLowerCase());

    // Apply date filter
    let matchesDate = true;
    if (dateFilter !== 'all') {
      const billDate = new Date(bill.created_at);
      const today = new Date();

      if (dateFilter === 'today') {
        matchesDate = format(billDate, 'yyyy-MM-dd') === format(today, 'yyyy-MM-dd');
      } else if (dateFilter === 'week') {
        const oneWeekAgo = new Date(today);
        oneWeekAgo.setDate(today.getDate() - 7);
        matchesDate = billDate >= oneWeekAgo;
      } else if (dateFilter === 'month') {
        const oneMonthAgo = new Date(today);
        oneMonthAgo.setMonth(today.getMonth() - 1);
        matchesDate = billDate >= oneMonthAgo;
      }
    }

    // Apply payment method filter
    const matchesPaymentMethod = paymentMethodFilter === 'all' || bill.payment_method.toLowerCase() === paymentMethodFilter.toLowerCase();

    return matchesSearch && matchesDate && matchesPaymentMethod;
  });

  const totalSales = filteredSales.reduce((sum, sale) => sum + sale.total_amount, 0);
  const averageSale = filteredSales.length > 0 ? totalSales / filteredSales.length : 0;
  const totalCreditsAwarded = filteredSales.reduce((sum, sale) => sum + sale.credit_awarded, 0);

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold flex items-center gap-2">
              <Receipt className="h-6 w-6 text-pharmacy-primary" />
              Sales & Billing
            </h1>
            <p className="text-muted-foreground">
              Track sales, billing, and payment information
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card title="Total Sales" value={`$${totalSales.toFixed(2)}`} icon={<Receipt />} />
          <Card title="Total Transactions" value={filteredSales.length.toString()} icon={<CreditCard />} />
          <Card title="Average Sale" value={`$${averageSale.toFixed(2)}`} icon={<Receipt />} />
          <Card title="Credits Awarded" value={totalCreditsAwarded.toString()} icon={<Receipt />} />
        </div>

        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search by patient name or ID..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <Filter className="h-4 w-4 text-muted-foreground" />
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <Select value={dateFilter} onValueChange={setDateFilter}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Date" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Time</SelectItem>
                <SelectItem value="today">Today</SelectItem>
                <SelectItem value="week">Last 7 Days</SelectItem>
                <SelectItem value="month">Last 30 Days</SelectItem>
              </SelectContent>
            </Select>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
            <Select value={paymentMethodFilter} onValueChange={setPaymentMethodFilter}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Payment Method" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Methods</SelectItem>
                <SelectItem value="Credit Card">Credit Card</SelectItem>
                <SelectItem value="Cash">Cash</SelectItem>
                <SelectItem value="Insurance">Insurance</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <Tabs defaultValue="sales">
          <TabsList>
            <TabsTrigger value="sales">Sales</TabsTrigger>
            <TabsTrigger value="bills">Bills</TabsTrigger>
          </TabsList>

          <TabsContent value="sales" className="mt-6">
            <SalesList sales={filteredSales} />
          </TabsContent>

          <TabsContent value="bills" className="mt-6">
            <BillsList bills={filteredBills} />
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

// Simple card component for stats
const Card = ({ title, value, icon }: { title: string; value: string; icon: React.ReactNode }) => {
  return (
    <div className="bg-white p-6 rounded-lg border shadow-sm">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-muted-foreground">{title}</p>
          <p className="text-2xl font-bold">{value}</p>
        </div>
        <div className="h-12 w-12 bg-pharmacy-light rounded-full flex items-center justify-center">
          {React.cloneElement(icon as React.ReactElement, { className: 'h-6 w-6 text-pharmacy-primary' })}
        </div>
      </div>
    </div>
  );
};

export default BillingPage;