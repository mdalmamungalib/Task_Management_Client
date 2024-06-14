import React, { useContext } from "react";
import { AuthContext } from "../../Context/AuthProviders";

const Authentication = () => {
  const auth = useContext(AuthContext);
  return auth;
};

export default Authentication;
