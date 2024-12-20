'use client';

import { useState } from 'react';
import { Card, Row, Col, Button, Table, Tag, Space, Switch, Modal, App, Tabs } from 'antd';
import { BellOutlined, SettingOutlined, DeleteOutlined, CheckOutlined } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import type { IReminder, IReminderSetting } from '@/types/reminder';
import ReminderSettingForm from '@/components/features/assets/tools/ReminderSettingForm';

// 模拟数据
const mockReminders: IReminder[] = [
  {
    id: '1',
    type: 'payment',
    title: '房贷还款提醒',
    content: '您的房贷将于3天后到期，请及时还款',
    debtId: '1',
    debtName: '房贷',
    amount: 4800,
    dueDate: '2024-04-01',
    priority: 'high',
    status: 'pending',
    createdAt: '2024-03-28',
  },
  {
    id: '2',
    type: 'overdue',
    title: '消费贷逾期提醒',
    content: '您的消费贷已逾期1天，请尽快处理',
    debtId: '2',
    debtName: '消费贷',
    amount: 4500,
    dueDate: '2024-03-28',
    priority: 'high',
    status: 'sent',
    createdAt: '2024-03-29',
  },
];

const mockSettings: IReminderSetting[] = [
  {
    id: '1',
    debtId: '1',
    debtName: '房贷',
    enabled: true,
    advanceDays: 3,
    notifyTime: '09:00',
    notifyMethods: ['email', 'push'],
  },
  {
    id: '2',
    debtId: '2',
    debtName: '消费贷',
    enabled: true,
    advanceDays: 5,
    notifyTime: '10:00',
    notifyMethods: ['email', 'sms', 'push'],
  },
];

const typeLabels = {
  payment: { text: '还款提醒', color: 'blue' },
  overdue: { text: '逾期提醒', color: 'red' },
  expiration: { text: '到期提醒', color: 'orange' },
};

const priorityLabels = {
  high: { text: '高', color: 'red' },
  medium: { text: '中', color: 'orange' },
  low: { text: '低', color: 'blue' },
};

const statusLabels = {
  pending: { text: '待处理', color: 'warning' },
  sent: { text: '已发送', color: 'processing' },
  read: { text: '已读', color: 'success' },
};

function ReminderPage() {
  const { message, modal } = App.useApp();
  const [selectedSetting, setSelectedSetting] = useState<IReminderSetting | null>(null);
  const [formVisible, setFormVisible] = useState(false);

  const handleMarkAsRead = (record: IReminder) => {
    message.success('已标记为已读');
  };

  const handleDelete = (record: IReminder) => {
    modal.confirm({
      title: '确认删除',
      content: '确定要删除这条提醒吗？',
      onOk() {
        message.success('删除成功');
      },
    });
  };

  const handleToggleEnabled = (record: IReminderSetting, checked: boolean) => {
    message.success(`${checked ? '启用' : '禁用'}成功`);
  };

  const handleEditSetting = (record: IReminderSetting) => {
    setSelectedSetting(record);
    setFormVisible(true);
  };

  const handleFormSubmit = (values: IReminderSetting) => {
    if (selectedSetting) {
      message.success('编辑成功');
    } else {
      message.success('新增成功');
    }
    setFormVisible(false);
    setSelectedSetting(null);
  };

  const reminderColumns: ColumnsType<IReminder> = [
    {
      title: '类型',
      dataIndex: 'type',
      key: 'type',
      width: 100,
      render: (type: keyof typeof typeLabels) => (
        <Tag color={typeLabels[type].color}>
          {typeLabels[type].text}
        </Tag>
      ),
    },
    {
      title: '标题',
      dataIndex: 'title',
      key: 'title',
      width: 200,
    },
    {
      title: '内容',
      dataIndex: 'content',
      key: 'content',
      ellipsis: true,
    },
    {
      title: '到期日',
      dataIndex: 'dueDate',
      key: 'dueDate',
      width: 120,
    },
    {
      title: '金额',
      dataIndex: 'amount',
      key: 'amount',
      width: 120,
      align: 'right',
      render: (val?: number) => val ? `¥${val.toLocaleString()}` : '-',
    },
    {
      title: '优先级',
      dataIndex: 'priority',
      key: 'priority',
      width: 80,
      render: (priority: keyof typeof priorityLabels) => (
        <Tag color={priorityLabels[priority].color}>
          {priorityLabels[priority].text}
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
      title: '操作',
      key: 'action',
      width: 150,
      render: (_, record) => (
        <Space size="small">
          {record.status !== 'read' && (
            <Button
              type="link"
              size="small"
              icon={<CheckOutlined />}
              onClick={() => handleMarkAsRead(record)}
            >
              标记已读
            </Button>
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

  const settingColumns: ColumnsType<IReminderSetting> = [
    {
      title: '借贷名称',
      dataIndex: 'debtName',
      key: 'debtName',
      width: 150,
    },
    {
      title: '提前天数',
      dataIndex: 'advanceDays',
      key: 'advanceDays',
      width: 100,
      render: (days: number) => `${days}天`,
    },
    {
      title: '提醒时间',
      dataIndex: 'notifyTime',
      key: 'notifyTime',
      width: 100,
    },
    {
      title: '通知方式',
      dataIndex: 'notifyMethods',
      key: 'notifyMethods',
      width: 200,
      render: (methods: string[]) => (
        <Space>
          {methods.map(method => (
            <Tag key={method}>
              {method === 'email' ? '邮件' : method === 'sms' ? '短信' : '站内信'}
            </Tag>
          ))}
        </Space>
      ),
    },
    {
      title: '状态',
      dataIndex: 'enabled',
      key: 'enabled',
      width: 100,
      render: (enabled: boolean, record) => (
        <Switch
          checked={enabled}
          onChange={(checked) => handleToggleEnabled(record, checked)}
        />
      ),
    },
    {
      title: '操作',
      key: 'action',
      width: 100,
      render: (_, record) => (
        <Button
          type="link"
          size="small"
          icon={<SettingOutlined />}
          onClick={() => handleEditSetting(record)}
        >
          编辑
        </Button>
      ),
    },
  ];

  return (
    <div className="p-4 space-y-4">
      <Tabs
        items={[
          {
            key: 'reminders',
            label: (
              <span>
                <BellOutlined />
                提醒列表
              </span>
            ),
            children: (
              <Table<IReminder>
                columns={reminderColumns}
                dataSource={mockReminders}
                size="small"
                pagination={false}
                rowKey="id"
              />
            ),
          },
          {
            key: 'settings',
            label: (
              <span>
                <SettingOutlined />
                提醒设置
              </span>
            ),
            children: (
              <Card
                size="small"
                extra={
                  <Button
                    type="primary"
                    size="small"
                    onClick={() => {
                      setSelectedSetting(null);
                      setFormVisible(true);
                    }}
                  >
                    新增设置
                  </Button>
                }
              >
                <Table<IReminderSetting>
                  columns={settingColumns}
                  dataSource={mockSettings}
                  size="small"
                  pagination={false}
                  rowKey="id"
                />
              </Card>
            ),
          },
        ]}
      />

      <Modal
        title={selectedSetting ? '编辑提醒设置' : '新增提醒设置'}
        open={formVisible}
        onCancel={() => {
          setFormVisible(false);
          setSelectedSetting(null);
        }}
        footer={null}
        width={600}
      >
        <ReminderSettingForm
          initialValues={selectedSetting || undefined}
          onSubmit={handleFormSubmit}
          onCancel={() => {
            setFormVisible(false);
            setSelectedSetting(null);
          }}
        />
      </Modal>
    </div>
  );
}

// 添加默认导出
export default ReminderPage; 