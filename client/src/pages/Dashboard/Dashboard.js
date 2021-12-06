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

  // const randomLike =
  //   likedRestaurants[Math.floor(Math.random() * likedRestaurants.length)];
  // console.log(randomLike);
  // const pickRandomNumber = () => {
  //   const random = Math.floor(Math.random() * 21);
  //   console.log(random);
  function getRandom() {
    // console.log(randomLike);
    const random = Math.floor(Math.random() * likedRestaurants.length);
    setRandomLike(likedRestaurants[random]);
    return randomLike;
  }

  //   return randomList[1][random];
  //   // return likedRestaurants[random];
  //   // setRandomLike(likedRestaurants[random]);
  //   // console.log(randomLike);
  // };
  // console.log(likedRestaurants[3]);
  // change this so that it only shows one random place you've swiped right on
  // add a button where you can refresh on the places you've previously liked for suggestions
  // "can't decide where to go? here are 3 places you've swiped right on!"
  console.log(randomLike);
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
        <p>
          <img
            // src={`https://maps.googleapis.com/maps/api/place/photo?maxwidth=450&photo_reference=${randomLike.photo}&key=AIzaSyD5EhTL5WqCF5ZD56zQD5WJsNRGA_0CzV0`}
            src={randomLike.photo}
            alt="restaurant"
            className="like__photo"
          />
        </p>
        <p>
          <b>{randomLike.name}</b>
        </p>
        <p>{randomLike.address}</p>
      </div>
      <br />
      <br />
      <button onClick={getRandom}>Click me</button>
      {/* <p>{pickRandomNumber().name}</p> */}
      {/* {likedRestaurants.map((like) => (
        <div key={like.id}>
          <p>
            <b>{like.name}</b>
          </p>
          <p>{like.address}</p>
        </div>
      ))} */}
      {/* {
        likedRestaurants[Math.floor(Math.random() * likedRestaurants.length)]
      } */}
      {/* <p>{randomLike.name}</p> */}
      {/* <p>{likedRestaurants[0].name}</p> */}
      {/* {likedRestaurants.map((like) => (
        <div key={like.id}>
          <p>
            <b>{like.name}</b>
          </p>
          <p>{like.address}</p>
        </div>
      ))} */}
    </main>
  );
}
export default Dashboard;
