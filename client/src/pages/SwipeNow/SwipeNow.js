import React, { useState, useEffect } from "react";
import TinderCard from "react-tinder-card";
import axios from "axios";
import "./SwipeNow.scss";

// let restaurantList = [];

function SwipeNow() {
  const [lastDirection, setLastDirection] = useState();
  const [swipeWith, setSwipeWith] = useState("");
  // const [restaurantName, setRestaurantName] = useState();
  const [restaurantList, setRestaurantList] = useState([]);
  const [restaurantName, setRestaurantName] = useState("");
  const [restaurantAddress, setRestaurantAddress] = useState("");
  const [restaurantId, setRestaurantId] = useState();

  useEffect(() => {
    console.log("re-rendering");

    axios
      .get("./api/restaurants")
      .then((response) => {
        // console.log(response.data.results);
        let list = response.data.results.map((restaurant) => {
          setRestaurantName(restaurant.name);
          setRestaurantAddress(restaurant.vicinity);
          setRestaurantId(restaurant.place_id);
          return restaurant;
        });
        // restaurantList.push(list);
        setRestaurantList(list);
        // const randomIndex = Math.floor(Math.random() * 20);
        // setRestaurantName(response.data.results[0].name);
        // console.log(restaurantList[0].name);

        // set state for other stuff here too
      })
      .catch((err) => {
        console.log(err);
      });

    // set state of restaurant list
    // setRestaurantList(mappedRestaurantList);
  }, []);

  const swiped = (direction, name) => {
    // console.log("removing: " + name);
    setLastDirection(direction);
    console.log(restaurantName);
    // console.log(restaurantAddress);
    // console.log(restaurantId);
    // test
    axios
      .post(`./api/users/likes`, {
        users_id: 1,
        restaurantName,
        restaurantAddress,
        restaurant_id: 1,
        // liked: true,
      })
      .then(() => {
        alert("posted");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setSwipeWith(event);
  };

  const outOfFrame = (name) => {
    // console.log(name + " left the screen!");
  };

  return (
    <div>
      {swipeWith === "" ? (
        <div>
          <br />
          <br />
          <h1>Who would you like to swipe with today?</h1>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              label="name"
              placeholder="Enter friend's username here..."
              className="input__field"
            />
            <br />
            <button>Enter</button>
          </form>
        </div>
      ) : (
        <div className="cardContainer">
          <h2>
            You are currently swiping with <i>{swipeWith.target.name.value}</i>!
          </h2>
          <br />
          {restaurantList.map((restaurant) => (
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
      )}
      {lastDirection ? (
        <h3 className="infoText">You swiped {lastDirection}</h3>
      ) : (
        <></>
      )}
    </div>
  );
}

export default SwipeNow;
