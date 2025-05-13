import React from 'react';
import DashboardLayout from '../../../../../../Downloads/pharm-nexus-connect-37-main (1)/pharm-nexus-connect-37-main/src/components/Layout/DashboardLayout';
import { Clock, Bell, FileText, Beaker, AlertCircle, Check } from 'lucide-react';
import { Button } from '../../../../../../Downloads/pharm-nexus-connect-37-main (1)/pharm-nexus-connect-37-main/src/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../../../../../../Downloads/pharm-nexus-connect-37-main (1)/pharm-nexus-connect-37-main/src/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../../../../../Downloads/pharm-nexus-connect-37-main (1)/pharm-nexus-connect-37-main/src/components/ui/tabs';
import { Badge } from '../../../../../../Downloads/pharm-nexus-connect-37-main (1)/pharm-nexus-connect-37-main/src/components/ui/badge';

interface Notification {
  id: string;
  title: string;
  message: string;
  time: string;
  type: 'prescription' | 'medication' | 'system';
  read: boolean;
}

const NotificationsPage = () => {
  // Mock notification data
  const notifications: Notification[] = [
    { id: '1', title: 'New Prescription', message: 'Dr. Johnson has issued a new prescription for you', time: '5 minutes ago', type: 'prescription', read: false },
    { id: '2', title: 'Medication Reminder', message: 'Time to take Amoxicillin 500mg', time: '1 hour ago', type: 'medication', read: false },
    { id: '3', title: 'Prescription Filled', message: 'MediPharm Plus has filled your prescription', time: '3 hours ago', type: 'prescription', read: false },
    { id: '4', title: 'Low Medication', message: 'Your Lisinopril prescription will run out in 3 days', time: 'Yesterday', type: 'medication', read: true },
    { id: '5', title: 'System Update', message: 'ePharm has been updated with new features', time: '2 days ago', type: 'system', read: true },
    { id: '6', title: 'New Pharmacy Added', message: 'QuickMeds is now available on ePharm with 25% discount', time: '4 days ago', type: 'system', read: true },
    { id: '7', title: 'Prescription Expiring', message: 'Your prescription for Atorvastatin will expire in 5 days', time: '5 days ago', type: 'prescription', read: true },
    { id: '8', title: 'Medication Reminder', message: 'Time to take Atorvastatin 20mg', time: '6 days ago', type: 'medication', read: true },
  ];

  const unreadNotifications = notifications.filter(n => !n.read);
  const prescriptionNotifications = notifications.filter(n => n.type === 'prescription');
  const medicationNotifications = notifications.filter(n => n.type === 'medication');
  const systemNotifications = notifications.filter(n => n.type === 'system');

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'prescription':
        return <FileText className="h-5 w-5 text-blue-500" />;
      case 'medication':
        return <Beaker className="h-5 w-5 text-green-500" />;
      case 'system':
        return <Bell className="h-5 w-5 text-amber-500" />;
      default:
        return <AlertCircle className="h-5 w-5 text-gray-500" />;
    }
  };

  const NotificationCard = ({ notification }: { notification: Notification }) => (
    <Card className={`mb-4 ${notification.read ? '' : 'border-l-4 border-l-blue-500'}`}>
      <CardContent className="p-4">
        <div className="flex items-start gap-4">
          <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
            notification.read 
              ? 'bg-gray-100' 
              : notification.type === 'prescription' 
                ? 'bg-blue-100' 
                : notification.type === 'medication' 
                  ? 'bg-green-100' 
                  : 'bg-amber-100'
          }`}>
            {getNotificationIcon(notification.type)}
          </div>
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <h3 className={`font-medium ${notification.read ? '' : 'font-semibold'}`}>{notification.title}</h3>
              <div className="flex items-center gap-2">
                {!notification.read && (
                  <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">New</Badge>
                )}
                <span className="text-xs text-muted-foreground">{notification.time}</span>
              </div>
            </div>
            <p className="text-sm mt-1">{notification.message}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold">Notifications</h1>
            <p className="text-muted-foreground">Stay updated with your prescriptions and medications</p>
          </div>
          
          <div className="flex gap-2">
            <Button variant="outline">
              <Check className="mr-2 h-4 w-4" />
              Mark All as Read
            </Button>
          </div>
        </div>
        
        <Tabs defaultValue="all">
          <TabsList>
            <TabsTrigger value="all">
              All
              {unreadNotifications.length > 0 && (
                <Badge className="ml-2 bg-blue-500">{unreadNotifications.length}</Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="unread">Unread</TabsTrigger>
            <TabsTrigger value="prescriptions">Prescriptions</TabsTrigger>
            <TabsTrigger value="medications">Medications</TabsTrigger>
            <TabsTrigger value="system">System</TabsTrigger>
          </TabsList>
          
          <TabsContent value="all" className="mt-6">
            {notifications.length > 0 ? (
              <div>
                {notifications.map(notification => (
                  <NotificationCard key={notification.id} notification={notification} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <Bell className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium">No notifications</h3>
                <p className="text-muted-foreground">You're all caught up!</p>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="unread" className="mt-6">
            {unreadNotifications.length > 0 ? (
              <div>
                {unreadNotifications.map(notification => (
                  <NotificationCard key={notification.id} notification={notification} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <Check className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium">No unread notifications</h3>
                <p className="text-muted-foreground">You're all caught up!</p>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="prescriptions" className="mt-6">
            {prescriptionNotifications.length > 0 ? (
              <div>
                {prescriptionNotifications.map(notification => (
                  <NotificationCard key={notification.id} notification={notification} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium">No prescription notifications</h3>
                <p className="text-muted-foreground">You have no prescription-related notifications</p>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="medications" className="mt-6">
            {medicationNotifications.length > 0 ? (
              <div>
                {medicationNotifications.map(notification => (
                  <NotificationCard key={notification.id} notification={notification} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <Beaker className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium">No medication notifications</h3>
                <p className="text-muted-foreground">You have no medication-related notifications</p>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="system" className="mt-6">
            {systemNotifications.length > 0 ? (
              <div>
                {systemNotifications.map(notification => (
                  <NotificationCard key={notification.id} notification={notification} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <Bell className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium">No system notifications</h3>
                <p className="text-muted-foreground">You have no system-related notifications</p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default NotificationsPage;
