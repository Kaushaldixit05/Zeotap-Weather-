import React from 'react';
import { DailySummary } from '../types/WeatherTypes';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

interface DailySummaryProps {
  summaries: DailySummary[];
}

const DailySummaryChart: React.FC<DailySummaryProps> = ({ summaries }) => {
  const chartData = {
    labels: summaries.map(summary => summary.date),
    datasets: [
      {
        label: 'Average Temperature',
        data: summaries.map(summary => summary.avgTemp),
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1
      },
      {
        label: 'Max Temperature',
        data: summaries.map(summary => summary.maxTemp),
        borderColor: 'rgb(255, 99, 132)',
        tension: 0.1
      },
      {
        label: 'Min Temperature',
        data: summaries.map(summary => summary.minTemp),
        borderColor: 'rgb(54, 162, 235)',
        tension: 0.1
      }
    ]
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Daily Weather Summary',
      },
    },
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4 m-2">
      <h2 className="text-xl font-bold mb-4">Daily Weather Summary</h2>
      <Line data={chartData} options={options} />
      <div className="mt-4">
        <h3 className="text-lg font-semibold mb-2">Dominant Weather Conditions:</h3>
        <ul>
          {summaries.map((summary, index) => (
            <li key={index} className="mb-1">
              {summary.date}: {summary.dominantCondition}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default DailySummaryChart;