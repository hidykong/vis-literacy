
import React from 'react';
import { PieChart, Pie, Cell } from 'recharts'

const PieGraph = ({ data }) => {
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28'];

  return (
    <PieChart width={350} height={350}>
      <Pie
        data={data}
        cx={200}
        cy={200}
        labelLine={false}
        outerRadius={80}
        fill="#8884d8"
        dataKey="value"
      >
        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
    </PieChart>
  );
};

export {PieGraph};
