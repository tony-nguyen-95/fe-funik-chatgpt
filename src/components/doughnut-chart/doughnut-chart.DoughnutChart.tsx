import React from 'react';
import { IDoughnutChartProps } from './doughnut-chart.type';

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

const prefixClassName = 'doughnut-chart';

export const DoughnutChart: React.FC<IDoughnutChartProps> = (props) => {
  const { data: inputData } = props;
  const chartData = {
    labels: [
      `${inputData.over}% Vượt tiến độ`,
      `${inputData.on}% Đúng tiến độ`,
      `${inputData.delay_1}% Chậm mức 1`,
      `${inputData.delay_2}% Chậm mức 2`,
    ],
    datasets: [
      {
        data: [inputData.over, inputData.on, inputData.delay_1, inputData.delay_2],
        backgroundColor: ['#e27739', '#c84547', '#9f1f53', '#6d1256'],
      },
    ],
  };
  return <Doughnut data={chartData} options={{ plugins: { legend: { position: 'right', maxWidth: 230 } } }} />;
};
