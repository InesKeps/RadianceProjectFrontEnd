// import { SidebarProvider } from "@/components/ui/sidebar"
// import { AppSidebar } from "@/components/app-sidebar"
// import { Outlet } from "react-router";
// import Header from "./header";
import { AppSidebar } from "@/components/app-sidebar"
import { SiteHeader } from "@/components/site-header"
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar"

import { Outlet } from "react-router"

export default function AdminLayout() {
  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 72)",
          "--header-height": "calc(var(--spacing) * 12)",
        } as React.CSSProperties
      }
    >
      <AppSidebar className="w-[20%]" variant="inset" />
      <SidebarInset>
        <SiteHeader/>
        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2">
            <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
              <Outlet/>
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
    // <SidebarProvider>
    //     <AppSidebar />
    //     <section className="w-full bg-[#f7f9fa]">
    //       <div className="h-16 w-full border-b border-[#d7d9da]">
    //           <Header/>
    //       </div>
    //       <main className="w-full h-[calc(100dvh-64px)]">
    //           <Outlet/>
    //       </main>
    //     </section>
    // </SidebarProvider>
  )
}







// import { Outlet } from "react-router";
// import Sidebar from "./sidebar";
// import Header from "./header";

// const AdminLayout = () => {
//   return (
//     <section className="grid grid-cols-[220px_1fr] gap-x-4 bg-[#0DABCB]/10 h-dvh p-2 overflow-hidden">
//       <div>
//         <Sidebar/>
//       </div>
//       <section>
//         <div className="h-20 w-full">
//             <Header/>
//         </div>
//         <main className="bg-white rounded-xl w-full h-[calc(100dvh-80px)] overflow-y-scroll">
//             <Outlet/>
//         </main>
//       </section>
//     </section>
//   );
// };

// export default AdminLayout;  
