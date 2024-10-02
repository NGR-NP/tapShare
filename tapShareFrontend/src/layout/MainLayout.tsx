import { Outlet } from "react-router-dom";

import { ThemeProvider } from "@/components/theme-provider";

export default function MainLayout() {
  return (
    <ThemeProvider defaultTheme="system" storageKey="tapshare-ui-theme">
      <Outlet />
    </ThemeProvider>
  );
}
