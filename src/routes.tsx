import { createBrowserRouter } from "react-router-dom";

import App from "./App";

import { ROUTES } from "./constants/routes";

import RootLayout from "./layouts/RootLayout";
import SushiPage from "./pages/SushiPage";
import SushiDetailPage from "./pages/SushiDetailPage";

export const router = createBrowserRouter([
  {
    path: ROUTES.home,
    Component: RootLayout,
    children: [
      { index: true, Component: App },
      { path: ROUTES.sushi, Component: SushiPage },
      { path: "sushi/:id", Component: SushiDetailPage },
    ],
  },
]);
