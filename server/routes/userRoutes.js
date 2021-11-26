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
} = require("../controllers/users");

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

module.exports = router;
