import React from "react";
import { Link } from "react-router-dom";
import Authentication from "../../../Hooks/Authentication/Authentication";

const CallToAction = () => {
  const {user} = Authentication();
  return (
    <section className="py-16 bg-gradient-to-r  text-white">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-4xl font-bold mb-6">Ready to Boost Your Productivity?</h2>
        <p className="text-lg mb-8">
          Join thousands of users who have streamlined their workflow and achieved their goals faster with our task management platform.
        </p>
        <Link onClick={() => window.scrollTo(0, 0)} to={user ? "/dashboard/allTasks" : "/signUp"}>
        <button
          className="bg-white text-blue-500 font-bold py-3 px-8 rounded-full text-lg shadow-lg transition-transform transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-blue-300"
        >
          Get Started Now
        </button>
        </Link>
      </div>
    </section>
  );
};

export default CallToAction;
