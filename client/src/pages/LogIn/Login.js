import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Login.scss";
import { Link } from "react-router-dom";

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
      .post("/api/users/login", formData)
      .then((res) => {
        sessionStorage.setItem("token", res.data.token);
        props.onLoginSuccess(res.data.user);
        props.history.push("./location");
      })
      .catch((error) => {
        console.log(error);
        setIsError(true);
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
          {/* <label htmlFor="email" className="field__label">
              Email
            </label> */}
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
          {/* <label htmlFor="password" className="field__label">
              Password
            </label> */}
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
        {/* {!this.state.isError && <Link to="/swipenow">Swipe Now</Link>} */}
        <br />
        <br />
        {isError && (
          <div className="login__message">
            Wrong password! sign up or go away!!!
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
