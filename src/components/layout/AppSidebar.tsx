import { NavLink, useLocation } from "react-router-dom";

import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

import {
  LayoutDashboard,
  ArrowLeftRight,
  Tags,
  Settings,
  Wallet,
  MoreHorizontal,
  BarChart3,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

const items = [
  { title: "داشبورد", url: "/dashboard", icon: LayoutDashboard },
  { title: "تراکنش‌ها", url: "/transactions", icon: ArrowLeftRight },
  { title: "دسته‌بندی‌ها", url: "/categories", icon: Tags },
  { title: "گذارش‌ها", url: "/reports", icon: BarChart3 },
  { title: "تنظیمات", url: "/settings", icon: Settings },
];

export function AppSidebar() {
  const { pathname } = useLocation();

  return (
    <Sidebar side="right" collapsible="icon">
      <SidebarHeader className="items-center py-4">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton tooltip="فینکس" className="text-primary">
              <Wallet className="size-5 shrink-0" />
              <span className="font-semibold">ّFINEX</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.url}>
                  <SidebarMenuButton
                    render={
                      <NavLink
                        className="data-[active=true]:bg-sidebar-accent data-[active=true]:text-sidebar-accent-foreground"
                        to={item.url}
                      />
                    }
                    isActive={pathname == item.url}
                    tooltip={item.title}
                  >
                    <item.icon className="size-4 shrink-0" />
                    <span>{item.title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <div
          className="border-t border-sidebar-border p-4 text-[11px] leading-relaxed
          text-sidebar-foreground/50 group-data-[collapsible=icon]:hidden"
        >
          تمام اطلاعات شما به‌صورت محلی در این مرورگر ذخیره می‌شود.
        </div>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" className="py-2" tooltip="کاربر">
              <Avatar className="size-8">
                <AvatarImage src="" alt="کاربر" />
                <AvatarFallback>M</AvatarFallback>
              </Avatar>

              <div className="grid min-w-0 flex-1 text-right text-sm leading-tight">
                <span className="truncate font-medium">کاربر</span>
                <span className="truncate text-xs text-muted-foreground">
                  email@example.com
                </span>
              </div>

              <MoreHorizontal className="mr-auto size-4 shrink-0" />
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
