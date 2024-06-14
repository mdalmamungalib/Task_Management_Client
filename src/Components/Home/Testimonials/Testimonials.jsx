import React from "react";

const testimonials = [
  {
    name: "John Doe",
    image: "https://randomuser.me/api/portraits/men/1.jpg",
    quote: "This platform has completely transformed the way I manage my tasks. It's intuitive and efficient!",
  },
  {
    name: "Jane Smith",
    image: "https://randomuser.me/api/portraits/women/1.jpg",
    quote: "I love the collaboration features. It has made working with my team so much easier.",
  },
  {
    name: "Michael Johnson",
    image: "https://randomuser.me/api/portraits/men/2.jpg",
    quote: "The analytics and insights provided by this platform are invaluable. Highly recommend it!",
  },
  {
    name: "Emily Davis",
    image: "https://randomuser.me/api/portraits/women/2.jpg",
    quote: "This task management platform is a game-changer. It helps me stay organized and productive.",
  },
];

const Testimonials = () => {
  return (
    <section className="py-12 ">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-white mb-8">Testimonials</h2>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index} 
              className="bg-gray-800 shadow-lg rounded-lg p-8 text-center transform transition duration-300 hover:scale-105"
              
            >
              <img
                className="w-24 h-24 rounded-full mx-auto mb-4"
                src={testimonial.image}
                alt={testimonial.name}
              />
              <blockquote className="italic mb-4">"{testimonial.quote}"</blockquote>
              <p className="font-semibold">{testimonial.name}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
