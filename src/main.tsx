import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import { RouterProvider } from "react-router-dom";
import { QueryClientProvider } from "@tanstack/react-query";

import { router } from "./routes.tsx";
import { queryClient } from "./lib/queryClient.ts";

import { Toaster } from "./components/ui/sonner.tsx";
import GlobalSheet from "./components/commons/GlobalSheet.tsx";
import GlobalDialog from "./components/commons/GlobalDialog.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />

      <GlobalSheet />

      <GlobalDialog />

      <Toaster />
    </QueryClientProvider>
  </StrictMode>
);
