const bcrypt = require("bcryptjs");
const User = require("../models/userLoginModels");
const jwt = require("jsonwebtoken");

exports.signUpUser = (req, res) => {
  bcrypt
    .hash(req.body.password, 8)
    .then((password) => {
      const userObj = { ...req.body, password: password };
      User.create(userObj).then((user) => {
        const token = jwt.sign(
          { email: userObj.email },
          process.env.JWT_SECRET,
          {
            expiresIn: "24h",
          }
        );
        userObj.id = user[0];
        delete userObj.password;
        res.status(201).json({ user: userObj, token });
      });
    })
    .catch((err) => {
      res.status(400).json({ message: "Please enter required info" });
    });
};

exports.signInUser = (req, res) => {
  let confirmedUser;

  User.findOneWithPW({ email: req.body.email })
    .then((user) => {
      confirmedUser = { ...user };
      return bcrypt.compare(req.body.password, user.password);
    })
    .then((isMatch) => {
      if (!isMatch) {
        return res.status(400).json({ message: "Invalid credentials" });
      }
      const token = jwt.sign(
        { email: confirmedUser.email },
        process.env.JWT_SECRET,
        {
          expiresIn: "24h",
        }
      );
      delete confirmedUser.password;
      return res.status(200).json({ user: confirmedUser, token });
    })
    .catch((err) => res.status(500).json({ err }));
};

exports.getCurrentUser = (req, res, next) => {
  User.findOne({ email: req.user }).then((user) => {
    return res.json({ user });
  });
};
