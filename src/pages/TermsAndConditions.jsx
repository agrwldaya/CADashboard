import React from "react";
import Breadcrumbs from "../components/Breadcrumbs";
import { useTheme } from "../context/themeContext"; // Import the theme context to use dark mode

const TermsAndConditions = () => {
  const { darkMode } = useTheme(); // Get dark mode state from context

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
          <h1 className="text-4xl font-bold sm:text-5xl md:text-6xl">Terms & Conditions</h1>
          <p className="text-lg mt-2 sm:text-xl md:text-2xl">
          Our terms outline the guidelines and obligations for using our services, ensuring a transparent and fair experience for all.
          </p>
        </div>
      </div>

      {/* Breadcrumbs */}
      <Breadcrumbs current="Terms & Conditions" />

      {/* Terms & Conditions Content */}
      <div className="container mx-auto px-4 py-8 sm:px-6 md:px-8">
        {/* First Section */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-4 sm:text-4xl">Introduction</h2>
          <p className="text-lg sm:text-xl">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras luctus velit at eros varius, nec tristique ligula viverra.
            Aliquam erat volutpat. Vivamus quis turpis lectus. Integer sit amet sapien at magna auctor varius ac in enim. Nam
            fermentum, sapien non blandit fermentum, elit nulla interdum urna, at consectetur libero lorem vel arcu. Proin sed
            lectus orci. Phasellus at nunc vitae ligula consequat feugiat.
          </p>
        </div>

        {/* Second Section */}
        <div>
          <h2 className="text-3xl font-bold mb-4 sm:text-4xl">User Responsibilities</h2>
          <p className="text-lg sm:text-xl">
            Suspendisse potenti. Proin ut gravida purus. In viverra orci et neque pharetra, sit amet efficitur elit iaculis. Integer
            non dolor vitae nunc tincidunt feugiat eget a libero. Nam maximus dui sit amet nulla fermentum, sed tempor lorem
            vestibulum. Nam volutpat tristique vehicula. Morbi fringilla nulla a libero maximus, non gravida mi dapibus.
          </p>
        </div>
      </div>

      {/* Footer */}
      {/* <footer
        className={`py-6 text-center ${
          darkMode ? "bg-gray-800 text-white" : "bg-white text-black border-t border-gray-300"
        }`}
      >
        <p>© 2025 Cloudatahub. All rights reserved.</p>
      </footer> */}
    </div>
  );
};

export default TermsAndConditions;
