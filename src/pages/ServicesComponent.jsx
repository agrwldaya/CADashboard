import React from "react";
import { useTheme } from "../context/themeContext"; // Import the theme context to use dark mode
import Services from "../components/Services"; // Import Services component
import Breadcrumbs from "../components/Breadcrumbs"; // Assuming this is your Breadcrumbs component

const ServicesComponent = () => {
  const { darkMode } = useTheme(); // Get darkMode from context

  return (
    <div className={darkMode ? "bg-gray-900 text-white" : "bg-white text-black"}>
      {/* Hero Section */}
      <div
        className="relative bg-cover bg-center h-64 sm:h-80 md:h-96 flex items-center justify-center"
        style={{
          backgroundImage: `url(${require("../assets/hero-bg.png")})`, // Ensure correct image path
        }}
      >
        {/* Transparent Overlay */}
        <div
          className={`absolute inset-0 ${
            darkMode
              ? "bg-black/70" // Darker overlay in dark mode
              : "bg-white/10" // Brighter overlay in light mode
          }`}
        ></div>
        <div className="relative z-10 text-center">
          <h1 className="text-4xl font-bold sm:text-5xl md:text-6xl">Our Services</h1>
          <p className="text-lg mt-2 sm:text-xl md:text-2xl">
            Delivering top-notch web design, hosting, VPS, cloud backup, and data security solutions tailored to your needs.
          </p>
        </div>
      </div>

      {/* Breadcrumbs */}
      <Breadcrumbs current="Services" />

      {/* Services Content */}
      <div className="container mx-auto px-4 py-8 sm:px-6 md:px-8">
        <Services /> {/* Here is where we display the services */}
      </div>
    </div>
  );
};

export default ServicesComponent;
