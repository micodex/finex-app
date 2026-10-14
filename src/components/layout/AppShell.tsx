import { SidebarInset, SidebarProvider } from "../ui/sidebar";
import { Outlet } from "react-router-dom";

import AppSidebar from "./AppSidebar";
import Navbar from "./Navbar";

export default function AppShell() {
  return (
    <SidebarProvider>
      <AppSidebar />

      <SidebarInset>
        <Navbar />

        <main className="min-w-0 flex-1">
          <div className="mx-auto w-full max-w-[1600px] p-4 md:p-6 xl:p-8">
            <Outlet />
          </div>
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
