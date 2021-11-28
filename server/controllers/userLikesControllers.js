const User = require("../models/userLikesModels");

// gets data from model (DB table)
// then returns result as an express JSON response
// ernie demo: crud-demo

exports.postUserLikes = (req, res) => {
  // post
  const userObj = {
    users_id: 0,
    name: "",
    address: "",
    id: 0,
  };
  User.create(userObj).then((user) => {
    console.log(user);
    res.status(201).json({ user: userObj });
  });
};
