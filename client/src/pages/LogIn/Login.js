import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { API_URL } from "../../config";

function Login(props) {
  const [formData, setFormData] = useState(null);
  const [isError, setIsError] = useState(false);

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .post(API_URL + "/api/users/login", formData)
      .then((res) => {
        sessionStorage.setItem("token", res.data.token);
        props.onLoginSuccess(res.data.user);
        props.history.push("./location");
      })
      .catch((error) => {
        // setTimeout(function () {
        setIsError(true);
        // }, 2000);
        console.log(error);
      });
  };

  return (
    <main className="login-page">
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <form className="login" onSubmit={handleSubmit}>
        <h1 className="login__title">Log in</h1>
        <div className="field">
          <input
            className="field__input"
            type="email"
            name="email"
            id="email"
            placeholder="email"
            onChange={handleChange}
          />
        </div>
        <div className="field">
          <input
            className="field__input"
            type="password"
            name="password"
            id="password"
            placeholder="password"
            onChange={handleChange}
          />
        </div>
        <button className="login__button">Login</button>
        <br />
        <br />
        {isError && (
          <div className="login__message">
            Wrong password! Please try again.
          </div>
        )}
      </form>
      <p>
        No account yet? <Link to="/signup">Sign up</Link>!
      </p>
    </main>
  );
}

export default Login;
