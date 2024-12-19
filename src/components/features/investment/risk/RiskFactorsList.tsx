'use client';

import { Table, Tag, Progress, Space, Button, Tooltip } from 'antd';
import { InfoCircleOutlined, WarningOutlined } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';

interface IRiskFactor {
  id: string;
  name: string;
  score: number;
  level: 'low' | 'medium' | 'high';
  weight: number;
  description: string;
  suggestion: string;
  updateTime: string;
}

// 模拟数据
const mockData: IRiskFactor[] = [
  {
    id: '1',
    name: '持仓集中度',
    score: 80,
    level: 'high',
    weight: 0.3,
    description: '单一股票持仓占比过高，前三大持仓占总资产70%',
    suggestion: '建议适当分散投资，单一标的持仓不超过30%',
    updateTime: '2024-03-20 10:00:00',
  },
  {
    id: '2',
    name: '市场波动',
    score: 70,
    level: 'medium',
    weight: 0.3,
    description: '市场波动率处于中等水平，需要关注',
    suggestion: '可以考虑对冲策略或增加低波动品种',
    updateTime: '2024-03-20 10:00:00',
  },
  {
    id: '3',
    name: '流动性',
    score: 85,
    level: 'high',
    weight: 0.2,
    description: '部分持仓交易不活跃，变现能力较弱',
    suggestion: '建议增持流动性较好的品种，预留足够现金',
    updateTime: '2024-03-20 10:00:00',
  },
  {
    id: '4',
    name: '杠杆水平',
    score: 60,
    level: 'medium',
    weight: 0.2,
    description: '融资余额占比较高，但在可控范围',
    suggestion: '注意控制融资规模，保持合理的担保比例',
    updateTime: '2024-03-20 10:00:00',
  },
];

const levelConfig: Record<IRiskFactor['level'], { color: string; text: string }> = {
  low: { color: '#52c41a', text: '低风险' },
  medium: { color: '#faad14', text: '中等风险' },
  high: { color: '#f5222d', text: '高风险' },
};

export default function RiskFactorsList() {
  const columns: ColumnsType<IRiskFactor> = [
    {
      title: '风险因子',
      dataIndex: 'name',
      key: 'name',
      width: 120,
      fixed: 'left',
    },
    {
      title: '风险评分',
      key: 'score',
      width: 200,
      render: (_, record) => (
        <Space>
          <Progress
            percent={record.score}
            steps={5}
            size="small"
            strokeColor={record.score >= 80 ? '#f5222d' : record.score >= 60 ? '#faad14' : '#52c41a'}
          />
          <span className="text-sm">{record.score}分</span>
        </Space>
      ),
    },
    {
      title: '风险等级',
      dataIndex: 'level',
      key: 'level',
      width: 100,
      render: (level: IRiskFactor['level']) => (
        <Tag color={levelConfig[level].color}>{levelConfig[level].text}</Tag>
      ),
    },
    {
      title: '权重',
      dataIndex: 'weight',
      key: 'weight',
      width: 100,
      render: (weight) => `${(weight * 100).toFixed(0)}%`,
    },
    {
      title: '风险描述',
      dataIndex: 'description',
      key: 'description',
      width: 250,
      render: (text) => (
        <div className="flex items-center">
          {text.length > 20 ? (
            <Tooltip title={text}>
              <span>{text.slice(0, 20)}...</span>
            </Tooltip>
          ) : (
            text
          )}
          <InfoCircleOutlined className="ml-2 text-gray-400" />
        </div>
      ),
    },
    {
      title: '建议措施',
      dataIndex: 'suggestion',
      key: 'suggestion',
      width: 250,
      render: (text) => (
        <div className="flex items-center">
          {text.length > 20 ? (
            <Tooltip title={text}>
              <span>{text.slice(0, 20)}...</span>
            </Tooltip>
          ) : (
            text
          )}
        </div>
      ),
    },
    {
      title: '更新时间',
      dataIndex: 'updateTime',
      key: 'updateTime',
      width: 150,
    },
  ];

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div className="flex items-center">
          <h3 className="text-base font-medium">风险因素详情</h3>
          <Tooltip title="展示所有风险因子的详细信息和建议措施">
            <InfoCircleOutlined className="ml-2 text-gray-400" />
          </Tooltip>
        </div>
        <Button type="primary" icon={<WarningOutlined />}>
          导出风险报告
        </Button>
      </div>

      <Table
        columns={columns}
        dataSource={mockData}
        rowKey="id"
        size="small"
        scroll={{ x: 'max-content' }}
        pagination={false}
      />
    </div>
  );
} 