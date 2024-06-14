import React from "react";
import { FaTasks, FaRegCalendarCheck, FaUsers, FaChartLine } from "react-icons/fa";

const Features = () => {
  const features = [
    {
      icon: <FaTasks className="text-4xl text-blue-500" />,
      title: "Task Management",
      description: "Easily create, organize, and manage your tasks with our intuitive interface.",
    },
    {
      icon: <FaRegCalendarCheck className="text-4xl text-green-500" />,
      title: "Calendar Integration",
      description: "Sync your tasks with your calendar to never miss a deadline.",
    },
    {
      icon: <FaUsers className="text-4xl text-yellow-500" />,
      title: "Collaboration",
      description: "Collaborate with your team in real-time and track progress together.",
    },
    {
      icon: <FaChartLine className="text-4xl text-red-500" />,
      title: "Analytics",
      description: "Get detailed insights and analytics to improve your productivity.",
    },
  ];

  return (
    <section className="py-12 ">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl text-white font-bold text-center mb-8">Features</h2>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => (
            <div key={index} className="bg-gray-800 shadow-lg rounded-lg p-8 text-center transform transition duration-300 hover:scale-105" >
              <div className="mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-400">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
