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
    .createTable("users_likes", function (table) {
      table.increments("id").primary();
      table.string("name").notNullable();
      table.string("address").notNullable();
      table
        .integer("users_id")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("users")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");

      table.timestamp("created_at").defaultTo(knex.fn.now());
      table.timestamp("updated_at").defaultTo(knex.fn.now());
    });
};

exports.down = function (knex) {
  return knex.schema.dropTable("users_likes").dropTable("users");
};
