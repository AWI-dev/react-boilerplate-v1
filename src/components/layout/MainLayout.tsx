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
        <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
          <Topbar/>
          {/* <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} /> */}
            <div className="mx-auto p-5 md:p-5 2xl:p-5 dark:bg-[#1D2328] ">
              <Outlet />
            </div>
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
