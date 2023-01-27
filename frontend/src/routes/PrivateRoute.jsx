import React from "react";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ Components }) => {
  const hasJWT = localStorage.getItem("isAuthenticate") ? true : false;
  if (!hasJWT) {
    return <Navigate to="/login" />;
  }
  return Components;
};

export default PrivateRoute;
