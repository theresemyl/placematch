import React, { useEffect } from "react";
import { Redirect } from "react-router-dom";

function Logout(props) {
  useEffect(() => {
    sessionStorage.removeItem("token");
    console.log("logged out");
    props.history.push("/");
  });

  return <Redirect to="/" />;
}

export default Logout;

// import { Component } from "react";
// import { Redirect } from "react-router-dom";

// class Logout extends Component {
//   componentDidMount() {
//     sessionStorage.removeItem("token");
//     console.log("removed sessionstorage token, logged out");

//     this.props.history.push("/");
//   }
//   render() {
//     return <Redirect to="/" />;
//   }
// }

// export default Logout;
