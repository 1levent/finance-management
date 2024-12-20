'use client';

import { Form, Input, Checkbox, Button, Space, Row, Col, Card } from 'antd';
import type { ISharedRole, ISharedPermission } from '@/types/shared';

interface IRoleFormProps {
  initialValues?: Partial<ISharedRole>;
  permissions: ISharedPermission[];
  onSubmit: (values: ISharedRole) => void;
  onCancel: () => void;
}

export default function RoleForm({ 
  initialValues, 
  permissions,
  onSubmit, 
  onCancel 
}: IRoleFormProps) {
  const [form] = Form.useForm();

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      // 添加默认值
      const formattedValues = {
        ...values,
        id: initialValues?.id || `role_${Date.now()}`,
        isSystem: false,
        createdAt: initialValues?.createdAt || new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        updatedBy: 'user1',  // 当前用户ID
      };
      onSubmit(formattedValues as ISharedRole);
    } catch (error) {
      console.error('表单验证失败:', error);
    }
  };

  // 按功能分组权限
  const permissionGroups = {
    account: permissions.filter(p => p.name.includes('账户')),
    member: permissions.filter(p => p.name.includes('成员')),
    other: permissions.filter(p => !p.name.includes('账户') && !p.name.includes('成员')),
  };

  return (
    <Form
      form={form}
      layout="vertical"
      initialValues={{
        ...initialValues,
        permissions: initialValues?.permissions || [],
      }}
      onFinish={handleSubmit}
    >
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            name="name"
            label="角色名称"
            rules={[{ required: true, message: '请输入角色名称' }]}
          >
            <Input placeholder="请输入角色名称" />
          </Form.Item>
        </Col>
      </Row>

      <Form.Item
        name="description"
        label="角色描述"
        rules={[{ required: true, message: '请输入角色描述' }]}
      >
        <Input.TextArea rows={2} placeholder="请输入角色描述" />
      </Form.Item>

      <Form.Item
        name="permissions"
        label="权限设置"
        rules={[{ required: true, message: '请至少选择一个权限' }]}
      >
        <div className="space-y-4">
          {/* 账户权限 */}
          <Card size="small" title="账户权限" className="bg-gray-50">
            <Checkbox.Group className="w-full">
              <Row gutter={[16, 8]}>
                {permissionGroups.account.map(permission => (
                  <Col key={permission.id} span={8}>
                    <Checkbox value={permission.id}>
                      {permission.name}
                      <div className="text-xs text-gray-500">
                        {permission.description}
                      </div>
                    </Checkbox>
                  </Col>
                ))}
              </Row>
            </Checkbox.Group>
          </Card>

          {/* 成员权限 */}
          <Card size="small" title="成员权限" className="bg-gray-50">
            <Checkbox.Group className="w-full">
              <Row gutter={[16, 8]}>
                {permissionGroups.member.map(permission => (
                  <Col key={permission.id} span={8}>
                    <Checkbox value={permission.id}>
                      {permission.name}
                      <div className="text-xs text-gray-500">
                        {permission.description}
                      </div>
                    </Checkbox>
                  </Col>
                ))}
              </Row>
            </Checkbox.Group>
          </Card>

          {/* 其他权限 */}
          {permissionGroups.other.length > 0 && (
            <Card size="small" title="其他权限" className="bg-gray-50">
              <Checkbox.Group className="w-full">
                <Row gutter={[16, 8]}>
                  {permissionGroups.other.map(permission => (
                    <Col key={permission.id} span={8}>
                      <Checkbox value={permission.id}>
                        {permission.name}
                        <div className="text-xs text-gray-500">
                          {permission.description}
                        </div>
                      </Checkbox>
                    </Col>
                  ))}
                </Row>
              </Checkbox.Group>
            </Card>
          )}
        </div>
      </Form.Item>

      <Form.Item className="mb-0">
        <Space className="w-full justify-end">
          <Button onClick={onCancel}>取消</Button>
          <Button type="primary" htmlType="submit">
            确定
          </Button>
        </Space>
      </Form.Item>
    </Form>
  );
} 