const userLikesData = require("../seed_data/userLikes");

exports.seed = function (knex) {
  return knex("likes")
    .del()
    .then(function () {
      return knex("likes").insert(userLikesData);
    });
};
