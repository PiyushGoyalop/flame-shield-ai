
import { Card, CardContent } from "@/components/ui/card";
import { Cloud, ThermometerSun, Tree, Flame, Wind } from "lucide-react";

export function GreenhouseGasSection() {
  return (
    <section className="py-16 bg-gradient-to-b from-white to-wildfire-50">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-display font-bold mb-4">Greenhouse Gases & Wildfires</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Understanding the relationship between greenhouse gas emissions and wildfire risks is crucial for prevention and mitigation efforts.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          <InfoCard 
            icon={ThermometerSun} 
            title="Climate Change Catalyst" 
            description="Rising temperatures and changing precipitation patterns due to greenhouse gas emissions create ideal conditions for wildfires, increasing their frequency and intensity."
          />
          
          <InfoCard 
            icon={Cloud} 
            title="CO₂ Impact" 
            description="Carbon dioxide traps heat in the atmosphere, leading to higher temperatures, longer droughts, and drier vegetation—all critical factors in wildfire ignition and spread."
          />
          
          <InfoCard 
            icon={Wind} 
            title="Feedback Loop" 
            description="Wildfires release massive amounts of CO₂, creating a dangerous feedback loop: more emissions lead to more fires, which generate more emissions."
          />
        </div>
        
        <div className="bg-white p-8 rounded-xl shadow-sm border border-wildfire-100">
          <h3 className="text-2xl font-display font-bold mb-6 text-wildfire-800">Mitigation Strategies</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h4 className="text-lg font-medium flex items-center gap-2 text-wildfire-700">
                <Flame className="h-5 w-5" /> Reducing Emissions
              </h4>
              <ul className="space-y-2 list-disc pl-5 text-muted-foreground">
                <li>Transition to renewable energy sources</li>
                <li>Improve energy efficiency in buildings and transportation</li>
                <li>Implement carbon capture and storage technologies</li>
                <li>Support policies that limit industrial emissions</li>
                <li>Reduce methane emissions from agriculture and waste</li>
              </ul>
            </div>
            
            <div className="space-y-4">
              <h4 className="text-lg font-medium flex items-center gap-2 text-wildfire-700">
                <Tree className="h-5 w-5" /> Nature-Based Solutions
              </h4>
              <ul className="space-y-2 list-disc pl-5 text-muted-foreground">
                <li>Protect and restore forests that absorb CO₂</li>
                <li>Implement sustainable land management practices</li>
                <li>Create firebreaks and defensible spaces in vulnerable areas</li>
                <li>Conduct controlled burns to reduce fuel loads</li>
                <li>Restore wetlands that act as natural fire barriers</li>
              </ul>
            </div>
          </div>
          
          <div className="mt-8 p-4 bg-wildfire-50 rounded-lg border border-wildfire-100">
            <p className="text-sm text-muted-foreground">
              <strong className="text-wildfire-700">Did you know?</strong> A single large wildfire can release as much carbon dioxide as millions of cars do in a year. Preventing wildfires is not just about protecting lives and property—it's also a critical climate action.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

// Helper component for info cards
function InfoCard({ 
  icon: Icon, 
  title, 
  description 
}: { 
  icon: React.ComponentType<any>; 
  title: string; 
  description: string 
}) {
  return (
    <Card className="border-wildfire-200 hover:border-wildfire-300 transition-all hover:-translate-y-1 duration-300">
      <CardContent className="p-6">
        <div className="flex items-start gap-4">
          <div className="bg-wildfire-100 p-2.5 rounded-lg">
            <Icon className="h-5 w-5 text-wildfire-600" />
          </div>
          <div>
            <h3 className="font-medium text-lg mb-2">{title}</h3>
            <p className="text-muted-foreground">
              {description}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
