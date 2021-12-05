//must be logged in to see this page
import React, { useState, useEffect } from "react";
import axios from "axios";

function Dashboard({ userName, userId }) {
  const [likedRestaurants, setLikedRestaurants] = useState([]);

  useEffect(() => {
    axios
      .get("./api/users/all/likes")
      .then((response) => {
        let likedList = response.data.filter((like) => {
          if (like.swipe_direction === "right" && like.users_id === userId) {
            return like;
          }
        });
        setLikedRestaurants(likedList);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  // change this so that it only shows one random place you've swiped right on
  // add a button where you can refresh on the places you've previously liked for suggestions
  // "can't decide where to go? here are 3 places you've swiped right on!"

  return (
    <main className="dashboard">
      <br />
      <h1 className="dashboard__title">Dashboard page</h1>
      <p>Welcome to your dashboard!</p>

      <p>Here are your past likes:</p>
      {likedRestaurants.map((like) => (
        <div>
          <p>
            <b>{like.name}</b>
          </p>
          <p>{like.address}</p>
        </div>
      ))}
    </main>
  );
}
export default Dashboard;
