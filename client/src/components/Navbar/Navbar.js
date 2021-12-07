import { Link } from "react-router-dom";
import { Redirect } from "react-router-dom";
import "./Navbar.scss";

const Navbar = ({ user, userName }) => {
  return (
    <div className="navbar">
      {user ? (
        <ul className="list">
          <li className="listItem">
            Logged in as <b>{userName}</b>
          </li>

          <br />
          <li className="listItem">
            <Link className="link" to="dashboard">
              Dashboard
            </Link>
          </li>
          <li className="listItem">
            <Link className="link" to="matches">
              Matches
            </Link>
          </li>
          <br />
          <li className="listItem">
            <Link className="link" to="location">
              Location
            </Link>
          </li>
          <li className="listItem">
            <Link className="link" to="swipenow">
              Swipe Now
            </Link>
          </li>
          <li className="listItem">
            <Link className="link" to="logout">
              Logout
            </Link>
          </li>
        </ul>
      ) : (
        <ul className="list"></ul>
      )}
    </div>
  );
};

export default Navbar;
