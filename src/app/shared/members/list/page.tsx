'use client';

import { useState } from 'react';
import { Card, Table, Button, Tag, Space, Modal, App, Avatar, Tooltip } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined, StopOutlined } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import type { ISharedMember } from '@/types/shared';
import MemberForm from '@/components/features/shared/MemberForm';
import dayjs from 'dayjs';

// 模拟数据
const mockMembers: ISharedMember[] = [
  {
    id: '1',
    userId: 'user1',
    username: '张三',
    avatar: undefined,
    role: 'owner',
    status: 'active',
    joinDate: '2024-01-01',
    lastActiveDate: '2024-03-29',
    contribution: 5000,
  },
  {
    id: '2',
    userId: 'user2',
    username: '李四',
    avatar: undefined,
    role: 'admin',
    status: 'active',
    joinDate: '2024-01-15',
    lastActiveDate: '2024-03-28',
    contribution: 3000,
  },
  {
    id: '3',
    userId: 'user3',
    username: '王五',
    avatar: undefined,
    role: 'member',
    status: 'active',
    joinDate: '2024-02-01',
    lastActiveDate: '2024-03-27',
    contribution: 2000,
  },
];

const roleLabels = {
  owner: { text: '所有者', color: 'red' },
  admin: { text: '管理员', color: 'orange' },
  member: { text: '成员', color: 'blue' },
  viewer: { text: '观察者', color: 'default' },
};

const statusLabels = {
  active: { text: '活跃', color: 'success' },
  inactive: { text: '未活跃', color: 'default' },
  pending: { text: '待确认', color: 'warning' },
};

export default function MemberListPage() {
  const { message, modal } = App.useApp();
  const [selectedMember, setSelectedMember] = useState<ISharedMember | null>(null);
  const [formVisible, setFormVisible] = useState(false);

  const handleDelete = (record: ISharedMember) => {
    modal.confirm({
      title: '确认删除',
      content: `确定要删除成员"${record.username}"吗？`,
      onOk() {
        message.success('删除成功');
      },
    });
  };

  const handleEdit = (record: ISharedMember) => {
    setSelectedMember(record);
    setFormVisible(true);
  };

  const handleFormSubmit = (values: ISharedMember) => {
    if (selectedMember) {
      message.success('编辑成功');
    } else {
      message.success('新增成功');
    }
    setFormVisible(false);
    setSelectedMember(null);
  };

  const handleToggleStatus = (record: ISharedMember) => {
    modal.confirm({
      title: record.status === 'active' ? '确认禁用' : '确认启用',
      content: `确定要${record.status === 'active' ? '禁用' : '启用'}成员"${record.username}"吗？`,
      onOk() {
        message.success(`${record.status === 'active' ? '禁用' : '启用'}成功`);
      },
    });
  };

  const columns: ColumnsType<ISharedMember> = [
    {
      title: '成员',
      key: 'member',
      width: 200,
      render: (_, record) => (
        <Space>
          <Avatar>{record.username[0]}</Avatar>
          <span>{record.username}</span>
        </Space>
      ),
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
      title: '加入时间',
      dataIndex: 'joinDate',
      key: 'joinDate',
      width: 120,
      render: (date: string) => dayjs(date).format('YYYY-MM-DD'),
    },
    {
      title: '最后活跃',
      dataIndex: 'lastActiveDate',
      key: 'lastActiveDate',
      width: 120,
      render: (date: string) => dayjs(date).format('YYYY-MM-DD'),
    },
    {
      title: '贡献金额',
      dataIndex: 'contribution',
      key: 'contribution',
      width: 120,
      align: 'right',
      render: (amount: number) => `¥${amount.toLocaleString()}`,
    },
    {
      title: '操作',
      key: 'action',
      width: 200,
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
            icon={<StopOutlined />}
            onClick={() => handleToggleStatus(record)}
          >
            {record.status === 'active' ? '禁用' : '启用'}
          </Button>
          <Button
            type="link"
            size="small"
            danger
            icon={<DeleteOutlined />}
            onClick={() => handleDelete(record)}
            disabled={record.role === 'owner'}
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
        title="成员管理"
        extra={
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => {
              setSelectedMember(null);
              setFormVisible(true);
            }}
          >
            新增成员
          </Button>
        }
      >
        <Table<ISharedMember>
          columns={columns}
          dataSource={mockMembers.map(item => ({
            ...item,
            key: item.id,
          }))}
          pagination={false}
        />
      </Card>

      <Modal
        title={selectedMember ? '编辑成员' : '新增成员'}
        open={formVisible}
        onCancel={() => {
          setFormVisible(false);
          setSelectedMember(null);
        }}
        footer={null}
        width={600}
      >
        <MemberForm
          initialValues={selectedMember || undefined}
          onSubmit={handleFormSubmit}
          onCancel={() => {
            setFormVisible(false);
            setSelectedMember(null);
          }}
        />
      </Modal>
    </div>
  );
} 