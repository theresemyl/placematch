import { useState, useEffect } from "react";
import TinderCard from "react-tinder-card";
import axios from "axios";
import "./SwipeNow.scss";
import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Link } from "react-router-dom";

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

function SwipeNow({ userName, userId, restaurantList, setRestaurantList }) {
  const [foundUser, setFoundUser] = useState(null);
  const [foundUserName, setFoundUserName] = useState(null);
  const [swipeDirection, setSwipeDirection] = useState("");
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [photo, setPhoto] = useState("");
  console.log("restaurant list inside Swipe Now page", restaurantList);

  useEffect(() => {
    let list = restaurantList.map((restaurant) => {
      return restaurant;
    });
    setRestaurantList(list);
    setIsLoading(true);
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();

    axios
      .get("./api/users/all")
      .then((response) => {
        let findUser = response.data.find((name) => {
          return name.username === event.target.name.value;
        });
        if (findUser) {
          setFoundUserName(findUser.name);
          setFoundUser(findUser.id);
        } else {
          alert("Sorry! User was not found. Please try again.");
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
    setPhoto(String(restaurant.photos[0].getUrl()));
    axios
      .post(`./api/users/likes`, {
        users_id: userId,
        name: restaurant.name,
        address: restaurant.vicinity,
        swipe_direction: direction,
        lat: Number(restaurant.geometry.location.lat()),
        lng: Number(restaurant.geometry.location.lng()),
        photo: String(restaurant.photos[0].getUrl()),
      })
      .then(() => {})
      .catch((err) => {
        console.log(err);
      });
  };

  const outOfFrame = (name) => {
    axios
      .get("./api/users/all/likes")
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
            axios
              .post(`./api/users/matches`, {
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

  if (restaurantList === null) {
    return (
      <>
        <br />
        <br />
        <br />
        <br />
        <h3>
          Sorry! No restaurants were found in your search. Please try again.
        </h3>
      </>
    );
  }

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

          {restaurantList.length === -1 ? (
            <h1>Oops! Something went wrong. Please try again. </h1>
          ) : (
            restaurantList.map((restaurant) => (
              <TinderCard
                className="swipe"
                key={restaurant.id}
                onSwipe={(dir) => handleSwipe(dir, restaurant.name, restaurant)}
                onCardLeftScreen={() => outOfFrame(restaurant.name)}
                preventSwipe={["up", "down"]}
              >
                <div className="card">
                  {/* <img
                    src={photo}
                    alt="restaurant"
                    className="swipenow__photo"
                  /> */}
                  <img
                    src={
                      restaurant.photos[0].getUrl()
                        ? restaurant.photos[0].getUrl()
                        : "This restaurant has no photo"
                    }
                    alt="restaurant"
                    className="swipenow__photo"
                  />
                  <h3>{restaurant.name}</h3>
                  <h3>{restaurant.vicinity}</h3>
                </div>
              </TinderCard>
            ))
          )}

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
