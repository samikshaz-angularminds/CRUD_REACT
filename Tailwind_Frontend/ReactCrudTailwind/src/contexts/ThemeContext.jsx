import { createContext, useEffect, useState } from "react";

const ThemeContext = createContext();

// export const 

function ThemeProvider({ children }) {
  const [theme, setTheme] = useState("");

  useEffect(() => {
    if (theme !== "auto") {
      document.documentElement.dataset.theme = theme;
      return;
    }

    const mediaQuery = window.matchMedia("(prefers-color-scheme:dark)");

    document.documentElement.dataset.theme = mediaQuery.matches
      ? "dark"
      : "light";

    function handleChange(e) {
      document.documentElement.dataset.theme = e.matches ? "dark" : "light";
    }

    mediaQuery.addEventListener("change", handleChange);

    return () => mediaQuery.removeEventListener("change", handleChange);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
