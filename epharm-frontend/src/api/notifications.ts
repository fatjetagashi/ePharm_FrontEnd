import api from './api'; // Your shared axios instance

export interface Notification {
    id: number;
    title: string;
    message: string;
    type: 'message' | 'prescription' | 'appointment' | 'alert';
    is_read: boolean;
    created_at: string;
}

// 🔔 Get all notifications for the doctor
export const getNotifications = async (): Promise<Notification[]> => {
    const response = await api.get('/doctor/notifications');
    return response.data;
};

// ✅ Mark a single notification as read
export const markAsRead = async (notificationId: number): Promise<void> => {
    await api.post(`/doctor/notifications/${notificationId}/read`);
};

// ✅ Mark all notifications as read
export const markAllAsRead = async (): Promise<void> => {
    await api.post(`/doctor/notifications/read-all`);
};
