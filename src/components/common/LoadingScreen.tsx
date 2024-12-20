'use client';

import { Spin } from 'antd';

export default function LoadingScreen() {
  return (
    <div className="flex items-center justify-center min-h-[400px]">
      <Spin>
        <div className="p-24" />
      </Spin>
    </div>
  );
} 