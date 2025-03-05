
import { Button } from "@/components/ui/button";

interface HistoryHeaderProps {
  isUserLoggedIn: boolean;
  onLogout: () => Promise<void>;
}

export function HistoryHeader({ isUserLoggedIn, onLogout }: HistoryHeaderProps) {
  return (
    <div className="flex justify-between items-center mb-8">
      <div>
        <h1 className="text-3xl font-display font-bold mb-2">Prediction History</h1>
        <p className="text-muted-foreground">
          View your previous wildfire risk predictions
        </p>
      </div>
      
      {isUserLoggedIn && (
        <div className="flex gap-3">
          <Button 
            variant="outline" 
            className="border-wildfire-200 text-wildfire-700 hover:bg-wildfire-50"
            onClick={onLogout}
          >
            Sign Out
          </Button>
        </div>
      )}
    </div>
  );
}
