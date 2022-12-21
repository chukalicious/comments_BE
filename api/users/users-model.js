const knex = require("knex");
const config = require("../../knexfile.js");
const db = knex(config.development);

module.exports = {
  get,
  getByID,
  findBy,
  add,
  remove,
  update,
};

function get() {
  return db("users");
}

function getByID(id) {
  return db("users").where({ id }).first();
}

function findBy(filter) {
  return db("users").where(filter);
}

function add(user) {
  return db("users")
    .insert(user)
    .into("users")
    .then((user) => {
      return user;
    });
}

function remove(id) {
  return db("users").where({ id }).del();
}

function update(id, changes) {
  return db("users").where({ id }).update(changes, "*");
}
