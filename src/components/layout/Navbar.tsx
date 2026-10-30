import { SidebarTrigger } from "../ui/sidebar";

export default function Navbar() {
  return (
    <header className="sticky top-0 flex h-14 items-center border-b px-4 bg-background/95 backdrop-blur-sm">
      <SidebarTrigger />

      <div className="h-5 mx-2 w-px bg-border" aria-hidden="true" />
      <p className="truncate text-sm font-semibold">داشبورد</p>
    </header>
  );
}
