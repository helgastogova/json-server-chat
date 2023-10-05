import React, { FC } from 'react';
import { format, parseISO, isThisYear } from 'date-fns';
import { Text } from '@ui';

type DateProps = {
  date?: string;
  variant?: 'time' | 'date-time';
  className?: string;
};

export const Date: FC<DateProps> = ({ date, variant = 'date-time', className }) => {
  if (!date) return null;

  const formattedDate =
    variant === 'time'
      ? format(parseISO(date), 'HH:mm')
      : isThisYear(parseISO(date)) // do not show year if it is current year
      ? format(parseISO(date), 'EEEE do MMMM, HH:mm:ss')
      : format(parseISO(date), 'EEEE do MMMM, yyyy, HH:mm:ss');

  return (
    <Text color="gray" className={className} variant={variant === 'time' ? 'body/small' : 'body/base'}>
      {formattedDate}
    </Text>
  );
};
