import React from 'react';
import { Text, Avatar } from '@ui';

import { Date } from '@client/universal/date';
import { Message } from '../messages/message';
import { MessageType } from '@client/chat/types';

import { useBreakpoint } from '@ui/hooks';

import s from './chat-item.module.css';
interface ChatItemProps {
  name: string;
  lastMessage?: MessageType;
}

export const ChatItem: React.FC<ChatItemProps> = ({ name, lastMessage }) => {
  const { isS, isM } = useBreakpoint();
  const shouldShowAvatar = !isM || isS;
  const shouldShowWrapper = !isS;

  return (
    <div className={s.root}>
      {shouldShowAvatar && <Avatar className={s.avatar} alt={name} />}
      {shouldShowWrapper && (
        <div className={s.wrapper}>
          <div className={s.header}>
            <Text truncate={1} as="div" variant="heading/small">
              {name}
            </Text>
            <Date date={lastMessage?.last_updated} variant="time" />
          </div>
          {lastMessage && <Message truncate={1} message={lastMessage} showDate={false} variant="simple" />}
        </div>
      )}
    </div>
  );
};
