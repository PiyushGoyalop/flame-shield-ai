
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, LineChart, Line } from "recharts";
import { Flame, AlertTriangle, TrendingUp } from "lucide-react";

interface HistoricData {
  total_incidents: number;
  largest_fire_acres: number;
  average_fire_size_acres: number;
  yearly_incidents: {
    year: number;
    incidents: number;
  }[];
}

interface HistoricDataDisplayProps {
  data?: HistoricData;
}

export function HistoricDataDisplay({ data }: HistoricDataDisplayProps) {
  if (!data) {
    return null;
  }

  const formattedChartData = data.yearly_incidents.slice().sort((a, b) => a.year - b.year);

  return (
    <Card className="mt-6 border-wildfire-200 hover:border-wildfire-300 transition-all duration-300 overflow-hidden">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg flex items-center gap-2">
          <Flame className="w-5 h-5 text-wildfire-600" />
          <span>Historical Wildfire Data</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div className="flex flex-col p-3 bg-wildfire-50 rounded-lg">
            <span className="text-sm text-muted-foreground">Total Incidents (5yr)</span>
            <span className="text-2xl font-semibold">{data.total_incidents}</span>
          </div>
          <div className="flex flex-col p-3 bg-wildfire-50 rounded-lg">
            <span className="text-sm text-muted-foreground">Largest Fire</span>
            <span className="text-2xl font-semibold">{data.largest_fire_acres.toLocaleString()} acres</span>
          </div>
          <div className="flex flex-col p-3 bg-wildfire-50 rounded-lg">
            <span className="text-sm text-muted-foreground">Average Fire Size</span>
            <span className="text-2xl font-semibold">{data.average_fire_size_acres.toLocaleString()} acres</span>
          </div>
        </div>

        <div className="mt-4">
          <h4 className="text-sm font-medium mb-2 flex items-center gap-1">
            <TrendingUp className="w-4 h-4" />
            <span>Yearly Incident Trend</span>
          </h4>
          <div className="h-60 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={formattedChartData}
                margin={{ top: 5, right: 20, left: 0, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                <XAxis dataKey="year" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="incidents" name="Incidents" fill="#ef4444" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Risk Alert based on incidents */}
        {data.total_incidents > 15 && (
          <div className="mt-4 p-3 bg-amber-50 border border-amber-200 rounded-lg flex items-start gap-2">
            <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-amber-700">Elevated Historical Risk</p>
              <p className="text-xs text-amber-600 mt-1">
                This area has experienced a high number of wildfires in the past 5 years, indicating an elevated historical risk pattern.
              </p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
