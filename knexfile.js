// Update with your database configuration settings
require("dotenv").config();

module.exports = {
  development: {
    client: "pg",
    connection: process.env.DATABASE_URL,
    migrations: {
      // get rid of the contents of the data directory before using
      // location of migrations for the database

      directory: "./data/migrations",
    },
    seeds: {
      directory: "./data/seeds",
    },
  },

  staging: {
    client: "postgresql",
    connection: {
      database: "my_db",
      user: "username",
      password: "password",
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: "knex_migrations",
    },
  },

  production: {
    client: "pg",
    connection: {
      // connectionString: process.env.DATABASE_URL,
      // Commented out to CRUD to local server
      // ssl: {
      //   require: true,
      //   rejectUnauthorized: false,
      // },
    },

    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      directory: "./data/migrations",
    },
  },
};
