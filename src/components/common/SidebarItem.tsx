import { NavLink, useLocation } from "react-router-dom";
import { TSidebarItemProps } from "../../lib/types";

const SidebarItem: React.FC<TSidebarItemProps> = ({ title, path, icon }) => {
  const { pathname } = useLocation();

  return (
    <li className="flex justify-center">
      <NavLink to={path}>
        <div
          className={`relative flex gap-1 lg:w-56 items-center py-2 px-2 my-1 rounded-lg
            text-black dark:text-white hover:bg-csPrimary dark:hover:bg-gray-700
                 ${pathname === path ? "text-accentwhite bg-csPrimary dark:bg-gray-700" : ""}
                 `}
        >
          {icon}
          <p className="text-md font-medium hidden lg:block">{title}</p>
        </div>
      </NavLink>
    </li>
  );
};

export default SidebarItem;
