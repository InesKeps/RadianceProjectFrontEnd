import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { NavLink } from "react-router";

export function NavMain({
  Links,
}: {
  Links: {
    title: string
    url: string
    icon?: React.ReactNode
  }[]
}) {
  return (
    <SidebarGroup>
      <SidebarGroupContent>
        <SidebarMenu className="flex flex-col gap-3">
          {Links.map((link) => (
            <NavLink to={link.url}>
              <SidebarMenuItem key={link.title}>
                <SidebarMenuButton tooltip={link.title}  className="px-4">
                    {link.icon}
                    {link.title}
                </SidebarMenuButton>
            </SidebarMenuItem>
            </NavLink>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  )
}
