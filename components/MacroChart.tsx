
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { Macros } from '../types';

interface MacroChartProps {
  sourceMacros: Macros;
  targetMacros: Macros;
  sourceName: string;
  targetName: string;
}

const MacroChart: React.FC<MacroChartProps> = ({ sourceMacros, targetMacros, sourceName, targetName }) => {
  const data = [
    {
      name: 'Protein',
      [sourceName]: sourceMacros.protein,
      [targetName]: targetMacros.protein,
    },
    {
      name: 'Carbs',
      [sourceName]: sourceMacros.carbs,
      [targetName]: targetMacros.carbs,
    },
    {
      name: 'Fats',
      [sourceName]: sourceMacros.fats,
      [targetName]: targetMacros.fats,
    },
  ];

  return (
    <div className="w-full h-48">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} layout="vertical" margin={{ top: 0, right: 30, left: 10, bottom: 0 }}>
          <XAxis type="number" hide />
          <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} width={60} tick={{ fontSize: 11, fontWeight: 'bold', fill: '#94a3b8' }} />
          <Tooltip 
            cursor={{ fill: 'transparent' }}
            contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)', fontSize: '12px' }}
          />
          <Legend verticalAlign="bottom" height={36} iconType="circle" wrapperStyle={{ fontSize: '11px', fontWeight: 'bold', paddingTop: '10px' }} />
          <Bar dataKey={sourceName} fill="#cbd5e1" radius={[0, 4, 4, 0]} barSize={12} />
          <Bar dataKey={targetName} fill="#10b981" radius={[0, 4, 4, 0]} barSize={12} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default MacroChart;
