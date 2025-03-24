import React, { useEffect, useState, useRef } from "react";
import { useTheme } from "../context/themeContext";
import icon1 from "../assets/icon1.svg";
import icon2 from "../assets/icon2.svg";
import icon3 from "../assets/icon3.svg";
import icon4 from "../assets/icon4.svg";
import icon5 from "../assets/icon5.svg";
import icon6 from "../assets/icon6.svg";

const services = [
  { 
    title: "Website Design & Development", 
    description: "We craft visually appealing and user-friendly websites tailored to meet your business needs.", 
    icon: icon1 
  },
  { 
    title: "Reliable Web Hosting", 
    description: "Ensure high uptime and stability for your online presence with our trusted hosting services.", 
    icon: icon2 
  },
  { 
    title: "Virtual Private Servers (VPS)", 
    description: "Flexible and scalable VPS solutions to cater to diverse requirements with top-notch performance.", 
    icon: icon3 
  },
  { 
    title: "Cloud Backup Solutions", 
    description: "Secure your critical data with our advanced cloud backup and recovery services.", 
    icon: icon4 
  },
  { 
    title: "Reseller Hosting", 
    description: "Start your own hosting business with our reliable reseller hosting services.", 
    icon: icon5 
  },
  { 
    title: "Data Security", 
    description: "Protect your online assets with our robust data security measures and fraud prevention solutions.", 
    icon: icon6 
  },
];

const Services = () => {
  const { darkMode } = useTheme();
  const [inView, setInView] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setInView(true);
          } else {
            setInView(false);
          }
        });
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="services-section"
      className={`py-20 ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}
    >
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {services.map((service, index) => (
            <div
              key={index}
              className={`flex flex-col items-center text-center p-8 rounded-lg transition-all duration-300 transform hover:scale-105 ${
                inView
                  ? "animate-slide-up"
                  : ""
              } ${
                darkMode
                  ? "bg-black text-white shadow-lg shadow-blue-500/50"
                  : "bg-white text-gray-800 shadow-lg shadow-gray-400/50"
              }`}
            >
              <img
                src={service.icon}
                alt={service.title}
                className="h-20 w-20 mb-6"
              />
              <h3 className="text-2xl font-semibold mb-4">{service.title}</h3>
              <p className="text-sm">{service.description}</p>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes slideUp {
          0% {
            transform: translateY(50px);
            opacity: 0;
          }
          100% {
            transform: translateY(0);
            opacity: 1;
          }
        }
        .animate-slide-up {
          animation: slideUp 0.8s ease-out;
        }
      `}</style>
    </section>
  );
};

export default Services;
