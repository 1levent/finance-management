'use client';

import { Card } from 'antd';
import { Pie } from '@antv/g2plot';
import { useEffect, useRef } from 'react';

interface IAssetData {
  type: string;
  value: number;
}

export default function AssetDistribution() {
  const containerRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<Pie | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const data = [
      { type: '活期存款', value: 10000 },
      { type: '定期存款', value: 20000 },
      { type: '基金投资', value: 15000 },
      { type: '股票投资', value: 25000 },
    ];

    chartRef.current = new Pie(containerRef.current, {
      data,
      angleField: 'value',
      colorField: 'type',
      radius: 0.8,
      label: {
        type: 'inner',
        offset: '-30%',
        content: '{percentage}',
        style: {
          fill: '#fff',
          fontSize: 14,
          textAlign: 'center',
        },
      },
      legend: {
        position: 'bottom',
      },
      interactions: [
        { type: 'element-active' },
      ],
    });

    chartRef.current.render();

    return () => {
      if (chartRef.current) {
        chartRef.current.destroy();
      }
    };
  }, []);

  return (
    <Card title="资产分布" size="small">
      <div ref={containerRef} style={{ height: 300 }} />
    </Card>
  );
} 