'use client';

import { useState } from 'react';
import { Card, Table, Button, Tag, Space, Modal, App, Avatar } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined, TeamOutlined } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import type { ISharedAccount } from '@/types/shared';
import AccountForm from '@/components/features/shared/AccountForm';
import dayjs from 'dayjs';

// 模拟数据
const mockAccounts: ISharedAccount[] = [
  {
    id: '1',
    name: '团队经费',
    balance: 10000,
    currency: 'CNY',
    description: '日常团队开支',
    createdBy: 'user1',
    createdAt: '2024-03-01',
    members: [
      { userId: '1', username: '张三', role: 'owner' },
      { userId: '2', username: '李四', role: 'admin' },
      { userId: '3', username: '王五', role: 'member' },
    ],
  },
  {
    id: '2',
    name: '项目资金',
    balance: 50000,
    currency: 'CNY',
    description: '项目专用资金',
    createdBy: 'user2',
    createdAt: '2024-03-15',
    members: [
      { userId: '2', username: '李四', role: 'owner' },
      { userId: '1', username: '张三', role: 'member' },
      { userId: '4', username: '赵六', role: 'member' },
    ],
  },
];

const roleLabels = {
  owner: { text: '所有者', color: 'red' },
  admin: { text: '管理员', color: 'orange' },
  member: { text: '成员', color: 'blue' },
  viewer: { text: '观察者', color: 'default' },
};

export default function AccountListPage() {
  const { message, modal } = App.useApp();
  const [selectedAccount, setSelectedAccount] = useState<ISharedAccount | null>(null);
  const [formVisible, setFormVisible] = useState(false);

  const handleDelete = (record: ISharedAccount) => {
    modal.confirm({
      title: '确认删除',
      content: `确定要删除账户"${record.name}"吗？`,
      onOk() {
        message.success('删除成功');
      },
    });
  };

  const handleEdit = (record: ISharedAccount) => {
    setSelectedAccount(record);
    setFormVisible(true);
  };

  const handleFormSubmit = (values: ISharedAccount) => {
    if (selectedAccount) {
      message.success('编辑成功');
    } else {
      message.success('新增成功');
    }
    setFormVisible(false);
    setSelectedAccount(null);
  };

  const columns: ColumnsType<ISharedAccount> = [
    {
      title: '账户名称',
      dataIndex: 'name',
      key: 'name',
      width: 200,
    },
    {
      title: '余额',
      dataIndex: 'balance',
      key: 'balance',
      width: 150,
      align: 'right',
      render: (balance: number) => `¥${balance.toLocaleString()}`,
    },
    {
      title: '成员',
      key: 'members',
      width: 250,
      render: (_, record) => (
        <Space>
          <Avatar.Group maxCount={3} maxStyle={{ color: '#f56a00', backgroundColor: '#fde3cf' }}>
            {record.members.map(member => (
              <Avatar key={member.userId}>{member.username[0]}</Avatar>
            ))}
          </Avatar.Group>
          <span className="text-gray-500">
            ({record.members.length}人)
          </span>
        </Space>
      ),
    },
    {
      title: '我的角色',
      key: 'myRole',
      width: 120,
      render: (_, record) => {
        const myRole = record.members.find(m => m.userId === '1')?.role;
        if (!myRole) return null;
        return (
          <Tag color={roleLabels[myRole].color}>
            {roleLabels[myRole].text}
          </Tag>
        );
      },
    },
    {
      title: '创建时间',
      dataIndex: 'createdAt',
      key: 'createdAt',
      width: 120,
      render: (date: string) => dayjs(date).format('YYYY-MM-DD'),
    },
    {
      title: '描述',
      dataIndex: 'description',
      key: 'description',
      ellipsis: true,
    },
    {
      title: '操作',
      key: 'action',
      width: 180,
      render: (_, record) => (
        <Space size="small">
          <Button
            type="link"
            size="small"
            icon={<EditOutlined />}
            onClick={() => handleEdit(record)}
          >
            编辑
          </Button>
          <Button
            type="link"
            size="small"
            icon={<TeamOutlined />}
            onClick={() => message.info('管理成员')}
          >
            成员
          </Button>
          <Button
            type="link"
            size="small"
            danger
            icon={<DeleteOutlined />}
            onClick={() => handleDelete(record)}
          >
            删除
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div className="p-4 space-y-4">
      <Card
        title="共享账户"
        extra={
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => {
              setSelectedAccount(null);
              setFormVisible(true);
            }}
          >
            新增账户
          </Button>
        }
      >
        <Table<ISharedAccount>
          columns={columns}
          dataSource={mockAccounts.map(item => ({
            ...item,
            key: item.id,
          }))}
          pagination={false}
        />
      </Card>

      <Modal
        title={selectedAccount ? '编辑账户' : '新增账户'}
        open={formVisible}
        onCancel={() => {
          setFormVisible(false);
          setSelectedAccount(null);
        }}
        footer={null}
        width={600}
      >
        <AccountForm
          initialValues={selectedAccount || undefined}
          onSubmit={handleFormSubmit}
          onCancel={() => {
            setFormVisible(false);
            setSelectedAccount(null);
          }}
        />
      </Modal>
    </div>
  );
} 