import * as React from "react";
import * as Theme from '../interfaces/Theme'


type ThemeValue = {
  theme: Theme.IThemStyle;
  toggleTheme: () => void;
  themeAlias: string
};

type Themes = {
  [key: string]: Theme.IThemStyle;
};

const ThemeContext = React.createContext<null | ThemeValue>(null);

export function useThemeContext() {
  return React.useContext(ThemeContext);
}

const themes: Themes = {
  light: { color: "#000", background: "#fff" },
  dark: { color: "#fff", background: "#171717" },
};

export default function ThemeProvider({ children }: Theme.IThemeProvider) {
  const [theme, setTheme] = React.useState("light");

  function toggleTheme() {
    setTheme(function changePrevState(prevState) {
      return prevState === "dark" ? "light" : "dark";
    });
  }

  const themeValue: ThemeValue = { theme: themes[theme], toggleTheme, themeAlias: theme };

  return (
    <ThemeContext.Provider value={themeValue}>{children}</ThemeContext.Provider>
  );
}
