import React, { useEffect, useState } from 'react';
import { useTheme } from '../context/themeContext';
import featuresImage from '../assets/features.jpg';
import icon1 from '../assets/icon-1.svg';
import icon2 from '../assets/icon-2.svg';
import icon3 from '../assets/icon-3.svg';
import icon4 from '../assets/icon-4.svg';
import icon5 from '../assets/icon-5.svg';
import icon6 from '../assets/icon-6.svg';

const reasons = [
  { 
    title: 'Experience',
    description: 'Years of industry expertise and proven track record',
    icon: icon1 
  },
  { 
    title: 'Products',
    description: 'High-quality solutions tailored to your needs',
    icon: icon2 
  },
  { 
    title: 'Approach',
    description: 'Customer-centric methodology for best results',
    icon: icon3 
  },
  { 
    title: 'Pricing',
    description: 'Competitive rates with transparent pricing',
    icon: icon4 
  },
  { 
    title: 'Delivery',
    description: 'Timely completion and professional deployment',
    icon: icon5 
  },
  { 
    title: 'Support',
    description: '24/7 dedicated customer support team',
    icon: icon6 
  },
];

const ReasonCard = ({ reason, index, inView, isLeft, darkMode }) => {
  const baseCardClasses = `
    p-6 rounded-xl flex items-center gap-4
    transform transition-all duration-700
    hover:scale-105 hover:shadow-xl
    w-full max-w-md mx-auto
    ${darkMode ? 'bg-gray-800/90 text-white shadow-lg shadow-blue-500/20' : 'bg-white text-gray-800 shadow-lg shadow-gray-200'}
  `;

  const animationClasses = `
    ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}
    delay-${300 + index * 100}
  `;

  return (
    <div className={`${baseCardClasses} ${animationClasses}`}>
      {isLeft ? (
        <>
          <div className="flex-1">
            <h3 className="text-xl font-semibold mb-2">{reason.title}</h3>
            <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              {reason.description}
            </p>
          </div>
          <img
            src={reason.icon}
            alt={reason.title}
            className="h-16 w-16 object-contain"
          />
        </>
      ) : (
        <>
          <img
            src={reason.icon}
            alt={reason.title}
            className="h-16 w-16 object-contain"
          />
          <div className="flex-1">
            <h3 className="text-xl font-semibold mb-2">{reason.title}</h3>
            <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              {reason.description}
            </p>
          </div>
        </>
      )}
    </div>
  );
};

const WhyChooseUs = () => {
  const { darkMode } = useTheme();
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setInView(entry.isIntersecting);
      },
      { 
        threshold: 0.1,
        rootMargin: '50px'
      }
    );

    const section = document.querySelector('#why-choose-us');
    if (section) observer.observe(section);

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="why-choose-us"
      className={`py-20 px-4 sm:px-6 lg:px-8 overflow-hidden ${
        darkMode ? 'bg-gray-900' : 'bg-gray-50'
      }`}
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2
            className={`text-4xl sm:text-5xl font-bold mb-6 transition-all duration-700
              ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}
              ${darkMode 
                ? 'bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent' 
                : 'bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent'
              }`}
          >
            Why Choose Us
          </h2>
          <p
            className={`text-lg max-w-2xl mx-auto transition-all duration-700 delay-200
              ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}
              ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}
          >
            Discover the key factors that set us apart and make us your ideal partner for success
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 items-center">
          {/* Left Column */}
          <div className="space-y-6">
            {reasons.slice(0, 3).map((reason, index) => (
              <ReasonCard
                key={reason.title}
                reason={reason}
                index={index}
                inView={inView}
                isLeft={true}
                darkMode={darkMode}
              />
            ))}
          </div>

          {/* Center Image */}
          <div className="flex justify-center py-8 lg:py-0">
            <div
              className={`relative transition-all duration-1000 delay-500
                ${inView ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}
              `}
            >
              <div className={`
                w-64 h-64 sm:w-80 sm:h-80 rounded-full overflow-hidden
                ${darkMode ? 'shadow-2xl shadow-blue-500/30' : 'shadow-2xl shadow-gray-300/50'}
              `}>
                <img
                  src={featuresImage}
                  alt="Features"
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                />
              </div>
              <div className={`
                absolute inset-0 rounded-full
                ${darkMode ? 'bg-gradient-to-tr from-blue-500/20 to-purple-500/20' : 'bg-gradient-to-tr from-blue-500/10 to-purple-500/10'}
              `}/>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {reasons.slice(3).map((reason, index) => (
              <ReasonCard
                key={reason.title}
                reason={reason}
                index={index + 3}
                inView={inView}
                isLeft={false}
                darkMode={darkMode}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;