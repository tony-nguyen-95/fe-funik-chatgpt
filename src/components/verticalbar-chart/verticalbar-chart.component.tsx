import React from 'react';
import { IVerticalBarChartProps } from './verticalbar-chart.type';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const prefixClassName = 'verticalbar-chart';

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
    },
  },
};

export const VerticalBarChart: React.FC<IVerticalBarChartProps> = (props) => {
  const { data: inputData } = props;
  const chartData = {
    labels: ['Tuần 1', 'Tuần 2', 'Tuần 3', 'Tuần 4', 'Tuần 5'],
    datasets: [
      {
        label: '> 3 lần',
        data: inputData.map((e) => e.moreThanThree),
        backgroundColor: '#78a5e4',
      },
      {
        label: '1 - 3 lần',
        data: inputData.map((e) => e.oneToThree),
        backgroundColor: '#64b8ec',
      },
      {
        label: 'Chưa liên hệ',
        data: inputData.map((e) => e.zero),
        backgroundColor: '#275286',
      },
    ],
  };

  return <Bar data={chartData} options={options} />;
};
