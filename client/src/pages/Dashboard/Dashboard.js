//must be logged in to see this page
import React, { useState, useEffect } from "react";
import axios from "axios";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  borderRadius: 3,
  boxShadow: 24,
  p: 4,
};

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
