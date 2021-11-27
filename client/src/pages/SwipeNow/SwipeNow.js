import axios from "axios";
import React, { Component } from "react";
import "./SwipeNow.scss";
import TinderCard from "react-tinder-card";

export default class SwipeNow extends Component {
  state = {
    currentCard: "",
    restaurantList: [],
    restaurantName: "",
    restaurantAddress: "",
    restaurantId: "",
  };

  componentDidMount() {
    console.log("mounted");
    axios
      .get("./api/restaurants")
      .then((response) => {
        // console.log(response.data.results[0].name);
        // console.log(this.props.match.params.id);
        const list = response.data.results.map((restaurant) => {
          //   console.log(restaurant.name, restaurant.vicinity);
          return restaurant;
          //   return restaurant.name, restaurant.vicinity
        });
        const randomIndex = Math.floor(Math.random() * 20);
        // console.log(randomIndex);
        // console.log(list);
        this.setState({
          restaurantName: list[randomIndex].name,
          restaurantId: list[randomIndex].place_id,
          restaurantAddress: list[randomIndex].vicinity,
          //   restaurantName: list.restaurant,
          //   restaurantAddress: list.vicinity,
          //   restaurantName: response.data.results[0].name,
          //   restaurantAddress: response.data.results[0].vicinity,
        });
        return;
      })
      .catch((err) => {
        console.log(err);
      });
  }

  componentDidUpdate(prevProps, prevState) {
    // console.log(prevProps);
    // console.log(prevState);
    console.log(prevState.restaurantId);
    console.log(this.state.restaurantId);
    // if (prevState.restaurantId === this.state.restaurantId) {
    //   console.log("yes");
    // }
    // if (this.state.restaurantList !== "") {
    //   console.log("yes");
    // }
  }

  swipeRight = (event) => {
    console.log("swiped right");
    // console.log(this.state.restaurantName);
    console.log(event.target);
    const newRestaurant = {
      name: this.state.restaurantName,
      address: this.state.restaurantAddress,
      id: this.state.restaurantId,
    };
    this.state.restaurantList.push(newRestaurant);
    // console.log(this.state.restaurantList);
    // console.log(newRestaurant);
  };

  swipeLeft = () => {
    console.log("swiped left");
  };

  //   onSwipe = (direction) => {
  //     console.log("You swiped: " + direction);
  //   };

  //   onCardLeftScreen = (myIdentifier) => {
  //     console.log(myIdentifier + " left the screen");
  //   };

  //   swiped = (direction, nameToDelete) => {
  //     console.log("removing: " + nameToDelete);
  //   };

  //   outOfFrame = (name) => {
  //     console.log(name + " left the screen!");
  //   };

  render() {
    return (
      <div className="swipenow">
        <h1>Swipe now!</h1>
        <br />
        <div
          className="swipenow__card"
          //   onSwipe={(dir) => this.props.swiped(dir, this.state.restaurantName)}
          //   onCardLeftScreen={() =>
          //     this.props.outOfFrame(this.state.restaurantName)
          //   }
        >
          <img
            src="https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/delish-homemade-pizza-horizontal-1542312378.png?crop=1.00xw:1.00xh;0,0&resize=480:*"
            alt="pizza"
          />
          <h2>{this.state.restaurantName}</h2>
          <h2>{this.state.restaurantAddress}</h2>
          <p>ID: {this.state.restaurantId}</p>
          <button onClick={this.swipeLeft}>Swipe Left</button>
          <button onClick={this.swipeRight}>Swipe Right</button>
          <br />
          <br />
        </div>
        <br />
        <br />
        <br />
        <TinderCard
          onSwipe={this.props.onSwipe}
          onCardLeftScreen={() => this.props.onCardLeftScreen("fooBar")}
          preventSwipe={["right", "left"]}
          className="swipenow__card"
        >
          <br />
          <br />
          <br />
          Hello, World!
          <br />
          <br />
          <br />
        </TinderCard>
        <br />
        <br />
        <br />
        {/* Add an onclick here - once you click YES (swipe right), do an axios post to JSON/database
        writing in the information (state) of the restaurant info */}
      </div>
    );
  }
}
