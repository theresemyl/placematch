//must be logged in to see this page
import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Dashboard.scss";

let randomList = [];
function Dashboard({ userName, userId }) {
  const [likedRestaurants, setLikedRestaurants] = useState([]);
  const [randomLike, setRandomLike] = useState([]);
  useEffect(() => {
    axios
      .get("./api/users/all/likes")
      .then((response) => {
        let likedList = response.data.filter((like) => {
          if (like.swipe_direction === "right" && like.users_id === userId) {
            return like;
          }
        });
        const random = Math.floor(Math.random() * likedList.length);
        setRandomLike(likedList[random]);
        setLikedRestaurants(likedList);
        randomList.push(likedList);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [setRandomLike]);

  function getRandom() {
    const random = Math.floor(Math.random() * likedRestaurants.length);
    setRandomLike(likedRestaurants[random]);
    return randomLike;
  }

  return (
    <main className="dashboard">
      <h1 className="dashboard__title">Dashboard</h1>

      <p>
        Welcome, <b>{userName}</b>! <br />
        <br />
        We know it can be tough to decide on a place to go. Click on the button
        below to get a random restaurant that you've swiped right on!
      </p>
      <br />
      <div className="dashboard__card-container">
        <div className="like__photo-container">
          <img
            src={randomLike.photo}
            alt="restaurant"
            className="like__photo"
          />
        </div>
        <p className="like__text">
          <h3>{randomLike.name}</h3>
          {randomLike.address}
        </p>
      </div>
      <br />
      <br />
      <button onClick={getRandom}>Click me</button>
    </main>
  );
}
export default Dashboard;
