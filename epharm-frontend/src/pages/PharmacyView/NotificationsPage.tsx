
import React, { useState } from 'react';
import DashboardLayout from '@/components/Layout/PharmacyComponents/DashboardLayout';
import { Bell, Search, CheckCircle, Filter } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Notification } from '@/types';
import { format } from 'date-fns';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';

// Mock data for notifications
// @ts-ignore
const mockNotifications: Notification[] = [
  {
    id: '1',
    user_id: '1',
    type: 'medication',
    title: 'Low Stock Alert: Amoxicillin',
    message: 'Amoxicillin 500mg stock is below the minimum threshold. Current stock: 5 units.',
    is_read: false,
    created_at: '2025-04-26T08:30:00.000Z',
  },
  {
    id: '2',
    user_id: '1',
    type: 'order_update',
    title: 'Order #ORD-2301 Status Updated',
    message: 'Your order from MediSupply Inc. has been shipped and is expected to arrive within 2 days.',
    is_read: false,
    created_at: '2025-04-25T14:15:00.000Z',
  },
  {
    id: '3',
    user_id: '1',
    type: 'prescription_received',
    title: 'New Prescription Received',
    message: 'A new prescription for patient Alice Johnson has been received and is pending processing.',
    is_read: false,
    created_at: '2025-04-25T10:45:00.000Z',
  },
  {
    id: '4',
    user_id: '1',
    type: 'medicine_low_stock',
    title: 'Low Stock Alert: Lisinopril',
    message: 'Lisinopril 10mg stock is below the minimum threshold. Current stock: 8 units.',
    is_read: true,
    created_at: '2025-04-24T16:20:00.000Z',
  },
  {
    id: '5',
    user_id: '1',
    type: 'system',
    title: 'System Maintenance Scheduled',
    message: 'System maintenance is scheduled for April 28, 2025, from 2:00 AM to 4:00 AM. The system may be unavailable during this time.',
    is_read: true,
    created_at: '2025-04-23T11:10:00.000Z',
  },
  {
    id: '6',
    user_id: '1',
    type: 'prescription_received',
    title: 'New Prescription Received',
    message: 'A new prescription for patient Robert Smith has been received and is pending processing.',
    is_read: true,
    created_at: '2025-04-22T09:30:00.000Z',
  },
  {
    id: '7',
    user_id: '1',
    type: 'order_update',
    title: 'Order #ORD-2298 Delivered',
    message: 'Your order from PharmaBulk Distributors has been delivered. Please verify the inventory.',
    is_read: true,
    created_at: '2025-04-21T15:45:00.000Z',
  }
];

// Helper function to format notification time
const formatNotificationTime = (dateString: string): string => {
  const notificationDate = new Date(dateString);
  const now = new Date();
  const diffInMinutes = Math.floor((now.getTime() - notificationDate.getTime()) / (1000 * 60));

  if (diffInMinutes < 60) {
    return `${diffInMinutes} ${diffInMinutes === 1 ? 'minute' : 'minutes'} ago`;
  } else if (diffInMinutes < 24 * 60) {
    const hours = Math.floor(diffInMinutes / 60);
    return `${hours} ${hours === 1 ? 'hour' : 'hours'} ago`;
  } else if (diffInMinutes < 48 * 60) {
    return 'Yesterday';
  } else {
    return format(notificationDate, 'MMM d, yyyy');
  }
};

const NotificationsPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications);

  const handleMarkAsRead = (id: string) => {
    setNotifications(notifications.map(notification =>
      notification.id === id ? { ...notification, is_read: true } : notification
    ));
  };

  const handleMarkAllAsRead = () => {
    setNotifications(notifications.map(notification => ({ ...notification, is_read: true })));
  };

  const filteredNotifications = notifications.filter((notification) => {
    // Apply search filter
    const searchableContent = [
      notification.title.toLowerCase(),
      notification.message.toLowerCase(),
    ].join(' ');

    const matchesSearch = searchableContent.includes(searchQuery.toLowerCase());

    // Apply type filter
    const matchesType = typeFilter === 'all' || notification.type === typeFilter;

    return matchesSearch && matchesType;
  });

  const unreadCount = notifications.filter(notification => !notification.is_read).length;

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold flex items-center gap-2">
              <Bell className="h-6 w-6 text-pharmacy-primary" />
              Notifications
              {unreadCount > 0 && (
                <Badge className="ml-2 bg-pharmacy-primary">{unreadCount} unread</Badge>
              )}
            </h1>
            <p className="text-muted-foreground">
              Stay updated with important alerts and information
            </p>
          </div>
          <Button
            variant="outline"
            onClick={handleMarkAllAsRead}
            className="flex items-center gap-2"
            disabled={unreadCount === 0}
          >
            <CheckCircle className="h-4 w-4" />
            Mark All as Read
          </Button>
        </div>

        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search notifications..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-muted-foreground" />
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="medicine_low_stock">Low Stock Alerts</SelectItem>
                <SelectItem value="order_update">Order Updates</SelectItem>
                <SelectItem value="prescription_received">Prescriptions</SelectItem>
                <SelectItem value="system">System Notices</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <Tabs defaultValue="all">
          <TabsList>
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="unread">Unread</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="mt-6">
            <NotificationList
              notifications={filteredNotifications}
              onMarkAsRead={handleMarkAsRead}
            />
          </TabsContent>

          <TabsContent value="unread" className="mt-6">
            <NotificationList
              notifications={filteredNotifications.filter(n => !n.is_read)}
              onMarkAsRead={handleMarkAsRead}
            />
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

interface NotificationListProps {
  notifications: Notification[];
  onMarkAsRead: (id: string) => void;
}

const NotificationList = ({ notifications, onMarkAsRead }: NotificationListProps) => {
  if (notifications.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <Bell className="h-12 w-12 text-muted-foreground mb-4" />
        <h3 className="text-lg font-medium">No notifications</h3>
        <p className="text-muted-foreground">All caught up! There are no notifications to display.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {notifications.map((notification) => (
        <Card
          key={notification.id}
          className={`p-4 transition-colors hover:bg-muted/30 ${!notification.is_read ? 'border-l-4 border-l-pharmacy-primary' : ''}`}
        >
          <div className="flex justify-between items-start">
            <div className="flex items-start gap-4">
              <div className={`mt-1 p-2 rounded-full ${getNotificationIconClass(notification.type)}`}>
                {getNotificationIcon(notification.type)}
              </div>
              <div>
                <h3 className={`font-medium ${!notification.is_read ? 'font-semibold' : ''}`}>
                  {notification.title}
                </h3>
                <p className="text-sm text-muted-foreground mt-1">{notification.message}</p>
                <p className="text-xs text-muted-foreground mt-2">
                  {formatNotificationTime(notification.created_at)}
                </p>
              </div>
            </div>
            {!notification.is_read && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onMarkAsRead(notification.id)}
                className="text-pharmacy-primary hover:text-pharmacy-dark hover:bg-pharmacy-light"
              >
                Mark as Read
              </Button>
            )}
          </div>
        </Card>
      ))}
    </div>
  );
};

// Helper functions for notification icons and colors
const getNotificationIcon = (type: string) => {
  switch (type) {
    case 'medicine_low_stock':
      return <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-amber-600"><path d="m4.93 4.93 4.24 4.24"></path><path d="m14.83 9.17 4.24-4.24"></path><path d="m9.17 14.83 4.24 4.24"></path><circle cx="12" cy="12" r="3"></circle><path d="M12 6v3"></path><path d="M12 15v3"></path><path d="M9 12H6"></path><path d="M18 12h-3"></path></svg>;
    case 'order_update':
      return <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-600"><path d="M4 10c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h4c1.1 0 2 .9 2 2"></path><path d="M10 16c-1.1 0-2-.9-2-2v-4c0-1.1.9-2 2-2h4c1.1 0 2 .9 2 2"></path><path d="M16 22c-1.1 0-2-.9-2-2v-4c0-1.1.9-2 2-2h4c1.1 0 2 .9 2 2v4c0 1.1-.9 2-2 2h-4Z"></path></svg>;
    case 'prescription_received':
      return <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-pharmacy-primary"><path d="M14 3v4a1 1 0 0 0 1 1h4"></path><path d="M17 21H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h7l5 5v11a2 2 0 0 1-2 2Z"></path><path d="M9 17h6"></path><path d="M9 13h6"></path></svg>;
    case 'system':
      return <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-600"><circle cx="12" cy="12" r="10"></circle><line x1="12" x2="12" y1="8" y2="12"></line><line x1="12" x2="12.01" y1="16" y2="16"></line></svg>;
    default:
      return <Bell className="h-4 w-4" />;
  }
};

const getNotificationIconClass = (type: string) => {
  switch (type) {
    case 'medicine_low_stock':
      return 'bg-amber-100 text-amber-600';
    case 'order_update':
      return 'bg-blue-100 text-blue-600';
    case 'prescription_received':
      return 'bg-pharmacy-light text-pharmacy-primary';
    case 'system':
      return 'bg-gray-100 text-gray-600';
    default:
      return 'bg-gray-100 text-gray-600';
  }
};

export default NotificationsPage;