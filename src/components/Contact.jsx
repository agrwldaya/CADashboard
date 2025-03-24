import React from "react";
import { MapPin, Phone, Mail, Clock, Calendar, Users, Microscope } from 'lucide-react';
import { useTheme } from "../context/themeContext";

const LocationSection = () => {
  const { darkMode } = useTheme();
  const coordinates = {
    lat: 22.65548738901509,
    lng: 75.82509144387154
  };

  return (
    <section
      className={`py-16 px-4 mt-20 sm:px-8 ${
        darkMode ? "bg-gray-900 text-gray-100" : "bg-gradient-to-b from-white to-blue-50 text-gray-800"
      }`}
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2
            className={`text-3xl md:text-4xl font-bold mb-4 ${
              darkMode
                ? "text-blue-400"
                : "text-blue-600"
            }`}
          >
            Visit Our Office
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8 items-start">
          {/* Contact Information */}
          <div className="md:col-span-1 space-y-6">
            <div className={`rounded-lg p-6 border shadow-md hover:shadow-lg transition-shadow ${
              darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-blue-100"
            }`}>
              <h3 className={`text-xl font-semibold mb-6 ${darkMode ? "text-blue-400" : "text-blue-600"}`}>
                Contact Details
              </h3>
              <div className="space-y-6">
                <div className="flex items-start gap-3">
                  <MapPin className={`w-6 h-6 ${darkMode ? "text-blue-400" : "text-blue-600"} mt-1 flex-shrink-0`} />
                  <div>
                    <p>14 Mayur Nagar,</p>
                    <p>Indore, Madhya pradesh 452001</p>
                  </div>
                </div>

                <a 
                  href="tel:+919009700131"
                  className={`inline-flex items-center justify-center w-full px-4 py-2 ${
                    darkMode
                      ? "bg-blue-600 hover:bg-blue-700 text-white"
                      : "bg-blue-100 hover:bg-blue-200 text-blue-700"
                  } text-white rounded-lg transition-colors gap-2 mt-4`}
                >
                  <Phone className="w-4 h-4" />
                  Contact US
                </a>
                <a 
                  href="mailto:info@cloudatahub.com"
                  className={`inline-flex items-center justify-center w-full px-4 py-2 ${
                    darkMode
                      ? "bg-blue-600 hover:bg-blue-700 text-white"
                      : "bg-blue-100 hover:bg-blue-200 text-blue-700"
                  } text-white rounded-lg transition-colors gap-2 mt-4`}
                >
                  <Mail className="w-4 h-4" />
                  Email US
                </a>
                <ContactButton 
                  href={`https://www.google.com/maps/dir/?api=1&destination=${coordinates.lat},${coordinates.lng}`} 
                  icon={<MapPin className="w-4 h-4" />} 
                  text="Get Directions" 
                  darkMode={darkMode}
                />
              </div>
            </div>
          </div>

          {/* Map and Exhibition Info */}
          <div className="md:col-span-2">
            <div className={`h-[400px] rounded-lg overflow-hidden border hover:border-blue-200 transition-colors shadow-md hover:shadow-lg ${darkMode ? "border-gray-700" : "border-blue-100"}`}>
              <iframe
                src={`https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d500!2d${coordinates.lng}!3d${coordinates.lat}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjLCsDM5JzE5LjgiTiA3NcKwNDknMzAuMyJF!5e0!3m2!1sen!2sin!4v1673947593027!5m2!1sen!2sin`}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Exhibition Location Map"
              />
            </div>

            {/* Contact Form */}
            <div className="mt-8">
              <h3 className={`text-xl font-semibold mb-4 ${darkMode ? "text-blue-400" : "text-blue-600"}`}>
                Contact Us
              </h3>
              <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                  <InputField type="text" placeholder="Name*" darkMode={darkMode} />
                  <InputField type="email" placeholder="Email*" darkMode={darkMode} />
                </div>

                <InputField type="text" placeholder="Subject" darkMode={darkMode} />

                <textarea
                  placeholder="Your Message"
                  rows={5}
                  className={`w-full px-6 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 ${
                    darkMode ? "bg-gray-800 text-white border-gray-700" : "bg-white border-gray-300"
                  }`}
                ></textarea>

                <button
                  type="submit"
                  className={`w-full py-3 rounded-full ${
                    darkMode ? "bg-blue-600" : "bg-blue-700"
                  } text-white hover:bg-blue-800 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2`}
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const ContactButton = ({ href, icon, text, darkMode }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className={`inline-flex items-center justify-center w-full px-4 py-2 rounded-lg transition-colors gap-2 ${
      darkMode
        ? "bg-blue-600 hover:bg-blue-700 text-white"
        : "bg-blue-100 hover:bg-blue-200 text-blue-700"
    }`}
  >
    {icon}
    {text}
  </a>
);

const InputField = ({ type, placeholder, darkMode }) => (
  <input
    type={type}
    placeholder={placeholder}
    className={`w-full px-6 py-3 border rounded-full focus:outline-none focus:ring-2 focus:ring-blue-400 ${
      darkMode ? "bg-gray-800 text-white border-gray-700" : "bg-white border-gray-300"
    }`}
  />
);

// const ExhibitionInfoCard = ({ icon, title, description, darkMode }) => (
//   <div className={`p-4 rounded-lg ${darkMode ? "bg-gray-800" : "bg-white"} shadow-md`}>
//     <div className="flex items-center mb-2">
//       {React.cloneElement(icon, { className: `${icon.props.className} ${darkMode ? "text-blue-400" : "text-blue-600"}` })}
//       <h4 className={`ml-2 font-semibold ${darkMode ? "text-blue-400" : "text-blue-600"}`}>{title}</h4>
//     </div>
//     <p>{description}</p>
//   </div>
// );

export default LocationSection;

