import { forwardRef } from 'react';

import cx from 'classnames';
import Image from 'next/image';

import s from './avatar.module.css';

type Props = {
  src?: string | null;
  alt?: string;
  className?: string;
};

const DEFAULT_SIZE = 32;

const Avatar = forwardRef<HTMLImageElement, Props>(function Avatar({ alt, className, src }, ref) {
  if (!src) return <div className={cx(s.root, s.emptyAvatar, className)}>{alt?.slice(0, 2)}</div>;

  return (
    <Image
      src={src}
      ref={ref}
      alt={alt ?? 'Avatar'}
      className={cx(s.root, className)}
      width={DEFAULT_SIZE}
      height={DEFAULT_SIZE}
    />
  );
});

export default Avatar;
