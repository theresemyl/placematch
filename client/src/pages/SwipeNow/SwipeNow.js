import React, { useState, useEffect } from "react";
import TinderCard from "react-tinder-card";
import axios from "axios";
import "./SwipeNow.scss";

function SwipeNow() {
  const [restaurantList, setRestaurantList] = useState([]);
  const [foundUser, setFoundUser] = useState(null);
  const [swipeDirection, setSwipeDirection] = useState("");

  useEffect(() => {
    axios
      .get("./api/restaurants")
      .then((response) => {
        let list = response.data.results.map((restaurant) => {
          return restaurant;
        });
        setRestaurantList(list);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleSwipe = (direction, name, restaurant) => {
    setSwipeDirection(direction);

    axios
      .post(`./api/users/likes`, {
        users_id: 1,
        name: name,
        address: restaurant.vicinity,
        // id: restaurantId,
        swipe_direction: direction,
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
  };

  const outOfFrame = (name) => {
    // console.log(name + " left the screen!");
  };

  return (
    <div>
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
            <i> {foundUser}!</i>
          </h2>
          <br />
          {restaurantList.map((restaurant) => (
            <TinderCard
              className="swipe"
              key={restaurant.name}
              onSwipe={(dir) => handleSwipe(dir, restaurant.name, restaurant)}
              onCardLeftScreen={() => outOfFrame(restaurant.name)}
              preventSwipe={["up", "down"]}
            >
              <div className="card">
                <img
                  src="https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/delish-homemade-pizza-horizontal-1542312378.png?crop=1.00xw:1.00xh;0,0&resize=480:*"
                  alt="pizza"
                />
                <h3>{restaurant.name}</h3>
                <h3>{restaurant.vicinity}</h3>
              </div>
            </TinderCard>
          ))}
        </div>
      )}

      {swipeDirection ? (
        <h3 className="infoText">You swiped {swipeDirection}</h3>
      ) : (
        <></>
      )}
    </div>
  );
}

export default SwipeNow;
