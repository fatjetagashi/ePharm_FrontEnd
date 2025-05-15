
import React from 'react';
import DashboardLayout from '@/components/Layout/PharmacyComponents/DashboardLayout';
import PharmacyDashboard from '@/components/Dashboard/PharmacyDashboard';

const PharmacyDashboardPage = () => {
  return (
    <DashboardLayout>
      <PharmacyDashboard />
    </DashboardLayout>
  );
};

export default PharmacyDashboardPage;