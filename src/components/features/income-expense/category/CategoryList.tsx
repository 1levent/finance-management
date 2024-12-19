'use client';

import { useEffect, useState } from 'react';
import { Table, Card, Button, Input, Select, Tag, Space, Modal, Form, App } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined, SearchOutlined } from '@ant-design/icons';
import type { ICategory } from '@/types/transaction';
import { useTransactionStore } from '@/store/transaction';
import { transactionService } from '@/services/transaction';

export default function CategoryList() {
  const { message, modal } = App.useApp();
  const { 
    categories, 
    categoriesLoading, 
    setCategories, 
    setCategoriesLoading, 
    setCategoriesError 
  } = useTransactionStore();

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState<ICategory | null>(null);
  const [form] = Form.useForm();
  const [submitting, setSubmitting] = useState(false);

  // 加载分类数据
  useEffect(() => {
    const loadCategories = async () => {
      try {
        setCategoriesLoading(true);
        const data = await transactionService.getCategories();
        setCategories(data);
      } catch (error) {
        const err = error as Error;
        setCategoriesError(err.message);
        message.error(err.message || '加载分类失败');
      } finally {
        setCategoriesLoading(false);
      }
    };

    loadCategories();
  }, [setCategories, setCategoriesLoading, setCategoriesError, message]);

  const handleAdd = () => {
    setSelectedRecord(null);
    form.resetFields();
    setIsModalVisible(true);
  };

  const handleEdit = (record: ICategory) => {
    setSelectedRecord(record);
    form.setFieldsValue(record);
    setIsModalVisible(true);
  };

  const handleDelete = (record: ICategory) => {
    modal.confirm({
      title: '确认删除',
      content: '确定要删除这个分类吗？删除后不可恢复。',
      onOk: async () => {
        try {
          await transactionService.deleteCategory(record.id);
          setCategories(categories.filter(c => c.id !== record.id));
          message.success('删除成功');
        } catch (error) {
          message.error('删除失败');
        }
      },
    });
  };

  const handleSubmit = async () => {
    try {
      setSubmitting(true);
      const values = await form.validateFields();
      
      const result = selectedRecord
        ? await transactionService.updateCategory(selectedRecord.id, values)
        : await transactionService.createCategory(values);

      if (selectedRecord) {
        setCategories(categories.map(c => 
          c.id === result.id ? result : c
        ));
      } else {
        setCategories([...categories, result]);
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

  const columns = [
    {
      title: '名称',
      dataIndex: 'name',
      key: 'name',
      width: 80,
      align: 'center' as const,
      ellipsis: true,
    },
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
      title: '排序',
      dataIndex: 'order',
      key: 'order',
      align: 'center' as const,
      width: 60,
    },
    {
      title: '操作',
      key: 'action',
      width: 110,
      align: 'center' as const,
      fixed: 'right' as const,
      render: (_: any, record: ICategory) => (
        <Space size={4}>
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

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <Input
          placeholder="搜索分类名称"
          prefix={<SearchOutlined />}
          allowClear
        />
        <Select
          placeholder="类型"
          style={{ width: '100%' }}
          allowClear
          options={[
            { label: '全部', value: 'all' },
            { label: '收入', value: 'income' },
            { label: '支出', value: 'expense' },
          ]}
        />
        <div className="lg:col-span-2 flex justify-end">
          <Button type="primary" icon={<PlusOutlined />} onClick={handleAdd}>
            新增分类
          </Button>
        </div>
      </div>

      <Table
        columns={columns}
        dataSource={categories}
        rowKey="id"
        loading={categoriesLoading}
        pagination={{
          showSizeChanger: true,
          showQuickJumper: true,
          showTotal: (total) => `共 ${total} 条`,
          defaultPageSize: 10,
          pageSizeOptions: ['10', '20', '50', '100'],
        }}
        size="small"
        className="border border-gray-200 rounded"
        scroll={{ x: 'max-content' }}
      />

      <Modal
        title={selectedRecord ? '编辑分类' : '新增分类'}
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        onOk={handleSubmit}
        confirmLoading={submitting}
      >
        <Form
          form={form}
          layout="vertical"
          initialValues={{ type: 'expense' }}
        >
          <Form.Item
            name="name"
            label="名称"
            rules={[{ required: true, message: '请输入分类名称' }]}
          >
            <Input placeholder="请输入分类名称" />
          </Form.Item>

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
            name="order"
            label="排序"
          >
            <Input type="number" placeholder="请输入排序号" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
} 