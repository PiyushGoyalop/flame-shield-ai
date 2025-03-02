
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Search } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface SearchFormProps {
  onSubmit: (location: string) => void;
  isLoading: boolean;
}

export function SearchForm({ onSubmit, isLoading }: SearchFormProps) {
  const [location, setLocation] = useState("");
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!location.trim()) {
      toast({
        title: "Location required",
        description: "Please enter a location to make a prediction",
        variant: "destructive",
      });
      return;
    }

    onSubmit(location);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="location">Location</Label>
        <div className="relative">
          <Input
            id="location"
            placeholder="e.g., Los Angeles, CA"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="pl-10 focus:border-wildfire-400 focus:ring-wildfire-400 transition-all"
            disabled={isLoading}
          />
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
        </div>
        <p className="text-xs text-muted-foreground">
          Enter city, state or any known location
        </p>
      </div>
      
      <Button 
        type="submit" 
        className="w-full bg-wildfire-600 hover:bg-wildfire-700 transition-all" 
        disabled={isLoading}
      >
        {isLoading ? "Analyzing..." : "Predict Risk"}
      </Button>
    </form>
  );
}
