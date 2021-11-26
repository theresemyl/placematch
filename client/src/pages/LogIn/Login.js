import { Component } from "react";
import axios from "axios";
import "./Login.scss";
import { Link } from "react-router-dom";

class Login extends Component {
  state = {
    formData: null,
    isError: false,
  };

  handleChange = (e) => {
    this.setState({
      formData: { ...this.state.formData, [e.target.name]: e.target.value },
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    // This works because of the proxy property on /client/package.json.
    axios
      .post("/api/users/login", this.state.formData)
      .then((res) => {
        sessionStorage.setItem("token", res.data.token);
        this.props.onLoginSuccess(res.data.user);
        // FIXME: redirect to the original sender page
        this.props.history.push("/");
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
            <label htmlFor="email" className="field__label">
              Email
            </label>
            <input
              className="field__input"
              type="email"
              name="email"
              id="email"
              onChange={this.handleChange}
            />
          </div>
          <div className="field">
            <label htmlFor="password" className="field__label">
              Password
            </label>
            <input
              className="field__input"
              type="password"
              name="password"
              id="password"
              onChange={this.handleChange}
            />
          </div>
          <button className="login__button">Login</button>
          {!this.state.isError && <Link to="/swipenow">Swipe Now</Link>}

          {this.state.isError && (
            <div className="login__message">{this.state.error}!</div>
          )}
        </form>
      </main>
    );
  }
}

export default Login;
