import React from 'react';
import { MessageType } from '@client/chat/types';
import { Message } from '@client/chat/components/chats-list/components/messages/message';
import { Text } from '@ui';

interface MessagesProps {
  messages: MessageType[];
}

export const Messages: React.FC<MessagesProps> = ({ messages }) => {
  if (!messages?.length) return <Text variant="body/base">Your messages history is empty</Text>;

  return messages.map((message) => <Message message={message} key={message.id} />);
};
