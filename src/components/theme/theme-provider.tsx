import { ThemeProvider as BaseThemeProvider } from "next-themes";
import { ReactNode } from "react";

type ThemeProviderProps = {
  children: ReactNode;
};

const ThemeProvider = ({ children }: ThemeProviderProps) => {
  return (
    <BaseThemeProvider defaultTheme="system" attribute={"class"} enableColorScheme>
      {children}
    </BaseThemeProvider>
  );
};
export { ThemeProvider };
