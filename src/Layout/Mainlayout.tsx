import { Outlet } from "react-router-dom";
import Header from "./Header";
import Sidebar from "./Sidebar";

const Mainlayout = () => {
  return (
    <div className="bg-linear-to-br from-slate-800 to-slate-900">
      <div className="flex h-screen ">
        <Sidebar />
        <div className="flex flex-col flex-1">
          <Header />
          <main className="p-6 overflow-y-auto">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
};

export default Mainlayout;
