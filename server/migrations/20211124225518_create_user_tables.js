// exports.up = function (knex) {
//   return knex.schema.createTable("users", (table) => {
//     table.increments("id").primary();
//     table.string("username").notNullable();
//     table.string("name").notNullable();
//     table.string("password").notNullable();
//     table.string("email").notNullable();
//     table.timestamp("updated_at").defaultTo(knex.fn.now());
//   });
// };

// exports.down = function (knex) {
//   return knex.schema.dropTable("users");
// };

exports.up = function (knex) {
  return knex.schema.createTable("users", function (table) {
    table.increments();
    table.string("email").notNullable();
    table.string("password").notNullable();
    table.timestamp("created_at").defaultTo(knex.fn.now());
    table.timestamp("updated_at").defaultTo(knex.fn.now());
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("users");
};
