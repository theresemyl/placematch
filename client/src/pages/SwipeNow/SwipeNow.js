import { useState, useEffect } from "react";
import TinderCard from "react-tinder-card";
import axios from "axios";
import "./SwipeNow.scss";
import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";

require("dotenv").config();
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  textAlign: "center",
  width: 400,
  // fontFamily: "Montserrat Regular",
  bgcolor: "background.paper",
  borderRadius: 3,
  boxShadow: 24,
  p: 4,
};

// default van coords
// const lat = 49.246292;
// const lng = -123.116226;

const lat = 49.32;
const lng = -123.0724;
const radius = 3000;
const API_KEY = "AIzaSyD5EhTL5WqCF5ZD56zQD5WJsNRGA_0CzV0";

function SwipeNow({ userName, userId }) {
  const [restaurantList, setRestaurantList] = useState([]);
  const [foundUser, setFoundUser] = useState(null);
  const [foundUserName, setFoundUserName] = useState(null);
  const [swipeDirection, setSwipeDirection] = useState("");
  const [open, setOpen] = useState(false);
  const [match, setMatch] = useState(false);

  // console.log(userName, userId);
  // console.log(props);
  // console.log(userName);

  useEffect(() => {
    axios
      .get("./api/restaurants")
      .then((response) => {
        let list = response.data.results.map((restaurant) => {
          return restaurant;
        });
        setRestaurantList(list);
        // console.log(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();

    axios
      .get("http://localhost:8080/api/users/all")
      .then((response) => {
        let findUser = response.data.find((name) => {
          return name.username === event.target.name.value;
        });
        if (findUser) {
          // setFoundUser(findUser.username);
          setFoundUserName(findUser.name);
          setFoundUser(findUser.id);
        } else {
          alert("user not found");
          setFoundUser(null);
          setFoundUserName(null);
        }
        // console.log(foundUser.id);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleSwipe = (direction, name, restaurant) => {
    setSwipeDirection(direction);
    // console.log(userId);
    console.log(restaurant.photos[0].photo_reference);
    axios
      .post(`http://localhost:8080/api/users/likes`, {
        users_id: userId,
        name: name,
        address: restaurant.vicinity,
        swipe_direction: direction,
        lat: restaurant.geometry.location.lat,
        lng: restaurant.geometry.location.lng,
        photo: restaurant.photos[0].photo_reference,
      })
      .then(() => {
        // alert("posted");
        console.log(restaurant);
        console.log(name);
        setMatch(name);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const outOfFrame = (name) => {
    // console.log(name + " left the screen!");
    // console.log(foundUser);
    // console.log(userName, userId);

    axios
      .get("http://localhost:8080/api/users/all/likes")
      .then((response) => {
        const lastItem = response.data[response.data.length - 1];
        // console.log(lastItem);

        response.data.find((like) => {
          if (
            like.name === lastItem.name &&
            lastItem.swipe_direction === "right" &&
            like.swipe_direction === "right" &&
            like.users_id === foundUser
          ) {
            // setMatch(true);
            setOpen(true);
            // console.log(open);
            console.log(userId, userName);
            console.log(lastItem);
            console.log(foundUser, foundUserName);
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
              .then(() => {
                // alert("posted");
                console.log(lastItem);
              })
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
                {/* <img
                  src="https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/delish-homemade-pizza-horizontal-1542312378.png?crop=1.00xw:1.00xh;0,0&resize=480:*"
                  alt="pizza"
                /> */}

                <img
                  src={`https://maps.googleapis.com/maps/api/place/photo?maxwidth=450&photo_reference=${restaurant.photos[0].photo_reference}&key=AIzaSyD5EhTL5WqCF5ZD56zQD5WJsNRGA_0CzV0`}
                  alt="restaurant"
                  className="swipenow__photo"
                />
                <h3>{restaurant.name}</h3>
                <h3>{restaurant.vicinity}</h3>
              </div>
            </TinderCard>
          ))}

          <div>
            {/* <Button onClick={handleOpen}>Open modal</Button> */}
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
                    Congratulations! Here are the details on the restaurant that
                    you matched with.
                  </b>
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
