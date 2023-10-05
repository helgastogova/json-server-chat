import React from 'react';
import cx from 'classnames';
import s from './textarea.module.css';

interface TextareaProps {
  id: string;
  name: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onKeyDown: (e: React.KeyboardEvent<HTMLTextAreaElement>) => void;
  value: string;
  className?: string;
}

const Textarea: React.FC<TextareaProps> = ({ id, name, onChange, onKeyDown, value, className }) => {
  return (
    <textarea
      className={cx(s.root, className)}
      id={id}
      name={name}
      onChange={onChange}
      onKeyDown={onKeyDown}
      value={value}
    />
  );
};

export default Textarea;
