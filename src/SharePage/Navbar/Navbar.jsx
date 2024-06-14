import React from "react";
import { CgLogIn } from "react-icons/cg";
import { Link } from "react-router-dom";
import Authentication from "../../Hooks/Authentication/Authentication";
import Swal from "sweetalert2";

const Navbar = () => {
  const { user, logOut } = Authentication();
  const handleLogOut = () => {
    logOut()
      .then(() => {
        Swal.fire({
          position: "center",
          icon: "error",
          title: "You have logged out! Please Log In",
          showConfirmButton: false,
          timer: 2500,
        });
      })
      .catch((error) => {
        console.log(error?.message);
      });
  };
  const navOption = (
    <>
      <li onClick={() => window.scrollTo(0, 0)}>
        <Link to={"/"}>
          <a>Home</a>
        </Link>
      </li>
      <li onClick={() => window.scrollTo(0, 0)}>
        <Link to={"/dashboard/allTasks"}>
          <a>Dash Board</a>
        </Link>
      </li>
      <li className="flex items-center ">
        {user ? (
          <Link onClick={handleLogOut} to={"/signUp"}>
            <CgLogIn className="text-3xl" aria-label="Login" />
            <a>Logout</a>
          </Link>
        ) : (
          <Link to={"/signUp"}>
            <CgLogIn className="text-3xl" aria-label="Login" />
            <a>Login</a>
          </Link>
        )}
      </li>
    </>
  );
  return (
    <div className="max-w-screen-2xl mx-auto ">
      <nav
        className="navbar fixed z-10 bg-opacity-0 text-white max-w-screen-2xl
       sm:mt-5"
      >
        <div className="navbar-start w-full">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-54 bg-opacity-5 text-2xl">
              {navOption}
            </ul>
          </div>
          <Link to={"/"}>
            <a className="btn btn-ghost text-xl">Task Manager</a>
          </Link>
        </div>
        <div className="navbar-end hidden lg:flex justify-end items-center">
          <ul className="menu menu-horizontal px-1 text-xl">{navOption}</ul>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
