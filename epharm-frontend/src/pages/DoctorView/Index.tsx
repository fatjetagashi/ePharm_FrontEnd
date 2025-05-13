
import React from 'react';
import DashboardLayout from '@/components/Layout/DashboardLayout';
import DoctorDashboard from '@/components/Dashboard/DoctorDashboard';

const Index = () => {
    return (
        <DashboardLayout>
            <DoctorDashboard />
        </DashboardLayout>
    );
};

export default Index;
