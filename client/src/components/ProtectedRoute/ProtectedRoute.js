import React from "react";
import { Route, Redirect } from "react-router-dom";

const ProtectedRoute = ({ component: Component, ...rest }) => {
  const token = sessionStorage.getItem("token");
  return (
    <Route
      {...rest}
      render={(routeProps) =>
        !token ? (
          <Redirect
            to={{
              pathname: "/login",
              state: { referrer: rest.path },
            }}
          />
        ) : (
          <Component {...routeProps} />
        )
      }
    />
  );
};

export default ProtectedRoute;
