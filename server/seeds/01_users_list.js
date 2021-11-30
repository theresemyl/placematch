const userData = require("../seed_data/users");

exports.seed = function (knex) {
  return knex("users")
    .del()
    .then(function () {
      return knex("users").insert(userData);
    });
};
