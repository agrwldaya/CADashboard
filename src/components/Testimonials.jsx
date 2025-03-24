import React, { useState } from 'react';

// Example testimonials data
const testimonials = [
  {
    id: 1,
    name: "John Doe",
    role: "Software Engineer",
    imgSrc: require('../assets/profile-1.jpeg'),
    rating: 5,
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  },
  {
    id: 2,
    name: "Jane Smith",
    role: "UX Designer",
    imgSrc: require('../assets/profile-2.jpeg'),
    rating: 4,
    description: "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
  {
    id: 3,
    name: "Emily Davis",
    role: "Project Manager",
    imgSrc: require('../assets/profile-3.jpeg'),
    rating: 5,
    description: "Quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
  },
  {
    id: 4,
    name: "Michael Brown",
    role: "Graphic Designer",
    imgSrc: require('../assets/profile-4.jpeg'),
    rating: 4,
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  },
  {
    id: 5,
    name: "Sarah Wilson",
    role: "Digital Marketer",
    imgSrc: require('../assets/profile-5.jpeg'),
    rating: 5,
    description: "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
  {
    id: 6,
    name: "Alice Green",
    role: "Content Writer",
    imgSrc: require('../assets/profile-6.jpeg'),
    rating: 4,
    description: "Vivamus lacinia odio vitae vestibulum vestibulum.",
  },
];

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const testimonialsPerSlide = 3; // Show exactly 3 testimonials per slide
  const totalSlides = Math.ceil(testimonials.length / testimonialsPerSlide);

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  return (
    <section className="py-16 bg-gray-50 text-center">
      <div className="container mx-auto">
        {/* Title and Subtitle */}
        <h2 className="text-4xl font-bold text-blue-600">Testimonials</h2>
        <p className="text-lg mt-4">Lorem ipsum dolor sit amet</p>

        {/* Carousel */}
        <div className="relative mt-12 overflow-hidden">
          <div
            className="flex transition-transform duration-700 ease-in-out"
            style={{
              transform: `translateX(-${currentIndex * 100}%)`,
              width: `${totalSlides * 100}%`,
            }}
          >
            {Array.from({ length: totalSlides }).map((_, slideIndex) => (
              <div
                key={slideIndex}
                className="flex justify-between w-full flex-shrink-0"
                style={{ width: "50%" }} // Display 3 items at once
              >
                {testimonials
                  .slice(
                    slideIndex * testimonialsPerSlide,
                    slideIndex * testimonialsPerSlide + testimonialsPerSlide
                  )
                  .map((testimonial) => (
                    <div
                      key={testimonial.id}
                      className="bg-white p-4 rounded-lg shadow-lg transition-transform hover:scale-105 w-full flex flex-col justify-between"
                      style={{
                        height: "300px", // Adjust for square-like appearance
                        minWidth: "300px", // Ensures each box has square proportions
                      }}
                    >
                      <div className="flex items-start space-x-4">
                        {/* Profile Image */}
                        <img
                          src={testimonial.imgSrc}
                          alt={testimonial.name}
                          className="h-12 w-12 rounded-full object-cover"
                        />
                        <div>
                          {/* Name and Role */}
                          <h3 className="text-lg font-semibold text-blue-600">
                            {testimonial.name}
                          </h3>
                          <p className="text-sm text-gray-600">{testimonial.role}</p>

                          {/* Rating Stars */}
                          <div className="mt-1">
                            {[...Array(testimonial.rating)].map((_, index) => (
                              <span key={index} className="text-yellow-400">
                                ★
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Testimonial Description */}
                      <div className="mt-4 text-blue-600 text-sm italic">
                        <blockquote>"{testimonial.description}"</blockquote>
                      </div>
                    </div>
                  ))}
              </div>
            ))}
          </div>
        </div>

        {/* Dots Navigation */}
        <div className="mt-8 flex justify-center space-x-3">
          {Array.from({ length: totalSlides }).map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full ${
                currentIndex === index
                  ? "bg-blue-600"
                  : "bg-gray-400 hover:bg-gray-500"
              }`}
            ></button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
