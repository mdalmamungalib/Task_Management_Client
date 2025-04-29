import React, { createContext, useEffect, useState } from "react";
import {
  FacebookAuthProvider,
  GithubAuthProvider,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  sendEmailVerification,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import app from "../FireBase/FireBase.Config";
import axios from "axios";
import Loading from "../SharePage/Loading/Loading";

export const AuthContext = createContext();

const AuthProviders = ({ children }) => {
  const auth = getAuth(app);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const googleProvider = new GoogleAuthProvider();
  const facebookProvider = new FacebookAuthProvider();
  const githubProvider = new GithubAuthProvider();
  githubProvider.addScope("user:email");

  // Create User
  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password)
      .finally(() => setLoading(false));
  };

  // Update User Profile
  const updateUserProfile = (name, photo) => {
    setLoading(true);
    return updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: photo,
    }).finally(() => setLoading(false));
  };

  // Verify Email
  const verifyEmail = () => {
    setLoading(true);
    return sendEmailVerification(auth.currentUser)
      .finally(() => setLoading(false));
  };

  // User SignIn
  const loginUser = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password)
      .finally(() => setLoading(false));
  };

  // Reset Password
  const resetPassword = (email) => {
    setLoading(true);
    return sendPasswordResetEmail(auth, email)
      .finally(() => setLoading(false));
  };

  // Sign In with Google
  const signInWithGoogle = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider)
      .finally(() => setLoading(false));
  };

  // Sign In with Facebook
  const signInWithFacebook = () => {
    setLoading(true);
    return signInWithPopup(auth, facebookProvider)
      .finally(() => setLoading(false));
  };

  // Sign In with GitHub
  const signInWithGithub = () => {
    setLoading(true);
    return signInWithPopup(auth, githubProvider)
      .finally(() => setLoading(false));
  };

  // Log Out
  const logOut = () => {
    setLoading(true);
    return signOut(auth)
      .finally(() => setLoading(false));
  };

  // Auth State
  useEffect(() => {
    const unsubsCribe = onAuthStateChanged(auth, (currentUser) => {
      const userEmail = currentUser?.email || user?.email;
      const loggedUser = {
        email: userEmail,
      };
      setUser(currentUser);
      if (currentUser) {
        axios
          .post(`${import.meta.env.VITE_SERVER_URL}/jwt`, loggedUser, {
            withCredentials: true,
          })
          .then((res) => {
            // console.log(res.data);
          })
          .finally(() => {
            setLoading(false);
          });
      } else {
        axios
          .post(`${import.meta.env.VITE_SERVER_URL}/logOut`, loggedUser, {
            withCredentials: true,
          })
          .then((res) => {
            // console.log(res?.data);
          })
          .finally(() => {
            setLoading(false);
          });
      }
    });
    return () => {
      unsubsCribe();
    };
  }, [auth, user?.email]);

  const authInfo = {
    user,
    loading,
    createUser,
    updateUserProfile,
    verifyEmail,
    loginUser,
    resetPassword,
    signInWithGoogle,
    signInWithFacebook,
    signInWithGithub,
    logOut,
  };

  return (
    <AuthContext.Provider value={authInfo}>
      {loading ? <Loading/> : children}
    </AuthContext.Provider>
  );
};

export default AuthProviders;
