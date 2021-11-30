exports.up = function (knex) {
  return knex.schema
    .createTable("users", function (table) {
      table.increments("id").primary();
      table.string("email").notNullable();
      table.string("username").notNullable();
      table.string("name").notNullable();
      table.string("password").notNullable();
      table.timestamp("created_at").defaultTo(knex.fn.now());
      table.timestamp("updated_at").defaultTo(knex.fn.now());
    })
    .createTable("likes", function (table) {
      table.increments("restaurant_id").primary();
      table.string("restaurantName").notNullable();
      table.string("restaurantAddress").notNullable();
      table
        .integer("users_id")
        .unsigned()
        // .notNullable()
        .references("users_id")
        .inTable("users")
        .onUpdate("CASCADE")
        .foreign("users_id")
        .onDelete("CASCADE");

      table.timestamp("created_at").defaultTo(knex.fn.now());
      table.timestamp("updated_at").defaultTo(knex.fn.now());
    });
};

exports.down = function (knex) {
  return knex.schema.dropTable("likes").dropTable("users");
};
