const express = require("express");
const router = express.Router();
const fs = require("fs");
const uniqid = require("uniqid");
// const { listUsers } = require("../controllers/userControllers");
// const userControllers = require("../controllers/userControllers");

// router.route("/").get(userControllers.index);

const auth = require("../middleware/auth");
const {
  signInUser,
  signUpUser,
  getCurrentUser,
} = require("../controllers/userLoginControllers");

const {
  getUsers,
  getUserById,
  getUserLikes,
  postUserLikes,
} = require("../controllers/userDetailControllers");
/**
 * POST /api/users/signup
 */
router.post("/signup", signUpUser);

/**
 * POST /api/users/login
 */
router.post("/login", signInUser);

/**
 * @api {post} /api/users/current
 * Authentication required
 */
router.get("/current", auth, getCurrentUser);

// get all users
// "/api/users/all"
router.get("/all", getUsers);

router.get("/:id", getUserById);

router.get("/:id/likes", getUserLikes);

router.post("/:id/likes", postUserLikes);

module.exports = router;
