import { Separator } from "@/components/ui/separator"
import { SidebarTrigger } from "@/components/ui/sidebar"
import useAuth from "@/hooks/useAuth";
import { FaUserLarge } from "react-icons/fa6";

export function SiteHeader() {
  const user = useAuth();
  return (
    <header className="flex h-(--header-height) shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)">
      <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
        <SidebarTrigger className="-ml-1" />
        <Separator
          orientation="vertical"
          className="mx-2 data-[orientation=vertical]:h-4"
        />
        <h1 className="text-base font-medium">Gestion Radiance</h1>
        <div className="ml-auto flex items-center py-2 gap-2">
          <div className="flex items-center gap-2 pr-4 text-black">
              <div className="flex justify-center items-center rounded-full w-8 h-8 bg-[#9616cc]">
                  <FaUserLarge className="text-white"/>
              </div>
              <div>
                  <p className="font-medium uppercase">{user?.userInfo?.userToLogin.nom}</p>
              </div>
          </div>
        </div>
      </div>
    </header>
  )
}
