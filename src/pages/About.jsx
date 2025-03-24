import React from "react";
import Breadcrumbs from "../components/Breadcrumbs";
import WhyChooseUs from "../components/WhyChooseUs";
import { useTheme } from "../context/themeContext"; // Import the theme context to use dark mode

const About = () => {
  const { darkMode } = useTheme(); // Get darkMode from context

  return (
    <div className={darkMode ? "bg-gray-900 text-white" : "bg-white text-black"}>
      {/* Hero Section */}
      <div
        className="relative bg-cover bg-center h-64 flex items-center justify-center"
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
          <h1 className="text-4xl font-bold sm:text-5xl md:text-6xl">About Us</h1>
          <p className="text-lg mt-2 sm:text-xl md:text-2xl">
            Empowering businesses with cutting-edge web solutions, reliable hosting, and secure cloud services to drive success online.
          </p>
        </div>
      </div>

      {/* Breadcrumbs */}
      <Breadcrumbs current="About" />

      {/* Services Content */}
      <div className="container mx-auto px-4 py-8 sm:px-6 md:px-8">
        <WhyChooseUs />
      </div>
    </div>
  );
};

export default About;
