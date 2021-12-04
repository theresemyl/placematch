exports.up = function (knex) {
  return knex.schema.createTable("matches", function (table) {
    table.increments("id").primary();
    table.string("date").notNullable();
    table.string("name").notNullable();
    table.string("address").notNullable();
    table.string("swipe_direction").notNullable();
    table.decimal("lat", 10, 7).notNullable();
    table.decimal("lng", 10, 7).notNullable();
    table.string("photo");
    // user ID of the one who's logged in
    table.integer("matched_user_id1").unsigned();
    table
      .foreign("matched_user_id1")
      // .unsigned()
      // .notNullable()
      .references("id")
      .inTable("users")
      .onUpdate("CASCADE")
      .onDelete("CASCADE");
    // user ID of the one who you're swiping with
    table.integer("matched_user_id2").unsigned();
    table.string("matched_user_name1").notNullable();
    table.string("matched_user_name2").notNullable();
    table.timestamp("created_at").defaultTo(knex.fn.now());
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("users").dropTable("matches");
};
