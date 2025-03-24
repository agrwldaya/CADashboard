import React from "react";
import p1 from "../assets/icons/coding.png";
import p2 from "../assets/icons/engineer.png";
import p3 from "../assets/icons/bloggig.png";
import p4 from "../assets/icons/expert.png";
import p5 from "../assets/icons/network.png";

const LandingPage = () => {
  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-2 gap-8 p-4 md:p-8">
      {/* Top Left */}
      <div className="p-6">
        <h1 className="text-3xl md:text-4xl font-bold text-center md:text-left">
          Quality A <span className="text-blue-600">Way To Magnificence</span>
        </h1>
      </div>

      {/* Top Right */}
      <div className="p-6">
        <p className="text-gray-700 text-center md:text-left">
          <span className="font-semibold">Cloudata hub</span> laid its foundation in the year <span className="font-semibold">2017 in Indore</span> of India as a proprietor firm and <span className="font-semibold">Cloudata hub</span> is sincerely committed to achieve customer delight and enhance customer relation by providing the highest level of quality products through the means of Aspiration, Innovation, & Technology for professionals like Chartered Accountants, Company Secretaries, Human Resource Managers & many more. Due to this success mantra we achieved clientage of more than <span className="font-semibold">6000</span> customers all across the India and still counting on.
        </p>
      </div>

      {/* Bottom Left */}
      <div className="p-6">
        <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center md:text-left">
          We Believe It's The <span className="text-blue-600">Quality Not The Cost</span> That Defines A Product
        </h2>
        <p className="text-gray-700 text-center md:text-left">
          Our all the products are overbrimed with our hard work and honesty as a result all the products are convenient for our client's pocket and professionally surpassing. The company has manpower strength of around 150 team members which consist of Developers, Marketing, Support and Administration, Logistics. We have built up a large team of technical support staff that is trained professionally just to take care of our clients and to deliver them with professional & technical care. We are focused on technical innovation that delivers real value and cost savings, fast working products. You can rely on us to meet just about any IT management need with our smart, award-winning products and time-saving services. Whether you are working with Windows, databases and applications, or in physical, virtual or cloud environments - you're covered. Our team of professionals works in cohesive manner in order to achieve the goal of the organization. They are also trained as per the requirement, which ensures the skills & capabilities of employees.
        </p>
      </div>

      {/* Bottom Right */}
      <div className="p-6">
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {/* Engineer Card */}
          <div className="bg-blue-50 p-4 rounded-lg flex flex-col items-center justify-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-2">
              <img src={p1} className="w-12 h-12 text-blue-600" alt="Engineer" />
            </div>
            <span className="font-medium text-center">Engineer</span>
          </div>

          {/* Technicians Card */}
          <div className="bg-blue-50 p-4 rounded-lg flex flex-col items-center justify-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-2">
              <img src={p2} className="w-12 h-12 text-blue-600" alt="Technicians" />
            </div>
            <span className="font-medium text-center">Technicians</span>
          </div>

          {/* Designers Card */}
          <div className="bg-blue-50 p-4 rounded-lg flex flex-col items-center justify-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-2">
              <img src={p3} className="w-12 h-12 text-blue-600" alt="Designers" />
            </div>
            <span className="font-medium text-center">Designers</span>
          </div>

          {/* Quality Auditors Card */}
          <div className="bg-blue-50 p-4 rounded-lg flex flex-col items-center justify-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-2">
              <img src={p4} className="w-12 h-12 text-blue-600" alt="Quality Auditors" />
            </div>
            <span className="font-medium text-center">Quality Auditors</span>
          </div>

          {/* Skilled Manpower Card */}
          <div className="bg-blue-50 p-4 rounded-lg flex flex-col items-center justify-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-2">
              <img src={p5} className="w-12 h-12 text-blue-600" alt="Skilled Manpower" />
            </div>
            <span className="font-medium text-center">Skilled Manpower</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;