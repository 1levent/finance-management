'use client';

import { Modal, Form, Input, Select, InputNumber, DatePicker, Space, App } from 'antd';
import { useState } from 'react';
import StockForm from './StockForm';
import FundForm from './FundForm';
import BondForm from './BondForm';
import OtherForm from './OtherForm';
import type { Product, ProductType, IStockProduct, IFundProduct, IBondProduct, IOtherProduct } from '@/types/investment';

interface IProductFormProps {
  type: ProductType;
  visible: boolean;
  onCancel: () => void;
  onSuccess: () => void;
  record?: Product;
}

export default function ProductForm({ type, visible, onCancel, onSuccess, record }: IProductFormProps) {
  const { message } = App.useApp();
  const [form] = Form.useForm();
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async () => {
    try {
      setSubmitting(true);
      const values = await form.validateFields();
      console.log('表单数据:', values);
      message.success('保存成功');
      form.resetFields();
      onSuccess();
    } catch (error) {
      console.error('表单验证失败:', error);
    } finally {
      setSubmitting(false);
    }
  };

  const renderForm = () => {
    const props = {
      form,
    };

    switch (type) {
      case 'stock':
        return <StockForm {...props} record={record as IStockProduct} />;
      case 'fund':
        return <FundForm {...props} record={record as IFundProduct} />;
      case 'bond':
        return <BondForm {...props} record={record as IBondProduct} />;
      case 'other':
        return <OtherForm {...props} record={record as IOtherProduct} />;
      default:
        return null;
    }
  };

  const getTitle = () => {
    const typeText = {
      stock: '股票',
      fund: '基金',
      bond: '债券',
      other: '其他投资',
    }[type];
    return `${record ? '编辑' : '新增'}${typeText}`;
  };

  return (
    <Modal
      title={getTitle()}
      open={visible}
      onCancel={onCancel}
      onOk={handleSubmit}
      confirmLoading={submitting}
      width={600}
      destroyOnClose
    >
      {renderForm()}
    </Modal>
  );
} 