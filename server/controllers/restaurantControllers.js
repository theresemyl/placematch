const Restaurant = require("../models/restaurantModels");

exports.listRestaurants = (req, res) => {
  res.json(Restaurant.getAll());
};
