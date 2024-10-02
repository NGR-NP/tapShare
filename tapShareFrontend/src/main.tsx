import { StrictMode } from "react";

import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";

import router from "@/Router/routes";
import "@/index.css";

createRoot(document.getElementById("tapshare")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
