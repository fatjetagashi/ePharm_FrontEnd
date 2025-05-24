
import React, { useState } from 'react';
import DashboardLayout from '@/components/Layout/PharmacyComponents/DashboardLayout';
import { Package, Plus, Calendar, Search, Filter } from 'lucide-react';
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
// import OrderList from '@/components/Order/OrderList';
// import CreateOrderDialog from '@/components/Order/CreateOrderDialog';
import { SupplierOrder, Supplier } from '@/types';
import { format } from 'date-fns';

// Mock data for suppliers
const mockSuppliers: Supplier[] = [
  {
    id: '1',
    tenant_id: '1',
    name: 'MediSupply Inc.',
    contact_email: 'contact@medisupply.com',
    phone: '555-123-4567',
    address: '123 Supply St, Pharma City, PC 12345',
    created_at: '2024-01-01T00:00:00.000Z',
  },
  {
    id: '2',
    tenant_id: '1',
    name: 'PharmaBulk Distributors',
    contact_email: 'orders@pharmabulk.com',
    phone: '555-987-6543',
    address: '456 Wholesale Ave, Medicine Town, MT 67890',
    created_at: '2024-01-02T00:00:00.000Z',
  },
  {
    id: '3',
    tenant_id: '1',
    name: 'Global Medicine Supply',
    contact_email: 'info@globalmedicine.com',
    phone: '555-555-5555',
    address: '789 Global Blvd, Metro City, MC 54321',
    created_at: '2024-01-03T00:00:00.000Z',
  }
];

// Mock data for orders
const mockOrders: SupplierOrder[] = [
  {
    id: '1',
    tenant_id: '1',
    supplier_id: '1',
    order_date: '2025-04-20T10:30:00.000Z',
    status: 'pending',
    total_cost: 1250.99,
    created_by: '1',
    created_at: '2025-04-20T10:30:00.000Z',
    supplier: mockSuppliers[0],
    items: [
      {
        id: '101',
        supplier_order_id: '1',
        medication_name: 'Amoxicillin 500mg',
        quantity: 500,
        unit_price: 0.75,
        subtotal: 375.0,
      },
      {
        id: '102',
        supplier_order_id: '1',
        medication_name: 'Lisinopril 10mg',
        quantity: 300,
        unit_price: 0.92,
        subtotal: 276.0,
      },
      {
        id: '103',
        supplier_order_id: '1',
        medication_name: 'Metformin 500mg',
        quantity: 400,
        unit_price: 1.50,
        subtotal: 600.0,
      }
    ]
  },
  {
    id: '2',
    tenant_id: '1',
    supplier_id: '2',
    order_date: '2025-04-15T14:15:00.000Z',
    status: 'shipped',
    total_cost: 876.50,
    created_by: '1',
    created_at: '2025-04-15T14:15:00.000Z',
    supplier: mockSuppliers[1],
    items: [
      {
        id: '201',
        supplier_order_id: '2',
        medication_name: 'Omeprazole 20mg',
        quantity: 200,
        unit_price: 1.25,
        subtotal: 250.0,
      },
      {
        id: '202',
        supplier_order_id: '2',
        medication_name: 'Atorvastatin 20mg',
        quantity: 250,
        unit_price: 2.50,
        subtotal: 625.0,
      }
    ]
  },
  {
    id: '3',
    tenant_id: '1',
    supplier_id: '3',
    order_date: '2025-04-10T09:45:00.000Z',
    status: 'delivered',
    total_cost: 1532.25,
    created_by: '1',
    created_at: '2025-04-10T09:45:00.000Z',
    supplier: mockSuppliers[2],
    items: [
      {
        id: '301',
        supplier_order_id: '3',
        medication_name: 'Cetirizine 10mg',
        quantity: 150,
        unit_price: 0.85,
        subtotal: 127.50,
      },
      {
        id: '302',
        supplier_order_id: '3',
        medication_name: 'Paracetamol 500mg',
        quantity: 1000,
        unit_price: 0.25,
        subtotal: 250.0,
      },
      {
        id: '303',
        supplier_order_id: '3',
        medication_name: 'Ibuprofen 200mg',
        quantity: 800,
        unit_price: 0.35,
        subtotal: 280.0,
      },
      {
        id: '304',
        supplier_order_id: '3',
        medication_name: 'Aspirin 81mg',
        quantity: 2500,
        unit_price: 0.35,
        subtotal: 875.0,
      }
    ]
  },
  {
    id: '4',
    tenant_id: '1',
    supplier_id: '1',
    order_date: '2025-04-05T16:30:00.000Z',
    status: 'cancelled',
    total_cost: 450.75,
    created_by: '1',
    created_at: '2025-04-05T16:30:00.000Z',
    supplier: mockSuppliers[0],
    items: [
      {
        id: '401',
        supplier_order_id: '4',
        medication_name: 'Albuterol Inhaler',
        quantity: 25,
        unit_price: 18.03,
        subtotal: 450.75,
      }
    ]
  }
];

const OrdersPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [dateFilter, setDateFilter] = useState('all');
  const [isCreateOrderOpen, setIsCreateOrderOpen] = useState(false);
  const [orders, setOrders] = useState<SupplierOrder[]>(mockOrders);

  const handleStatusChange = (orderId: string, newStatus: 'pending' | 'shipped' | 'delivered' | 'cancelled') => {
    setOrders(orders.map(order => {
      if (order.id === orderId) {
        return {
          ...order,
          status: newStatus
        };
      }
      return order;
    }));
  };

  const handleCreateOrder = (newOrder: SupplierOrder) => {
    setOrders([newOrder, ...orders]);
    setIsCreateOrderOpen(false);
  };

  const filteredOrders = orders.filter((order) => {
    // Apply search filter
    const supplierName = order.supplier?.name.toLowerCase() || '';
    const medicationNames = order.items?.map(i => i.medication_name.toLowerCase()).join(' ') || '';

    const matchesSearch =
      supplierName.includes(searchQuery.toLowerCase()) ||
      medicationNames.includes(searchQuery.toLowerCase()) ||
      order.id.toLowerCase().includes(searchQuery.toLowerCase());

    // Apply status filter
    const matchesStatus = statusFilter === 'all' || order.status === statusFilter;

    // Apply date filter
    let matchesDate = true;
    if (dateFilter !== 'all') {
      const orderDate = new Date(order.order_date);
      const today = new Date();

      if (dateFilter === 'today') {
        matchesDate = format(orderDate, 'yyyy-MM-dd') === format(today, 'yyyy-MM-dd');
      } else if (dateFilter === 'week') {
        const oneWeekAgo = new Date(today);
        oneWeekAgo.setDate(today.getDate() - 7);
        matchesDate = orderDate >= oneWeekAgo;
      } else if (dateFilter === 'month') {
        const oneMonthAgo = new Date(today);
        oneMonthAgo.setMonth(today.getMonth() - 1);
        matchesDate = orderDate >= oneMonthAgo;
      }
    }

    return matchesSearch && matchesStatus && matchesDate;
  });

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold flex items-center gap-2">
              <Package className="h-6 w-6 text-pharmacy-primary" />
              Supplier Orders
            </h1>
            <p className="text-muted-foreground">
              Manage your pharmacy's supply chain and orders
            </p>
          </div>
          <Button
            onClick={() => setIsCreateOrderOpen(true)}
            className="bg-pharmacy-primary hover:bg-pharmacy-dark flex items-center gap-2"
          >
            <Plus className="h-4 w-4" />
            Create New Order
          </Button>
        </div>

        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search orders by supplier or medication..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <Filter className="h-4 w-4 text-muted-foreground" />
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="shipped">Shipped</SelectItem>
                <SelectItem value="delivered">Delivered</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>
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
          </div>
        </div>

        <Tabs defaultValue="active">
          <TabsList>
            <TabsTrigger value="active">Active</TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
            <TabsTrigger value="all">All</TabsTrigger>
          </TabsList>

          <TabsContent value="active" className="mt-6">
            {/* <OrderList
              orders={filteredOrders.filter(o =>
                o.status !== 'delivered' && o.status !== 'cancelled'
              )}
              onStatusChange={handleStatusChange}
            /> */}
          </TabsContent>

          <TabsContent value="completed" className="mt-6">
            {/* <OrderList
              orders={filteredOrders.filter(o =>
                o.status === 'delivered' || o.status === 'cancelled'
              )}
              onStatusChange={handleStatusChange}
            /> */}
          </TabsContent>

          <TabsContent value="all" className="mt-6">
            {/* <OrderList
              orders={filteredOrders}
              onStatusChange={handleStatusChange}
            /> */}
          </TabsContent>
        </Tabs>
      </div>

      {/* <CreateOrderDialog
        open={isCreateOrderOpen}
        onOpenChange={setIsCreateOrderOpen}
        onSave={handleCreateOrder}
        suppliers={mockSuppliers}
      /> */}
    </DashboardLayout>
  );
};

export default OrdersPage;