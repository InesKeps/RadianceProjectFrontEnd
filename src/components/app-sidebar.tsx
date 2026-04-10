import * as React from "react"

import { NavMain } from "@/components/nav-main"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenuButton,
} from "@/components/ui/sidebar"
import { MdHealthAndSafety } from "react-icons/md";
import { MdDashboard } from "react-icons/md";
import { FaClipboardList } from "react-icons/fa";
import { FaCalendarAlt } from "react-icons/fa";
import { IoIosStats } from "react-icons/io";
import { FaUsers } from "react-icons/fa6";
import { CgLogOut } from "react-icons/cg";
import { logoutAction } from "@/store/auth/actions";
import { toast } from "react-toastify";
import useAppDispatch from "@/hooks/useAppDispatch";

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
       title: "Consultations",
       url: "/admin/consultation",
       icon: <MdHealthAndSafety/>,
     },
     {
       title: "Agenda",
       url: "/admin/rdv",
       icon: <FaCalendarAlt/>,
     },
     {
       title: "Personnel",
       url: "/admin/personnel",
       icon: <FaUsers/>,
     },
     {
       title: "Données",
       url: "/admin/donnees",
       icon: <IoIosStats/>,
     },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const dispatch = useAppDispatch();

  const handleLogout = async () => {
    const response = await dispatch(logoutAction());
    
    if (response.meta.requestStatus === "fulfilled") {
      toast.success("Déconnexion réussie.");
    }

    if (response.meta.requestStatus === "rejected") {
      toast.error("Echec Déconnexion");
    }
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
        <SidebarMenuButton onClick={handleLogout} className="flex items-center cursor-pointer justify-center gap-2 font-medium">
          <CgLogOut />
          <p>Se déconnecter</p>
        </SidebarMenuButton>
      </SidebarFooter>
    </Sidebar>
  )
}

