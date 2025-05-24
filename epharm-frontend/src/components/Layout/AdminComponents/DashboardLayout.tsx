
import React from 'react';
import { useLocation } from 'react-router-dom';
import Sidebar from './Sidebar';
import TopNavbar from './TopNavbar';
import { useSidebarState } from './SidebarContext';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const location = useLocation();
  const { collapsed } = useSidebarState();


  return (
    <div className="flex h-screen bg-secondary/20">
      {/* Sidebar container that adjusts width based on collapsed state */}
      <div className={`flex-none transition-all duration-300 ease-in-out ${collapsed ? 'w-20' : 'w-64'}`}>
        <Sidebar />
      </div>
      {/* Main content area - flex-1 ensures it takes remaining width */}
      <div className="flex flex-col flex-1 overflow-hidden">
        <TopNavbar />
        <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;