
import { PieChartIcon } from "lucide-react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts";

interface LandCoverChartProps {
  landCover: {
    forest_percent: number;
    grassland_percent: number;
    urban_percent: number;
    water_percent: number;
    barren_percent: number;
  };
}

export function LandCoverChart({ landCover }: LandCoverChartProps) {
  if (!landCover) return null;

  // Prepare land cover data for pie chart
  const landCoverData = [
    { name: 'Forest', value: landCover.forest_percent, color: '#22c55e' },
    { name: 'Grassland', value: landCover.grassland_percent, color: '#84cc16' },
    { name: 'Urban', value: landCover.urban_percent, color: '#94a3b8' },
    { name: 'Water', value: landCover.water_percent, color: '#38bdf8' },
    { name: 'Barren', value: landCover.barren_percent, color: '#d4d4d4' }
  ].filter(item => item.value > 0);

  if (landCoverData.length === 0) return null;

  return (
    <div className="mt-6 w-full">
      <h4 className="text-sm font-medium mb-4 flex items-center gap-1">
        <PieChartIcon className="w-4 h-4" />
        <span>Land Cover Distribution</span>
      </h4>
      <div className="h-[350px] mb-8">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart margin={{ top: 10, right: 10, bottom: 30, left: 10 }}>
            <Pie
              data={landCoverData}
              cx="50%"
              cy="40%"
              labelLine={true}
              outerRadius={90}
              fill="#8884d8"
              dataKey="value"
              nameKey="name"
              label={({ name, percent }) => `${(percent * 100).toFixed(0)}%`}
            >
              {landCoverData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip 
              formatter={(value) => [`${value}%`, 'Coverage']}
              contentStyle={{ background: 'white', border: '1px solid #e2e8f0', borderRadius: '0.375rem', padding: '8px' }}
            />
            <Legend 
              layout="horizontal" 
              verticalAlign="bottom" 
              align="center"
              wrapperStyle={{ paddingTop: '30px', paddingBottom: '10px' }}
              formatter={(value) => <span className="text-sm">{value}</span>}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
