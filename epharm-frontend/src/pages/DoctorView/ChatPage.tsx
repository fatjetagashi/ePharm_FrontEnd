
import React, { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import DashboardLayout from '@/components/Layout/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { ArrowLeft, Search, Send, User, Plus, Phone, Video } from 'lucide-react';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';

// Helper function to parse query parameters
function useQuery() {
    return new URLSearchParams(useLocation().search);
}

const ChatPage = () => {
    const navigate = useNavigate();
    const query = useQuery();
    const preselectedPatientId = query.get('patientId');
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const [selectedChat, setSelectedChat] = useState<number | null>(null);
    const [message, setMessage] = useState('');
    const [searchTerm, setSearchTerm] = useState('');

    // Mock data
    const [chatRooms, setChatRooms] = useState([
        {
            id: 1,
            patientId: '1',
            name: 'Alice Johnson',
            lastMessage: 'Thank you for the prescription, doctor.',
            timestamp: new Date(2025, 3, 24, 14, 30),
            unread: 0
        },
        {
            id: 2,
            patientId: '2',
            name: 'Robert Smith',
            lastMessage: 'When should I take the medication?',
            timestamp: new Date(2025, 3, 24, 10, 15),
            unread: 2
        },
        {
            id: 3,
            patientId: '3',
            name: 'Emma Davis',
            lastMessage: 'I\'m feeling better after taking the medication.',
            timestamp: new Date(2025, 3, 23, 16, 45),
            unread: 0
        },
        {
            id: 4,
            patientId: '4',
            name: 'James Wilson',
            lastMessage: 'Do I need to schedule another appointment?',
            timestamp: new Date(2025, 3, 23, 9, 20),
            unread: 1
        },
    ]);

    // Mock messages data
    const [chatMessages, setChatMessages] = useState<Record<number, Array<{id: number, sender: 'doctor' | 'patient', text: string, timestamp: Date}>>>({
        1: [
            { id: 1, sender: 'patient', text: 'Hello Dr. Johnson, I wanted to ask you about my prescription.', timestamp: new Date(2025, 3, 24, 14, 10) },
            { id: 2, sender: 'doctor', text: 'Hello Alice, how can I help you?', timestamp: new Date(2025, 3, 24, 14, 15) },
            { id: 3, sender: 'patient', text: 'Is it normal to feel tired after taking the medication?', timestamp: new Date(2025, 3, 24, 14, 20) },
            { id: 4, sender: 'doctor', text: 'Yes, fatigue can be a common side effect. If it persists for more than a few days, please let me know.', timestamp: new Date(2025, 3, 24, 14, 25) },
            { id: 5, sender: 'patient', text: 'Thank you for the prescription, doctor.', timestamp: new Date(2025, 3, 24, 14, 30) },
        ],
        2: [
            { id: 1, sender: 'patient', text: 'Hi doctor, I just picked up my prescription.', timestamp: new Date(2025, 3, 24, 10, 0) },
            { id: 2, sender: 'doctor', text: 'Great! Make sure to follow the dosage instructions.', timestamp: new Date(2025, 3, 24, 10, 5) },
            { id: 3, sender: 'patient', text: 'When should I take the medication?', timestamp: new Date(2025, 3, 24, 10, 15) },
        ],
        3: [
            { id: 1, sender: 'patient', text: 'Hello doctor, I started the new inhaler yesterday.', timestamp: new Date(2025, 3, 23, 16, 30) },
            { id: 2, sender: 'doctor', text: 'How are you feeling now? Any improvement?', timestamp: new Date(2025, 3, 23, 16, 35) },
            { id: 3, sender: 'patient', text: 'I\'m feeling better after taking the medication.', timestamp: new Date(2025, 3, 23, 16, 45) },
        ],
        4: [
            { id: 1, sender: 'patient', text: 'Hello Dr. Johnson, I finished my medication course.', timestamp: new Date(2025, 3, 23, 9, 0) },
            { id: 2, sender: 'doctor', text: 'That\'s good to hear. How are your symptoms now?', timestamp: new Date(2025, 3, 23, 9, 10) },
            { id: 3, sender: 'patient', text: 'Do I need to schedule another appointment?', timestamp: new Date(2025, 3, 23, 9, 20) },
        ]
    });

    // Find and select chat if patientId is provided
    useEffect(() => {
        if (preselectedPatientId) {
            const chat = chatRooms.find(room => room.patientId === preselectedPatientId);
            if (chat) {
                setSelectedChat(chat.id);
                // Mark as read
                setChatRooms(chatRooms.map(room =>
                    room.id === chat.id ? { ...room, unread: 0 } : room
                ));
            }
        }
    }, [preselectedPatientId]);

    // Auto-scroll to bottom of messages
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [selectedChat, chatMessages]);

    const handleSendMessage = (e: React.FormEvent) => {
        e.preventDefault();
        if (!message.trim() || !selectedChat) return;

        // Add message to chat
        const newMessage = {
            id: chatMessages[selectedChat].length + 1,
            sender: 'doctor' as const,
            text: message,
            timestamp: new Date(),
        };

        setChatMessages({
            ...chatMessages,
            [selectedChat]: [...chatMessages[selectedChat], newMessage],
        });

        // Update last message in chat room list
        setChatRooms(chatRooms.map(room =>
            room.id === selectedChat
                ? { ...room, lastMessage: message, timestamp: new Date() }
                : room
        ));

        // Clear input
        setMessage('');
    };

    // Filter chat rooms by search term
    const filteredChatRooms = chatRooms.filter(room =>
        room.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <DashboardLayout>
            <div className="space-y-6">
                <Button
                    variant="ghost"
                    className="flex items-center"
                    onClick={() => navigate(-1)}
                >
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back
                </Button>

                <div>
                    <h1 className="text-2xl font-bold">Patient Messages</h1>
                    <p className="text-muted-foreground">Communicate with your patients</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                    {/* Chat list */}
                    <Card className="lg:col-span-1">
                        <CardHeader className="px-4">
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                                <Input
                                    placeholder="Search conversations..."
                                    className="pl-10"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </div>
                        </CardHeader>
                        <CardContent className="px-2 py-0">
                            <div className="flex flex-col space-y-1">
                                {filteredChatRooms.map((chat) => (
                                    <div
                                        key={chat.id}
                                        className={cn(
                                            "flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-colors",
                                            selectedChat === chat.id
                                                ? "bg-health-light text-health-primary"
                                                : "hover:bg-gray-100"
                                        )}
                                        onClick={() => {
                                            setSelectedChat(chat.id);
                                            setChatRooms(chatRooms.map(room =>
                                                room.id === chat.id ? { ...room, unread: 0 } : room
                                            ));
                                        }}
                                    >
                                        <div className="w-10 h-10 rounded-full bg-health-light flex items-center justify-center text-health-primary relative">
                                            {chat.unread > 0 && (
                                                <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-red-500 text-white text-xs flex items-center justify-center">{chat.unread}</span>
                                            )}
                                            <p className="font-medium">
                                                {chat.name.split(' ').map(n => n[0]).join('')}
                                            </p>
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="font-medium truncate">{chat.name}</p>
                                            <p className="text-xs text-muted-foreground truncate">{chat.lastMessage}</p>
                                        </div>
                                        <div className="text-xs text-muted-foreground">
                                            {format(chat.timestamp, 'HH:mm')}
                                        </div>
                                    </div>
                                ))}

                                {filteredChatRooms.length === 0 && (
                                    <div className="p-4 text-center">
                                        <p className="text-muted-foreground">No conversations found</p>
                                        <Button variant="outline" className="mt-2" onClick={() => {}}>
                                            <Plus className="mr-2 h-4 w-4" />
                                            New Conversation
                                        </Button>
                                    </div>
                                )}
                            </div>
                        </CardContent>
                    </Card>

                    {/* Chat messages */}
                    <Card className="lg:col-span-3 flex flex-col h-[calc(100vh-16rem)]">
                        {selectedChat ? (
                            <>
                                <CardHeader className="border-b px-6 py-4 flex flex-row items-center gap-4">
                                    <div className="w-10 h-10 rounded-full bg-health-light flex items-center justify-center">
                                        <p className="font-medium text-health-primary">
                                            {chatRooms.find(room => room.id === selectedChat)?.name.split(' ').map(n => n[0]).join('')}
                                        </p>
                                    </div>
                                    <div className="flex-1">
                                        <CardTitle>{chatRooms.find(room => room.id === selectedChat)?.name}</CardTitle>
                                        <p className="text-sm text-muted-foreground">Patient</p>
                                    </div>
                                    <div className="flex gap-2">
                                        <Button variant="outline" size="icon">
                                            <Phone className="h-4 w-4" />
                                        </Button>
                                        <Button variant="outline" size="icon">
                                            <Video className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </CardHeader>

                                <ScrollArea className="flex-1 p-6">
                                    <div className="space-y-4">
                                        {chatMessages[selectedChat]?.map((msg) => (
                                            <div
                                                key={msg.id}
                                                className={cn(
                                                    "flex",
                                                    msg.sender === "doctor" ? "justify-end" : "justify-start"
                                                )}
                                            >
                                                <div
                                                    className={cn(
                                                        "max-w-[75%] rounded-lg px-4 py-2",
                                                        msg.sender === "doctor"
                                                            ? "bg-health-primary text-white"
                                                            : "bg-gray-100"
                                                    )}
                                                >
                                                    <p>{msg.text}</p>
                                                    <p className="text-xs opacity-70 mt-1">
                                                        {format(msg.timestamp, 'HH:mm')}
                                                    </p>
                                                </div>
                                            </div>
                                        ))}
                                        <div ref={messagesEndRef} />
                                    </div>
                                </ScrollArea>

                                <CardContent className="border-t p-4">
                                    <form onSubmit={handleSendMessage} className="flex gap-2">
                                        <Input
                                            placeholder="Type a message..."
                                            value={message}
                                            onChange={(e) => setMessage(e.target.value)}
                                        />
                                        <Button type="submit" disabled={!message.trim()}>
                                            <Send className="h-4 w-4" />
                                            <span className="sr-only">Send</span>
                                        </Button>
                                    </form>
                                </CardContent>
                            </>
                        ) : (
                            <div className="flex-1 flex flex-col items-center justify-center text-center p-6">
                                <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mb-4">
                                    <User className="h-8 w-8 text-gray-400" />
                                </div>
                                <h2 className="text-xl font-medium">Select a conversation</h2>
                                <p className="text-muted-foreground mt-2">
                                    Choose a patient from the list to start messaging
                                </p>
                                <Button className="mt-4" onClick={() => {}}>
                                    <Plus className="mr-2 h-4 w-4" />
                                    Start New Conversation
                                </Button>
                            </div>
                        )}
                    </Card>
                </div>
            </div>
        </DashboardLayout>
    );
};

export default ChatPage;

