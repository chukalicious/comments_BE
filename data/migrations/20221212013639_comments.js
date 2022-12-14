exports.up = function (knex) {
  return knex.schema
    .createTable("users", (tbl) => {
      tbl.increments("id");
      tbl.string("email").notNullable().unique();
      tbl.string("username").unique();
      tbl.string("password", 256).notNullable();
      tbl.text("avatar");
    })
    .createTable("comments", (tbl) => {
      tbl.increments();
      tbl.string("title").notNullable();
      tbl.text("comment").notNullable();
      tbl
        .timestamp("created_at", { precision: 6 })
        .defaultTo(knex.fn.now(6))
        .notNullable();
      tbl.integer("points").notNullable();
      tbl
        .integer("user_id")
        .references("id")
        .inTable("users")
        .unsigned()
        .onDelete("CASCADE")
        .onUpdate("CASCADE");
    });
  // .createTable("replies", (tbl) => {
  //   tbl.increments();
  //   tbl.text().notNullable();
  //   tbl
  //     .bigInteger("comment_id")
  //     .references("id")
  //     .inTable("comments")
  //     .unsigned()
  //     .onDelete("CASCADE")
  //     .onUpdate("CASCADE");
  //   tbl
  //     .bigInteger("user_id")
  //     .references("id")
  //     .inTable("users")
  //     .unsigned()
  //     .onDelete("CASCADE")
  //     .onUpdate("CASCADE");
  // });
};

exports.down = function (knex) {
  return (
    knex.schema
      // .dropTableIfExists("replies")
      .dropTableIfExists("comments")
      .dropTableIfExists("users")
  );
};
