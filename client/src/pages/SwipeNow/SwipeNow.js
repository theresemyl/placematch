import axios from "axios";
import React, { Component } from "react";

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

  render() {
    return (
      <div>
        <h1>Swipe now!</h1>
        <br />
        <h2>{this.state.restaurantName}</h2>
        <h2>{this.state.restaurantAddress}</h2>
        <h2>{this.state.restaurantId}</h2>

        {/* Add an onclick here - once you click YES (swipe right), do an axios post to JSON/database
        writing in the information (state) of the restaurant info */}
        <button onClick={this.swipeLeft}>Swipe Left</button>
        <button onClick={this.swipeRight}>Swipe Right</button>
      </div>
    );
  }
}
