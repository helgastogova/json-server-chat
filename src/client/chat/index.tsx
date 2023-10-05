import React, { useState, useEffect } from 'react';
import { Loader } from '@ui';
import { MessageForm } from './components/message-form';
import { ChatsList } from '@client/chat/components/chats-list';
import { useChat } from './use-chat';
import { useRouter } from 'next/router';

export const Chat: React.FC = () => {
  const router = useRouter();
  const { chats, loading, sending, handleSend, newMessage, setNewMessage } = useChat();
  const [activeChatId, setActiveChatId] = useState<string | null>(null);

  useEffect(() => {
    if (!router.isReady) return;

    const chatIdFromUrl = router.query.chatId as string;
    const targetChatId = (chatIdFromUrl || chats[0]?.id) ?? null;

    if (targetChatId) {
      setActiveChatId(targetChatId);
      if (!chatIdFromUrl) {
        router.push(`/?chatId=${targetChatId}`);
      }
    }
  }, [router.isReady, router.query.chatId, chats]);

  const handleTabSelect = (id: string) => {
    setActiveChatId(id);
    router.push(`/?chatId=${id}`);
  };

  if (loading) return <Loader />;

  return (
    <>
      <ChatsList chats={chats} activeChatId={activeChatId} onTabSelect={handleTabSelect} loading={loading} />
      {activeChatId && (
        <MessageForm
          chatId={activeChatId}
          loading={loading}
          handleSend={handleSend}
          newMessage={newMessage}
          setNewMessage={setNewMessage}
          sending={sending}
        />
      )}
    </>
  );
};
