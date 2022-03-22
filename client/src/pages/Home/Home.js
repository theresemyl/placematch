import React from "react";
import { Link } from "react-router-dom";
import "./Home.scss";

function Home() {
  return (
    <>
      {" "}
      <Link to="/login">
        <div className="home">
          <br />
          <br />
          <br />
          <h1>🍽️</h1>
          <h1>PlaceMatch</h1>
          <p>Click to begin</p>
        </div>
      </Link>
    </>
  );
}
export default Home;
