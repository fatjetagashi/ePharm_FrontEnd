
import React from 'react';
import { FileText, Package, ShoppingCart, Users, TrendingUp, AlertCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';

const PharmacyDashboard = () => {
  // Mock data
  const stats = {
    pendingPrescriptions: 12,
    lowStockItems: 8,
    todayOrders: 24,
    activeCustomers: 186,
  };

  // Mock prescription data
  const pendingPrescriptions = [
    { id: 1, patient: "Alice Johnson", medications: 3, timestamp: "10:24 AM", status: "new" },
    { id: 2, patient: "Robert Smith", medications: 2, timestamp: "09:15 AM", status: "new" },
    { id: 3, patient: "Emma Davis", medications: 1, timestamp: "Yesterday", status: "in-progress" },
  ];

  // Mock inventory data
  const lowStockItems = [
    { id: 1, name: "Amoxicillin 500mg", current: 12, minimum: 20, expiry: "2025-10-15" },
    { id: 2, name: "Lisinopril 10mg", current: 8, minimum: 15, expiry: "2025-09-30" },
    { id: 3, name: "Atorvastatin 20mg", current: 5, minimum: 15, expiry: "2025-12-20" },
    { id: 4, name: "Metformin 500mg", current: 9, minimum: 25, expiry: "2025-11-10" },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Pharmacy Dashboard</h1>
        <p className="text-muted-foreground">Welcome back to MediPharm!</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Prescriptions</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.pendingPrescriptions}</div>
            <p className="text-xs text-muted-foreground">
              2 new in the last hour
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Low Stock Items</CardTitle>
            <AlertCircle className="h-4 w-4 text-warning" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.lowStockItems}</div>
            <p className="text-xs text-muted-foreground">
              Need to reorder soon
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Today's Orders</CardTitle>
            <ShoppingCart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.todayOrders}</div>
            <p className="text-xs text-muted-foreground">
              18 completed, 6 in progress
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Customers</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.activeCustomers}</div>
            <p className="text-xs text-muted-foreground">
              +12 from last week
            </p>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Pending Prescriptions</CardTitle>
            <CardDescription>Prescriptions waiting to be processed</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {pendingPrescriptions.map((prescription) => (
                <div key={prescription.id} className="flex items-center gap-4 p-4 border rounded-lg">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    prescription.status === "new" 
                      ? "bg-blue-100" 
                      : "bg-amber-100"
                  }`}>
                    <FileText className={`h-5 w-5 ${
                      prescription.status === "new" 
                        ? "text-blue-600" 
                        : "text-amber-600"
                    }`} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <p className="font-medium">{prescription.patient}</p>
                      {prescription.status === "new" && (
                        <span className="inline-flex items-center rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800">
                          New
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {prescription.medications} medications • {prescription.timestamp}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm">Process</Button>
                    <Button size="sm" variant="outline">View</Button>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4">
              <Button variant="outline" className="w-full">View All Prescriptions</Button>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Low Stock Alert</CardTitle>
            <CardDescription>Items that need to be restocked</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {lowStockItems.map((item) => (
                <div key={item.id} className="space-y-2">
                  <div className="flex justify-between">
                    <p className="font-medium">{item.name}</p>
                    <span className="text-sm text-muted-foreground">
                      Exp: {new Date(item.expiry).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span>Current: {item.current}</span>
                      <span>Minimum: {item.minimum}</span>
                    </div>
                    <Progress value={(item.current / item.minimum) * 100} className="h-2" />
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-6">
              <Button className="w-full">Order Inventory</Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button variant="outline" className="h-auto py-4 flex flex-col items-center gap-2">
              <Package className="h-5 w-5" />
              <span>Add Medicine</span>
            </Button>
            <Button className="h-auto py-4 flex flex-col items-center gap-2 bg-pharmacy-primary hover:bg-pharmacy-primary/90">
              <FileText className="h-5 w-5" />
              <span>Process Prescriptions</span>
            </Button>
            <Button variant="outline" className="h-auto py-4 flex flex-col items-center gap-2">
              <ShoppingCart className="h-5 w-5" />
              <span>New Sale</span>
            </Button>
            <Button variant="outline" className="h-auto py-4 flex flex-col items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              <span>Reports</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PharmacyDashboard;