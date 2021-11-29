import axios from "axios";
import React, { Component } from "react";
import "./SwipeNow.scss";
import TinderCard from "react-tinder-card";
import Input from "../../components/Input/Input";

export default class SwipeNow extends Component {
  state = {
    id: 1,
    currentCard: "",
    restaurantName: "",
    restaurantAddress: "",
    restaurantId: "",
    liked: false,
    swipeWith: "",
  };

  restaurantList = [];

  componentDidMount() {
    console.log("mounted");
    axios
      .get("./api/restaurants")
      .then((response) => {
        const list = response.data.results.map((restaurant) => {
          return restaurant;
        });
        this.restaurantList.push(list);
        const randomIndex = Math.floor(Math.random() * 20);
        this.setState({
          restaurantName: list[randomIndex].name,
          restaurantId: list[randomIndex].place_id,
          restaurantAddress: list[randomIndex].vicinity,
        });
        return;
      })
      .catch((err) => {
        console.log(err);
      });
  }

  componentDidUpdate(prevProps, prevState) {
    console.log(prevState.restaurantId);
    console.log(this.state.restaurantId);
    if (this.state.restaurantId === null) {
      console.log("id null");
      // axios
      //   .get("./api/restaurants")
      //   .then((response) => {
      //     const list = response.data.results.map((restaurant) => {
      //       return restaurant;
      //     });
      //     this.restaurantList.push(list);
      //     const randomIndex = Math.floor(Math.random() * 20);
      //     this.setState({
      //       restaurantName: list[randomIndex].name,
      //       restaurantId: list[randomIndex].place_id,
      //       restaurantAddress: list[randomIndex].vicinity,
      //     });
      //     return;
      //   })
      //   .catch((err) => {
      //     console.log(err);
      //   });
    }
    // console.log(this.restaurantList[0]);
    // console.log(prevProps);
    // const randomIndex = Math.floor(Math.random() * 20);
    // const test = this.restaurantList.map((restaurant) => {
    //   return restaurant[randomIndex].name;
    // });

    // this.setState({ restaurantName: "" });
    // console.log(test);
  }

  onSwipe = (direction) => {
    console.log("You swiped: " + direction);
  };

  onCardLeftScreen = (myIdentifier) => {
    console.log(myIdentifier + " left the screen");
    // this.setState({ restaurantName: "", restaurantId: null });
    this.setState({ liked: false });
  };

  swiped = (direction, nameToDelete) => {
    console.log("removing: " + nameToDelete);
    const { restaurantName, restaurantAddress, restaurantId, liked } =
      this.state;

    axios
      .post(`http://localhost:8080/api/users/likes`, {
        id: 1,
        restaurantName,
        restaurantAddress,
        restaurantId,
        liked,
      })
      .then(() => {
        alert("posted");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // everytime you swipe, adds to an empty array first?

  outOfFrame = (name) => {
    console.log(name + " left the screen!");
    this.setState({ restaurantName: "", restaurantId: null });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    this.setState({ swipeWith: event.target.name.value });
    console.log(this.state.swipeWith);
  };

  render() {
    return (
      <div className="swipenow">
        {this.state.swipeWith === "" ? (
          <div>
            <br />
            <br />
            <br />
            <br />
            <h1>Who would you like to swipe with today?</h1>
            <form onSubmit={this.handleSubmit}>
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
          <div>
            <h1>Swipe now!</h1>
            <br />
            {this.restaurantList.map((restaurant) => (
              <TinderCard
                className="swipenow__card"
                onSwipe={(dir) => this.swiped(dir, this.state.restaurantName)}
                onCardLeftScreen={() =>
                  this.outOfFrame(this.state.restaurantName)
                }
              >
                <img
                  src="https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/delish-homemade-pizza-horizontal-1542312378.png?crop=1.00xw:1.00xh;0,0&resize=480:*"
                  alt="pizza"
                />

                <h3>{this.state.restaurantName}</h3>
                <h3>{this.state.restaurantAddress}</h3>
                <p>ID: {this.state.restaurantId}</p>
                {/* <button onClick={this.swipeLeft}>Swipe Left</button>
          <button onClick={this.swipeRight}>Swipe Right</button> */}
                <br />
              </TinderCard>
            ))}
          </div>
        )}
        <br />
        {/* <TinderCard
          className="swipenow__card"
          onSwipe={(dir) => this.swiped(dir, this.state.restaurantName)}
          onCardLeftScreen={() => this.outOfFrame(this.state.restaurantName)}
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
        <br /> */}
      </div>
    );
  }
}