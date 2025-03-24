import React from "react";
import { useTheme } from "../context/themeContext"; // Importing the useTheme hook
import client1 from "../assets/client-1.png";
import client2 from "../assets/client-2.png";
import client3 from "../assets/client-3.png";
import client4 from "../assets/client-4.png";
import client5 from "../assets/client-5.png";
import client6 from "../assets/client-6.png";
import client7 from "../assets/client-7.png";
import client8 from "../assets/client-8.png";

const ClientLogos = () => {
  const { darkMode } = useTheme(); // Access darkMode from the context

  return (
    <section
      className={`py-20 ${
        darkMode ? "bg-gray-900" : "bg-white" // Conditional background color based on dark mode
      }`}
    >
      <div className="container mx-auto">
        <div className="overflow-hidden">
          <div className="flex animate-logo-slide space-x-6 sm:space-x-10">
            {/* All logos in one row with duplication for smooth rotation */}
            <img src={client1} alt="Client 1" className="h-16 sm:h-20 md:h-24 mx-auto" />
            <img src={client2} alt="Client 2" className="h-16 sm:h-20 md:h-24 mx-auto" />
            <img src={client3} alt="Client 3" className="h-16 sm:h-20 md:h-24 mx-auto" />
            <img src={client4} alt="Client 4" className="h-16 sm:h-20 md:h-24 mx-auto" />
            <img src={client5} alt="Client 5" className="h-16 sm:h-20 md:h-24 mx-auto" />
            <img src={client6} alt="Client 6" className="h-16 sm:h-20 md:h-24 mx-auto" />
            <img src={client7} alt="Client 7" className="h-16 sm:h-20 md:h-24 mx-auto" />
            <img src={client8} alt="Client 8" className="h-16 sm:h-20 md:h-24 mx-auto" />

            {/* Duplicated logos to create seamless scrolling */}
            <img src={client1} alt="Client 1" className="h-16 sm:h-20 md:h-24 mx-auto" />
            <img src={client2} alt="Client 2" className="h-16 sm:h-20 md:h-24 mx-auto" />
            <img src={client3} alt="Client 3" className="h-16 sm:h-20 md:h-24 mx-auto" />
            <img src={client4} alt="Client 4" className="h-16 sm:h-20 md:h-24 mx-auto" />
            <img src={client5} alt="Client 5" className="h-16 sm:h-20 md:h-24 mx-auto" />
            <img src={client6} alt="Client 6" className="h-16 sm:h-20 md:h-24 mx-auto" />
            <img src={client7} alt="Client 7" className="h-16 sm:h-20 md:h-24 mx-auto" />
            <img src={client8} alt="Client 8" className="h-16 sm:h-20 md:h-24 mx-auto" />
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes logoSlide {
          0% {
            transform: translateX(100%); /* Start from the right */
          }
          100% {
            transform: translateX(-100%); /* Move to the left */
          }
        }

        .animate-logo-slide {
          animation: logoSlide 60s linear infinite; /* Slow down the animation */
        }
      `}</style>
    </section>
  );
};

export default ClientLogos;
