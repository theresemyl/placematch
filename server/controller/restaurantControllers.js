const Restaurant = require("../model/restaurantModels");

exports.listRestaurants = (req, res) => {
  res.json(Restaurant.getAll());
};
