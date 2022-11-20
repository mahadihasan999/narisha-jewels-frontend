import useAuth from "hooks/useAuth";
import React from "react";
import { Redirect, Route } from "react-router-dom";

const PrivateRoute = ({ children, ...rest }) => {
  const { user } = useAuth();
  return (
    <Route
      {...rest}
      render={({ books }) =>
        user.displayName ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/signin",
              state: { from: books },
            }}
          />
        )
      }
    />
  );
};

export default PrivateRoute;
