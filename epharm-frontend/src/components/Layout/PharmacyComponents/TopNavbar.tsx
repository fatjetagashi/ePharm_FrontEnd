
import React, { useState } from 'react';
import { Bell, Search, MessageSquare, User } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import { useAuth } from "@/context/AuthContext";


const TopNavbar = () => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const isMobile = useIsMobile();
  const { logout } = useAuth();

  // Mock notification data
  const notifications = [
    { id: 1, message: "New prescription received", time: "5 min ago", read: false },
    { id: 2, message: "Reminder: Take medication", time: "1 hour ago", read: false },
    { id: 3, message: "Dr. Johnson approved your request", time: "Yesterday", read: true },
  ];

  // Mock user data
  const user = {
    name: "Jane Doe",
    role: "Admin",
    avatar: null,
  };

  const userDetails = JSON.parse(localStorage.getItem("user") || "{}");


  return (
    <header className="bg-white border-b px-4 py-3 lg:py-4 flex items-center justify-between">
      <div className="flex items-center lg:w-1/3">
        {!isMobile && (
          <div className="relative hidden md:block">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <input
              type="text"
              placeholder="Search..."
              className="pl-10 pr-4 py-2 rounded-full border border-gray-200 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-health-primary/20 focus:border-health-primary w-full max-w-xs"
            />
          </div>
        )}
      </div>

      <div className="flex items-center gap-2 lg:gap-4">
        <div className="relative">
          <button
            className="p-2 rounded-full hover:bg-gray-100 relative"
            onClick={() => setShowNotifications(!showNotifications)}
          >
            <Bell className="h-5 w-5 text-gray-700" />
            <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-red-500"></span>
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 bg-white rounded-md shadow-lg border z-50">
              <div className="p-3 border-b">
                <h3 className="font-medium">Notifications</h3>
              </div>
              <div className="max-h-96 overflow-y-auto">
                {notifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={`p-3 border-b hover:bg-gray-50 cursor-pointer ${
                      !notification.read ? "bg-blue-50" : ""
                    }`}
                  >
                    <p className="text-sm">{notification.message}</p>
                    <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
                  </div>
                ))}
              </div>
              <div className="p-2 text-center">
                <button className="text-sm text-health-primary hover:underline">
                  View all notifications
                </button>
              </div>
            </div>
          )}
        </div>

        <div className="relative">
          <button
            className="p-2 rounded-full hover:bg-gray-100"
            aria-label="Messages"
          >
            <MessageSquare className="h-5 w-5 text-gray-700" />
          </button>
        </div>

        <div className="relative">
          <button
            className="flex items-center gap-2 p-1 rounded-full hover:bg-gray-100"
            onClick={() => setShowProfile(!showProfile)}
          >
            <div className="w-8 h-8 bg-health-primary text-white rounded-full flex items-center justify-center">
              {user.avatar ? (
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-full h-full rounded-full object-cover"
                />
              ) : (
                <User className="h-5 w-5" />
              )}
            </div>
            {!isMobile && (
              <div className="hidden md:block text-left">
                <p className="text-sm font-medium line-clamp-1">{userDetails?.name ?? user.name}</p>
                <p className="text-xs text-gray-500">{userDetails?.role ?? user.role}</p>
              </div>
            )}
          </button>

          {showProfile && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg border z-50">
              <div className="p-3 border-b">
                <p className="font-medium">{userDetails?.name ?? user.name}</p>
                <p className="text-sm text-gray-500">{userDetails?.role ?? user.role}</p>
              </div>
              <div className="p-2">
                <button className="w-full text-left px-3 py-2 text-sm rounded-md hover:bg-gray-100">
                  Profile
                </button>
                <button className="w-full text-left px-3 py-2 text-sm rounded-md hover:bg-gray-100">
                  Settings
                </button>
                <button onClick={logout} className="w-full text-left px-3 py-2 text-sm rounded-md hover:bg-gray-100">
                  Logout
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default TopNavbar;