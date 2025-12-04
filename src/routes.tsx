import { createBrowserRouter } from "react-router-dom";

import { ROUTES } from "./constants/routes";

import RootLayout from "./layouts/RootLayout";

import HomePage from "./pages/HomePage";
import SushiPage from "./pages/SushiPage";
import SushiDetailPage from "./pages/SushiDetailPage";

import ErrorBoundaryProvider from "./providers/ErrorBoundaryProvider";

export const router = createBrowserRouter([
  {
    path: ROUTES.home,
    element: <RootLayout />,
    children: [
      { index: true, element: <HomePage /> },
      {
        path: ROUTES.sushi,
        element: (
          <ErrorBoundaryProvider>
            <SushiPage />
          </ErrorBoundaryProvider>
        ),
      },
      {
        path: ROUTES.sushiDetail.path,
        element: (
          <ErrorBoundaryProvider>
            <SushiDetailPage />
          </ErrorBoundaryProvider>
        ),
      },
    ],
  },
]);
