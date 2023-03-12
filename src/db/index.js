import knex from "knex";
const db = knex({
  client: 'sqlite3', // or 'better-sqlite3'
  connection: {
    filename: "./data.db"
  },
  useNullAsDefault: true
})

export default db;
