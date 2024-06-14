import React, { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import Authentication from "../Authentication/Authentication";

const axiosSecure = axios.create({
  baseURL: import.meta.env.VITE_SERVER_URL,
  withCredentials: true,
});

const useAxiosSecure = () => {
  const { logOut } = Authentication();
  const navigate = useNavigate();

  useEffect(() => {
    axiosSecure.interceptors.response.use(
      (res) => res,
      (error) => {
        console.error("Error in axiosSecure:", error);
        if (error.response) {
          const { status } = error.response;
          if (status === 401 || status === 403) {
            logOut()
              .then(() => {
                Swal.fire({
                  icon: "error",
                  title: "Warning... Warning...",
                  text: "If you are trying to break through the security purpose please don't do it legal action will be taken against you if you are caught.",
                  footer: '<a href="#">Why do I have this issue?</a>',
                });
                navigate("/logIn");
              })
              .catch((error) => {
                console.error("Error logging out:", error.message);
              });
          }
        } else if (error.message === "Network Error") {
          console.error("Network Error: Please check your server or network connection.");
        }
        return Promise.reject(error);
      }
    );
  }, [logOut, navigate]);

  return [axiosSecure];
};

export default useAxiosSecure;
