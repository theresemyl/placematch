const userLikesData = require("../seed_data/userLikes");

exports.seed = function (knex) {
  return knex("users_likes")
    .del()
    .then(function () {
      return knex("users_likes").insert(userLikesData);
    });
};
