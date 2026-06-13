'use client';

import React, { useState, useEffect, useRef } from 'react';
import { api } from '@/lib/api';

interface Message {
  id: number;
  text: string;
  type: string;
  time: string;
}

interface ChatRoom {
  id: number;
  user_username: string;
  messages: Message[];
  created_at: string;
}

const SupportManagement = () => {
  const [rooms, setRooms] = useState<ChatRoom[]>([]);
  const [selectedRoom, setSelectedRoom] = useState<ChatRoom | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const ws = useRef<WebSocket | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const connectWebSocket = React.useCallback((roomId: number) => {
    if (ws.current) ws.current.close();

    const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
    const host = window.location.hostname;
    const port = '8000';
    ws.current = new WebSocket(`${protocol}//${host}:${port}/ws/chat/${roomId}/`);

    ws.current.onmessage = (event) => {
      const incoming = JSON.parse(event.data);
      setMessages((prev) => [...prev, incoming]);
    };
  }, []);

  useEffect(() => {
    let active = true;
    const fetchRooms = async () => {
      try {
        const data = await api.get<ChatRoom[]>('/chat/rooms/');
        if (active) {
          setRooms(data);
          setIsLoading(false);
        }
      } catch (error) {
        console.error('Failed to fetch rooms:', error);
        if (active) setIsLoading(false);
      }
    };
    
    fetchRooms();
    return () => { active = false; };
  }, []);

  useEffect(() => {
    if (selectedRoom) {
      setTimeout(() => setMessages([...selectedRoom.messages]), 0);
      connectWebSocket(selectedRoom.id);
    }
    return () => {
      if (ws.current) ws.current.close();
    };
  }, [selectedRoom, connectWebSocket]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = () => {
    if (!newMessage.trim() || !ws.current || !selectedRoom) return;

    const payload = {
      text: newMessage,
      sender_type: 'agent',
      user_id: 1, // This should be dynamic based on the logged-in superadmin
    };

    ws.current.send(JSON.stringify(payload));
    setNewMessage('');
  };

  if (isLoading) {
    return (
      <div className="flex-1 flex items-center justify-center h-full">
        <div className="w-8 h-8 border-4 border-blue-900 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="flex h-full bg-white border border-blue-100 rounded-sm overflow-hidden m-4 shadow-sm">
      {/* Rooms List */}
      <div className="w-1/3 border-r border-blue-50 flex flex-col">
        <div className="p-4 border-b border-blue-50 bg-blue-50/30">
          <h3 className="text-sm font-black text-blue-800 uppercase tracking-wider">Active Support Chats</h3>
          <p className="text-[10px] font-bold text-gray-500 uppercase mt-1">Manage tenant inquiries</p>
        </div>
        <div className="flex-1 overflow-y-auto custom-scrollbar">
          {rooms.length === 0 ? (
            <div className="p-8 text-center">
              <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">No active chats</p>
            </div>
          ) : (
            rooms.map((room) => (
              <button
                key={room.id}
                onClick={() => setSelectedRoom(room)}
                className={`w-full p-4 text-left border-b border-blue-50 transition-all hover:bg-blue-50/50 ${
                  selectedRoom?.id === room.id ? 'bg-blue-50 ring-1 ring-inset ring-blue-100' : ''
                }`}
              >
                <div className="flex justify-between items-start mb-1">
                  <span className="text-xs font-black text-blue-900 uppercase truncate">@{room.user_username}</span>
                  <span className="text-[9px] font-bold text-gray-400">{new Date(room.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                </div>
                <p className="text-[10px] font-medium text-gray-600 truncate uppercase tracking-tight">
                  {room.messages.length > 0 ? room.messages[room.messages.length - 1].text : 'No messages yet'}
                </p>
              </button>
            ))
          )}
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col bg-slate-50/30">
        {selectedRoom ? (
          <>
            <div className="p-4 border-b border-blue-50 bg-white flex justify-between items-center">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-blue-900 rounded-sm flex items-center justify-center font-black text-xs text-white uppercase tracking-tighter">
                  {selectedRoom.user_username.substring(0, 2)}
                </div>
                <div>
                  <h4 className="text-xs font-black text-blue-900 uppercase tracking-wider">@{selectedRoom.user_username}</h4>
                  <div className="flex items-center space-x-1.5 mt-0.5">
                    <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                    <span className="text-[9px] font-black text-green-600 uppercase tracking-widest">Connected</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-80">
              {messages.map((msg, idx) => (
                <div key={idx} className={`flex ${msg.type === 'agent' ? 'justify-end' : 'justify-start'} animate-in fade-in slide-in-from-bottom-2 duration-300`}>
                  <div className={`max-w-[70%] p-3 rounded-sm shadow-sm ${
                    msg.type === 'agent' 
                      ? 'bg-blue-900 text-white border border-blue-800' 
                      : 'bg-white text-blue-950 border border-blue-100'
                  }`}>
                    <p className="text-[11px] font-bold leading-relaxed">{msg.text}</p>
                    <p className={`text-[8px] mt-1 font-black uppercase text-right ${
                      msg.type === 'agent' ? 'text-blue-200' : 'text-gray-400'
                    }`}>{msg.time}</p>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            <div className="p-4 bg-white border-t border-blue-50">
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder="TYPE YOUR RESPONSE..."
                  className="flex-1 h-12 px-4 bg-slate-50 border border-blue-100 rounded-sm text-[10px] font-black text-blue-950 placeholder:text-gray-400 focus:bg-white focus:border-blue-900 transition-all outline-none uppercase tracking-widest"
                />
                <button
                  onClick={handleSendMessage}
                  className="px-6 h-12 bg-blue-900 text-white rounded-sm font-black text-[10px] uppercase tracking-widest hover:bg-blue-800 transition-all active:scale-95 shadow-lg shadow-blue-900/10"
                >
                  Send
                </button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center text-center p-8">
            <div className="w-16 h-16 bg-blue-50 rounded-sm flex items-center justify-center text-3xl mb-4 border border-blue-100">✉</div>
            <h3 className="text-sm font-black text-blue-800 uppercase tracking-widest">Select a Conversation</h3>
            <p className="text-[10px] font-bold text-gray-500 uppercase mt-1 max-w-xs leading-relaxed">Choose an active room from the sidebar to begin interacting with the tenant directly.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SupportManagement;
