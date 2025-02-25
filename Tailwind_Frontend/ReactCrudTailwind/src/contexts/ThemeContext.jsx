import { createContext, useContext, useEffect, useState } from "react";

export const ThemeContext = createContext();

export const useThemeContext = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "");

  useEffect(() => {
    setSystemThemeToApp();
    console.log("in use context-------> ");

    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  const setSystemThemeToApp = () => {
    const isSystemThemeDark = window.matchMedia("(prefers-color-scheme: dark)");
    const isThemeNull = localStorage.getItem("theme");

    console.log("isSystemThemeDark----- > ", isSystemThemeDark.matches);
    console.log("isThemeNull----> ", isThemeNull);
    if (isThemeNull === null && isSystemThemeDark.matches) {
      console.log("setting dark theme");

      setTheme("dark");
      localStorage.setItem("theme", "dark");
    } else {
      console.log("setting light theme");

      setTheme("light");
      localStorage.setItem("theme", "light");
    }
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
