// import { Component } from "react";
// import { Link } from "react-router-dom";
// import axios from "axios";
// import "./SignUp.scss";

// class Signup extends Component {
//   state = {
//     error: "",
//     success: false,
//   };

//   handleSubmit = (event) => {
//     event.preventDefault();
//     // call our register API with our form

//     axios
//       .post("./api/users/signup", {
//         email: event.target.email.value,
//         username: event.target.username.value,
//         name: event.target.name.value,
//         password: event.target.password.value,
//       })
//       .then(() => {
//         this.setState({ success: true, error: "" });
//         alert("signed up successfully!");
//         event.target.reset();
//         this.props.history.push("./login");
//       })
//       .catch((error) => {
//         this.setState({ success: false, error: error.response.data });
//       });
//   };

//   render() {
//     return (
//       <main className="signup-page">
//         <form className="signup" onSubmit={this.handleSubmit}>
//           <h1 className="signup__title">Sign up</h1>

//           <input
//             type="text"
//             name="username"
//             placeholder="username"
//             className="input__field"
//           />
//           <input
//             type="text"
//             name="name"
//             placeholder="name"
//             className="input__field"
//           />
//           <input type="email" name="email" placeholder="email" />
//           <input type="password" name="password" placeholder="password" />
//           <br />
//           <button className="signup__button">Sign up</button>

//           {this.state.success && (
//             <div className="signup__message">Signed up!</div>
//           )}
//           {this.state.error && (
//             <div className="signup__message">{this.state.error}</div>
//           )}
//         </form>
//         <p>
//           Have an account? <Link to="/login">Log in</Link>
//         </p>
//       </main>
//     );
//   }
// }

// export default Signup;
