import * as React from "react"
import {
  IconInnerShadowTop,
} from "@tabler/icons-react"

import { NavMain } from "@/components/nav-main"
import { NavUser } from "@/components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { MdDashboard } from "react-icons/md";
import { FaClipboardList } from "react-icons/fa";
import { FaCalendarAlt } from "react-icons/fa";
import { IoIosStats } from "react-icons/io";
import { FaUsers } from "react-icons/fa6";
import { CgLogOut } from "react-icons/cg";
import Utils from "@/helpers/Utils"
import { useNavigate } from "react-router"

const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  Links: [
     {
       title: "Dashboard",
       url: "/admin/dashboard",
       icon: <MdDashboard/>,
     },
     {
       title: "Patients",
       url: "/admin/patients",
       icon: <FaClipboardList/>,
     },
     {
       title: "Agenda",
       url: "/admin/agenda",
       icon: <FaCalendarAlt/>,
     },
     {
       title: "Statistiques",
       url: "/admin/statistiques",
       icon: <IoIosStats/>,
     },
     {
       title: "Personnel",
       url: "/admin/personnel",
       icon: <FaUsers/>,
     },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const navigate = useNavigate();

  function handleDelete(){
    Utils.clearAuthInfo();
    navigate("/login")
  }

  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <div className="px-8 py-1">
          <img src="/logo.png" alt="Logo du cabinet" />
        </div>
      </SidebarHeader>
      <SidebarContent className="px-4 py-2">
        <NavMain Links={data.Links} />
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenuButton onClick={handleDelete} className="flex items-center justify-center gap-2 font-medium">
          <CgLogOut />
          <p>Se déconnecter</p>
        </SidebarMenuButton>
        {/* <NavUser user={data.user} /> */}
      </SidebarFooter>
    </Sidebar>
  )
}
