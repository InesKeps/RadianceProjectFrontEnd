import { NavLink } from "react-router";
import { FaClipboardList } from "react-icons/fa";
import { FaCalendarAlt } from "react-icons/fa";
import { IoIosStats } from "react-icons/io";

const links = [
  {
    title: "Patients",
    url: "/user/patients",
    icon: <FaClipboardList />,
  },
  {
    title: "Agenda",
    url: "/user/agenda",
    icon: <FaCalendarAlt />,
  },
  {
    title: "Statistiques",
    url: "/user/statistiques",
    icon: <IoIosStats />,
  },
];

const linkStyle = ({ isActive }: { isActive: boolean }) =>
  `flex items-center gap-2 px-4 py-2 rounded-md 
    ${isActive ? "bg-[#0DABCB] text-white" : "text-[#0DABCB] hover:bg-[#0DABCB] hover:text-white"}`;

const Sidebar = () => {
  return (
    <aside className="h-full w-full">
      <div className="px-8 py-6 ">
        <img src="/logo.png" alt="Logo du cabinet" />
      </div>
      <div className="flex flex-col items-center py-2">
        <ul className="flex flex-col gap-2 w-[85%] text-[#0DABCB] font-medium text-lg">
          {links.map((link, index) => {
            return (
              <li
                key={index.toString()}
                
              >
                <NavLink
                  to={link.url}
                  className={linkStyle}>
                  {link.icon}
                  {link.title}
                </NavLink>
              </li>
            );
          })}
        </ul>
      </div>
    </aside>
  );
};

export default Sidebar;
