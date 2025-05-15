
import React, { useState } from 'react';
import DashboardLayout from '@/components/Layout/DoctorComponents/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Bell, BellDot, Check } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';

const NotificationsPage = () => {
    const { toast } = useToast();
    const [notifications, setNotifications] = useState([
        {
            id: 1,
            type: 'Prescription Filled',
            icon: '📋',
            description: 'Pharmacy #123 has filled prescription for Robert Smith',
            time: '3 days ago',
            isImportant: false,
            isRead: false
        },
        {
            id: 2,
            type: 'New Message',
            icon: '💬',
            description: 'Alice Johnson sent you a message regarding her medication',
            time: '3 days ago',
            isImportant: true,
            isRead: false
        },
        {
            id: 3,
            type: 'Appointment Reminder',
            icon: '📅',
            description: 'Your appointment with Dr. Smith is tomorrow at 10:00 AM',
            time: '4 days ago',
            isImportant: true,
            isRead: false
        }
    ]);

    const [activeTab, setActiveTab] = useState('all');

    const unreadCount = notifications.filter(n => !n.isRead).length;
    const importantCount = notifications.filter(n => n.isImportant).length;

    const handleMarkAsRead = (id: number) => {
        setNotifications(prevNotifications =>
            prevNotifications.map(notification =>
                notification.id === id ? { ...notification, isRead: true } : notification
            )
        );
        toast({
            description: "Notification marked as read",
        });
    };

    const handleMarkAllAsRead = () => {
        setNotifications(prevNotifications =>
            prevNotifications.map(notification => ({ ...notification, isRead: true }))
        );
        toast({
            description: "All notifications marked as read",
        });
    };

    const filteredNotifications = notifications.filter(notification => {
        if (activeTab === 'unread') return !notification.isRead;
        if (activeTab === 'important') return notification.isImportant;
        return true;
    });

    return (
        <DashboardLayout>
            <div className="max-w-5xl mx-auto space-y-6">
                <div className="flex justify-between items-start">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">Notifications</h1>
                        <p className="text-gray-500 mt-1">Stay updated with patient activities and system alerts</p>

                        <div className="flex gap-6 mt-4">
                            <div className="flex items-center gap-2">
                                <BellDot className="text-blue-500 h-5 w-5" />
                                <span className="text-gray-700">
                  Unread: <span className="text-blue-500 font-medium">{unreadCount}</span>
                </span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Bell className="text-red-500 h-5 w-5" />
                                <span className="text-gray-700">
                  Important: <span className="text-red-500 font-medium">{importantCount}</span>
                </span>
                            </div>
                        </div>
                    </div>

                    <Button
                        variant="outline"
                        onClick={handleMarkAllAsRead}
                        disabled={unreadCount === 0}
                    >
                        Mark all as read
                    </Button>
                </div>

                <div className="border-b">
                    <div className="flex gap-8">
                        <button
                            className={`pb-4 px-1 ${
                                activeTab === 'all'
                                    ? 'border-b-2 border-blue-500 text-blue-500 font-medium'
                                    : 'text-gray-500'
                            }`}
                            onClick={() => setActiveTab('all')}
                        >
                            All
                        </button>
                        <button
                            className={`pb-4 px-1 ${
                                activeTab === 'unread'
                                    ? 'border-b-2 border-blue-500 text-blue-500 font-medium'
                                    : 'text-gray-500'
                            }`}
                            onClick={() => setActiveTab('unread')}
                        >
                            Unread
                        </button>
                        <button
                            className={`pb-4 px-1 ${
                                activeTab === 'important'
                                    ? 'border-b-2 border-blue-500 text-blue-500 font-medium'
                                    : 'text-gray-500'
                            }`}
                            onClick={() => setActiveTab('important')}
                        >
                            Important
                        </button>
                    </div>
                </div>

                <div className="space-y-4">
                    {filteredNotifications.map((notification) => (
                        <div
                            key={notification.id}
                            className={`p-4 rounded-lg border ${
                                !notification.isRead ? 'bg-blue-50 border-blue-100' : 'bg-white'
                            }`}
                        >
                            <div className="flex items-start justify-between">
                                <div className="space-y-1">
                                    <div className="flex items-center gap-2">
                                        <span className="text-xl">{notification.icon}</span>
                                        <h3 className="font-medium text-gray-900">{notification.type}</h3>
                                        {notification.isImportant && (
                                            <Badge variant="destructive" className="bg-red-100 text-red-600 hover:bg-red-100">
                                                Important
                                            </Badge>
                                        )}
                                    </div>
                                    <p className="text-gray-600">{notification.description}</p>
                                    <p className="text-sm text-gray-500">{notification.time}</p>
                                </div>
                                {!notification.isRead && (
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        className="text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                                        onClick={() => handleMarkAsRead(notification.id)}
                                    >
                                        <Check className="w-4 h-4 mr-2" />
                                        Mark as read
                                    </Button>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </DashboardLayout>
    );
};

export default NotificationsPage;
