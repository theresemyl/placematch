// must be logged in to see this page
import React, { useState, useEffect } from "react";
import axios from "axios";

// relative time format
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en.json";
import ReactTimeAgo from "react-time-ago";
TimeAgo.addDefaultLocale(en);

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

      <p>Here are your past matches:</p>

      {likedRestaurants.map((like) => (
        <div>
          {like.matched_user_name1 === userName ? (
            <div>
              <p>
                <b>{like.name}</b> <br />
                {like.address}
                <br />
                You and <b>{like.matched_user_name2}</b> matched <br />
                <ReactTimeAgo date={Number(like.date)} locale="en-US" />!
              </p>
            </div>
          ) : (
            <div>
              <p>
                <b>{like.name}</b> <br />
                {like.address}
                <br />
                You and <b>{like.matched_user_name1}</b> matched <br />
                <ReactTimeAgo date={Number(like.date)} locale="en-US" />!
              </p>
            </div>
          )}
        </div>
      ))}
    </main>
  );
}
export default Matches;
