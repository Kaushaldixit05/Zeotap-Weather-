import React, { useState } from 'react';
import { AlertConfig } from '../types/WeatherTypes';

interface AlertSystemProps {
  onAlertConfigChange: (config: AlertConfig) => void;
}

const AlertSystem: React.FC<AlertSystemProps> = ({ onAlertConfigChange }) => {
  const [alertType, setAlertType] = useState<'temperature' | 'condition'>('temperature');
  const [threshold, setThreshold] = useState<number>(35);
  const [condition, setCondition] = useState<string>('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const config: AlertConfig = {
      type: alertType,
      threshold: threshold,
      condition: alertType === 'condition' ? condition : undefined
    };
    onAlertConfigChange(config);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4 m-2">
      <h2 className="text-xl font-bold mb-4">Alert Configuration</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Alert Type</label>
          <select
            value={alertType}
            onChange={(e) => setAlertType(e.target.value as 'temperature' | 'condition')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          >
            <option value="temperature">Temperature</option>
            <option value="condition">Weather Condition</option>
          </select>
        </div>
        {alertType === 'temperature' && (
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Temperature Threshold (°C)</label>
            <input
              type="number"
              value={threshold}
              onChange={(e) => setThreshold(Number(e.target.value))}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
          </div>
        )}
        {alertType === 'condition' && (
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Weather Condition</label>
            <input
              type="text"
              value={condition}
              onChange={(e) => setCondition(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
          </div>
        )}
        <button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Set Alert
        </button>
      </form>
    </div>
  );
};

export default AlertSystem;