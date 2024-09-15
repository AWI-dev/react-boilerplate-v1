import { useState } from "react";
import { Button } from "@nextui-org/react";
import {
  LayoutGrid,
  PanelLeftClose,
  User,
  Settings,
  MonitorCog,
} from "lucide-react";
import Logo from "./Logo";
import SidebarItem from "./SidebarItem";
import SidebarItemGroup from "./SidebarItemGroup";

function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);

  const accountItem = [
    { title: "User", path: "/users", icon: "" },
    { title: "Manage", path: "/manage", icon: "" },
  ];

  const toggleSidebar = () => setIsOpen(!isOpen);

  const RenderSidebarMenu: React.FC<{}> = ({}) => {
    return (
      <>
        <nav className="mt-4">
          <ul className="px-4">
            <SidebarItem
              title="Dashboard"
              path="/dashboard"
              icon={<LayoutGrid size={24} />}
            />
            <SidebarItem
              title="Accounts"
              path="/accounts"
              icon={<User size={24} />}
            />
            <SidebarItem
              title="System Management"
              path="/system-management"
              icon={<MonitorCog size={24} />}
            />
            <SidebarItemGroup
              title="Settings"
              children={accountItem}
              icon={<Settings size={24} />}
            />
          </ul>
        </nav>
      </>
    );
  };

  return (
    <>
      {/* Mobile View */}
      <div className="lg:hidden min-h-screen bg-accentwhite dark:bg-[#0D0D0D] min-w-20 w-20 ">
        <div
          className="mt-[1rem] mb-[2rem] flex justify-center"
          id="logoContainer"
        >
          <Logo className="w-14" />
        </div>
        <RenderSidebarMenu />
      </div>
      {/* Mobile View */}
      {/* Web View */}
      <aside
        className={`shadow-lg fixed lg:static top-0 left-0 z-40 h-full w-64 transform bg-accentwhite  dark:bg-[#0D0D0D] border-r border-background dark:border-gray-700 transition-transform duration-300 ease-in-out 
        ${isOpen ? "translate-x-0" : "-translate-x-full"} 
        lg:translate-x-0`}
      >
        <div className="flex justify-between items-center px-4 py-4  dark:border-gray-700">
          <Logo className="w-14" />
          <Button
            isIconOnly
            onClick={toggleSidebar}
            className="bg-transparent lg:hidden"
          >
            <PanelLeftClose size={24} />
          </Button>
        </div>

        <RenderSidebarMenu />
      </aside>
      {/* Web View */}
    </>
  );
}

export default Sidebar;
