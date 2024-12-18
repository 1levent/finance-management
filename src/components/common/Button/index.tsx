'use client';

import { forwardRef } from 'react';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

interface ButtonProps {
  type?: 'primary' | 'default' | 'link';
  size?: 'large' | 'middle' | 'small';
  block?: boolean;
  loading?: boolean;
  icon?: React.ReactNode;
  htmlType?: 'button' | 'submit' | 'reset';
  className?: string;
  disabled?: boolean;
  children?: React.ReactNode;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(({
  children,
  type = 'default',
  size = 'middle',
  block,
  loading,
  icon,
  className = '',
  disabled,
  htmlType = 'button',
  ...props
}, ref) => {
  const baseStyles = 'inline-flex items-center justify-center rounded transition-all duration-200 font-medium';
  const sizeStyles = {
    small: 'px-3 py-1 text-sm',
    middle: 'px-4 py-2',
    large: 'px-6 py-3 text-lg',
  };
  const typeStyles = {
    primary: 'bg-primary text-white hover:opacity-90 active:opacity-80',
    default: 'bg-white border border-gray-300 hover:border-primary hover:text-primary',
    link: 'text-primary hover:opacity-80',
  };
  const blockStyles = block ? 'w-full' : '';
  const disabledStyles = disabled || loading ? 'opacity-50 cursor-not-allowed' : '';

  return (
    <button
      ref={ref}
      type={htmlType}
      className={`
        ${baseStyles}
        ${sizeStyles[size]}
        ${typeStyles[type]}
        ${blockStyles}
        ${disabledStyles}
        ${className}
      `}
      disabled={disabled || loading}
      {...props}
    >
      {loading && (
        <Spin
          indicator={<LoadingOutlined style={{ fontSize: 16 }} spin />}
          className="mr-2"
        />
      )}
      {!loading && icon && <span className="mr-2">{icon}</span>}
      {children}
    </button>
  );
});

Button.displayName = 'Button'; 