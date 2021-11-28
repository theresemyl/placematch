import "./App.scss";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import jwt_decode from "jwt-decode";
import { Component } from "react";

import Login from "./pages/LogIn/Login";
import SignUp from "./pages/SignUp/SignUp";
import ChooseLocation from "./pages/ChooseLocation/ChooseLocation";
import ChooseFriend from "./pages/ChooseFriend/ChooseFriend";
import SwipeNow from "./pages/SwipeNow/SwipeNow";
import NewMatch from "./pages/NewMatch/NewMatch";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import Navbar from "./components/Navbar/Navbar";
import Dashboard from "./pages/Dashboard/Dashboard";
import Logout from "./pages/Logout/Logout";

class App extends Component {
  state = {
    currentUser: null,
  };

  componentDidMount() {
    const token = sessionStorage.getItem("token");
    if (token) {
      this.setState({ currentUser: jwt_decode(token) });
    }
  }

  handleLogin = (user) => {
    console.log(user);
    this.setState({ currentUser: user });
  };

  handleLogout = () => {
    console.log("handleLogout on App");
    sessionStorage.removeItem("token");
    this.setState({
      currentUser: null,
    });
  };

  render() {
    return (
      <div className="app">
        <br />
        <br />
        <br />
        <br />
        <div className="app__container">
          <BrowserRouter>
            <Navbar user={this.state.currentUser} />
            <Switch>
              <Redirect from="/" exact to="/login" />
              <Route
                path={"/login"}
                render={(routerProps) => (
                  <Login
                    {...routerProps}
                    onLoginSuccess={(user) => {
                      this.handleLogin(user);
                    }}
                  />
                )}
              />
              <Route path={"/logout"} component={Logout} />

              {/* <Route path="/login" exact component={Login} /> */}
              <Route path="/signup" exact component={SignUp} />
              <ProtectedRoute
                path="/chooselocation"
                exact
                component={ChooseLocation}
              />
              <ProtectedRoute
                path="/choosefriend"
                exact
                component={ChooseFriend}
              />
              <ProtectedRoute path="/swipenow" exact component={SwipeNow} />
              <ProtectedRoute path="/newmatch" exact component={NewMatch} />
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
}

export default App;
