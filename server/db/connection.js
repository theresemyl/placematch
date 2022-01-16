const configs = require("../knexfile");
const knex = require("knex");
// const knex =
//   process.env.NODE_ENV === "production"
//     ? require("knex")(require("../knexfile").production)
//     : require("knex")(require("../knexfile").development);

const connection = knex(configs);

module.exports = connection;
