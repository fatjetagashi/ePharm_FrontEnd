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
    const response = await api.get<{ data: ChatRoom[] }>('/chat-rooms');
    return response.data.data;
};

export const fetchMessages = async (chatRoomId: number): Promise<Message[]> => {
    const response = await api.get<{ data: Message[] }>(`/chat-rooms/${chatRoomId}/messages`);
    return response.data.data;
};

export const sendMessage = async (chatRoomId: number, message: string): Promise<Message> => {
    const response = await api.post<{ data: Message }>(`/chat-rooms/${chatRoomId}/messages`, { message });
    return response.data.data;
};
