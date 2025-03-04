
import { Flame } from "lucide-react";
import { CardTitle, CardDescription } from "@/components/ui/card";

interface AuthHeaderProps {
  title: string;
  description: string;
}

export function AuthHeader({ title, description }: AuthHeaderProps) {
  return (
    <>
      <div className="flex justify-center mb-2">
        <div className="bg-wildfire-100 rounded-full p-3">
          <Flame className="h-8 w-8 text-wildfire-500" />
        </div>
      </div>
      <CardTitle className="text-2xl font-display">{title}</CardTitle>
      <CardDescription>{description}</CardDescription>
    </>
  );
}
