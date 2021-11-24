const express = require("express");
const router = express.Router();
const fs = require("fs");
const uniqid = require("uniqid");
const { listRestaurants } = require("../controller/restaurantControllers");

router.get("/", listRestaurants);

module.exports = router;
