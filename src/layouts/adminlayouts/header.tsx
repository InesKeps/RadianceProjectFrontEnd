import { SidebarTrigger } from "@/components/ui/sidebar";
import useAuth from "@/hooks/useAuth";
import { FaUserLarge } from "react-icons/fa6";

const Header = () =>{
    const user = useAuth();

    return (
        <header className="h-full w-full flex justify-between items-center px-4 py-5">
            <SidebarTrigger/>
            <div className="flex items-center gap-2 pr-4 text-black">
                <div className="flex justify-center items-center rounded-full w-10 h-10 bg-[#9616cc]">
                    <FaUserLarge className="text-white"/>
                </div>
                <div>
                    <p className="font-medium">Dr {user?.userInfo?.userToLogin?.nom}</p>
                    <p className="text-xs font-medium">Super admin</p>
                </div>
            </div>
        </header>
    )
}

export default Header;