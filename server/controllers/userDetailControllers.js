const User = require("../models/userDetailModels");

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
