
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts";
import { PieChartIcon } from "lucide-react";

interface FireSeverityData {
  low: number;
  medium: number;
  high: number;
  extreme: number;
}

interface FireSeverityPieChartProps {
  data?: FireSeverityData;
}

export function FireSeverityPieChart({ data }: FireSeverityPieChartProps) {
  if (!data) return null;

  const severityData = [
    { name: 'Low (<100 acres)', value: data.low, color: '#34d399' },
    { name: 'Medium (100-1k acres)', value: data.medium, color: '#fbbf24' },
    { name: 'High (1k-10k acres)', value: data.high, color: '#f97316' },
    { name: 'Extreme (>10k acres)', value: data.extreme, color: '#ef4444' }
  ].filter(item => item.value > 0);

  if (severityData.length === 0) return null;

  return (
    <div className="h-[480px] pt-4 pb-6">
      <h4 className="text-sm font-medium mb-12 flex items-center gap-1">
        <PieChartIcon className="w-4 h-4" />
        <span>Fire Severity</span>
      </h4>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart margin={{ top: 30, right: 30, bottom: 70, left: 30 }}>
          <Pie
            data={severityData}
            cx="50%"
            cy="40%"
            labelLine={true}
            outerRadius={130}
            innerRadius={50}
            fill="#8884d8"
            dataKey="value"
            nameKey="name"
            label={({ name, percent }) => `${(percent * 100).toFixed(0)}%`}
            paddingAngle={2}
          >
            {severityData.map((entry, index) => (
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
            wrapperStyle={{ paddingTop: '60px', paddingBottom: '30px' }}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
