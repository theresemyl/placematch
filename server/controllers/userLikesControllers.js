const User = require("../models/userLikesModels");

exports.getUserLikes = (req, res) => {
  User.findAll().then((likes) => res.json(likes));
};

exports.postUserLikes = (req, res) => {
  // post
  const userObj = { ...req.body };
  User.create(userObj).then((user) => {
    res.status(201).json({ user: userObj });
  });
};
