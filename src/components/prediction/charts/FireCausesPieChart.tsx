
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts";
import { PieChartIcon } from "lucide-react";

interface FireCausesData {
  lightning: number;
  human: number;
  unknown: number;
}

interface FireCausesPieChartProps {
  data?: FireCausesData;
}

export function FireCausesPieChart({ data }: FireCausesPieChartProps) {
  if (!data) return null;

  const causesData = [
    { name: 'Lightning', value: data.lightning, color: '#60a5fa' },
    { name: 'Human', value: data.human, color: '#f87171' },
    { name: 'Unknown', value: data.unknown, color: '#9ca3af' }
  ].filter(item => item.value > 0);

  if (causesData.length === 0) return null;

  return (
    <div className="h-[400px] pt-4 pb-6">
      <h4 className="text-sm font-medium mb-20 flex items-center gap-1">
        <PieChartIcon className="w-4 h-4" />
        <span>Fire Causes</span>
      </h4>
      <ResponsiveContainer width="100%" height="80%">
        <PieChart margin={{ top: 0, right: 30, bottom: 70, left: 30 }}>
          <Pie
            data={causesData}
            cx="50%"
            cy="50%"
            labelLine={true}
            outerRadius={100}
            fill="#8884d8"
            dataKey="value"
            nameKey="name"
            label={({ name, percent }) => `${(percent * 100).toFixed(0)}%`}
            paddingAngle={2}
          >
            {causesData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip 
            formatter={(value) => [`${value} fires`, 'Count']}
            contentStyle={{ background: 'white', border: '1px solid #e2e8f0', borderRadius: '0.375rem', padding: '8px' }} 
          />
          <Legend 
            layout="horizontal" 
            verticalAlign="bottom" 
            align="center"
            wrapperStyle={{ paddingTop: '30px' }}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
