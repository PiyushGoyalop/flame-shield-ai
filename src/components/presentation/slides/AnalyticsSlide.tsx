
import { PieChart, BarChart } from "lucide-react";

export function AnalyticsSlide() {
  return (
    <div className="h-full flex flex-col px-8 py-12">
      <h2 className="text-3xl font-display font-bold mb-8 text-wildfire-800">Analytics & Data Insights</h2>
      
      <div className="flex-grow grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Left column - Chart visualizations */}
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-5 h-[calc(50%-12px)]">
            <div className="flex items-center mb-3">
              <PieChart className="h-5 w-5 text-wildfire-600 mr-2" />
              <h3 className="font-medium">Causes of Wildfires</h3>
            </div>
            
            <div className="flex items-center justify-center h-[calc(100%-40px)]">
              {/* Simplified pie chart visualization */}
              <div className="relative w-52 h-52">
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-wildfire-600 to-red-500" style={{ clipPath: 'polygon(50% 50%, 100% 0, 100% 100%, 50% 100%)' }}></div>
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500 to-blue-600" style={{ clipPath: 'polygon(50% 50%, 100% 0, 50% 0, 0 0, 0 40%)' }}></div>
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-gray-400 to-gray-500" style={{ clipPath: 'polygon(50% 50%, 0 40%, 0 100%, 50% 100%)' }}></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-24 h-24 rounded-full bg-white"></div>
                </div>
              </div>
              
              <div className="ml-4 space-y-2">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-gradient-to-r from-wildfire-600 to-red-500 rounded-full mr-2"></div>
                  <span className="text-sm">Human (54%)</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full mr-2"></div>
                  <span className="text-sm">Lightning (31%)</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-gradient-to-r from-gray-400 to-gray-500 rounded-full mr-2"></div>
                  <span className="text-sm">Unknown (15%)</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-5 h-[calc(50%-12px)]">
            <div className="flex items-center mb-3">
              <BarChart className="h-5 w-5 text-wildfire-600 mr-2" />
              <h3 className="font-medium">Yearly Incident Trends</h3>
            </div>
            
            <div className="flex items-end justify-between h-40 px-4 pt-4">
              {/* Simplified bar chart */}
              {[35, 42, 58, 65, 72].map((value, i) => (
                <div key={i} className="flex flex-col items-center">
                  <div 
                    className="w-12 bg-gradient-to-t from-wildfire-600 to-wildfire-300 rounded-t-sm hover:from-wildfire-700 hover:to-wildfire-400 transition-all"
                    style={{ height: `${value * 0.45}px` }}
                  ></div>
                  <div className="mt-2 text-xs">{2019 + i}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Right column - Data insights */}
        <div className="flex flex-col">
          <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-5 mb-6">
            <h3 className="font-medium mb-4">Key Analytics Insights</h3>
            
            <ul className="space-y-4">
              <li className="flex items-start">
                <div className="mt-1 h-5 w-5 rounded-full bg-wildfire-100 text-wildfire-600 flex items-center justify-center text-xs mr-3 flex-shrink-0">
                  1
                </div>
                <div>
                  <h4 className="font-medium text-sm mb-1">State Distribution of Wildfires</h4>
                  <p className="text-sm text-muted-foreground">
                    California, Oregon, and Washington show the highest concentration of wildfires in the western United States.
                  </p>
                </div>
              </li>
              
              <li className="flex items-start">
                <div className="mt-1 h-5 w-5 rounded-full bg-wildfire-100 text-wildfire-600 flex items-center justify-center text-xs mr-3 flex-shrink-0">
                  2
                </div>
                <div>
                  <h4 className="font-medium text-sm mb-1">CO₂ Correlation</h4>
                  <p className="text-sm text-muted-foreground">
                    Areas with higher CO₂ levels show a 27% increase in wildfire probability over a 5-year period.
                  </p>
                </div>
              </li>
              
              <li className="flex items-start">
                <div className="mt-1 h-5 w-5 rounded-full bg-wildfire-100 text-wildfire-600 flex items-center justify-center text-xs mr-3 flex-shrink-0">
                  3
                </div>
                <div>
                  <h4 className="font-medium text-sm mb-1">Seasonal Patterns</h4>
                  <p className="text-sm text-muted-foreground">
                    Summer months (June-September) account for 68% of annual wildfire incidents in temperate regions.
                  </p>
                </div>
              </li>
              
              <li className="flex items-start">
                <div className="mt-1 h-5 w-5 rounded-full bg-wildfire-100 text-wildfire-600 flex items-center justify-center text-xs mr-3 flex-shrink-0">
                  4
                </div>
                <div>
                  <h4 className="font-medium text-sm mb-1">Vegetation Impact</h4>
                  <p className="text-sm text-muted-foreground">
                    Areas with dense forest coverage combined with low humidity are 3x more likely to experience severe wildfires.
                  </p>
                </div>
              </li>
            </ul>
          </div>
          
          <div className="bg-amber-50 rounded-lg border border-amber-100 p-5 mt-auto">
            <h3 className="font-medium mb-2 flex items-center text-amber-800">
              <BarChart className="h-4 w-4 mr-2 text-amber-600" />
              Analytics Features
            </h3>
            <ul className="text-sm space-y-1 text-amber-700">
              <li>• Interactive filtering by time period</li>
              <li>• Customizable data visualization options</li>
              <li>• Exportable reports for stakeholders</li>
              <li>• Comparative analysis across regions</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
