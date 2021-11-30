import { Component } from "react";
import axios from "axios";
import "./Login.scss";
import { Link } from "react-router-dom";

class Login extends Component {
  state = {
    formData: null,
    isError: false,
  };

  handleChange = (event) => {
    this.setState({
      formData: {
        ...this.state.formData,
        [event.target.name]: event.target.value,
      },
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    axios
      .post("/api/users/login", this.state.formData)
      .then((res) => {
        sessionStorage.setItem("token", res.data.token);
        this.props.onLoginSuccess(res.data.user);
        this.props.history.push("./swipenow");
      })
      .catch((error) => {
        console.log(error);
        this.setState({ isError: true });
      });
  };

  render() {
    return (
      <main className="login-page">
        <form className="login" onSubmit={this.handleSubmit}>
          <h1 className="login__title">Login</h1>
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
              onChange={this.handleChange}
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
              onChange={this.handleChange}
            />
          </div>
          <button className="login__button">Login</button>
          {/* {!this.state.isError && <Link to="/swipenow">Swipe Now</Link>} */}

          {this.state.isError && (
            <div className="login__message">{this.state.error}!</div>
          )}
        </form>
      </main>
    );
  }
}

export default Login;
