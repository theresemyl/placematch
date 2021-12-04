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

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [userName, setUserName] = useState("");
  const [userId, setUserId] = useState(0);

  const token = sessionStorage.getItem("token");
  axios
    .get("http://localhost:8080/api/users/current", {
      headers: {
        Authorization: `token ${token}`,
      },
    })
    .then((response) => {
      const { name, id } = response.data.user;
      // console.log(name, id);
      setUserName(name);
      setUserId(id);
    })
    .catch((error) => {
      console.error(error);
    });
  // console.log(userName);

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (token) {
      setCurrentUser(jwt_decode(token));
    } else {
      setCurrentUser(null);
    }
  }, []);

  const handleLogin = (user) => {
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
              component={Logout}
              onClick={() => handleLogout()}
            />
            {/* <Route path="/login" exact component={Login} /> */}
            <Route path="/signup" exact component={SignUp} />
            {/* <Route
              path="/swipenow"
              exact
              render={(routerProps) => (
                <SwipeNow userName={userName} userId={userId} />
              )}
            /> */}
            <ProtectedRoute
              exact
              path="/location"
              component={ChooseLocation}
              userName={userName}
              userId={userId}
            />
            <ProtectedRoute
              exact
              path="/swipenow"
              component={SwipeNow}
              userName={userName}
              userId={userId}
            />
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
