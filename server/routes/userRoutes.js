const express = require("express");
const router = express.Router();
const uniqid = require("uniqid");

const auth = require("../middleware/auth");

const {
  signInUser,
  signUpUser,
  getCurrentUser,
} = require("../controllers/userLoginControllers");

const {
  getUsers,
  getUserById,
} = require("../controllers/userDetailControllers");

const {
  postUserLikes,
  getUserLikes,
} = require("../controllers/userLikesControllers");

const {
  postUserMatches,
  getUserMatches,
} = require("../controllers/userMatchesControllers");

// signup, login, get user that's logged in
router.post("/signup", signUpUser);
router.post("/login", signInUser);
router.get("/current", auth, getCurrentUser);

// get users
router.get("/all", getUsers);
router.get("/:id", getUserById);

// writing to & getting LIKES database
router.get("/all/likes", getUserLikes);
router.post("/likes", postUserLikes);

// writing to & getting MATCHES database
router.get("/all/matches", getUserMatches);
router.post("/matches", postUserMatches);

module.exports = router;
