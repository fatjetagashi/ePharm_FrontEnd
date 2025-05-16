import api from '../lib/api';
export interface ChatRoom {
    id: number;
    patient: {
        id: number;
        name: string;
    };
    lastMessage: string;
    createdAt: string;
    unread: number;
}

export interface Message {
    id: number;
    sender: 'doctor' | 'patient';
    text: string;
    timestamp: string;
}

export const fetchChatRooms = async (): Promise<ChatRoom[]> => {
    const response = await api.get('/chat-rooms');
    return response.data.data; // Adjust based on your API response structure
};

export const fetchMessages = async (chatRoomId: number): Promise<Message[]> => {
    const response = await api.get(`/chat-rooms/${chatRoomId}/messages`);
    return response.data.data; // Adjust based on your API response structure
};

export const sendMessage = async (chatRoomId: number, message: string): Promise<Message> => {
    const response = await api.post(`/chat-rooms/${chatRoomId}/messages`, { message });
    return response.data.data; // Adjust based on your API response structure
};