import { createContext, useContext } from "react";

const ThemeContext = createContext();

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};

export const ThemeProvider = ({ children }) => {
  const theme = {
    colors: {
      primary: "#5C2190",
      primaryLight: "#7B3FAE",
      primaryDark: "#4A1A73",
      secondary: "#E5E7EB",
      background: "#F9FAFB",
      white: "#FFFFFF",
      text: {
        primary: "#1F2937",
        secondary: "#6B7280",
        light: "#9CA3AF",
      },
      success: "#10B981",
      warning: "#F59E0B",
      error: "#EF4444",
      info: "#3B82F6",
      chart: {
        green: "#10B981",
        blue: "#3B82F6",
        orange: "#F59E0B",
        purple: "#5C2190",
      },
    },
    shadows: {
      sm: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
      md: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
      lg: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
    },
    borderRadius: {
      sm: "4px",
      md: "8px",
      lg: "12px",
      xl: "16px",
      full: "9999px",
    },
  };

  return (
    <ThemeContext.Provider value={{ theme }}>{children}</ThemeContext.Provider>
  );
};
