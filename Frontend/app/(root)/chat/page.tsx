"use client";
import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { apiClient } from "@/lib/api-client";
import {
    API_GET_ALL_CONNECTIONS,
    API_GET_CHAT,
    API_GET_USER_DETAILS,
    API_UPDATE_CHAT
} from "@/utils/constants";
import { useAppStore } from "@/store";

interface Message {
    id: string;
    sender: "me" | "other";
    text: string;
    time: string;
    status?: "sending" | "sent" | "delivered" | "failed";
}

interface Connection {
    mentorName: string;
    mentorId: string;
    avatar?: string;
    lastMessage?: string;
}

interface ApiMessage {
    _id: string;
    sender: string;
    receiver: string;
    message: string;
    createdAt: string;
}

export default function Chat() {
    const [input, setInput] = useState("");
    const [connections, setConnections] = useState<Connection[]>([]);
    const [activeChat, setActiveChat] = useState<Connection | null>(null);
    const [messages, setMessages] = useState<Message[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const router = useRouter();
    const { userInfo } = useAppStore();

    // Fetch chat history when active chat changes
    useEffect(() => {
        const fetchChatHistory = async () => {
            if (!activeChat || !userInfo?.id) return;

            setIsLoading(true);
            try {
                const response = await apiClient.post(API_GET_CHAT, {
                    sender_id: userInfo.id,
                    receiver_id: activeChat.mentorId
                }, {
                    withCredentials: true
                });

                if (response.data.success) {
                    const formattedMessages = response.data.data.map((msg: ApiMessage) => ({
                        id: msg._id,
                        sender: msg.sender === userInfo.id ? "me" : "other",
                        text: msg.message,
                        time: new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                    }));
                    setMessages(formattedMessages);
                }
            } catch (error) {
                console.error("Error fetching chat history:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchChatHistory();

        // Polling for new messages every 3 seconds
        const interval = setInterval(fetchChatHistory, 3000);
        return () => clearInterval(interval);
    }, [activeChat, userInfo?.id]);

    // Fetch connections on component mount
    useEffect(() => {
        const fetchConnections = async () => {
            if (!userInfo?.id) return;

            try {
                const response = await apiClient.post(API_GET_ALL_CONNECTIONS, {
                    mentee_id: userInfo.id
                }, {
                    withCredentials: true
                });

                if (response.status === 200) {
                    const connectionsData = await Promise.all(
                        response.data.Connections.map(async (connection : any) => {
                            try {
                                const mentorResponse = await apiClient.post(API_GET_USER_DETAILS, {
                                    id: connection.mentor_id
                                }, {
                                    withCredentials: true
                                });

                                return {
                                    mentorName: mentorResponse.data.username ||
                                        `${mentorResponse.data.firstname} ${mentorResponse.data.lastname}`,
                                    mentorId: connection.mentor_id,
                                    avatar: mentorResponse.data.avatar,
                                    lastMessage: connection.lastMessage
                                };
                            } catch (error) {
                                console.error("Error fetching mentor details:", error);
                                return null;
                            }
                        })
                    );

                    setConnections(connectionsData.filter(Boolean) as Connection[]);
                }
            } catch (error) {
                console.error("Error fetching connections:", error);
                router.push("/login");
            }
        };

        fetchConnections();
    }, [userInfo?.id, router]);

    const sendMessage = async () => {
        if (input.trim() === "" || !activeChat || !userInfo?.id) return;

        const tempId = Date.now().toString();
        const newMessage: Message = {
            id: tempId,
            sender: "me",
            text: input,
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            status: "sending"
        };

        // Optimistic update
        setMessages(prev => [...prev, newMessage]);
        setInput("");

        try {
            await apiClient.post(API_UPDATE_CHAT, {
                sender_id: userInfo.id,
                receiver_id: activeChat.mentorId,
                message: input
            }, {
                withCredentials: true
            });

            // Update status to sent
            setMessages(prev => prev.map(msg =>
                msg.id === tempId ? {...msg, status: "sent"} : msg
            ));
        } catch (error) {
            console.error("Error sending message:", error);
            // Update status to failed
            setMessages(prev => prev.map(msg =>
                msg.id === tempId ? {...msg, status: "failed"} : msg
            ));
        }
    };

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    return (
        <div className="flex h-[95vh] bg-gray-100 rounded-2xl">
            {/* Sidebar */}
            <aside className="w-64 bg-white shadow-md p-4 border-r rounded-l-2xl">
                <h2 className="text-2xl text-center font-semibold mb-6">Connections</h2>
                <ul className="space-y-3">
                    {connections.length > 0 ? (
                        connections.map((connection) => (
                            <li
                                key={connection.mentorId}
                                className={`cursor-pointer p-3 rounded-lg flex items-center gap-3 transition-colors ${
                                    activeChat?.mentorId === connection.mentorId
                                        ? "bg-red-100 border border-red-200"
                                        : "hover:bg-gray-50"
                                }`}
                                onClick={() => setActiveChat(connection)}
                            >
                                <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                                    {connection.avatar ? (
                                        <img src={connection.avatar} alt={connection.mentorName} className="w-full h-full object-cover" />
                                    ) : (
                                        <span className="text-gray-600">
                      {connection.mentorName.charAt(0).toUpperCase()}
                    </span>
                                    )}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="font-medium truncate">{connection.mentorName}</p>
                                    {connection.lastMessage && (
                                        <p className="text-xs text-gray-500 truncate">{connection.lastMessage}</p>
                                    )}
                                </div>
                            </li>
                        ))
                    ) : (
                        <div className="text-center p-4 text-gray-500 italic">
                            No connections yet
                        </div>
                    )}
                </ul>
            </aside>

            {/* Chat Area */}
            <main className="flex-1 flex flex-col overflow-hidden rounded-r-2xl bg-white">
                {activeChat ? (
                    <>
                        <div className="p-4 border-b flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                                {connections.find(c => c.mentorId === activeChat.mentorId)?.avatar ? (
                                    <img
                                        src={connections.find(c => c.mentorId === activeChat.mentorId)?.avatar}
                                        alt={activeChat.mentorName}
                                        className="w-full h-full object-cover"
                                    />
                                ) : (
                                    <span className="text-gray-600">
                    {activeChat.mentorName.charAt(0).toUpperCase()}
                  </span>
                                )}
                            </div>
                            <div>
                                <h2 className="font-semibold">{activeChat.mentorName}</h2>
                                <p className="text-xs text-gray-500">Online</p>
                            </div>
                        </div>

                        <div className="flex-1 overflow-hidden flex flex-col">
                            {isLoading ? (
                                <div className="flex-1 flex items-center justify-center">
                                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-400"></div>
                                </div>
                            ) : (
                                <>
                                    <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50">
                                        {messages.length > 0 ? (
                                            messages.map((msg) => (
                                                <div
                                                    key={msg.id}
                                                    className={`flex ${msg.sender === "me" ? "justify-end" : "justify-start"}`}
                                                >
                                                    <div
                                                        className={`rounded-lg px-4 py-2 max-w-xs relative ${
                                                            msg.sender === "me"
                                                                ? "bg-red-400 text-white rounded-br-none"
                                                                : "bg-gray-200 text-gray-900 rounded-bl-none"
                                                        }`}
                                                    >
                                                        <p>{msg.text}</p>
                                                        <div className="flex items-center justify-end gap-1 mt-1">
                              <span className="text-xs opacity-80">
                                {msg.time}
                              </span>
                                                            {msg.sender === "me" && (
                                                                <span className="text-xs opacity-80">
                                  {msg.status === "sending" ? "🕒" :
                                      msg.status === "failed" ? "❌" : "✓✓"}
                                </span>
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                            ))
                                        ) : (
                                            <div className="flex items-center justify-center h-full">
                                                <p className="text-gray-500">No messages yet</p>
                                            </div>
                                        )}
                                        <div ref={messagesEndRef} />
                                    </div>

                                    <div className="p-3 border-t bg-white">
                                        <div className="flex items-center gap-2">
                                            <input
                                                type="text"
                                                className="flex-1 border border-gray-300 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-300"
                                                placeholder="Type a message..."
                                                value={input}
                                                onChange={(e) => setInput(e.target.value)}
                                                onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                                            />
                                            <button
                                                onClick={sendMessage}
                                                disabled={!input.trim()}
                                                className={`p-2 rounded-full ${
                                                    input.trim()
                                                        ? "bg-red-400 text-white hover:bg-red-500"
                                                        : "bg-gray-200 text-gray-400 cursor-not-allowed"
                                                } transition-colors`}
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 1.414L10.586 9H7a1 1 0 100 2h3.586l-1.293 1.293a1 1 0 101.414 1.414l3-3a1 1 0 000-1.414z" clipRule="evenodd" />
                                                </svg>
                                            </button>
                                        </div>
                                    </div>
                                </>
                            )}
                        </div>
                    </>
                ) : (
                    <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
                        <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                            </svg>
                        </div>
                        <h3 className="text-xl font-medium text-gray-700 mb-2">Select a chat</h3>
                        <p className="text-gray-500 max-w-md">
                            Choose a connection from the sidebar to start messaging or connect with new mentors
                        </p>
                    </div>
                )}
            </main>
        </div>
    );
}
