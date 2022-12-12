exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("users")
    .truncate()
    .then(function () {
      // Inserts seed entries
      return knex("users").insert([
        { id: 1, username: "Gris", avatar: "" },
        { id: 2, username: "Alvaro", avatar: "" },
        { id: 3, username: "Kat", avatar: "" },
      ]);
    });
};
