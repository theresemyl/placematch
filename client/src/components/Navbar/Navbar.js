import { Link } from "react-router-dom";
import "./Navbar.scss";
import homeicon from "../../assets/icons/home.png";
import swipearrow from "../../assets/icons/swipearrow.png";
import heart from "../../assets/icons/heart.png";
import axios from "axios";

const Navbar = ({ user, hasFailedAuth }) => {
  // console.log(user);
  // const token = sessionStorage.getItem("token");
  // console.log(token);
  // let currentUserName = "";

  // axios
  //   .get("http://localhost:8080/api/users/current", {
  //     headers: {
  //       Authorization: `token ${token}`,
  //     },
  //   })
  //   .then((response) => {
  //     // currentUser: {
  //     //   currentUserName = res.data.user.name,
  //     //   currentUserId = res.data.user.id,
  //     //   currentUserEmail = res.data.user.email
  //     // }
  //     const { name, id, email } = response.data.user;
  //     console.log(name, id, email);
  //   })
  //   .catch((error) => {
  //     console.error(error);
  //   });

  return (
    <div className="navbar">
      {user ? (
        <ul className="list">
          <li className="listItem">
            Logged in as <b>{user.email}</b>
          </li>
          {/* <br />
          <li className="listItem">
            <img src={homeicon} alt="home icon" className="navbar__icon" />
          </li>

          <li className="listItem">
            <img src={heart} alt="heart icon" className="navbar__icon" />
          </li>
          <li className="listItem">
            <img
              src={swipearrow}
              alt="swipe arrow icon"
              className="navbar__icon"
            />
          </li> */}
          <br />
          <li className="listItem">
            <Link className="link" to="dashboard">
              Dashboard
            </Link>
          </li>
          <li className="listItem">
            <Link className="link" to="swipenow">
              Swipe Now
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
          {/* <li className="listItem">
            <Link className="link" to="login">
              Login
            </Link>
          </li>

          <li className="listItem">
            <Link className="link" to="signup">
              Sign Up
            </Link>
          </li> */}
        </ul>
      )}
    </div>
  );
};

export default Navbar;
