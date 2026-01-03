import { Outlet } from "react-router";
import Sidebar from "./sidebar";
import Header from "./header";

const UserLayout = () => {
  return (
    <section className="grid grid-cols-[220px_1fr] gap-x-4 bg-[#0DABCB]/10 h-dvh p-2 overflow-hidden">
      <div>
        <Sidebar/>
      </div>
      <section>
        <div className="h-20 w-full">
            <Header/>
        </div>
        <main className="bg-white rounded-xl w-full h-[calc(100dvh-80px)] overflow-y-scroll">
            <Outlet/>
        </main>
      </section>
    </section>
  );
};

export default UserLayout;  
