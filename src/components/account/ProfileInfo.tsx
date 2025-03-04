
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface ProfileInfoProps {
  userData: {
    name: string;
    email: string;
    mobile: string;
  };
}

export function ProfileInfo({ userData }: ProfileInfoProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Profile Information</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <label className="text-sm font-medium text-muted-foreground">Name</label>
          <p className="mt-1">{userData.name}</p>
        </div>
        <div>
          <label className="text-sm font-medium text-muted-foreground">Email</label>
          <p className="mt-1">{userData.email}</p>
        </div>
        <div>
          <label className="text-sm font-medium text-muted-foreground">Mobile Number</label>
          <p className="mt-1">{userData.mobile || "Not provided"}</p>
        </div>
      </CardContent>
    </Card>
  );
}
