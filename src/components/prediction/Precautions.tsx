
import { AlertCircle, Phone, ExternalLink, Shield } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

interface PrecautionsProps {
  probability: number;
}

export function Precautions({ probability }: PrecautionsProps) {
  // Determine risk level based on probability
  const getRiskLevel = () => {
    if (probability < 33) return 'low';
    if (probability < 66) return 'moderate';
    return 'high';
  };
  
  const riskLevel = getRiskLevel();
  
  return (
    <div className="mt-4 space-y-4">
      <h3 className="font-medium text-lg flex items-center gap-2">
        <Shield className="h-5 w-5 text-wildfire-500" />
        Recommended Precautions
      </h3>
      
      {riskLevel === 'low' && (
        <Alert className="bg-green-50 border-green-200">
          <AlertCircle className="h-4 w-4 text-green-700" />
          <AlertTitle className="text-green-800">Low Risk Area</AlertTitle>
          <AlertDescription className="text-green-700">
            <div className="mt-2 space-y-2">
              <p>While the risk is low, it's still important to stay prepared:</p>
              <ul className="list-disc pl-5 space-y-1 text-sm">
                <li>Stay informed about weather conditions</li>
                <li>Keep yards clear of dry debris and vegetation</li>
                <li>Have an evacuation plan ready for your family</li>
                <li>Ensure smoke detectors are working properly</li>
                <li>Store important documents in a fire-resistant safe</li>
              </ul>
            </div>
          </AlertDescription>
        </Alert>
      )}
      
      {riskLevel === 'moderate' && (
        <Alert className="bg-amber-50 border-amber-200">
          <AlertCircle className="h-4 w-4 text-amber-700" />
          <AlertTitle className="text-amber-800">Moderate Risk Area</AlertTitle>
          <AlertDescription className="text-amber-700">
            <div className="mt-2 space-y-2">
              <p>Take these precautions to minimize fire risks:</p>
              <ul className="list-disc pl-5 space-y-1 text-sm">
                <li>Clear dry vegetation within 30 feet of your home</li>
                <li>Remove flammable materials from around structures</li>
                <li>Create and practice a family evacuation plan</li>
                <li>Keep garden hoses connected and ready</li>
                <li>Stay updated on local fire alerts and restrictions</li>
                <li>Consider fire-resistant landscaping options</li>
              </ul>
            </div>
          </AlertDescription>
        </Alert>
      )}
      
      {riskLevel === 'high' && (
        <Alert className="bg-red-50 border-red-200">
          <AlertCircle className="h-4 w-4 text-red-700" />
          <AlertTitle className="text-red-800">High Risk Area - Take Action Now</AlertTitle>
          <AlertDescription className="text-red-700">
            <div className="mt-2 space-y-2">
              <p>Immediate precautions are necessary:</p>
              <ul className="list-disc pl-5 space-y-1 text-sm">
                <li>Pack emergency supplies and be ready to evacuate</li>
                <li>Create a defensible space of at least 100 feet around your home</li>
                <li>Remove all flammable materials from your roof and gutters</li>
                <li>Close all windows, vents, and doors to prevent sparks from entering</li>
                <li>Turn on outdoor lights to make your house visible in heavy smoke</li>
                <li>Move furniture away from windows and toward the center of rooms</li>
                <li>Fill containers with water for emergency use</li>
              </ul>
            </div>
          </AlertDescription>
        </Alert>
      )}
      
      <div className="p-4 bg-white border border-wildfire-100 rounded-lg">
        <h4 className="font-medium mb-2 flex items-center gap-2">
          <Phone className="h-4 w-4 text-wildfire-600" /> Emergency Contacts
        </h4>
        <ul className="space-y-2 text-sm">
          <li className="flex justify-between">
            <span>Emergency Services:</span>
            <span className="font-medium">911</span>
          </li>
          <li className="flex justify-between">
            <span>Forest Service Hotline:</span>
            <span className="font-medium">1-800-832-1355</span>
          </li>
          <li className="flex justify-between">
            <span>Wildfire Reporting:</span>
            <span className="font-medium">1-888-275-8247</span>
          </li>
          <li className="flex justify-between">
            <span>FEMA Disaster Assistance:</span>
            <span className="font-medium">1-800-621-3362</span>
          </li>
          <li className="mt-3 pt-2 border-t border-gray-100">
            <a 
              href="https://www.ready.gov/wildfires" 
              target="_blank"
              rel="noopener noreferrer"
              className="text-wildfire-600 hover:text-wildfire-800 flex items-center gap-1"
            >
              More wildfire preparedness resources <ExternalLink className="h-3 w-3" />
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}
