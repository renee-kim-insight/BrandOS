import { BotIcon, HomeIcon, LibraryIcon, SettingsIcon } from "lucide-react"

import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
} from "@/components/ui/sidebar"

const nav = [
  { label: "Home", icon: HomeIcon, active: true },
  { label: "Agents", icon: BotIcon, badge: "12" },
  { label: "Library", icon: LibraryIcon },
  { label: "Settings", icon: SettingsIcon },
]

export default function SidebarDemo() {
  return (
    <SidebarProvider className="min-h-0 w-full max-w-2xl overflow-hidden rounded-3xl border">
      <Sidebar collapsible="none" className="h-[420px]">
        <SidebarHeader className="px-4 pt-4 text-sm font-semibold">Workspace</SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Navigate</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {nav.map((n) => (
                  <SidebarMenuItem key={n.label}>
                    <SidebarMenuButton isActive={n.active} render={<a href="#" />}>
                      <n.icon />
                      <span>{n.label}</span>
                    </SidebarMenuButton>
                    {n.badge && <SidebarMenuBadge>{n.badge}</SidebarMenuBadge>}
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter>
          <div className="flex items-center gap-2.5 p-2">
            <Avatar size="sm">
              <AvatarFallback>RK</AvatarFallback>
            </Avatar>
            <span className="text-sm font-medium">Renee Kim</span>
          </div>
        </SidebarFooter>
      </Sidebar>
      <main className="bg-background/40 flex flex-1 flex-col gap-2 p-8">
        <h3 className="text-xl font-semibold tracking-tight">Home</h3>
        <p className="text-muted-foreground text-sm">Your recent runs and pinned agents show here.</p>
      </main>
    </SidebarProvider>
  )
}
