import React from 'react';
import DashboardLayout from '@/components/Layout/AdminComponents/DashboardLayout';
import AdminDashboard from '@/components/Dashboard/AdminDashboard';
import { SidebarProvider } from '@/components/Layout/AdminComponents/SidebarContext'; // make sure the path is correct

const Index = () => {
  return (
    <SidebarProvider>
      <DashboardLayout>
        <AdminDashboard />
      </DashboardLayout>
    </SidebarProvider>
  );
};

export default Index;