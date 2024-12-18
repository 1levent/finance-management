'use client';

import { Typography } from 'antd';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const { Title } = Typography;

type LogoSize = 'small' | 'default' | 'large';

interface ILogoProps {
  size?: LogoSize;
  showText?: boolean;
  className?: string;
}

const sizeConfig: Record<LogoSize, { container: string; icon: string; text: string }> = {
  small: {
    container: 'h-8',
    icon: 'w-8 h-8 text-lg',
    text: 'text-lg ml-2',
  },
  default: {
    container: 'h-10',
    icon: 'w-10 h-10 text-xl',
    text: 'text-xl ml-2.5',
  },
  large: {
    container: 'h-12',
    icon: 'w-12 h-12 text-2xl',
    text: 'text-2xl ml-3',
  },
};

const iconVariants = {
  hidden: { scale: 0.8, opacity: 0 },
  visible: { 
    scale: 1, 
    opacity: 1,
    transition: { duration: 0.3 }
  },
  hover: { 
    scale: 1.05,
    transition: { duration: 0.2 }
  }
};

const textVariants = {
  hidden: { x: -20, opacity: 0 },
  visible: { 
    x: 0, 
    opacity: 1,
    transition: { duration: 0.3, delay: 0.1 }
  }
};

export default function Logo({ size = 'default', showText = true, className = '' }: ILogoProps) {
  const [mounted, setMounted] = useState(false);
  const config = sizeConfig[size];

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className={`flex items-center ${config.container} ${className}`}>
      <motion.div
        className={`relative ${config.icon} rounded-xl overflow-hidden`}
        variants={iconVariants}
        initial="hidden"
        animate="visible"
        whileHover="hover"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500 via-blue-600 to-blue-700" />
        
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.2)_0%,transparent_60%)]" />
        
        <div className="relative flex items-center justify-center w-full h-full text-white font-bold">
          <span className="transform -rotate-12">F</span>
          <span className="transform rotate-12 -ml-0.5">M</span>
        </div>
      </motion.div>

      {showText && (
        <motion.div
          variants={textVariants}
          initial="hidden"
          animate="visible"
          className={`font-bold ${config.text} bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent`}
        >
          Finance
        </motion.div>
      )}
    </div>
  );
} 