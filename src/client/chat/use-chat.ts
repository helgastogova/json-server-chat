import { useState, useEffect } from 'react';
import axios from 'axios';
import { MessageType, ChatType } from './types';
import { v4 as uuidv4 } from 'uuid';

const API_URL = 'http://localhost:5001/chats';

export const useChat = () => {
  const [chats, setChats] = useState<ChatType[]>([]);
  const [newMessage, setNewMessage] = useState<string>('');
  const [sending, setSending] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await axios.get<ChatType[]>(API_URL);
      const sortedChats = sortChatsAndMessages(response.data);
      setChats(sortedChats);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const sortChatsAndMessages = (chatsData: ChatType[]): ChatType[] => {
    return chatsData
      .map((chat: ChatType) => {
        const sortedMessages = chat.messages.slice().sort((a: MessageType, b: MessageType) => {
          return new Date(a.last_updated).getTime() - new Date(b.last_updated).getTime();
        });
        return {
          ...chat,
          messages: sortedMessages,
        };
      })
      .sort((a: ChatType, b: ChatType) => {
        return new Date(b.last_updated).getTime() - new Date(a.last_updated).getTime();
      });
  };

  const handleSend = async (chatId: string | null) => {
    if (!chatId) return;
    try {
      setSending(true);
      const newMessageData: MessageType = {
        id: uuidv4(),
        text: newMessage,
        last_updated: new Date().toISOString(),
      };
      const chatIndex = chats.findIndex((chat) => chat.id === chatId);
      if (chatIndex !== -1) {
        const updatedChat = {
          ...chats[chatIndex],
          messages: [...chats[chatIndex].messages, newMessageData],
          last_updated: new Date().toISOString(),
        };
        await axios.patch(`${API_URL}/${chatId}`, {
          messages: updatedChat.messages,
          last_updated: updatedChat.last_updated,
        });
        const updatedChats = [...chats];
        updatedChats[chatIndex] = updatedChat;
        const sortedChats = sortChatsAndMessages(updatedChats);
        setChats(sortedChats);
      }
      setNewMessage('');
    } catch (error) {
      console.error('Error sending message:', error);
    } finally {
      setSending(false);
    }
  };

  return { chats, loading, newMessage, setNewMessage, handleSend, sending };
};
