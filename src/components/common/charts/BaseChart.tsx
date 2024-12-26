'use client';

import { useEffect, useRef, useState } from 'react';
import Script from 'next/script';
import NoSSR from '../NoSSR';
import { Spin } from 'antd';

interface IBaseChartProps {
  type: 'Line' | 'Pie' | 'Column';
  options: any;
  style?: React.CSSProperties;
}

function Chart({ type, options, style = { height: 300 } }: IBaseChartProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    const initChart = async () => {
      if (!containerRef.current || !window.G2Plot) return;

      try {
        const ChartClass = window.G2Plot[type];
        
        if (chartRef.current) {
          chartRef.current.destroy();
        }

        if (isMounted) {
          chartRef.current = new ChartClass(containerRef.current, {
            ...options,
            animation: false,
          });

          chartRef.current.render();
          setLoading(false);
        }
      } catch (error) {
        console.error('Failed to initialize chart:', error);
        setError('图表初始化失败');
        setLoading(false);
      }
    };

    if (window.G2Plot) {
      initChart();
    } else {
      window.addEventListener('G2PlotReady', initChart);
    }

    return () => {
      isMounted = false;
      if (chartRef.current) {
        chartRef.current.destroy();
      }
      window.removeEventListener('G2PlotReady', initChart);
    };
  }, [type, options]);

  if (error) {
    return (
      <div className="flex items-center justify-center h-full text-red-500">
        {error}
      </div>
    );
  }

  return (
    <div style={style} className="relative">
      <div ref={containerRef} style={{ height: '100%' }} />
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-50">
          <Spin />
        </div>
      )}
    </div>
  );
}

export default function BaseChart(props: IBaseChartProps) {
  const [scriptError, setScriptError] = useState<string | null>(null);

  return (
    <NoSSR>
      <Script
        src="https://unpkg.com/@antv/g2plot@2.4.31/dist/g2plot.min.js"
        strategy="beforeInteractive"
        onLoad={() => {
          window.dispatchEvent(new Event('G2PlotReady'));
        }}
        onError={() => {
          setScriptError('图表库加载失败');
        }}
      />
      {scriptError ? (
        <div className="flex items-center justify-center h-full text-red-500">
          {scriptError}
        </div>
      ) : (
        <Chart {...props} />
      )}
    </NoSSR>
  );
}

export const CHART_TYPES = {
  Line: 'Line',
  Pie: 'Pie',
  Column: 'Column'
} as const; 