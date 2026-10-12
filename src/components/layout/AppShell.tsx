import { SidebarInset, SidebarProvider, SidebarTrigger } from "../ui/sidebar";
import { AppSidebar } from "./AppSidebar";
import { Outlet } from "react-router-dom";

export function AppShell() {
  return (
    <div dir="rtl" lang="fa" className="min-h-svh">
      <SidebarProvider>
        <AppSidebar />

        <SidebarInset>
          <main className="min-w-0 flex-1">
            <header className="flex h-14 items-center border-b px-4">
              <SidebarTrigger />
            </header>

            <div className="p-4 md:p-6">
              <Outlet />
            </div>
          </main>
        </SidebarInset>
      </SidebarProvider>
    </div>
  );
}
