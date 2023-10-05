import cx from 'classnames';
import s from './button.module.css';
import { Loader } from '@ui';

interface ButtonProps {
  onClick?: () => void;
  children?: React.ReactNode;
  type?: 'button' | 'submit' | 'reset';
  className?: string;
  disabled?: boolean;
  loading?: boolean;
}

const Button: React.FC<ButtonProps> = ({ onClick, children, type = 'button', className, disabled, loading }) => {
  if (!children) return null;

  return (
    <button className={cx(s.root, className, disabled && s.disabled)} type={type} onClick={onClick}>
      {loading ? <Loader /> : children}
    </button>
  );
};

export default Button;
