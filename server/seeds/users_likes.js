const userLikesData = require("../seed_data/userLikes");

exports.seed = function (knex) {
  return knex("userLikes")
    .del()
    .then(function () {
      return knex("userLikes").insert(userLikesData);
    });
};
