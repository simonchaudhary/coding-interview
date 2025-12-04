import { RouterProvider } from "react-router-dom";

import { router } from "./routes.tsx";

import AppProviders from "./providers/AppProviders.tsx";

import { Toaster } from "./components/ui/sonner.tsx";
import GlobalSheet from "./components/commons/GlobalSheet.tsx";
import GlobalDialog from "./components/commons/GlobalDialog.tsx";

import "./App.css";

function App() {
  return (
    <AppProviders>
      <RouterProvider router={router} />

      <GlobalSheet />

      <GlobalDialog />

      <Toaster />
    </AppProviders>
  );
}

export default App;
