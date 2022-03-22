import React from "react";
import { Route, Redirect } from "react-router-dom";

const ProtectedRoute = ({
  component: Component,
  userName,
  userId,
  onMapChange,
  restaurantList,
  setRestaurantList,
  foundUser,
  foundUserName,
  setFoundUser,
  setFoundUserName,
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
            onMapChange={onMapChange}
            restaurantList={restaurantList}
            setRestaurantList={setRestaurantList}
            foundUser={foundUser}
            foundUserName={foundUserName}
            setFoundUser={setFoundUser}
            setFoundUserName={setFoundUserName}
          />
        )
      }
    />
  );
};

export default ProtectedRoute;
