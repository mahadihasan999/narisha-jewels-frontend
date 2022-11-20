import React from "react";
import { Link } from "react-router-dom";

const AuthLayout = ({ children }) => {
  return (
    <div className="auth-container">
      <div className="wrapper">
        <div className="auth-brand">
          <Link to="/">
            <h1 className="text-2xl text-indigo-500 font-bold">
              Narisha Jwels
            </h1>
          </Link>
        </div>
        <div>{children}</div>
      </div>
    </div>
  );
};

export default AuthLayout;
