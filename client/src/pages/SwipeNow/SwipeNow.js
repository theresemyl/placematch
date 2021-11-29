import React, { useState, useEffect } from "react";
// import TinderCard from '../react-tinder-card/index'
import TinderCard from "react-tinder-card";
import axios from "axios";
import "./SwipeNow.scss";

let restaurantList = [];

axios
  .get("./api/restaurants")
  .then((response) => {
    const list = response.data.results.map((restaurant) => {
      return restaurant;
    });
    restaurantList.push(list);
  })
  .catch((err) => {
    console.log(err);
  });

function SwipeNow() {
  const [lastDirection, setLastDirection] = useState();

  useEffect(() => {
    console.log("re-rendering");
  });

  const mappedRestaurantList = restaurantList[0].map((restaurant) => {
    return restaurant;
  });

  const swiped = (direction, nameToDelete) => {
    console.log("removing: " + nameToDelete);
    setLastDirection(direction);
  };

  const outOfFrame = (name) => {
    console.log(name + " left the screen!");
  };

  return (
    <div>
      <h1>Swipe Now</h1>
      <div className="cardContainer">
        {mappedRestaurantList.map((restaurant) => (
          <TinderCard
            className="swipe"
            key={restaurant.name}
            onSwipe={(dir) => swiped(dir, restaurant.name)}
            onCardLeftScreen={() => outOfFrame(restaurant.name)}
          >
            <div className="card">
              <img
                src="https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/delish-homemade-pizza-horizontal-1542312378.png?crop=1.00xw:1.00xh;0,0&resize=480:*"
                alt="pizza"
              />
              <h3>{restaurant.name}</h3>
              <h3>{restaurant.vicinity}</h3>
              <p>{restaurant.place_id}</p>
            </div>
          </TinderCard>
        ))}
        <br />
        <br />
        <br />
        <br />
      </div>
      {lastDirection ? (
        <h2 className="infoText">You swiped {lastDirection}</h2>
      ) : (
        <h2 className="infoText" />
      )}
    </div>
  );
}

export default SwipeNow;
