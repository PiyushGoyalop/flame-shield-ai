
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

  // Calculate total for percentages
  const total = causesData.reduce((acc, item) => acc + item.value, 0);

  return (
    <div className="pt-4 pb-6">
      <h4 className="text-sm font-medium mb-4 flex items-center gap-1">
        <PieChartIcon className="w-4 h-4" />
        <span>Fire Causes</span>
      </h4>
      
      <div className="grid grid-cols-3 gap-3 mt-3">
        {causesData.map((item, index) => (
          <div 
            key={`box-${index}`} 
            className="p-3 rounded-lg border hover:shadow-sm transition-all"
            style={{ borderColor: item.color, backgroundColor: `${item.color}15` }}
          >
            <div className="flex flex-col items-center text-center">
              <span className="text-sm mb-1">{item.name}</span>
              <span className="text-lg font-semibold">{((item.value / total) * 100).toFixed(0)}%</span>
              <span className="text-xs text-muted-foreground mt-1">({item.value} fires)</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
