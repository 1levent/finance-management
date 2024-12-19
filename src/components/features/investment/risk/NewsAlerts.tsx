'use client';

import { List, Tag, Button, Space, Tooltip } from 'antd';
import { WarningOutlined, ClockCircleOutlined, LinkOutlined } from '@ant-design/icons';

interface INewsAlert {
  id: string;
  title: string;
  source: string;
  type: 'policy' | 'market' | 'company' | 'industry';
  level: 'info' | 'warning' | 'danger';
  summary: string;
  url: string;
  publishTime: string;
}

// 模拟数据
const mockData: INewsAlert[] = [
  {
    id: '1',
    title: '央行下调金融机构存款准备金率0.25个百分点',
    source: '央行官网',
    type: 'policy',
    level: 'warning',
    summary: '中国人民银行决定于2024年2月5日下调金融机构存款准备金率0.25个百分点...',
    url: 'http://example.com/news/1',
    publishTime: '2024-03-20 14:30:00',
  },
  {
    id: '2',
    title: '某大型券商被立案调查',
    source: '证监会公告',
    type: 'company',
    level: 'danger',
    summary: '因涉嫌违反证券法律法规，某证券公司被证监会立案调查...',
    url: 'http://example.com/news/2',
    publishTime: '2024-03-20 13:45:00',
  },
  {
    id: '3',
    title: '新能源行业政策支持力度加大',
    source: '发改委',
    type: 'industry',
    level: 'info',
    summary: '国家发改委发布关于进一步支持新能源产业发展的指导意见...',
    url: 'http://example.com/news/3',
    publishTime: '2024-03-20 11:20:00',
  },
];

const typeConfig = {
  policy: { color: 'blue', text: '政策' },
  market: { color: 'purple', text: '市场' },
  company: { color: 'cyan', text: '公司' },
  industry: { color: 'orange', text: '行业' },
};

const levelConfig = {
  info: { color: '#1890ff', icon: null },
  warning: { color: '#faad14', icon: <WarningOutlined /> },
  danger: { color: '#ff4d4f', icon: <WarningOutlined /> },
};

export default function NewsAlerts() {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-base font-medium">新闻预警</h3>
        <Button type="link" size="small">
          查看全部
        </Button>
      </div>

      <List
        size="small"
        dataSource={mockData}
        renderItem={(item) => (
          <List.Item
            className="hover:bg-gray-50 cursor-pointer"
            actions={[
              <Button
                key="link"
                type="link"
                size="small"
                icon={<LinkOutlined />}
                href={item.url}
                target="_blank"
              >
                详情
              </Button>
            ]}
          >
            <List.Item.Meta
              title={
                <div className="flex items-center gap-2">
                  {levelConfig[item.level].icon && (
                    <span style={{ color: levelConfig[item.level].color }}>
                      {levelConfig[item.level].icon}
                    </span>
                  )}
                  <Tooltip title={item.title}>
                    <span className="truncate max-w-[300px]">{item.title}</span>
                  </Tooltip>
                </div>
              }
              description={
                <Space size={[0, 4]} wrap>
                  <Tag color={typeConfig[item.type].color}>
                    {typeConfig[item.type].text}
                  </Tag>
                  <span className="text-xs text-gray-400">
                    <ClockCircleOutlined className="mr-1" />
                    {item.publishTime}
                  </span>
                  <span className="text-xs text-gray-400">
                    来源: {item.source}
                  </span>
                </Space>
              }
            />
          </List.Item>
        )}
      />
    </div>
  );
} 