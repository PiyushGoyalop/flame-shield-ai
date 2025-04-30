
import { Code, Layout, Database, Server, LineChart } from "lucide-react";

export function TechnologySlide() {
  const technologies = [
    {
      category: "Frontend",
      icon: Layout,
      color: "bg-blue-100 text-blue-600",
      items: ["React", "TypeScript", "Tailwind CSS", "Shadcn UI", "Recharts"]
    },
    {
      category: "Backend",
      icon: Server,
      color: "bg-green-100 text-green-600",
      items: ["Supabase", "Edge Functions", "PostgreSQL", "Authentication"]
    },
    {
      category: "Data Processing",
      icon: Database,
      color: "bg-amber-100 text-amber-600",
      items: ["Random Forest Model", "Data Fetching API", "Environmental Analysis"]
    },
    {
      category: "Visualization",
      icon: LineChart,
      color: "bg-purple-100 text-purple-600",
      items: ["Interactive Charts", "Responsive Design", "Risk Indicators"]
    },
    {
      category: "Development",
      icon: Code,
      color: "bg-indigo-100 text-indigo-600",
      items: ["Vite", "ESLint", "Version Control", "CI/CD"]
    }
  ];

  return (
    <div className="h-full flex flex-col px-8 py-12">
      <h2 className="text-3xl font-display font-bold mb-8 text-wildfire-800">Technology Stack Highlights</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6 flex-grow content-center">
        {technologies.map((tech, index) => (
          <div 
            key={index} 
            className="bg-white rounded-lg shadow-sm border border-gray-100 p-5"
          >
            <div className="flex flex-col items-center text-center">
              <div className={`h-12 w-12 rounded-full ${tech.color} flex items-center justify-center mb-4`}>
                <tech.icon className="h-6 w-6" />
              </div>
              <h3 className="font-medium mb-3">{tech.category}</h3>
              <ul className="text-sm text-muted-foreground space-y-1">
                {tech.items.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-8 bg-gray-50 border border-gray-200 rounded-lg p-4">
        <h4 className="font-medium mb-2">Technical Achievements</h4>
        <ul className="text-sm text-muted-foreground grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-2">
          <li>• Advanced data visualization with Recharts</li>
          <li>• Responsive UI design for all device sizes</li>
          <li>• Authentication system integration</li>
          <li>• Edge function architecture for prediction service</li>
          <li>• Simulation capabilities when API data isn't available</li>
          <li>• Interactive analytics dashboard</li>
        </ul>
      </div>
    </div>
  );
}
