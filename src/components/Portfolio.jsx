import React, { useState } from 'react';

const portfolioItems = [
  { id: 1, category: 'App Design', imgSrc: require('../assets/portfolio-1.jpg') },
  { id: 2, category: 'App Design', imgSrc: require('../assets/portfolio-2.jpg') },
  { id: 3, category: 'App Development', imgSrc: require('../assets/portfolio-3.jpg') },
  { id: 4, category: 'Branding', imgSrc: require('../assets/portfolio-4.jpg') },
  { id: 5, category: 'IT Solutions', imgSrc: require('../assets/portfolio-5.jpg') },
  { id: 6, category: 'IT Solutions', imgSrc: require('../assets/portfolio-6.jpg') },
];

const Portfolio = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredItems = selectedCategory === 'All' 
    ? portfolioItems 
    : portfolioItems.filter(item => item.category === selectedCategory);

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto text-center">
        <h2 className="text-4xl font-bold text-blue-600">Our Portfolio</h2>
        <p className="text-lg mt-4">Lorem ipsum dolor sit amet</p>

        {/* Category Buttons */}
        <div className="mt-8 mb-12">
          <button 
            className="bg-blue-600 text-white px-6 py-2 rounded-full mx-2 hover:bg-blue-700"
            onClick={() => setSelectedCategory('All')}
          >
            All
          </button>
          <button 
            className="bg-blue-600 text-white px-6 py-2 rounded-full mx-2 hover:bg-blue-700"
            onClick={() => setSelectedCategory('App Design')}
          >
            App Design
          </button>
          <button 
            className="bg-blue-600 text-white px-6 py-2 rounded-full mx-2 hover:bg-blue-700"
            onClick={() => setSelectedCategory('App Development')}
          >
            App Development
          </button>
          <button 
            className="bg-blue-600 text-white px-6 py-2 rounded-full mx-2 hover:bg-blue-700"
            onClick={() => setSelectedCategory('Branding')}
          >
            Branding
          </button>
          <button 
            className="bg-blue-600 text-white px-6 py-2 rounded-full mx-2 hover:bg-blue-700"
            onClick={() => setSelectedCategory('IT Solutions')}
          >
            IT Solutions
          </button>
        </div>

        {/* Portfolio Images */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredItems.map(item => (
            <div
              key={item.id}
              className="portfolio-item opacity-0 transform translate-y-10 transition-all duration-700"
              style={{
                animation: `fadeIn 1s forwards ${item.id * 0.2}s`,
              }}
            >
              <img
                src={item.imgSrc}
                alt={`Portfolio ${item.id}`}
                className="w-full h-64 object-cover rounded-lg shadow-lg"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Adding custom styles for animation */}
      <style jsx>{`
        @keyframes fadeIn {
          0% {
            opacity: 0;
            transform: translateY(30px);
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

export default Portfolio;
