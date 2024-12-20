'use client';

import { Card, Button, List, Tag, Space, Progress, message } from 'antd';
import { CloudUploadOutlined, CloudDownloadOutlined, DeleteOutlined, SyncOutlined } from '@ant-design/icons';

const backupHistory = [
  {
    id: '1',
    date: '2024-03-28 15:30:00',
    size: '2.5MB',
    type: 'auto',
    status: 'success',
  },
  {
    id: '2',
    date: '2024-03-27 10:15:00',
    size: '2.3MB',
    type: 'manual',
    status: 'success',
  },
  {
    id: '3',
    date: '2024-03-26 20:45:00',
    size: '2.4MB',
    type: 'auto',
    status: 'success',
  },
];

export default function BackupPage() {
  const handleBackup = () => {
    message.loading('正在备份数据...', 2)
      .then(() => message.success('数据备份成功'));
  };

  const handleRestore = (id: string) => {
    message.loading('正在恢复数据...', 2)
      .then(() => message.success('数据恢复成功'));
  };

  const handleDelete = (id: string) => {
    message.loading('正在删除备份...', 1)
      .then(() => message.success('备份删除成功'));
  };

  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      <div>
        <h3 className="text-lg font-medium mb-4">数据备份</h3>
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <div>
              <h4 className="text-lg font-medium mb-2">存储空间</h4>
              <Progress percent={30} />
            </div>
            <Button 
              type="primary" 
              icon={<CloudUploadOutlined />}
              onClick={handleBackup}
            >
              立即备份
            </Button>
          </div>

          <div className="bg-gray-50 p-4 rounded">
            <h4 className="text-lg font-medium mb-2">自动备份设置</h4>
            <p className="text-gray-500 mb-4">每天凌晨3点自动备份数据</p>
            <Space>
              <Button type="primary" ghost icon={<SyncOutlined />}>
                修改设置
              </Button>
            </Space>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-medium mb-4">备份历史</h3>
        <List
          dataSource={backupHistory}
          renderItem={item => (
            <List.Item
              actions={[
                <Button 
                  key="restore"
                  type="link" 
                  icon={<CloudDownloadOutlined />}
                  onClick={() => handleRestore(item.id)}
                >
                  恢复
                </Button>,
                <Button 
                  key="delete"
                  type="link" 
                  danger
                  icon={<DeleteOutlined />}
                  onClick={() => handleDelete(item.id)}
                >
                  删除
                </Button>,
              ]}
            >
              <List.Item.Meta
                title={item.date}
                description={
                  <Space>
                    <span>大小：{item.size}</span>
                    <Tag color={item.type === 'auto' ? 'blue' : 'green'}>
                      {item.type === 'auto' ? '自动备份' : '手动备份'}
                    </Tag>
                  </Space>
                }
              />
            </List.Item>
          )}
        />
      </div>
    </div>
  );
} 