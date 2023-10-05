import React, { FC } from 'react';
import cx from 'classnames';
import s from './loader.module.css';

type LoaderProps = {
  className?: string;
};

const Loader: FC<LoaderProps> = ({ className }) => {
  return (
    <div className={cx(s.loader, className)}>
      <div className={s.spinner}></div>
    </div>
  );
};

export default Loader;
