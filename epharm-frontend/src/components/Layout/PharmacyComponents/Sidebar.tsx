
import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { 
  Home, 
  Users, 
  FileText, 
  Package, 
  Bell, 
  Settings, 
  LogOut, 
  Menu, 
  X,
  Beaker,
  Building,
  CalendarDays,
  Receipt,
  ShoppingCart,
  Truck,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

const Sidebar = () => {
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  
  // For this pharmacy view, we'll always use the pharmacy role
  const userRole = 'pharmacy';

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  const toggleMobileSidebar = () => {
    setMobileOpen(!mobileOpen);
  };

  const navItems = {
    admin: [
      { name: 'Dashboard', path: '/pharmacy-dashboard', icon: <Home className="h-5 w-5" /> },
      { name: 'Doctors', path: '/doctors', icon: <Users className="h-5 w-5" /> },
      { name: 'Patients', path: '/patients', icon: <Users className="h-5 w-5" /> },
      { name: 'Pharmacies', path: '/pharmacies', icon: <Building className="h-5 w-5" /> },
      { name: 'Reports', path: '/reports', icon: <FileText className="h-5 w-5" /> },
      { name: 'Settings', path: '/settings', icon: <Settings className="h-5 w-5" /> },
    ],
    doctor: [
      { name: 'Dashboard', path: '/pharmacy-dashboard', icon: <Home className="h-5 w-5" /> },
      { name: 'My Patients', path: '/patients', icon: <Users className="h-5 w-5" /> },
      { name: 'Prescriptions', path: '/prescriptions', icon: <FileText className="h-5 w-5" /> },
      { name: 'Appointments', path: '/appointments', icon: <CalendarDays className="h-5 w-5" /> },
      { name: 'Notifications', path: '/notifications', icon: <Bell className="h-5 w-5" /> },
      { name: 'Settings', path: '/settings', icon: <Settings className="h-5 w-5" /> },
    ],
    patient: [
      { name: 'Dashboard', path: '/pharmacy-dashboard', icon: <Home className="h-5 w-5" /> },
      { name: 'My Prescriptions', path: '/prescriptions', icon: <FileText className="h-5 w-5" /> },
      { name: 'Pharmacies', path: '/pharmacies', icon: <Building className="h-5 w-5" /> },
      { name: 'My Medications', path: '/medicines', icon: <Beaker className="h-5 w-5" /> },
      { name: 'Notifications', path: '/notifications', icon: <Bell className="h-5 w-5" /> },
      { name: 'Settings', path: '/settings', icon: <Settings className="h-5 w-5" /> },
    ],
    pharmacy: [
      { name: 'Dashboard', path: '/pharmacy-dashboard', icon: <Home className="h-5 w-5" /> },
      { name: 'Prescriptions', path: '/prescriptions', icon: <FileText className="h-5 w-5" /> },
      { name: 'Medicines', path: '/medicines', icon: <Beaker className="h-5 w-5" /> },
      { name: 'Patients', path: '/patients', icon: <Users className="h-5 w-5" /> },
      { name: 'Orders', path: '/orders', icon: <Truck className="h-5 w-5" /> },
      { name: 'Billing', path: '/billing', icon: <Receipt className="h-5 w-5" /> },
      { name: 'Notifications', path: '/notifications', icon: <Bell className="h-5 w-5" /> },
      { name: 'Settings', path: '/settings', icon: <Settings className="h-5 w-5" /> },
    ],
  };

  const currentNavItems = navItems[userRole as keyof typeof navItems] || navItems.pharmacy;

  return (
    <>
      {/* Mobile Menu Button */}
      <button 
        className="lg:hidden fixed top-4 left-4 z-50 p-2 rounded-md bg-white shadow-md"
        onClick={toggleMobileSidebar}
      >
        {mobileOpen ? <X className="h-6 w-6 text-gray-700" /> : <Menu className="h-6 w-6 text-gray-700" />}
      </button>

      {/* Mobile Overlay */}
      {mobileOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-black/50 z-30"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-40 flex flex-col bg-white border-r shadow-sm transition-all duration-300 ease-in-out",
          collapsed ? "w-20" : "w-64",
          mobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        )}
      >
        <div className="flex items-center justify-between h-16 px-4 border-b">
          <Link to="/" className="flex items-center gap-2">
            {!collapsed && (
              <div className="flex items-center">
                <span className="text-xl font-bold text-pharmacy-primary">Med</span>
                <span className="text-xl font-bold text-gray-800">Pharm</span>
              </div>
            )}
            {collapsed && (
              <div className="h-8 w-8 rounded-full bg-pharmacy-primary flex items-center justify-center text-white font-bold">
                M
              </div>
            )}
          </Link>
          <button 
            onClick={toggleSidebar}
            className="p-1.5 rounded-lg bg-gray-100 hover:bg-gray-200"
          >
            {collapsed ? <ChevronRight className="h-5 w-5" /> : <ChevronLeft className="h-5 w-5" />}
          </button>
        </div>

        <div className="flex-1 overflow-y-auto py-4">
          <nav className="px-2 space-y-1">
            {currentNavItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  "flex items-center gap-3 px-3 py-2 rounded-md transition-colors",
                  (location.pathname === item.path || 
                   (item.path === '/pharmacy-dashboard' && location.pathname === '/')) 
                    ? "bg-pharmacy-light text-pharmacy-primary" 
                    : "text-gray-700 hover:bg-gray-100",
                  collapsed && "justify-center px-2"
                )}
              >
                {item.icon}
                {!collapsed && <span>{item.name}</span>}
              </Link>
            ))}
          </nav>
        </div>

        <div className="p-4 border-t">
          <button className={cn(
            "flex items-center gap-3 w-full px-3 py-2 text-gray-700 rounded-md hover:bg-gray-100 transition-colors",
            collapsed && "justify-center px-2"
          )}>
            <LogOut className="h-5 w-5" />
            {!collapsed && <span>Logout</span>}
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
