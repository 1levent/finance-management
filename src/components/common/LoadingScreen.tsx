import { Spin } from 'antd';

const LoadingScreen = () => {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <Spin size="large">
          <div className="p-4">加载中...</div>
        </Spin>
      </div>
    </div>
  );
};

export default LoadingScreen; 