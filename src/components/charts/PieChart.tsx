"use client"
import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

// Register ChartJS components
ChartJS.register(ArcElement, Tooltip, Legend);

interface PieChartProps {
  balance: number;
  income: number;
  expenses: number;
}

const PieChart: React.FC<PieChartProps> = ({ balance, income, expenses }) => {
  const data = {
    labels: ['Total Balance', 'Total Expenses', 'Total Income'],
    datasets: [
      {
        data: [balance, expenses, income],
        backgroundColor: [
          'rgba(99, 102, 241, 0.8)', // Indigo for Balance
          'rgba(239, 68, 68, 0.8)',  // Red for Expenses
          'rgba(249, 115, 22, 0.8)', // Orange for Income
        ],
        borderColor: [
          'rgba(99, 102, 241, 1)',
          'rgba(239, 68, 68, 1)',
          'rgba(249, 115, 22, 1)',
        ],
        borderWidth: 1,
        borderRadius: 4,
        spacing: 2,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: '70%',
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          padding: 20,
          usePointStyle: true,
          pointStyle: 'circle',
          boxWidth: 8,
          boxHeight: 8,
          font: {
            size: 12,
            family: 'system-ui, -apple-system, sans-serif'
          },
          color: '#6B7280',
          generateLabels: (chart: any) => {
            const data = chart.data;
            if (data.labels.length && data.datasets.length) {
              return data.labels.map((label: string, i: number) => {
                const value = data.datasets[0].data[i];
                const color = data.datasets[0].backgroundColor[i];
                return {
                  text: `${label}: $${value.toLocaleString()}`,
                  fillStyle: color,
                  strokeStyle: color,
                  lineWidth: 1,
                  hidden: isNaN(value) || data.datasets[0].data[i] === 0,
                  index: i
                };
              });
            }
            return [];
          }
        }
      },
      tooltip: {
        callbacks: {
          label: function(context: any) {
            const label = context.label || '';
            const value = context.raw || 0;
            return `${label}: $${value.toLocaleString()}`;
          }
        },
        displayColors: false,
        backgroundColor: '#1F2937',
        titleFont: { size: 12 },
        bodyFont: { size: 14, weight: '600' },
        padding: 10,
        cornerRadius: 6,
      }
    },
    elements: {
      arc: {
        borderWidth: 0
      }
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg h-full">
      <h3 className="text-lg font-semibold text-gray-800 mb-6">Financial Overview</h3>
      <div className="relative h-64 flex items-center justify-center">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <p className="text-sm text-gray-500">Total Balance</p>
            <p className="text-2xl font-bold text-gray-800">${balance.toLocaleString()}</p>
          </div>
        </div>
        <div className="w-full h-full">
          <Doughnut data={data} options={options} />
        </div>
      </div>
    </div>
  );
};

export default PieChart;