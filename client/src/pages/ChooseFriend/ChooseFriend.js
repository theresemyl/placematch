import { useState, useEffect } from "react";
import axios from "axios";
import * as React from "react";
import { Link } from "react-router-dom";
import { API_URL } from "../../config";

function ChooseFriend(
  props
  // {
  //   history,
  //   userName,
  //   userId,
  //   restaurantList,
  //   setRestaurantList,
  //   foundUser,
  //   setFoundUser,
  //   foundUserName,
  //   setFoundUserName,
  //   handleChange,
  // }
) {
  //   const [foundUser, setFoundUser] = useState(null);
  //   const [foundUserName, setFoundUserName] = useState(null);
  console.log("found username in choose friend", props.foundUserName);
  //   useEffect(() => {
  //     if (foundUser !== null) {
  //       console.log("not null", foundUserName);
  //     }
  //   }, [foundUser, foundUserName]);

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .get(API_URL + "/api/users/all")
      .then((response) => {
        let findUser = response.data.find((name) => {
          return name.username === event.target.name.value;
        });
        console.log(findUser);
        if (findUser) {
          //   handleChange(findUser.name);
          // props.handleChange("hi");
          props.setFoundUserName(findUser.name);
          props.setFoundUser(findUser.id);
          props.history.push("./location");
        } else {
          alert("Sorry! User was not found. Please try again.");
          props.setFoundUser(null);
          props.setFoundUserName(null);
        }
        return response;
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //   let handleChange = (value) => {
  //       props.onChange()
  //   }

  return (
    <main>
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
          <button>Swipe Now</button>
          {/* <button onClick={(event) => props.handleChange(event)}>
            Swipe Now
          </button> */}

          {/* <Link to="./swipenow">Click to start swiping!</Link> */}
        </form>
      </div>
    </main>
  );
}

export default ChooseFriend;
