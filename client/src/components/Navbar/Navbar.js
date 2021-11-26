import { Link } from "react-router-dom";
// import './Nav.scss';
/**
 * The navbar gets should display, no matter if the user is logged in or out.
 *  - If the user is logged in, show the logged in user's metadata.
 *  - if the user isn't logged in, give a generic message with instructions.
 */
const Navbar = ({ user, hasFailedAuth }) => {
  console.log(user);
  return (
    <div className="navbar">
      <span className="logo">
        <Link className="link" to="/">
          Demo App
        </Link>
      </span>
      {user ? (
        <ul className="list">
          <li className="listItem">Welcome, {user.email}</li>
          <li className="listItem">
            <Link className="link" to="dashboard">
              Dashboard
            </Link>
          </li>

          <li className="listItem">
            <Link className="link" to="Logout">
              Logout
            </Link>
          </li>
        </ul>
      ) : (
        <ul className="list">
          <li className="listItem">
            <Link className="link" to="dashboard">
              Dashboard (login required)
            </Link>
          </li>
          <li className="listItem">
            <Link className="link" to="login">
              Login
            </Link>
          </li>
          <li className="listItem">
            <Link className="link" to="swipenow">
              Swipe Now
            </Link>
          </li>
          <li className="listItem">
            <Link className="link" to="signup">
              Sign Up
            </Link>
          </li>
        </ul>
      )}
    </div>
  );
};

export default Navbar;
