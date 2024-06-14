import React from "react";
import { FaHome, FaTasks, FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";
import { Link, Outlet } from "react-router-dom";
import Authentication from "../Hooks/Authentication/Authentication";
import { CgLogIn } from "react-icons/cg";
import Swal from "sweetalert2";
import Loading from "../SharePage/Loading/Loading";

const Dashboard = () => {
  const { user, loading, logOut } = Authentication();

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

  if(loading){
    return <Loading/>
  }
  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content  p-4">
        <div className="flex justify-end mt-5 mr-2">
          <label
            htmlFor="my-drawer-2"
            className="btn border-none bg-slate-600 drawer-button
                     lg:hidden text-2xl text-white"
          >
            <GiHamburgerMenu />
          </label>
        </div>
        {/* Page content here */}
        <div className="flex flex-col justify-center items-center p-5 ">
          <Outlet></Outlet>
        </div>
      </div>
      <div className="drawer-side">
        <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
        <ul className="menu p-4 w-80 bg-gray-800 text-white min-h-full">
          {/* profile */}
          <div className="dropdown dropdown-center ml-10">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full">
                {user?.photoURL ? (
                  <img
                    alt="Tailwind CSS Navbar component"
                    src={user?.photoURL}
                  />
                ) : (
                  <img
                    alt="Tailwind CSS Navbar component"
                    src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
                  />
                )}
              </div>
            </div>
            <ul
              tabIndex={0}
              className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52"
            >
              <li>
                <a className="justify-between">
                  {user?.displayName}
                  
                </a>
              </li>
              <li>
              <Link onClick={handleLogOut} to={"/signUp"}>
            <CgLogIn className="text-3xl" aria-label="Login" />
            <a>Logout</a>
          </Link>
              </li>
            </ul>
          </div>
          <li
            onClick={() => window.scrollTo(0, 0)}
            className="text-lg font-semibold mb-6"
          >
            <a href="/" className="flex items-center">
              <FaHome className="mr-3" /> Home
            </a>
          </li>
          <li
            onClick={() => window.scrollTo(0, 0)}
            className="text-lg font-semibold mb-6"
          >
            <Link to={"/dashboard/allTasks"}>
              <a href="/tasks" className="flex items-center">
                <FaTasks className="mr-3" />
                All Tasks
              </a>
            </Link>
          </li>
          <li
            onClick={() => window.scrollTo(0, 0)}
            className="text-lg font-semibold mb-6"
          >
            <Link to={"/dashboard/completedTask"}>
              <a className="flex items-center">
                <FaCheckCircle className="mr-3" /> Completed Tasks
              </a>
            </Link>
          </li>
          <li
            onClick={() => window.scrollTo(0, 0)}
            className="text-lg font-semibold mb-6"
          >
            <Link to={"/dashboard/inCompletedTask"}>
              <a className="flex items-center">
                <FaTimesCircle className="mr-3" /> In Completed Tasks
              </a>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;
