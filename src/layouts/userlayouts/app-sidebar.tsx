import * as React from "react"

import { NavMain } from "@/components/nav-main"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenuButton,
} from "@/components/ui/sidebar"
import { MdHealthAndSafety } from "react-icons/md"
import { MdDashboard } from "react-icons/md"
import { FaClipboardList } from "react-icons/fa"
import { FaCalendarAlt } from "react-icons/fa"
import { IoIosStats } from "react-icons/io"
import { CgLogOut } from "react-icons/cg"
import Utils from "@/helpers/Utils"
import { useNavigate } from "react-router-dom"

const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  Links: [
    {
      title: "Dashboard",
      url: "/user/dashboard",
      icon: <MdDashboard />,
    },
    {
      title: "Patients",
      url: "/user/patients",
      icon: <FaClipboardList />,
    },
    {
      title: "Consultations",
      url: "/user/consultation",
      icon: <MdHealthAndSafety />,
    },
    {
      title: "Agenda",
      url: "/user/rdv",
      icon: <FaCalendarAlt />,
    },
    {
      title: "Données",
      url: "/user/donnees",
      icon: <IoIosStats />,
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
        <SidebarMenuButton onClick={handleDelete} className="flex items-center cursor-pointer justify-center gap-2 font-medium">
          <CgLogOut />
          <p>Se déconnecter</p>
        </SidebarMenuButton>
        {/* <NavUser user={data.user} /> */}
      </SidebarFooter>
    </Sidebar>
  )
}

