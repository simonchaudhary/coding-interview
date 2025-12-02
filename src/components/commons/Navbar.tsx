import { User } from "lucide-react";
import { useLocation } from "react-router";

import { Button } from "@/components/ui/button";
import { ROUTE_TITLES } from "@/constants/common";

function Navbar() {
  const location = useLocation();
  const currentTitle = ROUTE_TITLES[location.pathname] || "Dashboard";

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
