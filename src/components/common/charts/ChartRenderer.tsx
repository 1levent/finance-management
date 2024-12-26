'use client';

import { useEffect, useRef } from 'react';

interface IChartRendererProps {
  type: 'Line' | 'Pie' | 'Column';
  options: any;
  style?: React.CSSProperties;
}

const ChartRenderer = ({ type, options, style = { height: 300 } }: IChartRendererProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<any>(null);

  useEffect(() => {
    const initChart = async () => {
      if (!containerRef.current) return;

      try {
        const G2Plot = await import('@antv/g2plot');
        const ChartClass = G2Plot[type];

        if (chartRef.current) {
          chartRef.current.destroy();
        }

        chartRef.current = new ChartClass(containerRef.current, {
          ...options,
          animation: false,
        });

        chartRef.current.render();
      } catch (error) {
        console.error('Failed to initialize chart:', error);
      }
    };

    initChart();

    return () => {
      if (chartRef.current) {
        chartRef.current.destroy();
      }
    };
  }, [type, options]);

  return <div ref={containerRef} style={style} />;
};

export default ChartRenderer; 