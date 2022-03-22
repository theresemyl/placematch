import "./App.scss";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import jwt_decode from "jwt-decode";
import React, { useState, useEffect } from "react";
import Login from "./pages/Login/Login";
import SignUp from "./pages/SignUp/SignUp";
import SwipeNow from "./pages/SwipeNow/SwipeNow";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import Navbar from "./components/Navbar/Navbar";
import Dashboard from "./pages/Dashboard/Dashboard";
import Logout from "./pages/Logout/Logout";
import Home from "./pages/Home/Home";
import axios from "axios";
import Matches from "./pages/Matches/Matches";
import ChooseLocation from "./pages/ChooseLocation/ChooseLocation";
import ChooseFriend from "./pages/ChooseFriend/ChooseFriend";

// const API_URL =
//   process.env.NODE_ENV === "production"
//     ? "https://placematch-data.herokuapp.com/api/users/"
//     : "http://localhost:8080/";

import { API_URL } from "./config";

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [userName, setUserName] = useState("");
  const [userId, setUserId] = useState(0);
  const [restaurantList, setRestaurantList] = useState([]);
  const [foundUser, setFoundUser] = useState(null);
  const [foundUserName, setFoundUserName] = useState(null);

  const token = sessionStorage.getItem("token");
  axios
    .get(API_URL + "/api/users/current", {
      headers: {
        Authorization: `token ${token}`,
      },
    })
    .then((response) => {
      const { name, id } = response.data.user;
      setUserName(name);
      setUserId(id);
    })
    .catch((error) => {
      console.error(error);
    });

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (token) {
      setCurrentUser(jwt_decode(token));
    } else {
      setCurrentUser(null);
    }
  }, []);

  const handleChange = (value) => {
    // setFoundUserName(value);
    console.log("handle change");
  };

  const setList = (arr) => {
    setRestaurantList(arr);
  };

  console.log("found username in app", foundUserName);

  console.log(restaurantList);

  const handleLogin = (user) => {
    setCurrentUser(user);
  };

  const handleLogout = () => {
    sessionStorage.removeItem("token");
    setCurrentUser(null);
  };

  return (
    <div className="app">
      <br />
      <br />
      <br />
      <div className="app__container">
        <BrowserRouter>
          <Navbar user={currentUser} userName={userName} userId={userId} />
          <Switch>
            <Redirect from="/" exact to="/home" />
            <Route path="/home" component={Home} />
            <Route
              path={"/login"}
              render={(routerProps) => (
                <Login
                  {...routerProps}
                  onLoginSuccess={(user) => {
                    handleLogin(user);
                  }}
                />
              )}
            />
            <Route
              path={"/logout"}
              render={(routerProps) => (
                <Logout
                  {...routerProps}
                  handleLogout={(user) => {
                    handleLogout(user);
                  }}
                />
              )}
            />
            <Route path="/signup" exact component={SignUp} />
            <ProtectedRoute
              exact
              path="/location"
              component={ChooseLocation}
              restaurantList={restaurantList}
              setRestaurantList={setRestaurantList}
              setList={setList}
            />
            {/* <ChooseLocation
                component={ChooseLocation}
                restaurantList={restaurantList}
                setRestaurantList={setRestaurantList}
                setList={setList}
              />
            </ProtectedRoute> */}

            <ProtectedRoute
              exact
              path={"/choosefriend"}
              component={ChooseFriend}
              userName={userName}
              userId={userId}
              foundUser={foundUser}
              setFoundUser={setFoundUser}
              foundUserName={foundUserName}
              setFoundUserName={setFoundUserName}
              handleChange={handleChange}
            />
            {/* <ChooseFriend
                component={ChooseFriend}
                userName={userName}
                userId={userId}
                foundUser={foundUser}
                // setFoundUser={setFoundUser}
                foundUserName={foundUserName}
                // setFoundUserName={setFoundUserName}
                handleChange={handleChange}
              />
            </ProtectedRoute> */}
            <ProtectedRoute
              exact
              path="/swipenow"
              component={SwipeNow}
              userName={userName}
              userId={userId}
              restaurantList={restaurantList}
              setRestaurantList={setRestaurantList}
              foundUser={foundUser}
              foundUserName={foundUserName}
            />
            {/* <SwipeNow
                component={SwipeNow}
                userName={userName}
                userId={userId}
                restaurantList={restaurantList}
                setRestaurantList={setRestaurantList}
                foundUser={foundUser}
                foundUserName={foundUserName}
              />
            </ProtectedRoute> */}

            <ProtectedRoute
              path={"/dashboard"}
              component={Dashboard}
              userName={userName}
              userId={userId}
            />
            <ProtectedRoute
              path={"/matches"}
              component={Matches}
              userName={userName}
              userId={userId}
            />
          </Switch>
        </BrowserRouter>
      </div>
      <br />
      <br />
      <br />
      <br />
    </div>
  );
}

export default App;
