'use client';

import { Button, Result } from 'antd';
import { useEffect } from 'react';

interface IErrorBoundaryProps {
  error: Error & { digest?: string };
  reset: () => void;
}

const ErrorBoundary: React.FC<IErrorBoundaryProps> = ({ error, reset }) => {
  useEffect(() => {
    // 可以在这里添加错误日志上报
    console.error(error);
  }, [error]);

  return (
    <Result
      status="error"
      title="出错了"
      subTitle={error.message || '发生了一些错误，请稍后重试'}
      extra={[
        <Button key="retry" type="primary" onClick={reset}>
          重试
        </Button>,
      ]}
    />
  );
};

export default ErrorBoundary; 