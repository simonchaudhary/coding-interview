import { useLocation } from "react-router";
import { User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ROUTES } from "@/constants/routes";

const routeTitles: Record<string, string> = {
  [ROUTES.home]: "Home",
  [ROUTES.sushi]: "Sushi Manager",
};

function Navbar() {
  const location = useLocation();
  const currentTitle = routeTitles[location.pathname] || "Dashboard";

  return (
    <nav className="flex flex-1 items-center justify-between">
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-1 text-sm text-muted-foreground">
          <span className="font-medium text-foreground">{currentTitle}</span>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" className="size-9 rounded-full">
          <User className="size-4" />
          <span className="sr-only">User menu</span>
        </Button>
      </div>
    </nav>
  );
}

export default Navbar;
