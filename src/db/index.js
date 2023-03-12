import knex from "knex";
const db = knex({
  client: 'sqlite3', // or 'better-sqlite3'
  connection: {
    filename: "./db/data.db"
  },
  useNullAsDefault: true
})
db.raw("PRAGMA foreign_keys = ON;").then(() => {
    console.log("Foreign Key Check activated.");
});
export default db;
