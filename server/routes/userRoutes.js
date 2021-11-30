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
} = require("../controllers/userDetailControllers");

const {
  getUserLikes,
  postUserLikes,
} = require("../controllers/userLikesControllers");

// const { postJson } = require("../controllers/postJsonControllers");

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

// router.get("/:id/likes", getUserLikes);

// writing to database
router.post("/:id/likes", postUserLikes);

// test - writing to temporary json file
router.post("/likes", (req, res) => {
  console.log("req body", req.body);
  // console.log("res body", res.body);
  const { users_id, name, address, id } = req.body;

  const newLike = {
    users_id,
    name,
    address,
    id,
  };

  fs.writeFile("./data/tempLikesData.json", JSON.stringify(newLike), (err) => {
    // if (err) {
    //   res.status(500).send(err);
    // }
    console.log("file updated");
    res.status(201).json(newLike);
    // res.send("hello");
  });
});

module.exports = router;
