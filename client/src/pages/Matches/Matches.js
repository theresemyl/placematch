//must be logged in to see this page
import React, { useState, useEffect } from "react";
import axios from "axios";

function Matches({ userName, userId }) {
  const [likedRestaurants, setLikedRestaurants] = useState([]);

  useEffect(() => {
    axios
      .get("./api/users/all/matches")
      .then((response) => {
        let likedList = response.data.filter((like) => {
          if (
            like.swipe_direction === "right" &&
            (like.matched_user_id1 === userId ||
              like.matched_user_id2 === userId)
          ) {
            return like;
          }
        });
        setLikedRestaurants(likedList);
        console.log(likedList);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <main className="dashboard">
      <br />
      <h1 className="dashboard__title">Matches page</h1>
      <p>Welcome to your matches!</p>

      <p>Here are your past likes:</p>
      {likedRestaurants.map((like) => (
        <div>
          <p>
            <b>{like.name}</b> <br />
            {like.address}
            <br />
            You and <b>{like.matched_user_name1}</b> matched on {like.date}!
          </p>
        </div>
      ))}
    </main>
  );
}
export default Matches;
