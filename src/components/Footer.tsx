
import { Flame } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t bg-secondary/50">
      <div className="max-w-7xl mx-auto px-6 md:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Flame size={24} className="text-wildfire-600" />
              <span className="font-display font-bold text-xl">Wildfire Analytics</span>
            </div>
            <p className="text-muted-foreground text-sm">
              Advanced analytics and predictions for wildfire risk assessment using machine learning and environmental data.
            </p>
          </div>
          
          <div>
            <h3 className="font-medium text-base mb-4">Navigation</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="/" className="text-muted-foreground hover:text-foreground transition-colors">
                  Home
                </a>
              </li>
              <li>
                <a href="/analytics" className="text-muted-foreground hover:text-foreground transition-colors">
                  Analytics
                </a>
              </li>
              <li>
                <a href="/predict" className="text-muted-foreground hover:text-foreground transition-colors">
                  Prediction
                </a>
              </li>
              <li>
                <a href="/about" className="text-muted-foreground hover:text-foreground transition-colors">
                  About
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-medium text-base mb-4">Resources</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                  Dataset
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                  API Documentation
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                  Research Papers
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                  Data Privacy
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-medium text-base mb-4">Contact</h3>
            <ul className="space-y-2 text-sm">
              <li className="text-muted-foreground">
                Email: info@wildfireanalytics.ai
              </li>
              <li className="text-muted-foreground">
                Phone: +1 (555) 123-4567
              </li>
              <li className="text-muted-foreground">
                Address: 123 Forest Ave, Research City, CA 90210
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t mt-8 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Wildfire Analytics. All rights reserved.
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
              Terms
            </a>
            <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
              Privacy
            </a>
            <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
              Cookies
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
