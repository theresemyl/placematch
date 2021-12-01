//must be logged in to see this page
import React, { useState, useEffect } from "react";
import axios from "axios";

function Dashboard() {
  const [likedRestaurants, setLikedRestaurants] = useState([]);

  useEffect(() => {
    axios
      .get("./api/users/all/likes")
      .then((response) => {
        let likedList = response.data.filter((like) => {
          // return like.swipe_direction === "right";
          if (like.swipe_direction === "right") {
            return like;
          }
        });

        setLikedRestaurants(likedList);

        let correctUser = response.data.filter((user) => {
          return user.users_id === 1;
        });

        // if (likedList) {
        //   console.log("ok");
        // }

        // if (correctUser) {
        // setLikedRestaurants(likedList);
        // }
        // console.log(likedRestaurants);
        // console.log(likedList);

        // console.log(correctUser);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <main className="dashboard">
      <br />
      <br />
      <h1 className="dashboard__title">Dashboard page</h1>
      <p>Welcome to your dashboard!</p>
      <p>Here are your past likes:</p>
      {likedRestaurants.map((like) => (
        <p>{like.name}</p>
      ))}
      {/* {likedRestaurants} */}
    </main>
  );
}
export default Dashboard;
