import React from "react";
import { Link } from "react-router-dom";
import Authentication from "../../../Hooks/Authentication/Authentication";

const Banner = () => {
  const {user} = Authentication();
  return (
    <div
      className="hero min-h-screen"
      style={{
        backgroundImage:
          "url(https://images.pexels.com/photos/5940841/pexels-photo-5940841.jpeg?auto=compress&cs=tinysrgb&w=600)",
      }}
    >
      <div className="hero-overlay bg-opacity-60"></div>
      <div className="hero-content text-center text-neutral-content">
        <div className="max-w-md">
          <h1 className="mb-5 text-5xl font-bold">Hello there</h1>
          <p className="mb-5">
          Discover a Revolutionary Task Management Platform - Designed to Simplify Your Workflow, Streamline Collaboration, and Supercharge Productivity. Unlock the Power of Efficient Task Management, Stay Organized, and Achieve Your Goals Faster. Explore Now and Take Your Productivity to New Heights!
          </p>
          <Link onClick={() => window.scrollTo(0, 0)} to={user ? "/dashboard/allTasks" : "/signUp"}>
          <button 
            className="btn border-none text-lg font-bold py-3 px-8 transition duration-300 ease-in-out transform hover:bg-gray-700 hover:text-white focus:outline-none focus:ring focus:ring-gray-400"
            style={{ 
              backgroundColor: "#2d3748", // Adjusted to match the background color
              color: "#f0f0f0", // Light text color for better contrast
            }}
          >
            Let's Explore
          </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Banner;
