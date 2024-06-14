import React from "react";
import { useLocation, Navigate } from "react-router-dom";
import Authentication from "../Hooks/Authentication/Authentication";
import Loading from "../SharePage/Loading/Loading";

const PrivateRoute = ({ children }) => {
  const { user, loading } = Authentication();
  const location = useLocation();

  if (loading) {
    return <Loading/>;
  }

  if (user && user?.email) {
    return children;
  }

  return (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default PrivateRoute;
