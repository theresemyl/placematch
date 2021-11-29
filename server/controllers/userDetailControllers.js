const User = require("../models/userDetailModels");

// gets data from model (DB table)
// then returns result as an express JSON response
// ernie demo: crud-demo

exports.getUsers = (req, res) => {
  User.findAll().then((users) => res.json(users));
};

exports.getUserById = (req, res) => {
  User.findOne({ id: req.params.id }).then((user) => {
    if (user) {
      return res.json(user);
    }
    return res.sendStatus(404);
  });
};

exports.getUserLikes = (req, res) => {
  // get
  // findOne to find the one user
};

// exports.postUserLikes = (req, res) => {
//   // post
//   const userObj = {
//     users_id: 0,
//     name: "",
//     address: "",
//     id: 0,
//   };
//   User.create(userObj).then((user) => {
//     console.log(user);
//     res.status(201).json({ user: userObj });
//   });
// };