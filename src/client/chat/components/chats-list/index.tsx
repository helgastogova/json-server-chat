import React from 'react';
import { Tabs, Loader } from '@ui';

import { ChatItem } from './components/chat-item';
import { ChatType } from '@client/chat/types';
import { Messages } from '@client/chat/components/chats-list/components/messages';

import s from './chats-list.module.css';

interface ChatsListProps {
  chats: ChatType[];
  onTabSelect: (activeChatId: string) => void;
  loading: boolean;
  activeChatId?: string | null;
}

export const ChatsList: React.FC<ChatsListProps> = ({ chats, onTabSelect, loading, activeChatId }) => {
  if (loading) return <Loader />;

  const activeTabIndex = chats.findIndex((chat) => chat.id === activeChatId);

  return (
    <Tabs activeId={activeTabIndex}>
      <Tabs.Switcher>
        {chats.map((item, index) => {
          const { id, name, messages } = item;
          const lastMessage = messages?.[messages.length - 1];
          return (
            <Tabs.SwitcherItem index={index} key={`${id}_${index}`} onChange={() => onTabSelect(id)}>
              <ChatItem name={name} lastMessage={lastMessage} />
            </Tabs.SwitcherItem>
          );
        })}
      </Tabs.Switcher>
      <Tabs.Body className={s.body}>
        {chats.map((item, index) => (
          <Tabs.BodyItem index={index} key={`${item.id}_${index}`} activeId={activeTabIndex}>
            <Messages messages={item.messages} />
          </Tabs.BodyItem>
        ))}
      </Tabs.Body>
    </Tabs>
  );
};
