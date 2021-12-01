import "./App.scss";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import jwt_decode from "jwt-decode";
// import { Component } from "react";
import React, { useState, useEffect } from "react";
import Login from "./pages/LogIn/Login";
import SignUp from "./pages/SignUp/SignUp";
// import ChooseLocation from "./pages/ChooseLocation/ChooseLocation";
// import ChooseFriend from "./pages/ChooseFriend/ChooseFriend";
import SwipeNow from "./pages/SwipeNow/SwipeNow";
// import NewMatch from "./pages/NewMatch/NewMatch";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import Navbar from "./components/Navbar/Navbar";
import Dashboard from "./pages/Dashboard/Dashboard";
import Logout from "./pages/Logout/Logout";

function App() {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (token) {
      setCurrentUser(jwt_decode(token));
    }
  }, []);

  const handleLogin = (user) => {
    console.log(user);
    setCurrentUser(user);
  };

  const handleLogout = () => {
    console.log("logout");
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
          <Navbar user={currentUser} />
          <Switch>
            <Redirect from="/" exact to="/login" />
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
            <Route path={"/logout"} component={Logout} />

            {/* <Route path="/login" exact component={Login} /> */}
            <Route path="/signup" exact component={SignUp} />

            <ProtectedRoute path="/swipenow" exact component={SwipeNow} />

            <ProtectedRoute path={"/dashboard"} component={Dashboard} />
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
