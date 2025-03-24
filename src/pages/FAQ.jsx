import React, { useState } from "react";
import Breadcrumbs from "../components/Breadcrumbs";
import { FaChevronDown, FaChevronUp } from "react-icons/fa"; // Importing icons for toggling answers
import { useTheme } from "../context/themeContext"; // Use ThemeContext for dark mode

const FAQ = () => {
  const { darkMode } = useTheme(); // Get dark mode state from context
  const [open, setOpen] = useState(null); // State for toggling dropdown answers

  const toggleAnswer = (index) => {
    setOpen(open === index ? null : index); // Toggle answer visibility
  };

  const faqData = [
    { question: "What is your service?", answer: "We offer high-quality services." },
    { question: "How do I contact you?", answer: "You can contact us via email or phone." },
    { question: "What is your refund policy?", answer: "We offer a 30-day money-back guarantee." },
    // Add more questions and answers as needed
  ];

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
          <h1 className="text-4xl font-bold sm:text-5xl md:text-6xl">FAQ</h1>
          <p className="text-lg mt-2 sm:text-xl md:text-2xl">Get answers to all your questions about our services, features, and support in one convenient place.</p>
        </div>
      </div>

      {/* Breadcrumbs */}
      <Breadcrumbs current="FAQ" />

      {/* FAQ Section */}
      <div className="container mx-auto px-4 py-8 sm:px-6 md:px-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold sm:text-4xl md:text-4xl">Frequently Asked Questions</h2>
          <p className="text-lg mt-2 sm:text-xl md:text-2xl">Lorem ipsum dolor sit amet</p>
        </div>

        <div>
          {faqData.map((item, index) => (
            <div
              key={index}
              className={`border-b py-4 sm:py-6 md:py-8 ${
                darkMode ? "border-gray-700" : "border-gray-300"
              }`}
            >
              <div
                className={`flex justify-between items-center p-4 rounded-md border ${
                  darkMode
                    ? "bg-gray-800 text-white border-gray-700"
                    : "bg-white text-black border-gray-300"
                }`}
              >
                <h3 className="text-xl font-semibold sm:text-2xl md:text-2xl">{item.question}</h3>
                <div
                  className="cursor-pointer"
                  onClick={() => toggleAnswer(index)}
                >
                  {open === index ? (
                    <FaChevronUp className="text-xl sm:text-2xl md:text-3xl" />
                  ) : (
                    <FaChevronDown className="text-xl sm:text-2xl md:text-3xl" />
                  )}
                </div>
              </div>

              {open === index && (
                <div
                  className={`mt-2 p-4 rounded-md ${
                    darkMode ? "bg-gray-800 text-white" : "bg-white text-black"
                  }`}
                >
                  <p className="text-lg sm:text-xl md:text-2xl">{item.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* <footer className="bg-gray-800 text-white py-6 text-center">
        <p className="text-lg sm:text-xl">© 2025 Cloudatahub. All rights reserved.</p>
      </footer> */}
    </div>
  );
};

export default FAQ;
