// must be logged in to see this page
import "./Matches.scss";
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
      <h1 className="dashboard__title">Matches</h1>

      <p>Here are your past matches:</p>

      {likedRestaurants.map((like) => (
        <div>
          {like.matched_user_name1 === userName ? (
            <div className="match__container">
              <div className="match__container-left">
                <img
                  // src={`https://maps.googleapis.com/maps/api/place/photo?maxwidth=450&photo_reference=${like.photo}&key=AIzaSyD5EhTL5WqCF5ZD56zQD5WJsNRGA_0CzV0`}
                  src={like.photo}
                  alt="restaurant"
                  className="match__photo"
                />
              </div>
              <div className="match__container-right">
                <b>{like.name}</b> <br />
                <i>{like.address}</i>
                <br />
                <br />
                You and <b>{like.matched_user_name2}</b> matched <br />
                <ReactTimeAgo date={Number(like.date)} locale="en-US" />!
              </div>
            </div>
          ) : (
            <div className="match__container">
              <div className="match__container-left">
                <img
                  // src={`https://maps.googleapis.com/maps/api/place/photo?maxwidth=450&photo_reference=${like.photo}&key=AIzaSyD5EhTL5WqCF5ZD56zQD5WJsNRGA_0CzV0`}

                  src={like.photo}
                  alt="restaurant"
                  className="match__photo"
                />
              </div>
              <div className="match__container-right">
                <b>{like.name}</b> <br />
                <i>{like.address}</i>
                <br />
                <br />
                You and <b>{like.matched_user_name1}</b> matched <br />
                <ReactTimeAgo date={Number(like.date)} locale="en-US" />!
              </div>
            </div>
          )}
        </div>
      ))}
    </main>
  );
}
export default Matches;
