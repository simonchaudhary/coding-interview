import { Outlet } from "react-router";
import { NuqsAdapter } from "nuqs/adapters/react-router/v7";

import AppSidebar from "@/components/commons/AppSidebar";
import Navbar from "@/components/commons/Navbar";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";

function RootLayout() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger />
          <Navbar />
        </header>
        <main className="flex-1 p-4">
          <NuqsAdapter>
            <Outlet />
          </NuqsAdapter>
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}

export default RootLayout;
