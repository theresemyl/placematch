import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./SignUp.scss";

function Signup(props) {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();

    axios
      .post("http://localhost:8080/api/users/signup", {
        email: event.target.email.value,
        username: event.target.username.value,
        name: event.target.name.value,
        password: event.target.password.value,
      })
      .then(() => {
        alert("Signed up successfully!");
        setError("");
        setSuccess(true);
        event.target.reset();
        props.history.push("./login");
      })
      .catch((error) => {
        setError(error.response.data);
        setSuccess(false);
        console.log(error);
      });
  };

  return (
    <main className="signup-page">
      <br />
      <br />
      <br />
      <br />
      <br />
      <form className="signup" onSubmit={handleSubmit}>
        <h1 className="signup__title">Sign up</h1>

        <input
          type="text"
          name="username"
          placeholder="username"
          className="input__field"
        />
        <input
          type="text"
          name="name"
          placeholder="name"
          className="input__field"
        />
        <input type="email" name="email" placeholder="email" />
        <input type="password" name="password" placeholder="password" />
        <br />
        <button className="signup__button">Sign up</button>

        {success && <div className="signup__message">Signed up!</div>}
        {error && <div className="signup__message">{error}</div>}
      </form>
      <p>
        Have an account? <Link to="/login">Log in</Link>
      </p>
    </main>
  );
}

export default Signup;
