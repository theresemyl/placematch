import { useState, useEffect } from "react";
import TinderCard from "react-tinder-card";
import axios from "axios";
import "./SwipeNow.scss";
import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Link } from "react-router-dom";

require("dotenv").config();
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  textAlign: "center",
  width: 400,
  bgcolor: "background.paper",
  borderRadius: 3,
  boxShadow: 24,
  p: 4,
};

function SwipeNow(
  { userName, userId, restaurantList, setRestaurantList },
  props
) {
  const [swipeRestaurantList, setSwipeRestaurantList] = useState([]);
  const [foundUser, setFoundUser] = useState(null);
  const [foundUserName, setFoundUserName] = useState(null);
  const [swipeDirection, setSwipeDirection] = useState("");
  const [open, setOpen] = useState(false);
  const [match, setMatch] = useState(false);
  console.log("restaurant list inside Swipe Now page", restaurantList);

  useEffect(() => {
    let list = restaurantList.map((restaurant) => {
      return restaurant;
    });
    setRestaurantList(list);
    // axios
    // .get("./api/restaurants")
    // .then((response) => {
    //   let list = response.data.results.map((restaurant) => {
    //     return restaurant;
    //   });
    //   setSwipeRestaurantList(list);
    //   // console.log(response.data);
    // })
    // .catch((err) => {
    //   console.log(err);
    // });
  }, [setRestaurantList]);

  const handleSubmit = (event) => {
    event.preventDefault();

    axios
      .get("http://localhost:8080/api/users/all")
      .then((response) => {
        let findUser = response.data.find((name) => {
          return name.username === event.target.name.value;
        });
        if (findUser) {
          setFoundUserName(findUser.name);
          setFoundUser(findUser.id);
        } else {
          alert("user not found");
          setFoundUser(null);
          setFoundUserName(null);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleSwipe = (direction, name, restaurant) => {
    setSwipeDirection(direction);
    console.log("logging restaurant", restaurant);
    console.log(String(restaurant.photos[0].getUrl()));
    axios
      .post(`http://localhost:8080/api/users/likes`, {
        users_id: userId,
        name: restaurant.name,
        address: restaurant.vicinity,
        swipe_direction: direction,
        lat: Number(restaurant.geometry.location.lat()),
        lng: Number(restaurant.geometry.location.lng()),
        photo: String(restaurant.photos[0].getUrl()),
      })
      .then(() => {
        console.log(restaurant);
        console.log(name);
        setMatch(name);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const outOfFrame = (name) => {
    axios
      .get("http://localhost:8080/api/users/all/likes")
      .then((response) => {
        const lastItem = response.data[response.data.length - 1];
        response.data.find((like) => {
          if (
            like.name === lastItem.name &&
            lastItem.swipe_direction === "right" &&
            like.swipe_direction === "right" &&
            like.users_id === foundUser
          ) {
            setOpen(true);
            console.log("last item", lastItem);
            axios
              .post(`http://localhost:8080/api/users/matches`, {
                date: Date.now(),
                name: lastItem.name,
                address: lastItem.address,
                swipe_direction: lastItem.swipe_direction,
                lat: lastItem.lat,
                lng: lastItem.lng,
                photo: lastItem.photo,
                matched_user_id1: userId,
                matched_user_id2: foundUser,
                matched_user_name1: userName,
                matched_user_name2: foundUserName,
              })
              .then(() => {})
              .catch((err) => {
                console.log(err);
              });
          }
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleClose = () => setOpen(false);

  return (
    <div>
      {foundUser === null ? (
        <div>
          <br />
          <br />
          <br />
          <br />
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
            <i> {foundUserName}!</i>
          </h2>
          <br />
          {restaurantList.map((restaurant) => (
            <TinderCard
              className="swipe"
              key={restaurant.id}
              onSwipe={(dir) => handleSwipe(dir, restaurant.name, restaurant)}
              onCardLeftScreen={() => outOfFrame(restaurant.name)}
              preventSwipe={["up", "down"]}
            >
              <div className="card">
                <img
                  src={restaurant.photos[0].getUrl()}
                  alt="restaurant"
                  className="swipenow__photo"
                />
                <h3>{restaurant.name}</h3>
                <h3>{restaurant.vicinity}</h3>
              </div>
            </TinderCard>
          ))}

          <div>
            <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={style}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                  🎉
                  <br />
                  <b>You and {foundUserName} matched!</b>
                </Typography>
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                  <b>
                    Congratulations! Click below to see more of your matches and
                    pick a place to go.
                  </b>
                  <br />
                  <br />
                  <Link to="matches">See Matches</Link>
                </Typography>
              </Box>
            </Modal>
          </div>
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
