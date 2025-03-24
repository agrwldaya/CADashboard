import React from "react";
import { Link } from "react-router-dom";
import { useTheme } from "../context/themeContext";

const ContactUsRedirect = () => {
  const { darkMode } = useTheme();

  return (
    <div
      className={`py-16 px-4 sm:px-8 text-center ${
        darkMode ? "bg-gray-800 text-white" : "bg-gray-50 text-black"
      }`}
    >
      <h2
        className={`text-3xl sm:text-4xl font-normal text-transparent bg-clip-text ${
          darkMode
            ? "bg-gradient-to-r from-gray-400 to-blue-600"
            : "bg-gradient-to-r from-gray-700 to-blue-400"
        }`}
      >
        Contact Us
      </h2>
      <p className="mt-4">
        Have questions or need assistance? Get in touch with us today.
      </p>
      <Link
        to="/contactus"
        className={`inline-block mt-6 px-6 py-3 rounded-full text-lg font-medium ${
          darkMode
            ? "bg-blue-600 hover:bg-blue-700 text-white"
            : "bg-blue-700 hover:bg-blue-800 text-white"
        }`}
      >
        Go to Contact Page
      </Link>
    </div>
  );
};

export default ContactUsRedirect;
