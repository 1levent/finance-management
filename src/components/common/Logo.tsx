'use client';

import { DollarOutlined } from '@ant-design/icons';

interface LogoProps {
  size?: 'small' | 'default' | 'large';
  className?: string;
}

export default function Logo({ size = 'default', className = '' }: LogoProps) {
  const sizeClasses = {
    small: 'text-xl',
    default: 'text-2xl',
    large: 'text-3xl'
  };

  return (
    <div className={`flex items-center font-medium ${sizeClasses[size]} ${className}`}>
      <DollarOutlined className="text-primary mr-2" />
      <div className="flex items-baseline">
        <span className="text-primary font-bold tracking-tight">Money</span>
        <span className="text-gray-800 font-extrabold tracking-wide bg-gradient-to-r from-gray-700 to-gray-900 bg-clip-text text-transparent">
          Master
        </span>
        <span className="text-primary text-[0.6em] ml-0.5 opacity-80">™</span>
      </div>
    </div>
  );
} 