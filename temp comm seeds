exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("comments")
    .truncate()
    .then(function () {
      // Inserts seed entries
      return knex("comments").insert([
        {
          id: 1,
          date: "2022-12-11",
          comment: "This is a comment I made",
          user_id: 1,
          points: 1,
        },
      ]);
    });
};
