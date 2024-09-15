import { NavLink, useLocation } from "react-router-dom";
import { TSidebarItemProps } from "../../lib/Type/CommonTypes";

const SidebarItem: React.FC<TSidebarItemProps> = ({ title, path, icon }) => {
  const { pathname } = useLocation();

  return (
    <li className="flex justify-center">
      <NavLink to={path}>
        <div
          className={`relative flex gap-1 lg:w-56 items-center py-2 px-2 my-1 rounded-lg
            text-csPrimary dark:text-white hover:text-white hover:bg-cta dark:hover:bg-gray-700
                 ${pathname === path ? "!text-white bg-cta dark:bg-gray-700" : ""}
                 `}
        >
          {icon}
          <p className="text-sm font-medium hidden lg:block">{title}</p>
        </div>
      </NavLink>
    </li>
  );
};

export default SidebarItem;
