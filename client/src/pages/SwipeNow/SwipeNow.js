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
  const [foundUser, setFoundUser] = useState(null);

  useEffect(() => {
    console.log("re-rendering");

    axios
      .get("./api/restaurants")
      .then((response) => {
        // console.log(response.data.results);
        let list = response.data.results.map((restaurant) => {
          // setRestaurantName(restaurant.name);
          // setRestaurantAddress(restaurant.vicinity);
          // setRestaurantId(restaurant.place_id);
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

    // handleSubmit();
  }, []);

  const swiped = (direction, name, restaurant) => {
    // console.log("removing: " + name);

    if (direction === "right") {
      console.log("yay");
    } else if (direction === "left") {
      console.log("nay");
    }
    setLastDirection(direction);
    console.log(name);
    console.log(restaurant.vicinity);
    console.log(restaurant.place_id);

    setRestaurantName(name);
    setRestaurantAddress(restaurant.vicinity);
    setRestaurantId(restaurant.place_id);
    // set state to the above, and then in following, post with that state
    console.log(restaurantAddress);
    axios
      .post(`./api/users/likes`, {
        users_id: 1,
        name: name,
        address: restaurantAddress,
        id: restaurantId,
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

    axios
      .get("./api/users/all")
      .then((response) => {
        let findUser = response.data.find((name) => {
          return name.username === event.target.name.value;
          // console.log(response.data);
          // name from the database is this:
          // console.log(name.name);
          // console.log(event.target.name.value);
          // want to find the one that === event.target.value
        });

        if (findUser) {
          setFoundUser(findUser.username);
        } else {
          alert("user not found");
          setFoundUser(null);
        }
      })
      .catch((err) => {
        console.log(err);
      });

    // setSwipeWith(event);
  };

  const outOfFrame = (name) => {
    // console.log(name + " left the screen!");
  };

  return (
    <div>
      {/* {swipeWith === "" ? ( */}
      {foundUser === null ? (
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
            You are currently swiping with
            {/* <i> {swipeWith.target.name.value}</i>! */}
            <i> {foundUser}!</i>
          </h2>
          <br />
          {restaurantList.map((restaurant) => (
            <TinderCard
              className="swipe"
              key={restaurant.name}
              onSwipe={(dir) => swiped(dir, restaurant.name, restaurant)}
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
                <p>restaurant address: {restaurantAddress}</p>
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
