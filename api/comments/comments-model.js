const knex = require("knex");
const config = require("../../knexfile.js");
const db = knex(config.development);

module.exports = {
  get,
  getByID,
  add,
  update,
  destroy,
};

function get() {
  return db("comments as c")
    .join("users as u", "c.user_id", "u.id")
    .select(
      "c.id",
      "c.title",
      "c.comment",
      "c.created_at",
      "c.points",
      "u.username",
      "u.avatar"
    );
}

function getByID(id) {
  return db("comments").where({ id }).first();
}

function add(comment) {
  return db("comments")
    .insert(comment)
    .into("comments")
    .then((comment) => {
      return comment;
    });
}

function update(id, changes) {
  return db("comments").where({ id }).update(changes, "*");
}

function destroy(id) {
  return db("comments").where({ id }).del();
}
