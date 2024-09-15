import { NextUIProvider } from "@nextui-org/react";
import { TProviderProps } from "./lib/Type/CommonTypes";

import { ThemeProvider as NextThemesProvider } from "next-themes";

export default function Provider({ children }: TProviderProps) {
  return (
    <NextUIProvider>
      <NextThemesProvider attribute="class" defaultTheme="dark">
        {children}
      </NextThemesProvider>
    </NextUIProvider>
  );
}
