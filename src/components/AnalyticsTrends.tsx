import { useState, useEffect } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from "recharts";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const stateData = [
  { name: "California", wildfires: 8542 },
  { name: "Oregon", wildfires: 5421 },
  { name: "Washington", wildfires: 3895 },
  { name: "Texas", wildfires: 3756 },
  { name: "Colorado", wildfires: 3201 },
  { name: "Arizona", wildfires: 2980 },
  { name: "Idaho", wildfires: 2541 },
  { name: "Montana", wildfires: 2145 }
];

const causesData = [
  { name: "Lightning", value: 34 },
  { name: "Human Activity", value: 42 },
  { name: "Equipment Use", value: 10 },
  { name: "Campfires", value: 8 },
  { name: "Arson", value: 6 }
];

const yearlyData = [
  { year: "2015", wildfires: 52543 },
  { year: "2016", wildfires: 54321 },
  { year: "2017", wildfires: 57845 },
  { year: "2018", wildfires: 62134 },
  { year: "2019", wildfires: 59876 },
  { year: "2020", wildfires: 65321 },
  { year: "2021", wildfires: 68421 },
  { year: "2022", wildfires: 66789 },
  { year: "2023", wildfires: 67954 },
  { year: "2024", wildfires: 69320 },
  { year: "2025", wildfires: 71050 }
];

const co2Correlation = [
  { co2: 5, probability: 10 },
  { co2: 10, probability: 15 },
  { co2: 15, probability: 25 },
  { co2: 20, probability: 35 },
  { co2: 25, probability: 45 },
  { co2: 30, probability: 52 },
  { co2: 35, probability: 58 },
  { co2: 40, probability: 65 },
  { co2: 45, probability: 78 },
  { co2: 50, probability: 85 },
];

const COLORS = ['#E5989B', '#FFB4A2', '#FFCDB2', '#B5838D', '#6D6875'];

export function AnalyticsTrends() {
  const [activeTab, setActiveTab] = useState("states");
  const [chartData, setChartData] = useState(stateData);
  const [selectedYear, setSelectedYear] = useState("all");
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);

  const handleYearChange = (value: string) => {
    setSelectedYear(value);
  };

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border shadow-md rounded-md">
          <p className="font-medium">{`${label}`}</p>
          <p className="text-wildfire-600">{`Wildfires: ${payload[0].value.toLocaleString()}`}</p>
        </div>
      );
    }
    return null;
  };

  const PieTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border shadow-md rounded-md">
          <p className="font-medium">{`${payload[0].name}`}</p>
          <p className="text-wildfire-600">{`${payload[0].value}%`}</p>
        </div>
      );
    }
    return null;
  };

  const CorrelationTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border shadow-md rounded-md">
          <p className="font-medium">{`CO₂: ${payload[0].payload.co2} MT`}</p>
          <p className="text-wildfire-600">{`Probability: ${payload[0].payload.probability}%`}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className={`transition-opacity duration-500 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
      <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h2 className="text-2xl font-display font-bold">Wildfire Analytics</h2>
        <div className="w-full sm:w-auto">
          <Select value={selectedYear} onValueChange={handleYearChange}>
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="Filter by year" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Years</SelectItem>
              <SelectItem value="2025">2025</SelectItem>
              <SelectItem value="2024">2024</SelectItem>
              <SelectItem value="2023">2023</SelectItem>
              <SelectItem value="2022">2022</SelectItem>
              <SelectItem value="2021">2021</SelectItem>
              <SelectItem value="2020">2020</SelectItem>
              <SelectItem value="2019">2019</SelectItem>
              <SelectItem value="2018">2018</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <Tabs defaultValue="states" value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-2 md:grid-cols-4 mb-8">
          <TabsTrigger value="states">By State</TabsTrigger>
          <TabsTrigger value="causes">By Cause</TabsTrigger>
          <TabsTrigger value="yearly">Yearly Trend</TabsTrigger>
          <TabsTrigger value="correlation">CO₂ Correlation</TabsTrigger>
        </TabsList>
        
        <TabsContent value="states" className="mt-0">
          <Card>
            <CardHeader>
              <CardTitle>Wildfire Distribution by State</CardTitle>
              <CardDescription>
                Total number of wildfires recorded across different states
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={stateData}
                    layout="vertical"
                    margin={{ top: 5, right: 30, left: 80, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis type="number" />
                    <YAxis 
                      dataKey="name" 
                      type="category" 
                      tick={{ fontSize: 12 }} 
                    />
                    <Tooltip content={<CustomTooltip />} />
                    <Bar 
                      dataKey="wildfires" 
                      fill="#E5989B" 
                      barSize={20}
                      animationDuration={1500}
                      animationBegin={300}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="causes" className="mt-0">
          <Card>
            <CardHeader>
              <CardTitle>Wildfire Causes</CardTitle>
              <CardDescription>
                Distribution of primary causes for wildfire incidents
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={causesData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={150}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                      animationDuration={1500}
                      animationBegin={300}
                    >
                      {causesData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip content={<PieTooltip />} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="yearly" className="mt-0">
          <Card>
            <CardHeader>
              <CardTitle>Yearly Wildfire Trend</CardTitle>
              <CardDescription>
                Total number of wildfires recorded per year from 2015-2025
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={yearlyData}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis dataKey="year" />
                    <YAxis />
                    <Tooltip content={<CustomTooltip />} />
                    <Line 
                      type="monotone" 
                      dataKey="wildfires" 
                      stroke="#B5838D" 
                      strokeWidth={3}
                      dot={{ r: 4 }}
                      activeDot={{ r: 6 }}
                      animationDuration={1500}
                      animationBegin={300}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="correlation" className="mt-0">
          <Card>
            <CardHeader>
              <CardTitle>CO₂ Emissions vs. Wildfire Probability</CardTitle>
              <CardDescription>
                Correlation between CO₂ emissions and wildfire occurrence probability
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={co2Correlation}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis 
                      dataKey="co2" 
                      label={{ 
                        value: 'CO₂ Emissions (MT)', 
                        position: 'insideBottomRight', 
                        offset: -5 
                      }} 
                    />
                    <YAxis 
                      label={{ 
                        value: 'Wildfire Probability (%)', 
                        angle: -90, 
                        position: 'insideLeft',
                        style: { textAnchor: 'middle' }
                      }} 
                    />
                    <Tooltip content={<CorrelationTooltip />} />
                    <Line 
                      type="monotone" 
                      dataKey="probability" 
                      stroke="#E53E3E" 
                      strokeWidth={3}
                      activeDot={{ r: 6 }}
                      animationDuration={1500}
                      animationBegin={300}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
