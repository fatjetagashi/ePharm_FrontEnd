
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { useAuth } from "@/context/AuthContext";

import {
  Home,
  FileText,
  Bell,
  Settings,
  LogOut,
  Menu,
  X,
  Beaker,
  Building
} from 'lucide-react';

const Sidebar = () => {
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { logout } = useAuth();


  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  const toggleMobileSidebar = () => {
    setMobileOpen(!mobileOpen);
  };

  // Close mobile sidebar when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const sidebarEl = document.getElementById('sidebar');
      const mobileButtonEl = document.getElementById('mobile-sidebar-button');

      if (mobileOpen &&
        sidebarEl &&
        !sidebarEl.contains(event.target as Node) &&
        mobileButtonEl &&
        !mobileButtonEl.contains(event.target as Node)) {
        setMobileOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [mobileOpen]);

  // Close mobile sidebar when changing routes
  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  const navItems = [
    { name: 'Dashboard', path: '/', icon: <Home className="h-5 w-5" /> },
    { name: 'My Prescriptions', path: '/prescriptions', icon: <FileText className="h-5 w-5" /> },
    { name: 'Pharmacies', path: '/pharmacies', icon: <Building className="h-5 w-5" /> },
    { name: 'My Medications', path: '/medicines', icon: <Beaker className="h-5 w-5" /> },
    { name: 'Notifications', path: '/notifications', icon: <Bell className="h-5 w-5" /> },
    { name: 'Settings', path: '/settings', icon: <Settings className="h-5 w-5" /> },
  ];

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        id="mobile-sidebar-button"
        className="lg:hidden fixed top-4 left-4 z-50 p-2 rounded-md bg-white shadow-md"
        onClick={toggleMobileSidebar}
      >
        {mobileOpen ? <X className="h-6 w-6 text-gray-700" /> : <Menu className="h-6 w-6 text-gray-700" />}
      </button>

      {/* Sidebar */}
      <aside
        id="sidebar"
        className={cn(
          "h-screen bg-white border-r shadow-sm transition-all duration-300 ease-in-out lg:static lg:translate-x-0",
          collapsed ? "w-20" : "w-64",
          "fixed lg:relative z-40",
          mobileOpen ? "translate-x-0" : "-translate-x-full"
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
            {navItems.map((item) => (
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
          <button
            onClick={logout}
            className={cn(
              "flex items-center gap-3 w-full px-3 py-2 text-gray-700 rounded-md hover:bg-gray-100 transition-colors",
              collapsed && "justify-center px-2"
            )}
          >
            <LogOut className="h-5 w-5" />
            {!collapsed && <span>Logout</span>}
          </button>
        </div>
      </aside>

      {/* Mobile Overlay */}
      {mobileOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-30"
          onClick={() => setMobileOpen(false)}
        />
      )}
    </>
  );
};

export default Sidebar;