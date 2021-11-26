import React from "react";
import { Route, Redirect } from "react-router-dom";

/**
 *
 * This is an example of a Higher Order Component; take a look at how
 * it's used in App.js
 */
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
