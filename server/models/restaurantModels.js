const fs = require("fs"),
  path = require("path"),
  restaurantsFile = path.join(__dirname, "../data/sampleData.json"),
  uniqid = require("uniqid");

class Restaurant {
  constructor(restaurantName) {
    this.Restaurant = restaurantName;
  }
}

const getAll = () => {
  const data = fs.readFileSync(restaurantsFile);
  return JSON.parse(data);
};

module.exports = { getAll };
