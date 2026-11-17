import { Suspense } from "react";
import { Outlet } from "react-router-dom";

import { SidebarInset, SidebarProvider } from "../ui/sidebar";
import AppSidebar from "./AppSidebar";
import Navbar from "./Navbar";

import { useLocalStorage } from "@/hooks/useLocalStorage";
import { STORAGE_KEYS } from "@/lib/storage";

export default function AppShell() {
  const [open, setOpen] = useLocalStorage(STORAGE_KEYS.sidebar, false);

  return (
    <SidebarProvider open={open} onOpenChange={setOpen}>
      <AppSidebar />

      <SidebarInset>
        <Navbar />

        <main className="min-w-0 flex-1 bg-mist-50">
          <div className="mx-auto w-full max-w-350 p-4 md:p-6 xl:p-8">
            <Suspense
              fallback={
                <div className="flex min-h-screen items-center justify-center">
                  <span className="text-sm text-muted-foreground">
                    در حال بارگذاری...
                  </span>
                </div>
              }
            >
              <Outlet />
            </Suspense>
          </div>
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
