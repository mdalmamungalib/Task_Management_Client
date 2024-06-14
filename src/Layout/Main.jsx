import React from "react";
import Navbar from "../SharePage/Navbar/Navbar";
import { Outlet, useLocation } from "react-router-dom";
import Footer from "../SharePage/Footer/Footer";

const Main = () => {
  const location = useLocation();
  const noHeaderFooterRoutes = ["/signUp", "/login"];
  const noHeaderFooter = noHeaderFooterRoutes.some((route) =>
    location.pathname.includes(route)
  );
  return (
    <div
      className="min-h-screen"
      style={{
        backgroundColor: "#1f2937",
        backgroundImage: "linear-gradient(to bottom right,  #4f4f4f, #2d3748)",
        minHeight: "100vh",
      }}
    >
      {!noHeaderFooter && <Navbar />}
      <Outlet />
      {!noHeaderFooter && <Footer />}
    </div>
  );
};

export default Main;
