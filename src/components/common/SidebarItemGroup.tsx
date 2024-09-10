import { NavLink, useLocation } from "react-router-dom";
import { TSidebarItemGroupProps } from "../../lib/types";
import { ChevronDown } from "lucide-react";
import { useState } from "react";

const SidebarItemGroup: React.FC<TSidebarItemGroupProps> = ({
  title,
  children,
  icon,
}) => {
  const { pathname } = useLocation();
  const [isOpenMenu, setIsOpenMenu] = useState(false);

  return (
    <>
      <li className="flex justify-center cursor-pointer">
        <div
          onClick={() => setIsOpenMenu(!isOpenMenu)}
          className={`relative flex gap-1 w-56 items-center py-2 px-2 rounded-lg
            text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700
            ${
              children.some((item) => item.path === pathname)
                ? "bg-gray-100 dark:bg-gray-700"
                : ""
            }
          `}
        >
          {icon}
          <p className="text-sm font-medium">{title}</p>
          <ChevronDown
            className={`absolute right-2 transition-transform duration-300 ${
              isOpenMenu ? "rotate-180" : "rotate-0"
            }`}
            size={20}
          />
        </div>
      </li>
      <ul
        className={`transition-all duration-300 overflow-hidden ${
          isOpenMenu ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        {children.map((item) => (
          <li key={item.path}>
            <NavLink
              to={item.path}
              className={({ isActive }) =>
                `indent-8 block py-1 px-2 text-sm rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 ${
                  isActive ? "bg-gray-200 dark:bg-gray-600" : ""
                }`
              }
            >
              {item.title}
            </NavLink>
          </li>
        ))}
      </ul>
    </>
  );
};

export default SidebarItemGroup;
