import { cn } from "@nextui-org/react";
import IconLogo from "../../assets/Images/logo.png";
import { TLogoProps } from "../../lib/types";

const Logo: React.FC<TLogoProps> = ({ className }) => {
  return (
    <>
      <img
        className={cn("flex justify-center", className)}
        src={IconLogo}
        alt="Logo"
      />
    </>
  );
};

export default Logo;
