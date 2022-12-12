const knex = require("knex");
const config = require("../../knexfile.js");
const db = knex(config.development);

module.exports = {
  get,
  getByID,
  add,
  remove,
  update,
  // findDogs,
};

function get() {
  return db("users");
}

function getByID(id) {
  return db("users").where({ id }).first();
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

// function findDogs(adopterId) {
//   return db("adopters as a")
//     .join("dogs as d", "a.id", "d.adopter_id")
//     .select("a.id", "a.name", "a.email", "d.id as dog_id", "d.name as dog_name")
//     .where({ "a.id": adopterId });
// }
