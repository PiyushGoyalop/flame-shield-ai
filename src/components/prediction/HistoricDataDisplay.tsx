
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, PieChart, Pie, Cell } from "recharts";
import { Flame, AlertTriangle, TrendingUp, PieChart as PieChartIcon } from "lucide-react";

interface HistoricData {
  total_incidents: number;
  largest_fire_acres: number;
  average_fire_size_acres: number;
  yearly_incidents: {
    year: number;
    incidents: number;
    severity?: {
      low: number;
      medium: number;
      high: number;
      extreme: number;
    };
    causes?: {
      lightning: number;
      human: number;
      unknown: number;
    };
  }[];
  severity_distribution?: {
    low: number;
    medium: number;
    high: number;
    extreme: number;
  };
  causes?: {
    lightning: number;
    human: number;
    unknown: number;
  };
}

interface HistoricDataDisplayProps {
  data?: HistoricData;
}

export function HistoricDataDisplay({ data }: HistoricDataDisplayProps) {
  if (!data) {
    return null;
  }

  const formattedChartData = data.yearly_incidents.slice().sort((a, b) => a.year - b.year);
  
  // Prepare causes data for pie chart if available
  const causesData = data.causes ? [
    { name: 'Lightning', value: data.causes.lightning, color: '#60a5fa' },
    { name: 'Human', value: data.causes.human, color: '#f87171' },
    { name: 'Unknown', value: data.causes.unknown, color: '#9ca3af' }
  ].filter(item => item.value > 0) : [];
  
  // Prepare severity data for pie chart if available
  const severityData = data.severity_distribution ? [
    { name: 'Low (<100 acres)', value: data.severity_distribution.low, color: '#34d399' },
    { name: 'Medium (100-1k acres)', value: data.severity_distribution.medium, color: '#fbbf24' },
    { name: 'High (1k-10k acres)', value: data.severity_distribution.high, color: '#f97316' },
    { name: 'Extreme (>10k acres)', value: data.severity_distribution.extreme, color: '#ef4444' }
  ].filter(item => item.value > 0) : [];

  // Check if we have any data to display
  const hasData = data.total_incidents > 0;

  return (
    <Card className="mt-6 border-wildfire-200 hover:border-wildfire-300 transition-all duration-300 overflow-hidden">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg flex items-center gap-2">
          <Flame className="w-5 h-5 text-wildfire-600" />
          <span>Historical Wildfire Data</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {hasData ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
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

            {formattedChartData.length > 0 && (
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
            )}

            {(causesData.length > 0 || severityData.length > 0) && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6 mb-8">
                {causesData.length > 0 && (
                  <div className="h-[320px]">
                    <h4 className="text-sm font-medium mb-2 flex items-center gap-1">
                      <PieChartIcon className="w-4 h-4" />
                      <span>Fire Causes</span>
                    </h4>
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={causesData}
                          cx="50%"
                          cy="45%"
                          labelLine={true}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                          nameKey="name"
                          label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
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
                          wrapperStyle={{ paddingTop: '20px', paddingBottom: '10px' }}
                        />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                )}
                
                {severityData.length > 0 && (
                  <div className="h-[320px]">
                    <h4 className="text-sm font-medium mb-2 flex items-center gap-1">
                      <PieChartIcon className="w-4 h-4" />
                      <span>Fire Severity</span>
                    </h4>
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={severityData}
                          cx="50%"
                          cy="45%"
                          labelLine={true}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                          nameKey="name"
                          label={({ name, percent }) => `${(percent * 100).toFixed(0)}%`}
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
                          wrapperStyle={{ paddingTop: '20px', paddingBottom: '10px' }}
                        />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                )}
              </div>
            )}

            {/* Risk Alert based on incidents - with added margin-top */}
            {data.total_incidents > 15 && (
              <div className="mt-8 p-3 bg-amber-50 border border-amber-200 rounded-lg flex items-start gap-2">
                <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-amber-700">Elevated Historical Risk</p>
                  <p className="text-xs text-amber-600 mt-1">
                    This area has experienced a high number of wildfires in the past 5 years, indicating an elevated historical risk pattern.
                  </p>
                </div>
              </div>
            )}
          </>
        ) : (
          <div className="p-4 text-center">
            <p className="text-muted-foreground">No historical wildfire data found for this location in the past 5 years.</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
