import { NavLink, useLocation } from "react-router-dom";
import { TSidebarItemGroupProps } from "../../lib/Type/commonTypes";
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
          className={`relative flex gap-1 w-auto lg:w-56  items-center py-2 px-2 rounded-lg
            text-csPrimary dark:text-white hover:bg-cta hover:text-white dark:hover:bg-gray-700
            ${
              children.some((item) => item.path === pathname)
                ? "bg-cta !text-white dark:bg-gray-700"
                : ""
            }
          `}
        >
          {icon}
          <p className="text-sm font-medium hidden lg:block">{title}</p>
          <ChevronDown
            className={`absolute right-2 transition-transform duration-300 hidden lg:block ${
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
                ` flex justify-center  gap-2 py-1 px-2 text-sm rounded-md text-csPrimary dark:text-gray-300 hover:bg-cta dark:hover:bg-gray-600 items-center lg:justify-start lg:pl-6 ${
                  isActive ? "bg-cta !text-white dark:bg-gray-600" : ""
                }`
              }
            >
              {icon}
              <p className="text-sm font-medium hidden lg:block">
                {item.title}
              </p>
            </NavLink>
          </li>
        ))}
      </ul>
    </>
  );
};

export default SidebarItemGroup;
