import React from 'react';
import { useFormik } from 'formik';
import { Button, Textarea } from '@ui';

import s from './message-form.module.css';

interface MessageFormProps {
  chatId: string | null;
  loading: boolean;
  handleSend: (chatId: string | null) => void;
  newMessage: string;
  setNewMessage: (value: string) => void;
  sending: boolean;
}

export const MessageForm: React.FC<MessageFormProps> = ({
  chatId,
  loading,
  handleSend,
  newMessage,
  setNewMessage,
  sending,
}) => {
  const formik = useFormik({
    initialValues: { text: newMessage },
    onSubmit: (values, { resetForm }) => {
      if (chatId) {
        handleSend(chatId);
      }
      resetForm();
    },
  });

  const isMessageEmpty = !newMessage.trim();

  if (!chatId) return null;

  return (
    <div className={s.root}>
      <form onSubmit={formik.handleSubmit} className={s.form}>
        <Textarea
          id="text"
          name="text"
          onChange={(e) => {
            formik.handleChange(e);
            setNewMessage(e.target.value);
          }}
          onKeyDown={(e) => {
            if (isMessageEmpty) return;
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              formik.handleSubmit();
            }
          }}
          value={formik.values.text}
          className={s.textarea}
        />
        <Button type="submit" loading={sending} disabled={loading || isMessageEmpty}>
          Send {sending && 'ing'}
        </Button>
      </form>
    </div>
  );
};
