
import React from 'react';
import { Navigate } from 'react-router-dom';

const Index = () => {
    // In a real app, you would check authentication and role here
    // For now, we'll always redirect to the pharmacy dashboard
    return <Navigate to="/pharmacy-dashboard" replace />;
};

export default Index;
