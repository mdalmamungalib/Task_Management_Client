import React, { useState } from "react";
import { useForm } from "react-hook-form";

import "@fortawesome/fontawesome-free/css/all.min.css";
import SocialLogin from "../../../SharePage/SocialLogin/SocialLogin";
import Authentication from "../../../Hooks/Authentication/Authentication";
import Swal from "sweetalert2";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Loading from "../../../SharePage/Loading/Loading";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { loading, resetPassword, loginUser } = Authentication();
  const [userEmail, setUserEmail] = useState("");

  const location = useLocation();
  const navigate = useNavigate();
  const form = "/dashboard/allTasks";

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    loginUser(data.email, data.password)
      .then((result) => {
        const user = result.user;
        Swal.fire({
          position: "center",
          title: "Login Successful!",
          text: `Welcome ${user.displayName}`,
          icon: "success",
          showConfirmButton: false,
          timer: 1500,
        });
        navigate(form, { replace: true });
      })
      .catch((error) => console.log(error.message));
  };

  // Forget Password
  const handleForgetPassword = () => {
    resetPassword(userEmail)
      .then(() => {
        alert("Please check your email to reset your password.");
      })
      .catch((error) => console.log(error));
  };

  const password = watch("password");
  if(loading){
    return <Loading/>
  }

  return (
    <div className="flex items-center justify-center min-h-screen ">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">
          Sign up for an account
        </h2>
        <SocialLogin />
        <div className="divider">OR</div>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 text-left"
            >
              Email
            </label>
            <input
              type="email"
              
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                  message: "Enter a valid email address",
                },
              })}
              onBlur={(event) => setUserEmail(event.target.value)}
              className="mt-1 bg-white block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-slate-600"
            />
            {errors.email && (
              <p className="text-red-500 text-left text-xs mt-1">
                {errors.email.message}
              </p>
            )}
          </div>
          <div className="relative">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 text-left"
            >
              Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters long",
                },
              })}
              className="mt-1 bg-white block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-slate-600"
            />
            {errors.password && (
              <p className="text-red-500 text-left text-xs mt-1">
                {errors.password.message}
              </p>
            )}
          </div>
          <label className="label">
            <Link
              onClick={handleForgetPassword}
              className="label-text-alt text-slate-400 font-bold"
            >
              Forgot password?
            </Link>
          </label>

          <div
            className="form-control text-left"
            onClick={() => setShowPassword(!showPassword)}
          >
            <label className="label justify-stretch cursor-pointer gap-2">
              <span className="label-text">Show Password</span>
              <input type="checkbox" className="checkbox" />
            </label>
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 bg-indigo-600 text-white font-medium rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Sign Up
          </button>
          <p className="text-center mt-5 text-sm">
            Already have an account?{" "}
            <span className="text-[#0057d9] font-bold pl-2">
              <Link to={"/signUp"}> Sign Up</Link>
            </span>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
