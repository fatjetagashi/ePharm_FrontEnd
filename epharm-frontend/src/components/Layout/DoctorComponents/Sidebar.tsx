
import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
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
  Stethoscope,
  MessageSquare
} from 'lucide-react';

const Sidebar = () => {
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const sidebarRef = useRef<HTMLDivElement>(null);
  
  // Mock user role - in a real app this would come from authentication
  // Changed default to 'doctor' for demonstration purposes
  const userRole = 'doctor'; // could be 'admin', 'doctor', 'patient', 'pharmacy'

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
    // Set the sidebar state in the body to adjust content margin
    document.body.classList.toggle('sidebar-collapsed', !collapsed);
  };

  const toggleMobileSidebar = () => {
    setMobileOpen(!mobileOpen);
    // Set the mobile sidebar state in the body
    document.body.classList.toggle('sidebar-mobile-open', !mobileOpen);
  };
  
  // Close sidebar when clicking outside of it
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        sidebarRef.current && 
        !sidebarRef.current.contains(event.target as Node) && 
        mobileOpen
      ) {
        setMobileOpen(false);
        document.body.classList.remove('sidebar-mobile-open');
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [mobileOpen]);

  // Set initial body class based on sidebar state
  useEffect(() => {
    document.body.classList.toggle('sidebar-collapsed', collapsed);
    
    // Cleanup function
    return () => {
      document.body.classList.remove('sidebar-collapsed');
      document.body.classList.remove('sidebar-mobile-open');
    };
  }, []);

  const navItems = {
    admin: [
      { name: 'Dashboard', path: '/', icon: <Home className="h-5 w-5" /> },
      { name: 'Doctors', path: '/doctors', icon: <Stethoscope className="h-5 w-5" /> },
      { name: 'Patients', path: '/patients', icon: <Users className="h-5 w-5" /> },
      { name: 'Pharmacies', path: '/pharmacies', icon: <Building className="h-5 w-5" /> },
      { name: 'Reports', path: '/reports', icon: <FileText className="h-5 w-5" /> },
      { name: 'Settings', path: '/settings', icon: <Settings className="h-5 w-5" /> },
    ],
    doctor: [
      { name: 'Dashboard', path: '/', icon: <Home className="h-5 w-5" /> },
      { name: 'My Patients', path: '/patients', icon: <Users className="h-5 w-5" /> },
      { name: 'Prescriptions', path: '/prescriptions', icon: <FileText className="h-5 w-5" /> },
      { name: 'Write Prescription', path: '/prescriptions/create', icon: <Beaker className="h-5 w-5" /> },
      { name: 'Appointments', path: '/appointments', icon: <CalendarDays className="h-5 w-5" /> },
      { name: 'Messages', path: '/chat', icon: <MessageSquare className="h-5 w-5" /> },
      { name: 'Notifications', path: '/notifications', icon: <Bell className="h-5 w-5" /> },
      { name: 'Settings', path: '/settings', icon: <Settings className="h-5 w-5" /> },
    ],
    patient: [
      { name: 'Dashboard', path: '/', icon: <Home className="h-5 w-5" /> },
      { name: 'My Prescriptions', path: '/prescriptions', icon: <FileText className="h-5 w-5" /> },
      { name: 'Pharmacies', path: '/pharmacies', icon: <Building className="h-5 w-5" /> },
      { name: 'My Medicines', path: '/medicines', icon: <Beaker className="h-5 w-5" /> },
      { name: 'Messages', path: '/chat', icon: <MessageSquare className="h-5 w-5" /> },
      { name: 'Notifications', path: '/notifications', icon: <Bell className="h-5 w-5" /> },
      { name: 'Settings', path: '/settings', icon: <Settings className="h-5 w-5" /> },
    ],
    pharmacy: [
      { name: 'Dashboard', path: '/', icon: <Home className="h-5 w-5" /> },
      { name: 'Prescriptions', path: '/prescriptions', icon: <FileText className="h-5 w-5" /> },
      { name: 'Inventory', path: '/inventory', icon: <Package className="h-5 w-5" /> },
      { name: 'Customers', path: '/customers', icon: <Users className="h-5 w-5" /> },
      { name: 'Orders', path: '/orders', icon: <Package className="h-5 w-5" /> },
      { name: 'Settings', path: '/settings', icon: <Settings className="h-5 w-5" /> },
    ],
  };

  const currentNavItems = navItems[userRole as keyof typeof navItems] || navItems.patient;

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
        ref={sidebarRef}
        className={cn(
          "fixed inset-y-0 left-0 z-40 flex flex-col bg-white border-r shadow-sm transition-all duration-300 ease-in-out",
          collapsed ? "w-16" : "w-64",
          mobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        )}
      >
        <div className="flex items-center justify-between h-16 px-4 border-b">
          <Link to="/" className="flex items-center gap-2">
            {!collapsed && (
              <span className="text-xl font-bold text-health-primary">ePharm</span>
            )}
            {collapsed && (
              <span className="text-xl font-bold text-health-primary">e</span>
            )}
          </Link>
          <button 
            onClick={toggleSidebar}
            className="hidden lg:block p-1.5 rounded-lg bg-gray-100 hover:bg-gray-200"
          >
            <Menu className="h-5 w-5" />
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
                  location.pathname === item.path 
                    ? "bg-health-light text-health-primary" 
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
