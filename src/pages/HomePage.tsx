import { Link } from "react-router";
import { UtensilsCrossed } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ROUTES } from "@/constants/routes";

function HomePage() {
  return (
    <div className="container mx-auto space-y-8">
      <div className="space-y-2">
        <h1 className="text-4xl font-bold tracking-tight">
          Welcome to Sushi App
        </h1>
        <p className="text-muted-foreground text-lg">
          Manage your sushi menu with ease
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <UtensilsCrossed className="size-5" />
              Sushi Management
            </CardTitle>
            <CardDescription>
              Browse, create, and manage your sushi menu items
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild className="w-full">
              <Link to={ROUTES.sushi}>Go to Sushi Menu</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default HomePage;
