import React from "react";
import { Route, Redirect } from "react-router-dom";
import SwipeNow from "../../pages/SwipeNow/SwipeNow";

const ProtectedRoute = ({
  component: Component,
  userName,
  userId,
  lat,
  lng,
  setLat,
  setLng,
  ...rest
}) => {
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
          <Component
            {...routeProps}
            userName={userName}
            userId={userId}
            lat={lat}
            lng={lng}
            setLat={setLat}
            setLng={setLng}
          />
        )
      }
    />
  );
};

export default ProtectedRoute;
