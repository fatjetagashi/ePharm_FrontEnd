
import React from 'react';
import DashboardLayout from '@/components/Layout/DashboardLayout';
import PharmacyDashboard from '@/components/Dashboard/PharmacyDashboard';

const PharmacyDashboardPage = () => {
  return (
    <DashboardLayout>
      <PharmacyDashboard />
    </DashboardLayout>
  );
};

export default PharmacyDashboardPage;