
import { AnalyticsTrends } from "@/components/AnalyticsTrends";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";

const Analytics = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Nav />
      
      <main className="flex-grow pt-28 pb-20">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h1 className="text-3xl md:text-4xl font-display font-bold mb-4">
              Wildfire Analytics Dashboard
            </h1>
            <p className="text-muted-foreground text-lg">
              Explore comprehensive data visualizations and insights about wildfire trends, causes, and correlations.
            </p>
          </div>
          
          <AnalyticsTrends />
          
          <div className="mt-16 max-w-3xl mx-auto bg-secondary/50 p-6 rounded-lg border border-wildfire-100">
            <h2 className="text-xl font-medium mb-4">Understanding Our Analytics</h2>
            <p className="text-muted-foreground mb-4">
              Our dashboard presents data from multiple sources to provide a comprehensive view of wildfire patterns:
            </p>
            <ul className="space-y-2 text-muted-foreground list-disc pl-5">
              <li>Statistical distribution of wildfires across different states</li>
              <li>Primary causes of wildfire incidents and their relative frequency</li>
              <li>Year-over-year trends in wildfire occurrences</li>
              <li>Correlation between CO₂ emissions and wildfire probability</li>
            </ul>
            <p className="mt-4 text-sm text-muted-foreground">
              These analytics are derived from historical data and our machine learning model to help identify patterns and risk factors.
            </p>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Analytics;
