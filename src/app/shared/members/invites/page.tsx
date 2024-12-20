'use client';

import { useState } from 'react';
import { Card, Table, Button, Tag, Space, Modal, App, DatePicker } from 'antd';
import { PlusOutlined, SendOutlined, DeleteOutlined, CopyOutlined } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import type { ISharedInvite } from '@/types/shared';
import InviteForm from '@/components/features/shared/InviteForm';
import dayjs from 'dayjs';

// 模拟数据
const mockInvites: ISharedInvite[] = [
  {
    id: '1',
    inviterId: 'user1',
    inviterName: '张三',
    email: 'test1@example.com',
    role: 'member',
    status: 'pending',
    createdAt: '2024-03-29',
    expiredAt: '2024-04-05',
  },
  {
    id: '2',
    inviterId: 'user1',
    inviterName: '张三',
    email: 'test2@example.com',
    role: 'admin',
    status: 'accepted',
    createdAt: '2024-03-28',
    expiredAt: '2024-04-04',
    acceptedAt: '2024-03-29',
  },
  {
    id: '3',
    inviterId: 'user2',
    inviterName: '李四',
    email: 'test3@example.com',
    role: 'member',
    status: 'rejected',
    createdAt: '2024-03-27',
    expiredAt: '2024-04-03',
  },
];

const statusLabels = {
  pending: { text: '待接受', color: 'processing' },
  accepted: { text: '已接受', color: 'success' },
  rejected: { text: '已拒绝', color: 'error' },
  expired: { text: '已过期', color: 'default' },
};

const roleLabels = {
  owner: { text: '所有者', color: 'red' },
  admin: { text: '管理员', color: 'orange' },
  member: { text: '成员', color: 'blue' },
  viewer: { text: '观察者', color: 'default' },
};

export default function InviteListPage() {
  const { message, modal } = App.useApp();
  const [formVisible, setFormVisible] = useState(false);

  const handleDelete = (record: ISharedInvite) => {
    modal.confirm({
      title: '确认删除',
      content: `确定要删除邀请"${record.email}"吗？`,
      onOk() {
        message.success('删除成功');
      },
    });
  };

  const handleResend = (record: ISharedInvite) => {
    modal.confirm({
      title: '确认重发',
      content: `确定要重新发送邀请给"${record.email}"吗？`,
      onOk() {
        message.success('发送成功');
      },
    });
  };

  const handleCopyLink = (record: ISharedInvite) => {
    // 模拟复制邀请链接
    const link = `https://example.com/invite/${record.id}`;
    navigator.clipboard.writeText(link).then(() => {
      message.success('链接已复制');
    });
  };

  const handleFormSubmit = (values: ISharedInvite) => {
    message.success('邀请已发送');
    setFormVisible(false);
  };

  const columns: ColumnsType<ISharedInvite> = [
    {
      title: '邮箱',
      dataIndex: 'email',
      key: 'email',
      width: 200,
    },
    {
      title: '角色',
      dataIndex: 'role',
      key: 'role',
      width: 120,
      render: (role: keyof typeof roleLabels) => (
        <Tag color={roleLabels[role].color}>
          {roleLabels[role].text}
        </Tag>
      ),
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      width: 100,
      render: (status: keyof typeof statusLabels) => (
        <Tag color={statusLabels[status].color}>
          {statusLabels[status].text}
        </Tag>
      ),
    },
    {
      title: '邀请人',
      dataIndex: 'inviterName',
      key: 'inviterName',
      width: 120,
    },
    {
      title: '发送时间',
      dataIndex: 'createdAt',
      key: 'createdAt',
      width: 120,
      render: (date: string) => dayjs(date).format('YYYY-MM-DD'),
    },
    {
      title: '过期时间',
      dataIndex: 'expiredAt',
      key: 'expiredAt',
      width: 120,
      render: (date: string) => dayjs(date).format('YYYY-MM-DD'),
    },
    {
      title: '操作',
      key: 'action',
      width: 200,
      render: (_, record) => (
        <Space size="small">
          {record.status === 'pending' && (
            <>
              <Button
                type="link"
                size="small"
                icon={<SendOutlined />}
                onClick={() => handleResend(record)}
              >
                重发
              </Button>
              <Button
                type="link"
                size="small"
                icon={<CopyOutlined />}
                onClick={() => handleCopyLink(record)}
              >
                复制
              </Button>
            </>
          )}
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
        title="邀请管理"
        extra={
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => setFormVisible(true)}
          >
            发送邀请
          </Button>
        }
      >
        <Table<ISharedInvite>
          columns={columns}
          dataSource={mockInvites.map(item => ({
            ...item,
            key: item.id,
          }))}
          pagination={false}
        />
      </Card>

      <Modal
        title="发送邀请"
        open={formVisible}
        onCancel={() => setFormVisible(false)}
        footer={null}
        width={600}
      >
        <InviteForm
          onSubmit={handleFormSubmit}
          onCancel={() => setFormVisible(false)}
        />
      </Modal>
    </div>
  );
} 