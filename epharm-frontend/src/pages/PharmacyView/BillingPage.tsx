// src/pages/PharmacyView/BillingPage.tsx
import React, { useState } from 'react';
import DashboardLayout from '@/components/Layout/PharmacyComponents/DashboardLayout';
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
// import SalesList from '@/components/Sales/SalesList';
// import BillsList from '@/components/Sales/BillsList';
import { PharmacySale, Bill, SalePatient } from '@/types';

// — your mockSales stays exactly the same —
const mockSales: PharmacySale[] = [
  /* …same as before… */
];

// — only this block changes: we assert each `patient` as `SalePatient` —
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
    } as SalePatient,    // ← CAST TO SalePatient HERE
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
    } as SalePatient,
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
    } as SalePatient,
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
              {/* <SalesList sales={filteredSales} /> */}
            </TabsContent>

            <TabsContent value="bills" className="mt-6">
              {/* <BillsList bills={filteredBills} /> */}
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
