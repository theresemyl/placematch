const User = require("../models/userMatchesModels");

// gets data from model (DB table)
// then returns result as an express JSON response
// ernie demo: crud-demo

exports.getUserMatches = (req, res) => {
  User.findAll().then((likes) => res.json(likes));
};

exports.postUserMatches = (req, res) => {
  // post
  const userObj = { ...req.body };
  User.create(userObj).then((user) => {
    res.status(201).json({ user: userObj });
  });
};
