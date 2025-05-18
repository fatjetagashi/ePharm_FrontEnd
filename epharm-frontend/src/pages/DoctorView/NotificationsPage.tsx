import React, { useState, useEffect } from 'react';
import DashboardLayout from '@/components/Layout/DoctorComponents/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Bell, BellDot, Check } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import {
    getNotifications,
    markAsRead,
    markAllAsRead,
    Notification
} from '@/api/notifications';

const NotificationsPage = () => {
    const { toast } = useToast();

    const [notifications, setNotifications] = useState<Notification[]>([]);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState<'all' | 'unread' | 'important'>('all');

    const unreadCount = notifications.filter(n => !n.is_read).length;
    const importantCount = notifications.filter(n => n.type === 'alert').length;

    useEffect(() => {
        (async () => {
            try {
                const data = await getNotifications();
                setNotifications(data);
            } catch (err) {
                toast({
                    description: 'Failed to load notifications.',
                    variant: 'destructive',
                });
            } finally {
                setLoading(false);
            }
        })();
    }, []);


    const handleMarkAsRead = async (id: number) => {
        try {
            await markAsRead(id);
            setNotifications(prev =>
                prev.map(n => (n.id === id ? { ...n, is_read: true } : n))
            );
            toast({
                description: 'Notification marked as read',
                variant: 'default',
            });
        } catch {
            toast({
                description: 'Failed to mark notification as read',
                variant: 'destructive',
            });
        }
    };

    const handleMarkAllAsRead = async () => {
        try {
            await markAllAsRead();
            setNotifications(prev => prev.map(n => ({ ...n, is_read: true })));
            toast({
                description: 'All notifications marked as read',
                variant: 'default',
            });
        } catch {
            toast({
                description: 'Failed to mark all notifications as read',
                variant: 'destructive',
            });
        }
    };

    const filteredNotifications = notifications.filter(notification => {
        if (activeTab === 'unread') return !notification.is_read;
        if (activeTab === 'important') return notification.type === 'alert';
        return true;
    });

    return (
        <DashboardLayout>
            <div className="max-w-5xl mx-auto space-y-6">
                <div className="flex justify-between items-start">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">Notifications</h1>
                        <p className="text-gray-500 mt-1">
                            Stay updated with patient activities and system alerts
                        </p>

                        <div className="flex gap-6 mt-4">
                            <div className="flex items-center gap-2">
                                <BellDot className="text-blue-500 h-5 w-5" />
                                <span className="text-gray-700">
                  Unread:{' '}
                                    <span className="text-blue-500 font-medium">{unreadCount}</span>
                </span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Bell className="text-red-500 h-5 w-5" />
                                <span className="text-gray-700">
                  Important:{' '}
                                    <span className="text-red-500 font-medium">{importantCount}</span>
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
                        {(['all', 'unread', 'important'] as const).map(tab => (
                            <button
                                key={tab}
                                className={`pb-4 px-1 ${
                                    activeTab === tab
                                        ? 'border-b-2 border-blue-500 text-blue-500 font-medium'
                                        : 'text-gray-500'
                                }`}
                                onClick={() => setActiveTab(tab)}
                            >
                                {tab.charAt(0).toUpperCase() + tab.slice(1)}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="space-y-4">
                    {loading ? (
                        <p>Loading notifications...</p>
                    ) : filteredNotifications.length === 0 ? (
                        <p className="text-gray-500">No notifications found.</p>
                    ) : (
                        filteredNotifications.map(notification => (
                            <div
                                key={notification.id}
                                className={`p-4 rounded-lg border ${
                                    !notification.is_read
                                        ? 'bg-blue-50 border-blue-100'
                                        : 'bg-white'
                                }`}
                            >
                                <div className="flex items-start justify-between">
                                    <div className="space-y-1">
                                        <div className="flex items-center gap-2">
                                            <span className="text-xl">🔔</span>
                                            <h3 className="font-medium text-gray-900">
                                                {notification.title}
                                            </h3>
                                            {notification.type === 'alert' && (
                                                <Badge
                                                    variant="destructive"
                                                    className="bg-red-100 text-red-600 hover:bg-red-100"
                                                >
                                                    Important
                                                </Badge>
                                            )}
                                        </div>
                                        <p className="text-gray-600">{notification.message}</p>
                                        <p className="text-sm text-gray-500">
                                            {new Date(notification.created_at).toLocaleString()}
                                        </p>
                                    </div>
                                    {!notification.is_read && (
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
                        ))
                    )}
                </div>
            </div>
        </DashboardLayout>
    );
};

export default NotificationsPage;
