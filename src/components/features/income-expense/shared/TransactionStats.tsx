'use client';

import { Card, Row, Col } from 'antd';
import { Pie, Line } from '@ant-design/plots';
import type { ITransaction } from '@/types/transaction';
import { useTransactionStore } from '@/store/transaction';
import dayjs from 'dayjs';

interface ITransactionStats {
  transactions: ITransaction[];
}

export default function TransactionStats({ transactions }: ITransactionStats) {
  const { categories } = useTransactionStore();

  // 获取分类名称
  const getCategoryName = (categoryId: string) => {
    return categories.find(c => c.id === categoryId)?.name || categoryId;
  };

  // 计算总收入和支出
  const totalIncome = transactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpense = transactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);

  // 按分类统计数据
  const categoryStats = transactions.reduce((acc, t) => {
    const key = `${t.categoryId}-${t.type}`;
    if (!acc[key]) {
      acc[key] = {
        category: getCategoryName(t.categoryId),
        type: t.type,
        amount: 0,
      };
    }
    acc[key].amount += t.amount;
    return acc;
  }, {} as Record<string, { category: string; type: string; amount: number; }>);

  // 按日期统计趋势数据
  const trendData = transactions.reduce((acc, t) => {
    const date = dayjs(t.date).format('YYYY-MM-DD');
    if (!acc[date]) {
      acc[date] = {
        date,
        income: 0,
        expense: 0,
      };
    }
    if (t.type === 'income') {
      acc[date].income += t.amount;
    } else {
      acc[date].expense += t.amount;
    }
    return acc;
  }, {} as Record<string, { date: string; income: number; expense: number; }>);

  // 转换为折线图数据
  const lineData = Object.values(trendData)
    .sort((a, b) => dayjs(a.date).valueOf() - dayjs(b.date).valueOf())
    .flatMap(item => [
      { date: item.date, type: '收入', value: item.income },
      { date: item.date, type: '支出', value: item.expense },
    ]);

  // 转换为饼图数据
  const pieData = Object.values(categoryStats).map(item => ({
    type: `${item.category}(${item.type === 'income' ? '收入' : '支出'})`,
    value: item.amount,
  }));

  const pieConfig = {
    data: pieData,
    angleField: 'value',
    colorField: 'type',
    radius: 0.8,
    label: {
      position: 'outside',
      content: '{name} {percentage}',
      style: {
        fontSize: 12,
        textAlign: 'center',
      },
    },
    interactions: [{ type: 'element-active' }],
    legend: {
      position: 'right',
      layout: 'vertical',
    },
    tooltip: {
      formatter: (datum: any) => ({
        name: datum.type,
        value: `¥${datum.value.toFixed(2)}`,
      }),
    },
  };

  const lineConfig = {
    data: lineData,
    xField: 'date',
    yField: 'value',
    seriesField: 'type',
    yAxis: {
      label: {
        formatter: (v: string) => `¥${Number(v).toFixed(2)}`,
      },
    },
    legend: {
      position: 'top',
    },
    smooth: true,
    animation: {
      appear: {
        animation: 'path-in',
        duration: 1000,
      },
    },
  };

  return (
    <Row gutter={[16, 16]}>
      <Col xs={24} lg={8}>
        <Card size="small">
          <div className="flex justify-between items-center py-2 px-4">
            <div className="text-base font-medium text-gray-500">总收入</div>
            <div className="text-xl text-green-500">
              ¥{totalIncome.toFixed(2)}
            </div>
          </div>
        </Card>
      </Col>
      <Col xs={24} lg={8}>
        <Card size="small">
          <div className="flex justify-between items-center py-2 px-4">
            <div className="text-base font-medium text-gray-500">总支出</div>
            <div className="text-xl text-red-500">
              ¥{totalExpense.toFixed(2)}
            </div>
          </div>
        </Card>
      </Col>
      <Col xs={24} lg={8}>
        <Card size="small">
          <div className="flex justify-between items-center py-2 px-4">
            <div className="text-base font-medium text-gray-500">结余</div>
            <div className={`text-xl ${totalIncome - totalExpense >= 0 ? 'text-green-500' : 'text-red-500'}`}>
              ¥{(totalIncome - totalExpense).toFixed(2)}
            </div>
          </div>
        </Card>
      </Col>
      <Col xs={24} lg={12}>
        <Card 
          size="small" 
          title="收支趋势" 
          styles={{ body: { padding: '12px' } }}
        >
          <div style={{ height: 280 }}>
            <Line {...lineConfig} />
          </div>
        </Card>
      </Col>
      <Col xs={24} lg={12}>
        <Card 
          size="small" 
          title="分类占比" 
          styles={{ body: { padding: '12px' } }}
        >
          <div style={{ height: 280 }}>
            <Pie {...pieConfig} />
          </div>
        </Card>
      </Col>
    </Row>
  );
} 