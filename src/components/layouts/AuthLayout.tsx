
import { ReactNode } from "react";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { AuthHeader } from "@/components/auth/AuthHeader";

interface AuthLayoutProps {
  children: ReactNode;
  title: string;
  description: string;
}

export function AuthLayout({ children, title, description }: AuthLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col">
      <Nav />
      
      <main className="flex-grow pt-28 pb-20">
        <div className="max-w-md mx-auto px-6 md:px-8">
          <Card className="border-wildfire-100 shadow-elevation">
            <CardHeader className="text-center">
              <AuthHeader 
                title={title} 
                description={description}
              />
            </CardHeader>
            
            <CardContent>
              {children}
            </CardContent>
          </Card>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
