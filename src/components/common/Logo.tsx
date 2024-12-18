'use client';

import { Typography } from 'antd';

const { Title } = Typography;

type LogoSize = 'small' | 'default' | 'large';

interface ILogoProps {
  size?: LogoSize;
}

const sizeConfig: Record<LogoSize, { container: string; level: 1 | 2 | 3 | 4 | 5 }> = {
  small: {
    container: 'w-12 h-12',
    level: 4,
  },
  default: {
    container: 'w-16 h-16',
    level: 3,
  },
  large: {
    container: 'w-20 h-20',
    level: 2,
  },
};

export default function Logo({ size = 'default' }: ILogoProps) {
  const config = sizeConfig[size];

  return (
    <div className={`flex items-center justify-center ${config.container} bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg shadow-lg`}>
      <Title level={config.level} className="m-0 text-white font-bold">
        FM
      </Title>
    </div>
  );
} 