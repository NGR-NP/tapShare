import { createContext, useContext, useEffect, useState } from "react";

type Theme = "dark" | "light" | "system";

type ThemeProviderProps = {
  children: React.ReactNode;
  defaultTheme?: Theme;
  storageKey?: string;
};

type ThemeProviderState = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
};

const initialState: ThemeProviderState = {
  theme: "system",
  setTheme: () => null,
};

const ThemeProviderContext = createContext<ThemeProviderState>(initialState);

function ThemeProvider({
  children,
  defaultTheme = "system",
  storageKey = "tapshare-ui-theme",
  ...props
}: ThemeProviderProps) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const isValidTheme = (value: any): value is Theme => {
    return ["light", "dark", "system"].includes(value);
  };

  const [currentTheme, setCurrentTheme] = useState<Theme>(() => {
    const storedTheme = localStorage.getItem(storageKey);
    return isValidTheme(storedTheme) ? storedTheme : defaultTheme;
  });

  // Function to apply theme directly to the root element
  const applyThemeToDocument = (theme: Theme) => {
    const root = window.document.documentElement;
    root.classList.remove("light", "dark", "system");

    if (theme === "system") {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
        .matches
        ? "dark"
        : "light";
      root.classList.add(systemTheme);
    } else {
      root.classList.add(theme);
    }
  };

  // Apply the theme on initial load
  useEffect(() => {
    applyThemeToDocument(currentTheme);
  }, [currentTheme]);

  useEffect(() => {
    // Function to update theme based on system changes
    const handleSystemThemeChange = (event: MediaQueryListEvent) => {
      if (currentTheme === "system") {
        const newSystemTheme = event.matches ? "dark" : "light";
        applyThemeToDocument(newSystemTheme);
      }
    };

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    // Set initial theme
    applyThemeToDocument(currentTheme);
    // Add event listener for system theme changes
    mediaQuery.addEventListener("change", handleSystemThemeChange);

    return () => {
      mediaQuery.removeEventListener("change", handleSystemThemeChange);
    };
  }, [currentTheme]); // Depend on currentTheme to reapply listeners if needed

  const value = {
    theme: currentTheme,
    setTheme: (newTheme: Theme) => {
      localStorage.setItem(storageKey, newTheme);
      setCurrentTheme(newTheme); // Update the React state
      applyThemeToDocument(newTheme); // Apply immediately
    },
  };

  return (
    <ThemeProviderContext.Provider {...props} value={value}>
      {children}
    </ThemeProviderContext.Provider>
  );
}

const useTheme = () => {
  const context = useContext(ThemeProviderContext);

  if (context === undefined)
    throw new Error("useTheme must be used within a ThemeProvider");

  return context;
};

export { ThemeProvider, useTheme };
