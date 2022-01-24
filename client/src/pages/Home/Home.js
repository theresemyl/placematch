import React from "react";
import { Link } from "react-router-dom";
import "./Home.scss";

function Home() {
  return (
    <>
      {" "}
      <Link to="/login">
        <div className="home">
          <h1>🍽️</h1>
          <h1>PlaceMatch</h1>
          <p>Click to begin</p>
          <br />
          <br />
          <br />
          <p>
            ** Attn: App is currently temporarily suspended due to account
            expiration on the Google Cloud & Maps Platform. A solution is in
            progress! **
          </p>
        </div>
      </Link>
    </>
  );
}
export default Home;
