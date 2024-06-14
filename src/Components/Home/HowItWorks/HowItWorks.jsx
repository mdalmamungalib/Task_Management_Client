import React from "react";
import { FaEdit, FaCheckCircle, FaTasks, FaChartBar } from "react-icons/fa";

const steps = [
  {
    icon: <FaEdit className="text-4xl text-blue-500 mb-4" />,
    title: "Create Tasks",
    description: "Easily create new tasks with detailed descriptions and deadlines.",
  },
  {
    icon: <FaCheckCircle className="text-4xl text-green-500 mb-4" />,
    title: "Assign & Prioritize",
    description: "Assign tasks to team members and set priorities to ensure focus on what matters most.",
  },
  {
    icon: <FaTasks className="text-4xl text-yellow-500 mb-4" />,
    title: "Track Progress",
    description: "Monitor the progress of tasks in real-time and make adjustments as needed.",
  },
  {
    icon: <FaChartBar className="text-4xl text-red-500 mb-4" />,
    title: "Analyze & Improve",
    description: "Use built-in analytics to evaluate performance and identify areas for improvement.",
  },
];

const HowItWorks = () => {
  return (
    <section className="py-16 ">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center text-white mb-12">How It Works</h2>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, index) => (
            <div 
              key={index} 
              className="bg-gray-800 shadow-lg rounded-lg p-8 text-center transform transition duration-300 hover:scale-105"
            >
              <div className="mb-4">{step.icon}</div>
              <h3 className="text-2xl font-semibold mb-4 text-white">{step.title}</h3>
              <p className="text-gray-400">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
