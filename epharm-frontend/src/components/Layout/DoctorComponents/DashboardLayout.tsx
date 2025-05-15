
import React from 'react';
import { useLocation } from 'react-router-dom';
import Sidebar from './Sidebar';
import TopNavbar from './TopNavbar';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const location = useLocation();
  
  return (
    <div className="flex h-screen bg-secondary/20">
      <Sidebar />
      <div className="flex flex-col flex-1 overflow-hidden transition-all duration-300">
        <TopNavbar />
        <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
