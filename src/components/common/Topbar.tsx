import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  User,
} from "@nextui-org/react";
import Avatar from "../../assets/Images/avatar_male.jpg";
import ThemeSwitch from "../ThemeSwitcher";
import useCookie from "../../hooks/useCookie";
import { useNavigate } from "react-router";

function Topbar() {
  const { deleteCookie } = useCookie();
  const navigate = useNavigate();

  const handleLogout = () => {
    deleteCookie("base");
    navigate("/login");
  };
  return (
    <header className="drop-shadow-xl sticky top-0 z-40 py-4 flex justify-between w-full bg-accentwhite dark:bg-[#0D0D0D] drop-shadow-1 dark:bg-boxdark dark:drop-shadow-none shadow-md">
      <ThemeSwitch className="pl-4" />
      <div className="flex items-center gap-4 pr-5">
        <Dropdown placement="bottom-start">
          <DropdownTrigger>
            <User
              as="button"
              avatarProps={{
                isBordered: false,
                src: Avatar,
              }}
              className="transition-transform"
              // description="Job Title"
              name={"Juan Miguel Garcia"}
            />
          </DropdownTrigger>
          <DropdownMenu
            className="font-body"
            aria-label="User Actions"
            variant="flat"
          >
            <DropdownItem key="profile" className="h-14 gap-2">
              <p className="font-medium">Signed in as</p>
              <p className="font-bold">Juan Miguel Garcia</p>
            </DropdownItem>
            <DropdownItem key="logout" color="danger" onClick={handleLogout}>
              Log Out
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </div>
    </header>
  );
}

export default Topbar;
