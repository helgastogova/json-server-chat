import React from 'react';
import cx from 'classnames';
import { Date } from '@client/universal/date';
import { Text } from '@ui';
import { MessageType } from '@client/chat/types';

import s from './message.module.css';
interface MessageProps {
  message: MessageType;
  showDate?: boolean;
  variant?: 'decorated' | 'simple';
  className?: string;
  truncate?: number;
}

export const Message: React.FC<MessageProps> = ({
  message,
  showDate = true,
  variant = 'decorated',
  className,
  truncate,
}) => {
  const { text, last_updated } = message;

  return (
    <div className={cx(className, variant && s[variant])}>
      {showDate && <Date date={last_updated} />}
      <Text
        truncate={truncate}
        variant={variant === 'simple' ? 'body/small' : 'body/base'}
        color={variant === 'simple' ? 'gray' : 'black'}
        as="p"
      >
        {text}
      </Text>
    </div>
  );
};
