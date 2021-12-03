const userMatchesData = require("../seed_data/userMatches");

exports.seed = function (knex) {
  return knex("matches")
    .del()
    .then(function () {
      return knex("matches").insert(userMatchesData);
    });
};
