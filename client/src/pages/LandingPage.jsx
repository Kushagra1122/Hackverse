import React from 'react'

const LandingPage = () => {
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-500 to-teal-400 text-white py-20 px-5 text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-5">
          Empower Your Learning Journey
        </h1>
        <p className="text-lg md:text-2xl mb-10">
          Discover courses, tools, and resources to unlock your potential.
        </p>
        <div className="flex justify-center gap-4">
          <button className="bg-white text-blue-600 px-6 py-3 rounded-lg font-medium hover:bg-gray-100">
            Get Started
          </button>
          <button className="bg-blue-600 px-6 py-3 rounded-lg font-medium hover:bg-blue-700">
            Explore Courses
          </button>
        </div>
      </section>
     

      {/* Testimonials Section */}
      <section className="py-20 px-5 bg-gray-100 text-center">
        <h2 className="text-3xl font-bold mb-10 text-gray-800">
          Hear from Our Learners
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          {[
            {
              name: "Alice Johnson",
              quote: "This platform transformed the way I learn!",
            },
            {
              name: "Michael Brown",
              quote: "The courses are practical and easy to follow.",
            },
          ].map((testimonial, index) => (
            <div
              key={index}
              className="bg-white shadow-md p-6 rounded-lg hover:shadow-lg"
            >
              <p className="italic text-gray-600 mb-4">"{testimonial.quote}"</p>
              <h4 className="font-bold text-blue-600">{testimonial.name}</h4>
            </div>
          ))}
        </div>
      </section>

      {/* Call to Action */}
    
    </div>
  );
}

export default LandingPage
