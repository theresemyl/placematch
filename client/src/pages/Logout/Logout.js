import { Component } from "react";
import { Redirect } from "react-router-dom";

class Logout extends Component {
  componentDidMount() {
    sessionStorage.removeItem("token");
    console.log("removed sessionstorage token, logged out");

    this.props.history.push("/");
  }
  render() {
    return <Redirect to="/" />;
  }
}

export default Logout;
