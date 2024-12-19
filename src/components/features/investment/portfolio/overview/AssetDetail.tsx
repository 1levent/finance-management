'use client';

import { Modal, Descriptions, Tag } from 'antd';
import type { IAsset } from '@/types/portfolio';
import dayjs from 'dayjs';

interface AssetDetailProps {
  asset: IAsset | null;
  visible: boolean;
  onClose: () => void;
}

export default function AssetDetail({ asset, visible, onClose }: AssetDetailProps) {
  if (!asset) return null;

  const typeMap = {
    stock: { text: '股票', color: 'blue' },
    fund: { text: '基金', color: 'green' },
    bond: { text: '债券', color: 'orange' },
    deposit: { text: '存款', color: 'purple' },
    other: { text: '其他', color: 'default' },
  };

  return (
    <Modal
      title="资产详情"
      open={visible}
      onCancel={onClose}
      footer={null}
      width={600}
    >
      <Descriptions column={2}>
        <Descriptions.Item label="名称">{asset.name}</Descriptions.Item>
        <Descriptions.Item label="类型">
          <Tag color={typeMap[asset.type as keyof typeof typeMap].color}>
            {typeMap[asset.type as keyof typeof typeMap].text}
          </Tag>
        </Descriptions.Item>
        <Descriptions.Item label="持仓数量">{asset.amount}</Descriptions.Item>
        <Descriptions.Item label="持仓成本">¥{asset.cost.toFixed(2)}</Descriptions.Item>
        <Descriptions.Item label="当前市值">¥{asset.currentValue.toFixed(2)}</Descriptions.Item>
        <Descriptions.Item label="收益金额">
          <span style={{ color: asset.profit >= 0 ? '#3f8600' : '#cf1322' }}>
            {asset.profit >= 0 ? '+' : ''}¥{asset.profit.toFixed(2)}
          </span>
        </Descriptions.Item>
        <Descriptions.Item label="收益率">
          <span style={{ color: asset.profitRate >= 0 ? '#3f8600' : '#cf1322' }}>
            {(asset.profitRate * 100).toFixed(2)}%
          </span>
        </Descriptions.Item>
        <Descriptions.Item label="状态">
          <Tag color={asset.status === 'active' ? 'success' : 'default'}>
            {asset.status === 'active' ? '持有中' : '已清仓'}
          </Tag>
        </Descriptions.Item>
        <Descriptions.Item label="更新时间" span={2}>
          {dayjs(asset.updateTime).format('YYYY-MM-DD HH:mm:ss')}
        </Descriptions.Item>
      </Descriptions>
    </Modal>
  );
} 