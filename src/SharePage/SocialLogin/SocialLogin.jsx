import axios from "axios";
import React from "react";
import { FaGoogle, FaFacebook, FaGithub } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import Authentication from "../../Hooks/Authentication/Authentication";
import Loading from "../Loading/Loading";

const SocialLogin = () => {
  const { signInWithGoogle, signInWithFacebook, signInWithGithub, loading } =
    Authentication();
  const navigate = useNavigate();
  const form = "/dashboard/allTasks";
  if(loading){
    return <Loading/>
  }

  const handleGoogleLogin = () => {
    signInWithGoogle()
      .then((result) => {
        const user = result?.user;
        const saveUser = {
          name: user?.displayName,
          email: user?.email,
          userImage: user?.photoURL,
          userUID: user?.uid,
          method: user?.providerData[0].providerId,
        };

        if (user) {
          fetch(`${import.meta.env.VITE_SERVER_URL}/user`, {
            method: "POST",
            headers: {
              "content-type": "application/json",
            },
            body: JSON.stringify(saveUser),
          })
            .then((res) => res.json())
            .then((data) => {
              console.log("logingoole", data);
              Swal.fire({
                position: "center",
                title: "Login Successful!",
                text: `Welcome ${user?.displayName}`,
                icon: "success",
                showConfirmButton: false,
                timer: 1500,
              });
              navigate(form, { replace: true });
            });
        }
      })
      .catch((errors) => console.log(errors));
  };

  //faceBook login
  const handleFaceBookLogin = () => {
    signInWithFacebook()
      .then((result) => {
        const user = result?.user;
        const saveUser = {
          name: user?.displayName,
          email: user?.email,
          userImage: user?.photoURL,
          userUID: user?.uid,
          method: user?.providerData[0].providerId,
        };
        if (user) {
          fetch(`${import.meta.env.VITE_SERVER_URL}/user`, {
            method: "POST",
            headers: {
              "content-type": "application/json",
            },
            body: JSON.stringify(saveUser),
          })
            .then((res) => res.json())
            .then((data) => {
              Swal.fire({
                position: "center",
                title: "Login Successful!",
                text: `Welcome ${user?.displayName}`,
                icon: "success",
                showConfirmButton: false,
                timer: 1500,
              });
              navigate(form, { replace: true });
            });
        }
      })
      .catch((error) => console.log(error));
  };

  //github login
  const handleGithubLogin = async () => {
    try {
      const result = await signInWithGithub();
      const user = result?.user;
      const credential = GithubAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;

      if (!token) {
        throw new Error("GitHub access token is missing");
      }

      // Fetch the user's email from GitHub
      const emailResponse = await axios.get(
        "https://api.github.com/user/emails",
        {
          headers: {
            Authorization: `token ${token}`,
          },
        }
      );

      const primaryEmail = emailResponse.data.find(
        (email) => email.primary
      )?.email;

      if (!primaryEmail) {
        throw new Error("No primary email found for GitHub user");
      }

      const saveUser = {
        name: user?.displayName,
        email: primaryEmail || user?.email,
        userImage: user?.photoURL,
        userUID: user?.uid,
        method: user?.providerData[0].providerId,
      };

      const response = await axios.post(
        `${import.meta.env.VITE_SERVER_URL}/user`,
        saveUser,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      Swal.fire({
        position: "center",
        title: "Login Successful!",
        text: `Welcome ${user?.displayName}`,
        icon: "success",
        showConfirmButton: false,
        timer: 1500,
      });

      navigate(form, { replace: true });
    } catch (error) {
      console.error("Error during GitHub login:", error);

      if (error.response) {
        console.error("GitHub API response error:", error.response.data);
      }

      Swal.fire({
        position: "center",
        title: "Login Failed!",
        text:
          error.message ||
          "An error occurred during GitHub login. Please try again.",
        icon: "error",
        showConfirmButton: true,
      });
    }
  };
  return (
    <div className="mt-6 flex justify-center space-x-4">
      <button
      onClick={handleGoogleLogin}
        type="button"
        className="flex items-center px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
      >
        <FaGoogle className="mr-2" /> Google
      </button>
      <button
      onClick={handleFaceBookLogin}
        type="button"
        className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
      >
        <FaFacebook className="mr-2" /> Facebook
      </button>
      <button
      onClick={handleGithubLogin}
        type="button"
        className="flex items-center px-4 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
      >
        <FaGithub className="mr-2" /> GitHub
      </button>
    </div>
  );
};

export default SocialLogin;
