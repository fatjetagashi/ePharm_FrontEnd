
import React, { useState } from 'react';
import DashboardLayout from '@/components/Layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Bell, FileText, Gift, Clock, CheckCircle, Settings } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { toast } from '@/hooks/use-toast';

// Mock notification data
const notificationsData = [
  {
    id: 'n1',
    type: 'prescription',
    title: 'New Prescription Available',
    message: 'Dr. Smith has created a new prescription for you.',
    date: '2025-04-26T09:30:00',
    read: false,
  },
  {
    id: 'n2',
    type: 'medication',
    title: 'Medication Reminder: Amoxicillin',
    message: 'It\'s time to take your 500mg Amoxicillin dose.',
    date: '2025-04-26T08:00:00',
    read: true,
  },
  {
    id: 'n3',
    type: 'system',
    title: 'Pharmacy Credit: 50 points earned',
    message: 'You\'ve earned 50 loyalty points at HealthPlus Pharmacy.',
    date: '2025-04-25T14:22:00',
    read: false,
  },
  {
    id: 'n4',
    type: 'medication',
    title: 'Medication Running Low: Vitamin D',
    message: 'You have only 5 doses of Vitamin D remaining.',
    date: '2025-04-25T10:15:00',
    read: false,
  },
  {
    id: 'n5',
    type: 'prescription',
    title: 'Prescription Ready for Pickup',
    message: 'Your prescription is ready for pickup at MedExpress Pharmacy.',
    date: '2025-04-24T16:45:00',
    read: true,
  },
  {
    id: 'n6',
    type: 'system',
    title: 'Profile Update Required',
    message: 'Please update your phone number in your profile settings.',
    date: '2025-04-23T11:30:00',
    read: true,
  },
];

const NotificationsPage = () => {
  const [notifications, setNotifications] = useState(notificationsData);
  const [notificationSettings, setNotificationSettings] = useState({
    prescriptions: true,
    medications: true,
    system: true,
    email: true,
    push: true
  });
  
  const unreadCount = notifications.filter(n => !n.read).length;
  
  const prescriptionNotifications = notifications.filter(n => n.type === 'prescription');
  const medicationNotifications = notifications.filter(n => n.type === 'medication');
  const systemNotifications = notifications.filter(n => n.type === 'system');
  
  const handleMarkAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(notification => 
        notification.id === id ? { ...notification, read: true } : notification
      )
    );
  };
  
  const handleMarkAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notification => ({ ...notification, read: true }))
    );
    
    toast({
      title: "All notifications marked as read",
      description: "You've cleared all your unread notifications.",
    });
  };
  
  const handleDeleteAll = () => {
    setNotifications([]);
    
    toast({
      title: "All notifications deleted",
      description: "Your notification list has been cleared.",
    });
  };
  
  const handleSettingsChange = (key: string, value: boolean) => {
    setNotificationSettings(prev => ({
      ...prev,
      [key]: value
    }));
    
    toast({
      title: "Notification settings updated",
      description: `${key.charAt(0).toUpperCase() + key.slice(1)} notifications ${value ? 'enabled' : 'disabled'}.`,
    });
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold">Notifications</h1>
          <p className="text-muted-foreground">Stay updated on your prescriptions and medications</p>
        </div>
        
        <div className="flex flex-col sm:flex-row justify-between gap-4">
          <Tabs defaultValue="all" className="w-full">
            <div className="flex justify-between items-center">
              <TabsList>
                <TabsTrigger value="all">
                  All
                  {unreadCount > 0 && (
                    <Badge variant="destructive" className="ml-2">{unreadCount}</Badge>
                  )}
                </TabsTrigger>
                <TabsTrigger value="prescriptions">Prescriptions</TabsTrigger>
                <TabsTrigger value="medications">Medications</TabsTrigger>
                <TabsTrigger value="system">System</TabsTrigger>
              </TabsList>
              
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={handleMarkAllAsRead} disabled={unreadCount === 0}>
                  <CheckCircle className="mr-2 h-4 w-4" />
                  Read All
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={handleDeleteAll}
                  disabled={notifications.length === 0}
                >
                  Clear All
                </Button>
              </div>
            </div>
            
            <TabsContent value="all" className="mt-6">
              {notifications.length > 0 ? (
                <div className="space-y-4">
                  {notifications.map(notification => (
                    <NotificationCard 
                      key={notification.id} 
                      notification={notification}
                      onMarkAsRead={handleMarkAsRead}
                    />
                  ))}
                </div>
              ) : (
                <EmptyNotifications />
              )}
            </TabsContent>
            
            <TabsContent value="prescriptions" className="mt-6">
              {prescriptionNotifications.length > 0 ? (
                <div className="space-y-4">
                  {prescriptionNotifications.map(notification => (
                    <NotificationCard 
                      key={notification.id} 
                      notification={notification}
                      onMarkAsRead={handleMarkAsRead}
                    />
                  ))}
                </div>
              ) : (
                <EmptyNotifications type="prescription" />
              )}
            </TabsContent>
            
            <TabsContent value="medications" className="mt-6">
              {medicationNotifications.length > 0 ? (
                <div className="space-y-4">
                  {medicationNotifications.map(notification => (
                    <NotificationCard 
                      key={notification.id} 
                      notification={notification}
                      onMarkAsRead={handleMarkAsRead}
                    />
                  ))}
                </div>
              ) : (
                <EmptyNotifications type="medication" />
              )}
            </TabsContent>
            
            <TabsContent value="system" className="mt-6">
              {systemNotifications.length > 0 ? (
                <div className="space-y-4">
                  {systemNotifications.map(notification => (
                    <NotificationCard 
                      key={notification.id} 
                      notification={notification}
                      onMarkAsRead={handleMarkAsRead}
                    />
                  ))}
                </div>
              ) : (
                <EmptyNotifications type="system" />
              )}
            </TabsContent>
          </Tabs>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="h-5 w-5" />
              Notification Settings
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="space-y-4">
                <h4 className="text-sm font-medium">Notification Types</h4>
                <div className="grid gap-4 md:grid-cols-3">
                  <div className="flex items-center justify-between space-x-2">
                    <Label htmlFor="prescriptions" className="flex gap-2 items-center">
                      <FileText className="h-4 w-4" />
                      Prescriptions
                    </Label>
                    <Switch 
                      id="prescriptions" 
                      checked={notificationSettings.prescriptions}
                      onCheckedChange={(checked) => handleSettingsChange('prescriptions', checked)}
                    />
                  </div>
                  <div className="flex items-center justify-between space-x-2">
                    <Label htmlFor="medications" className="flex gap-2 items-center">
                      <Clock className="h-4 w-4" />
                      Medication Reminders
                    </Label>
                    <Switch 
                      id="medications" 
                      checked={notificationSettings.medications}
                      onCheckedChange={(checked) => handleSettingsChange('medications', checked)}
                    />
                  </div>
                  <div className="flex items-center justify-between space-x-2">
                    <Label htmlFor="system" className="flex gap-2 items-center">
                      <Bell className="h-4 w-4" />
                      System Alerts
                    </Label>
                    <Switch 
                      id="system" 
                      checked={notificationSettings.system}
                      onCheckedChange={(checked) => handleSettingsChange('system', checked)}
                    />
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <h4 className="text-sm font-medium">Delivery Methods</h4>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="flex items-center justify-between space-x-2">
                    <div>
                      <Label htmlFor="email">Email Notifications</Label>
                      <p className="text-sm text-muted-foreground">Receive notifications via email</p>
                    </div>
                    <Switch 
                      id="email" 
                      checked={notificationSettings.email}
                      onCheckedChange={(checked) => handleSettingsChange('email', checked)}
                    />
                  </div>
                  <div className="flex items-center justify-between space-x-2">
                    <div>
                      <Label htmlFor="push">Push Notifications</Label>
                      <p className="text-sm text-muted-foreground">Receive notifications on your device</p>
                    </div>
                    <Switch 
                      id="push" 
                      checked={notificationSettings.push}
                      onCheckedChange={(checked) => handleSettingsChange('push', checked)}
                    />
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

interface NotificationCardProps {
  notification: {
    id: string;
    type: string;
    title: string;
    message: string;
    date: string;
    read: boolean;
  };
  onMarkAsRead: (id: string) => void;
}

const NotificationCard: React.FC<NotificationCardProps> = ({ notification, onMarkAsRead }) => {
  const getIcon = () => {
    switch (notification.type) {
      case 'prescription':
        return <FileText className="h-5 w-5 text-green-500" />;
      case 'medication':
        return <Clock className="h-5 w-5 text-blue-500" />;
      case 'system':
        return <Bell className="h-5 w-5 text-amber-500" />;
      default:
        return <Bell className="h-5 w-5 text-gray-500" />;
    }
  };
  
  const timeAgo = (dateString: string) => {
    const now = new Date();
    const past = new Date(dateString);
    const diffMs = now.getTime() - past.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHrs = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffHrs / 24);
    
    if (diffDays > 0) {
      return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
    } else if (diffHrs > 0) {
      return `${diffHrs} hour${diffHrs > 1 ? 's' : ''} ago`;
    } else if (diffMins > 0) {
      return `${diffMins} minute${diffMins > 1 ? 's' : ''} ago`;
    } else {
      return 'Just now';
    }
  };

  return (
    <Card className={notification.read ? 'border-gray-200' : 'border-l-4 border-l-blue-500'}>
      <CardContent className="p-4">
        <div className="flex gap-4">
          <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0">
            {getIcon()}
          </div>
          <div className="flex-grow">
            <div className="flex justify-between items-start">
              <div>
                <h3 className={`font-medium ${notification.read ? '' : 'text-blue-700'}`}>
                  {notification.title}
                </h3>
                <p className="text-sm text-muted-foreground">{notification.message}</p>
                <p className="text-xs text-muted-foreground mt-1">{timeAgo(notification.date)}</p>
              </div>
              {!notification.read && (
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => onMarkAsRead(notification.id)}
                >
                  Mark as read
                </Button>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

interface EmptyNotificationsProps {
  type?: string;
}

const EmptyNotifications: React.FC<EmptyNotificationsProps> = ({ type }) => {
  const getMessage = () => {
    switch (type) {
      case 'prescription':
        return "You have no prescription notifications";
      case 'medication':
        return "You have no medication reminders";
      case 'system':
        return "You have no system notifications";
      default:
        return "You have no notifications";
    }
  };

  return (
    <div className="py-12 text-center">
      <div className="mx-auto w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center mb-4">
        <Bell className="h-6 w-6 text-gray-400" />
      </div>
      <h3 className="text-lg font-medium">{getMessage()}</h3>
      <p className="text-sm text-muted-foreground mt-1">
        New notifications will appear here when they arrive
      </p>
    </div>
  );
};

export default NotificationsPage;
