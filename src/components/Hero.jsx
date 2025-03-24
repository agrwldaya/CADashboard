import React, { useState, useEffect } from "react";
import { FaTwitter, FaFacebookF, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import heroImage from "../assets/hero-bg.png"; // Adjust the path if necessary
import { useTheme } from "../context/themeContext"; // Import the ThemeContext

const Hero = () => {
  const { darkMode } = useTheme(); // Access darkMode from context
  const [circles, setCircles] = useState([]);

  useEffect(() => {
    // Generate circles with random initial positions
    const generatedCircles = Array(35)
      .fill(0)
      .map(() => ({
        id: Math.random(),
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 6 + 4, // Random size between 4px and 10px
        speedX: (Math.random() - 0.2) * 0.2, // Much slower horizontal speed
        speedY: (Math.random() - 0.2) * 0.2, // Much slower vertical speed
      }));
    setCircles(generatedCircles);

    // Move circles periodically
    const interval = setInterval(() => {
      setCircles((prevCircles) =>
        prevCircles.map((circle) => {
          let newX = circle.x + circle.speedX;
          let newY = circle.y + circle.speedY;

          // Bounce off walls
          if (newX > 100 || newX < 0) circle.speedX *= -1;
          if (newY > 100 || newY < 0) circle.speedY *= -1;

          return {
            ...circle,
            x: Math.min(100, Math.max(0, newX)),
            y: Math.min(100, Math.max(0, newY)),
          };
        })
      );
    }, 120); // Slower update interval for even smoother motion

    return () => clearInterval(interval);
  }, []);

  return (
    <section
      className={`relative bg-cover bg-center text-white py-20 min-h-screen flex items-center justify-center md:justify-end ${
        darkMode ? "bg-black" : "bg-gradient-to-r from-white to-gray-200"
      }`}
      style={{
        backgroundImage: `url(${heroImage})`,
      }}
    >
      {/* Overlay with dynamic opacity based on darkMode */}
      <div
        className={`absolute inset-0 bg-black ${
          darkMode ? "bg-opacity-60" : "bg-opacity-20"
        }`}
      ></div>

      {/* Animated Circles and Lines */}
      <div className="absolute inset-0 overflow-hidden z-0">
        {/* Render Lines Connecting Nearby Circles */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {circles.map((circle1) =>
            circles.map((circle2) => {
              const distance = Math.sqrt(
                Math.pow(circle1.x - circle2.x, 2) + Math.pow(circle1.y - circle2.y, 2)
              );
              if (distance < 8) {
                return (
                  <line
                    key={`${circle1.id}-${circle2.id}`}
                    x1={`${circle1.x}%`}
                    y1={`${circle1.y}%`}
                    x2={`${circle2.x}%`}
                    y2={`${circle2.y}%`}
                    stroke="rgba(150, 150, 255, 0.3)" // Dimmer blue color
                    strokeWidth="0.5"
                  />
                );
              }
              return null;
            })
          )}
        </svg>

        {/* Render Circles */}
        {circles.map((circle) => (
          <div
            key={circle.id}
            className="absolute bg-gray-500 rounded-full"
            style={{
              width: `${circle.size}px`,
              height: `${circle.size}px`,
              top: `${circle.y}%`,
              left: `${circle.x}%`,
            }}
          />
        ))}
      </div>

      {/* Main Content */}
      <div className="w-full md:w-1/2 p-6 md:p-12 text-center md:text-left relative z-10">
        <h1
          className={`text-3xl md:text-5xl font-bold ${
            darkMode ? "text-white" : "text-white"
          }`}
        >
          Delivering Superior Services <span className="text-blue-500">IT Solutions</span>
        </h1>
        <p
          className={`text-sm md:text-lg mt-4 ${
            darkMode ? "text-white-1000" : "text-white-900"
          }`}
        >
          You can easily change any design to your own. It is also highly customizable SEO-friendly template.
        </p>

        {/* Social Media Icons */}
        <div
          className={`flex justify-center md:justify-start space-x-4 mt-6 ${
            darkMode ? "text-blue-300" : "text-blue-500"
          }`}
        >
          <a
            href="#"
            className="hover:text-blue-300 transition duration-300"
            aria-label="Twitter"
          >
            <FaTwitter size={20} />
          </a>
          <a
            href="#"
            className="hover:text-blue-300 transition duration-300"
            aria-label="Facebook"
          >
            <FaFacebookF size={20} />
          </a>
          <a
            href="#"
            className="hover:text-blue-300 transition duration-300"
            aria-label="Instagram"
          >
            <FaInstagram size={20} />
          </a>
          <a
            href="#"
            className="hover:text-blue-300 transition duration-300"
            aria-label="LinkedIn"
          >
            <FaLinkedinIn size={20} />
          </a>
        </div>

        {/* Buttons */}
        {/* <div className="mt-6 flex flex-col md:flex-row justify-center md:justify-start space-y-4 md:space-y-0 md:space-x-4">
          <button className="bg-blue-700 px-8 py-4 rounded-full hover:bg-blue-800">
            Get Quotes
          </button>
          <button className="bg-blue-700 border border-blue-700 px-8 py-4 rounded-full hover:bg-blue-800 hover:border-blue-800">
            Get Started
          </button>
        </div> */}
      </div>
    </section>
  );
};

export default Hero;
