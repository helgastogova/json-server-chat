import * as React from 'react';
import cx from 'classnames';
import TruncateMarkup from 'react-truncate-markup';

import s from './text.module.css';

type TextVariant = 'body/base' | 'body/small' | 'heading/small';

type Color = 'black' | 'gray';

interface TextProps<T extends React.ElementType = 'span'> {
  as?: T;
  children: React.ReactNode;
  variant: TextVariant;
  color?: Color;
  className?: string;
  fontWidth?: 'regular' | 'bold' | 'semibold';
  truncate?: number;
}

const Text = <T extends React.ElementType = 'span'>({
  as: Component,
  children,
  className,
  variant,
  fontWidth = 'regular',
  color,
  truncate,
  ...rest
}: TextProps<T>) => {
  const DefaultComponent = Component || 'span';

  return (
    <DefaultComponent
      className={cx(className, s.text, s[variant], color && s[`color-${color}`], s[`font-width-${fontWidth}`])}
      {...rest}
    >
      {truncate ? (
        <TruncateMarkup ellipsis="..." lines={truncate}>
          <span>{children}</span>
        </TruncateMarkup>
      ) : (
        children
      )}
    </DefaultComponent>
  );
};

export default Text;
