exports.up = function (knex) {
  return knex.schema.createTable("likes", function (table) {
    table.increments("id").primary();
    table.string("name").notNullable();
    table.string("address").notNullable();
    table.string("swipe_direction").notNullable();
    table.decimal("lat", 10, 7).notNullable();
    table.decimal("lng", 10, 7).notNullable();
    table.string("photo", 1000);
    table.integer("users_id").unsigned();
    table
      .foreign("users_id")
      // .unsigned()
      // .notNullable()
      .references("id")
      .inTable("users")
      .onUpdate("CASCADE")
      .onDelete("CASCADE");
    table.timestamp("created_at").defaultTo(knex.fn.now());
    table.timestamp("updated_at").defaultTo(knex.fn.now());
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("users").dropTable("likes");
};
