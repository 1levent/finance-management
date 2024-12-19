'use client';

import { useEffect, useState } from 'react';
import { Table, Card, Button, Select, Tag, Space, Modal, Form, Input, InputNumber, DatePicker, App } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined, PauseCircleOutlined, PlayCircleOutlined } from '@ant-design/icons';
import type { IRecurringTransaction } from '@/types/transaction';
import { useTransactionStore } from '@/store/transaction';
import { transactionService } from '@/services/transaction';
import dayjs from 'dayjs';

const { RangePicker } = DatePicker;

export default function RecurringTransactions() {
  const { message, modal } = App.useApp();
  const { 
    categories,
    recurringTransactions, 
    recurringLoading,
    setRecurringTransactions,
    setRecurringLoading,
    setRecurringError,
  } = useTransactionStore();

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState<IRecurringTransaction | null>(null);
  const [form] = Form.useForm();
  const [submitting, setSubmitting] = useState(false);

  // 加载数据
  useEffect(() => {
    const loadData = async () => {
      try {
        setRecurringLoading(true);
        const data = await transactionService.getRecurringTransactions();
        setRecurringTransactions(data);
      } catch (error) {
        const err = error as Error;
        setRecurringError(err.message);
        message.error(err.message || '加载数据失败');
      } finally {
        setRecurringLoading(false);
      }
    };

    loadData();
  }, [setRecurringTransactions, setRecurringLoading, setRecurringError, message]);

  // 获取分类名称
  const getCategoryName = (categoryId: string) => {
    return categories.find(c => c.id === categoryId)?.name || '-';
  };

  // 根据类型过滤分类选项
  const getCategoryOptions = (type: 'income' | 'expense') => {
    return categories
      .filter(c => c.type === type)
      .map(c => ({
        label: c.name,
        value: c.id,
      }));
  };

  const columns = [
    {
      title: '类型',
      dataIndex: 'type',
      key: 'type',
      width: 80,
      align: 'center' as const,
      render: (type: string) => (
        <Tag color={type === 'income' ? 'success' : 'error'}>
          {type === 'income' ? '收入' : '支出'}
        </Tag>
      ),
    },
    {
      title: '金额',
      dataIndex: 'amount',
      key: 'amount',
      width: 100,
      align: 'center' as const,
      render: (amount: number, record: IRecurringTransaction) => (
        <span style={{ color: record.type === 'income' ? '#52c41a' : '#f5222d' }}>
          {record.type === 'income' ? '+' : '-'} ¥{amount.toFixed(2)}
        </span>
      ),
    },
    {
      title: '分类',
      dataIndex: 'categoryId',
      key: 'categoryId',
      width: 80,
      align: 'center' as const,
      ellipsis: true,
    },
    {
      title: '周期',
      dataIndex: 'period',
      key: 'period',
      width: 80,
      align: 'center' as const,
      render: (period: string) => ({
        daily: '每天',
        weekly: '每周',
        monthly: '每月',
        yearly: '每年',
      }[period]),
    },
    {
      title: '开始日期',
      dataIndex: 'startDate',
      key: 'startDate',
      align: 'center' as const,
      width: 100,
    },
    {
      title: '结束日期',
      dataIndex: 'endDate',
      key: 'endDate',
      align: 'center' as const,
      width: 100,
      render: (date: string) => date || '永久',
    },
    {
      title: '下次执行',
      dataIndex: 'nextExecution',
      key: 'nextExecution',
      align: 'center' as const,
      width: 100,
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      width: 90,
      align: 'center' as const,
      render: (status: string) => (
        <Tag color={
          status === 'active' ? 'success' :
          status === 'paused' ? 'warning' :
          'default'
        }>
          {status === 'active' ? '进行中' :
           status === 'paused' ? '已暂停' :
           '已完成'}
        </Tag>
      ),
    },
    {
      title: '操作',
      key: 'action',
      width: 150,
      align: 'center' as const,
      fixed: 'right' as const,
      render: (_: any, record: IRecurringTransaction) => (
        <Space size={4}>
          {record.status === 'active' ? (
            <Button 
              type="link" 
              size="small"
              icon={<PauseCircleOutlined />} 
              onClick={() => handleToggleStatus(record)}
            >
              暂停
            </Button>
          ) : record.status === 'paused' ? (
            <Button 
              type="link" 
              size="small"
              icon={<PlayCircleOutlined />} 
              onClick={() => handleToggleStatus(record)}
            >
              恢复
            </Button>
          ) : null}
          <Button type="link" size="small" icon={<EditOutlined />} onClick={() => handleEdit(record)}>
            编辑
          </Button>
          <Button type="link" size="small" danger icon={<DeleteOutlined />} onClick={() => handleDelete(record)}>
            删除
          </Button>
        </Space>
      ),
    },
  ];

  const handleAdd = () => {
    setSelectedRecord(null);
    form.resetFields();
    setIsModalVisible(true);
  };

  const handleEdit = (record: IRecurringTransaction) => {
    setSelectedRecord(record);
    form.setFieldsValue({
      ...record,
      startDate: dayjs(record.startDate),
      endDate: record.endDate ? dayjs(record.endDate) : undefined,
    });
    setIsModalVisible(true);
  };

  const handleDelete = (record: IRecurringTransaction) => {
    modal.confirm({
      title: '确认删除',
      content: '确定要删除这条定期记录吗？删除后不可恢复。',
      onOk: async () => {
        try {
          await transactionService.deleteRecurringTransaction(record.id);
          setRecurringTransactions(recurringTransactions.filter(t => t.id !== record.id));
          message.success('删除成功');
        } catch (error) {
          message.error('删除失败');
        }
      },
    });
  };

  const handleToggleStatus = async (record: IRecurringTransaction) => {
    try {
      const newStatus = record.status === 'active' ? 'paused' : 'active';
      const updated = await transactionService.updateRecurringTransaction(record.id, { status: newStatus });
      setRecurringTransactions(recurringTransactions.map(t => 
        t.id === record.id ? updated : t
      ));
      message.success(`${newStatus === 'active' ? '已恢复' : '已暂停'}`);
    } catch (error) {
      const err = error as Error;
      message.error(err.message || '操作失败');
    }
  };

  const handleSubmit = async () => {
    try {
      setSubmitting(true);
      const values = await form.validateFields();
      
      // 格式化日期
      const submitData = {
        ...values,
        startDate: values.startDate.format('YYYY-MM-DD'),
        endDate: values.endDate?.format('YYYY-MM-DD'),
      };

      const result = selectedRecord
        ? await transactionService.updateRecurringTransaction(selectedRecord.id, submitData)
        : await transactionService.createRecurringTransaction(submitData);

      if (selectedRecord) {
        setRecurringTransactions(recurringTransactions.map(t => 
          t.id === result.id ? result : t
        ));
      } else {
        setRecurringTransactions([...recurringTransactions, result]);
      }

      message.success(`${selectedRecord ? '编辑' : '新增'}成功`);
      setIsModalVisible(false);
    } catch (error) {
      const err = error as Error;
      message.error(err.message || `${selectedRecord ? '编辑' : '新增'}失败`);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <Select
          placeholder="交易类型"
          style={{ width: '100%' }}
          allowClear
          options={[
            { label: '全部', value: 'all' },
            { label: '收入', value: 'income' },
            { label: '支出', value: 'expense' },
          ]}
        />
        <Select
          placeholder="周期"
          style={{ width: '100%' }}
          allowClear
          options={[
            { label: '每天', value: 'daily' },
            { label: '每周', value: 'weekly' },
            { label: '每月', value: 'monthly' },
            { label: '每年', value: 'yearly' },
          ]}
        />
        <Select
          placeholder="状态"
          style={{ width: '100%' }}
          allowClear
          options={[
            { label: '全部', value: 'all' },
            { label: '进行中', value: 'active' },
            { label: '已暂停', value: 'paused' },
            { label: '已完成', value: 'completed' },
          ]}
        />
        <div className="flex justify-end">
          <Button type="primary" icon={<PlusOutlined />} onClick={handleAdd}>
            新增定期
          </Button>
        </div>
      </div>

      <Table
        columns={columns}
        dataSource={recurringTransactions}
        rowKey="id"
        loading={recurringLoading}
        scroll={{ x: 'max-content' }}
        pagination={{
          showSizeChanger: true,
          showQuickJumper: true,
          showTotal: (total) => `共 ${total} 条`,
          defaultPageSize: 10,
          pageSizeOptions: ['10', '20', '50', '100'],
        }}
        size="small"
        className="border border-gray-200 rounded"
      />

      <Modal
        title={selectedRecord ? '编辑定期记录' : '新增定期记录'}
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        onOk={handleSubmit}
        confirmLoading={submitting}
        width={720}
      >
        <Form
          form={form}
          layout="vertical"
          initialValues={{ 
            type: 'expense',
            status: 'active',
            period: 'monthly',
          }}
        >
          <Form.Item
            name="type"
            label="类型"
            rules={[{ required: true, message: '请选择类型' }]}
          >
            <Select
              options={[
                { label: '支出', value: 'expense' },
                { label: '收入', value: 'income' },
              ]}
            />
          </Form.Item>

          <Form.Item
            name="amount"
            label="金额"
            rules={[{ required: true, message: '请输入金额' }]}
          >
            <InputNumber
              style={{ width: '100%' }}
              min={0}
              precision={2}
              placeholder="请输入金额"
            />
          </Form.Item>

          <Form.Item
            name="categoryId"
            label="分类"
            rules={[{ required: true, message: '请选择分类' }]}
          >
            <Select
              placeholder="请选择分类"
              // TODO: 添加分类选项
              options={[]}
            />
          </Form.Item>

          <Form.Item
            name="period"
            label="周期"
            rules={[{ required: true, message: '请选择周期' }]}
          >
            <Select
              options={[
                { label: '每天', value: 'daily' },
                { label: '每周', value: 'weekly' },
                { label: '每月', value: 'monthly' },
                { label: '每年', value: 'yearly' },
              ]}
            />
          </Form.Item>

          <Form.Item
            name="startDate"
            label="开始日期"
            rules={[{ required: true, message: '请选择开始日期' }]}
          >
            <DatePicker style={{ width: '100%' }} />
          </Form.Item>

          <Form.Item
            name="endDate"
            label="结束日期"
          >
            <DatePicker 
              style={{ width: '100%' }} 
              placeholder="不设置则永久执行"
            />
          </Form.Item>

          <Form.Item
            name="description"
            label="描述"
          >
            <Input.TextArea rows={4} placeholder="请输入描述" />
          </Form.Item>

          <Form.Item
            name="status"
            label="状态"
            rules={[{ required: true, message: '请选择状态' }]}
          >
            <Select
              options={[
                { label: '进行中', value: 'active' },
                { label: '已暂停', value: 'paused' },
                { label: '已完成', value: 'completed' },
              ]}
            />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
} 