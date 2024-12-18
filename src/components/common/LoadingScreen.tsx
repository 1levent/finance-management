import { Spin } from 'antd';

const LoadingScreen = () => {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <Spin size="large" tip="加载中..." />
    </div>
  );
};

export default LoadingScreen; 