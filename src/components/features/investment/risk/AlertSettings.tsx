'use client';

import { Form, InputNumber, Switch, Space, Button, Card, Row, Col, Select } from 'antd';
import { SaveOutlined } from '@ant-design/icons';

interface IAlertSettings {
  enabled: boolean;
  stopLossRate: number;
  stopProfitRate: number;
  alertFrequency: 'realtime' | 'daily' | 'weekly';
  notificationMethods: ('email' | 'sms' | 'push')[];
}

// 模拟数据
const mockSettings: IAlertSettings = {
  enabled: true,
  stopLossRate: 10,
  stopProfitRate: 20,
  alertFrequency: 'realtime',
  notificationMethods: ['email', 'push'],
};

export default function AlertSettings() {
  const [form] = Form.useForm();

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      console.log('预警设置:', values);
    } catch (error) {
      console.error('表单验证失败:', error);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-base font-medium">预警设置</h3>
        <Button type="primary" icon={<SaveOutlined />} onClick={handleSubmit}>
          保存设置
        </Button>
      </div>

      <Form
        form={form}
        layout="vertical"
        initialValues={mockSettings}
      >
        <Row gutter={[16, 16]}>
          <Col span={6}>
            <Card size="small" className="h-full">
              <Form.Item
                name="enabled"
                label="启用预警"
                valuePropName="checked"
              >
                <Switch />
              </Form.Item>
              <Form.Item
                name="alertFrequency"
                label="预警频率"
                rules={[{ required: true, message: '请选择预警频率' }]}
              >
                <Select
                  options={[
                    { label: '实时', value: 'realtime' },
                    { label: '每日', value: 'daily' },
                    { label: '每周', value: 'weekly' },
                  ]}
                />
              </Form.Item>
            </Card>
          </Col>
          <Col span={10}>
            <Card size="small" className="h-full">
              <Form.Item
                name="stopLossRate"
                label="止损线"
                rules={[{ required: true, message: '请设置止损线' }]}
                extra="当亏损超过该百分比时触发预警"
              >
                <InputNumber<number>
                  min={0}
                  max={100}
                  precision={1}
                  formatter={(value) => `${value}%`}
                  parser={(value) => {
                    const parsed = value ? parseFloat(value.replace('%', '')) : 0;
                    return Math.min(100, Math.max(0, parsed)) as 0 | 100;
                  }}
                  style={{ width: '100%' }}
                />
              </Form.Item>
              <Form.Item
                name="stopProfitRate"
                label="止盈线"
                rules={[{ required: true, message: '请设置止盈线' }]}
                extra="当盈利超过该百分比时触发提醒"
              >
                <InputNumber<number>
                  min={0}
                  max={100}
                  precision={1}
                  formatter={(value) => `${value}%`}
                  parser={(value) => {
                    const parsed = value ? parseFloat(value.replace('%', '')) : 0;
                    return Math.min(100, Math.max(0, parsed)) as 0 | 100;
                  }}
                  style={{ width: '100%' }}
                />
              </Form.Item>
            </Card>
          </Col>
          <Col span={8}>
            <Card size="small" className="h-full">
              <Form.Item
                name="notificationMethods"
                label="通知方式"
                rules={[{ required: true, message: '请选择至少一种通知方式' }]}
              >
                <Select
                  mode="multiple"
                  placeholder="请选择通知方式"
                  options={[
                    { label: '邮件通知', value: 'email' },
                    { label: '短信通知', value: 'sms' },
                    { label: '站内推送', value: 'push' },
                  ]}
                />
              </Form.Item>
            </Card>
          </Col>
        </Row>
      </Form>
    </div>
  );
} 