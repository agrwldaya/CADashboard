import React, { useEffect, useState, useRef } from 'react';
import { useTheme } from '../context/themeContext'; // Importing the useTheme hook
import heroBg from '../assets/hero-bg.png'; // Background image
import icon1 from '../assets/happy-clients.svg'; // Icon for Happy Clients
import icon2 from '../assets/complete-projects.svg'; // Icon for Completed Projects
import icon3 from '../assets/hours-support.svg'; // Icon for Hours of Support

const statsData = [
  { value: 232, label: 'Happy Clients', icon: icon1 },
  { value: 521, label: 'Completed Projects', icon: icon2 },
  { value: 453, label: 'Hours of Support', icon: icon3 },
];

const Stats = () => {
  const { darkMode } = useTheme(); // Access darkMode from the context
  const [counts, setCounts] = useState(statsData.map(() => 0));
  const [hasCounted, setHasCounted] = useState(false); // Flag to check if counting has occurred
  const statsRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasCounted) {
          setHasCounted(true); // Trigger counting when the section is in view
        } else if (!entry.isIntersecting && hasCounted) {
          // Reset when the section is no longer in view
          setHasCounted(false);
          setCounts(statsData.map(() => 0)); // Reset the counts
        }
      },
      { threshold: 0.1 } // Trigger when 10% of the section is in view
    );

    if (statsRef.current) {
      observer.observe(statsRef.current); // Observe the stats section
    }

    return () => {
      if (statsRef.current) {
        observer.unobserve(statsRef.current); // Clean up the observer when the component is unmounted
      }
    };
  }, [hasCounted]);

  useEffect(() => {
    if (hasCounted) {
      const timers = statsData.map((stat, index) => {
        const increment = Math.ceil(stat.value / 100); // Increment value for smooth counting
        let current = 0;

        const timer = setInterval(() => {
          current += increment;
          if (current >= stat.value) {
            current = stat.value;
            clearInterval(timer);
          }

          setCounts((prevCounts) => {
            const newCounts = [...prevCounts];
            newCounts[index] = current;
            return newCounts;
          });
        }, 20); // Update every 20ms for smooth animation

        return timer;
      });

      return () => timers.forEach(clearInterval); // Clear timers on unmount
    }
  }, [hasCounted]);

  return (
    <section
      ref={statsRef}
      className="relative text-white py-24 md:py-32 bg-cover bg-center bg-fixed"
      style={{ backgroundImage: `url(${heroBg})` }}
    >
      {/* Translucent Overlay (Darker for dark mode, lighter for light mode) */}
      <div
        className={`absolute inset-0 bg-black ${
          darkMode ? 'bg-opacity-75' : 'bg-opacity-30'
        }`}
      ></div>

      {/* Stats Content */}
      <div className="container relative z-10 mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 text-center gap-12 lg:gap-16 px-6 md:px-12">
        {statsData.map((stat, index) => (
          <div
            key={index}
            className={`opacity-0 transform translate-y-10 transition-all duration-1000 ${
              hasCounted ? 'opacity-100 translate-y-0' : ''
            }`}
            style={{
              animation: `fadeSlideUp 1.5s forwards ${index * 0.4}s`,
            }}
          >
            <div className="bg-transparent mx-auto mb-6">
              <img
                src={stat.icon}
                alt={stat.label}
                className="h-20 w-20 md:h-24 md:w-24 mx-auto bg-transparent"
              />
            </div>
            <h3 className="text-4xl md:text-6xl font-extrabold">{counts[index]}</h3> {/* Animated number */}
            <p className="mt-4 md:mt-6 text-lg md:text-xl">{stat.label}</p> {/* Larger description */}
          </div>
        ))}
      </div>

      {/* Keyframe Animation */}
      <style jsx>{`
        @keyframes fadeSlideUp {
          0% {
            opacity: 0;
            transform: translateY(30px);
          }
          50% {
            opacity: 0.5;
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </section>
  );
};

export default Stats;
