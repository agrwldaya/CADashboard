import React, { createContext, useContext, useState, useEffect } from "react";

// Get the initial dark mode state from localStorage or default to light mode
const getInitialMode = () => {
  const savedMode = localStorage.getItem("darkMode");
  return savedMode ? JSON.parse(savedMode) : false;
};

// Toggle the dark mode state and save to localStorage
const toggleDarkMode = (currentMode) => {
  const newMode = !currentMode;
  localStorage.setItem("darkMode", JSON.stringify(newMode)); // Save mode in localStorage
  return newMode;
};

// Create a Context for Dark Mode
const ThemeContext = createContext();

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }) => {
  const [darkMode, setDarkMode] = useState(getInitialMode());

  // Handle dark mode state change
  const handleToggle = () => {
    setDarkMode((prevMode) => toggleDarkMode(prevMode));
  };

  // Provide darkMode and handleToggle to the rest of the app
  return (
    <ThemeContext.Provider value={{ darkMode, handleToggle }}>
      {children}
    </ThemeContext.Provider>
  );
};
