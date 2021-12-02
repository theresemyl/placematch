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
