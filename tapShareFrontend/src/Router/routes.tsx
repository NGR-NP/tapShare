import { createBrowserRouter } from "react-router-dom";

import MainLayout from "@/layout/MainLayout";
import HomePage from "@/pages/HomePage";
import ErrorPage from "@/pages/error-page";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/about",
        element: <div>About</div>,
      },
    ],
  },
]);

export default router;
