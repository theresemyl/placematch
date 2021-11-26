const configs = require("../knexfile");
const knex = require("knex");
const connection = knex(configs);

module.exports = connection;
