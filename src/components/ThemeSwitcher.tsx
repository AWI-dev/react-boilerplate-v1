import {
  // Switch,
  useSwitch,
  VisuallyHidden,
  SwitchProps,
} from "@nextui-org/react";
import { useTheme } from "next-themes";
import { MoonIcon, SunIcon } from "lucide-react";

const ThemeSwitch = (props: SwitchProps) => {
  const { theme, setTheme } = useTheme();
  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  const {
    Component,
    slots,
    isSelected,
    getBaseProps,
    getInputProps,
    getWrapperProps,
  } = useSwitch({
    ...props,
    isSelected: theme === "light", // Light theme = switch on
    onChange: toggleTheme, // Toggle theme on switch change
  });
  return (
    <Component {...getBaseProps()}>
      <VisuallyHidden>
        <input {...getInputProps()} />
      </VisuallyHidden>
      <div
        {...getWrapperProps()}
        className={slots.wrapper({
          class: [
            "w-8 h-8 rounded-full",
            "flex items-center justify-center",
            "rounded-lg bg-default-100 hover:bg-default-200",
          ],
          color: "warning",
          size: "sm",
        })}
      >
        {isSelected ? <SunIcon /> : <MoonIcon />}
      </div>
    </Component>
  );
};

export default ThemeSwitch;
