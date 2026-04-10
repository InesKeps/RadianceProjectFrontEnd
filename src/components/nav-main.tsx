import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { NavLink } from "react-router-dom";

export function NavMain({
  Links,
}: {
  Links: {
    title: string
    url: string
    icon?: React.ReactNode
  }[]
}) {

  const linkStyle = ({ isActive }: { isActive: boolean }) =>
  `flex items-center gap-2 px-4 py-2 rounded-md font-medium
    ${isActive ? "bg-[#0DABCB] text-white" : " hover:text-[#fff] hover:bg-[#0DABCB]"}`;
  return (
    <SidebarGroup>
      <SidebarGroupContent>
        <SidebarMenu className="flex flex-col gap-2 pt-2">
          {Links.map((link) => (
            <NavLink to={link.url} className={linkStyle}>
              <SidebarMenuItem className="flex gap-4 items-center" key={link.title}>
                    {link.icon}
                    {link.title}
                {/* </SidebarMenuButton> */}
              </SidebarMenuItem>
            </NavLink>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  )
}

