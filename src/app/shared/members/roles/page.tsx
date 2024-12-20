'use client';

import { useState } from 'react';
import { Card, Table, Button, Tag, Space, Modal, App, Tooltip } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined, KeyOutlined } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import type { ISharedRole, ISharedPermission } from '@/types/shared';
import RoleForm from '@/components/features/shared/RoleForm';
import dayjs from 'dayjs';

// 模拟权限数据
const mockPermissions: ISharedPermission[] = [
  { id: '1', name: '查看账户', description: '查看共享账户信息', actions: ['read'] },
  { id: '2', name: '管理账户', description: '创建和编辑共享账户', actions: ['read', 'write'] },
  { id: '3', name: '删除账户', description: '删除共享账户', actions: ['read', 'write', 'delete'] },
  { id: '4', name: '邀请成员', description: '邀请新成员加入', actions: ['invite'] },
  { id: '5', name: '管理成员', description: '管理成员权限', actions: ['manage'] },
];

// 模拟角色数据
const mockRoles: ISharedRole[] = [
  {
    id: '1',
    name: '所有者',
    description: '完全控制权限',
    permissions: ['1', '2', '3', '4', '5'],
    isSystem: true,
    createdAt: '2024-01-01',
  },
  {
    id: '2',
    name: '管理员',
    description: '管理账户和成员',
    permissions: ['1', '2', '4', '5'],
    isSystem: true,
    createdAt: '2024-01-01',
  },
  {
    id: '3',
    name: '普通成员',
    description: '基本操作权限',
    permissions: ['1'],
    isSystem: true,
    createdAt: '2024-01-01',
  },
  {
    id: '4',
    name: '财务专员',
    description: '财务相关权限',
    permissions: ['1', '2'],
    isSystem: false,
    createdAt: '2024-03-01',
    updatedBy: 'user1',
    updatedAt: '2024-03-15',
  },
];

export default function RoleListPage() {
  const { message, modal } = App.useApp();
  const [selectedRole, setSelectedRole] = useState<ISharedRole | null>(null);
  const [formVisible, setFormVisible] = useState(false);

  const handleDelete = (record: ISharedRole) => {
    modal.confirm({
      title: '确认删除',
      content: `确定要删除角色"${record.name}"吗？`,
      onOk() {
        message.success('删除成功');
      },
    });
  };

  const handleEdit = (record: ISharedRole) => {
    setSelectedRole(record);
    setFormVisible(true);
  };

  const handleFormSubmit = (values: ISharedRole) => {
    if (selectedRole) {
      message.success('编辑成功');
    } else {
      message.success('新增成功');
    }
    setFormVisible(false);
    setSelectedRole(null);
  };

  const columns: ColumnsType<ISharedRole> = [
    {
      title: '角色名称',
      dataIndex: 'name',
      key: 'name',
      width: 150,
      render: (name: string, record) => (
        <Space>
          <span>{name}</span>
          {record.isSystem && (
            <Tag color="blue">系统</Tag>
          )}
        </Space>
      ),
    },
    {
      title: '描述',
      dataIndex: 'description',
      key: 'description',
      width: 200,
    },
    {
      title: '权限',
      key: 'permissions',
      width: 300,
      render: (_, record) => (
        <Space wrap>
          {record.permissions.map(id => {
            const permission = mockPermissions.find(p => p.id === id);
            if (!permission) return null;
            return (
              <Tooltip key={id} title={permission.description}>
                <Tag icon={<KeyOutlined />}>{permission.name}</Tag>
              </Tooltip>
            );
          })}
        </Space>
      ),
    },
    {
      title: '创建时间',
      dataIndex: 'createdAt',
      key: 'createdAt',
      width: 120,
      render: (date: string) => dayjs(date).format('YYYY-MM-DD'),
    },
    {
      title: '最后更新',
      key: 'lastUpdate',
      width: 200,
      render: (_, record) => 
        record.updatedAt ? (
          <span>
            {dayjs(record.updatedAt).format('YYYY-MM-DD')}
            {record.updatedBy ? ` by ${record.updatedBy}` : ''}
          </span>
        ) : '-',
    },
    {
      title: '操作',
      key: 'action',
      width: 150,
      render: (_, record) => (
        <Space size="small">
          <Button
            type="link"
            size="small"
            icon={<EditOutlined />}
            onClick={() => handleEdit(record)}
            disabled={record.isSystem}
          >
            编辑
          </Button>
          <Button
            type="link"
            size="small"
            danger
            icon={<DeleteOutlined />}
            onClick={() => handleDelete(record)}
            disabled={record.isSystem}
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
        title="角色权限"
        extra={
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => {
              setSelectedRole(null);
              setFormVisible(true);
            }}
          >
            新增角色
          </Button>
        }
      >
        <Table<ISharedRole>
          columns={columns}
          dataSource={mockRoles.map(item => ({
            ...item,
            key: item.id,
          }))}
          pagination={false}
        />
      </Card>

      <Modal
        title={selectedRole ? '编辑角色' : '新增角色'}
        open={formVisible}
        onCancel={() => {
          setFormVisible(false);
          setSelectedRole(null);
        }}
        footer={null}
        width={800}
      >
        <RoleForm
          initialValues={selectedRole || undefined}
          permissions={mockPermissions}
          onSubmit={handleFormSubmit}
          onCancel={() => {
            setFormVisible(false);
            setSelectedRole(null);
          }}
        />
      </Modal>
    </div>
  );
} 