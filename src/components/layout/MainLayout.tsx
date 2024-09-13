import { Outlet } from "react-router-dom";
import Sidebar from "../common/Sidebar";
import Topbar from "../common/Topbar";
/* import Sidebar from "../common/Sidebar";
import Header from "../common/Header";
 */
const MainLayout = () => {
  return (
    <div className="dark:bg-boxdark-2 dark:text-bodydark dark:bg-[#1D2328] font-body ">
      <div className="flex h-screen overflow-hidden">
        <Sidebar />
        <div className="flex flex-col w-full">
          <Topbar />
          <div className="p-5 md:p-5 2xl:p-5 dark:bg-[#1D2328] bg-white ">
            <div className="min-h-screen">
              <Outlet />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
