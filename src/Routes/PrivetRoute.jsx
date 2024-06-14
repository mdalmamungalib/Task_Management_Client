import React from "react";
import { useLocation, Navigate } from "react-router-dom";
import Authentication from "../Hooks/Authentication/Authentication";

const PrivateRoute = ({ children }) => {
  const { user, loading } = Authentication();
  const location = useLocation();

  if (loading) {
    return <h1>Loading...</h1>;
  }

  if (user && user?.email) {
    return children;
  }

  return (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default PrivateRoute;
