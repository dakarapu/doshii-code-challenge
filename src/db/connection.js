import mysql from "mysql";
import config from "config";

let { hostname, username, password, dbName } = config.get("database");

const db = mysql.createConnection({
  host: hostname,
  user: username,
  password: password,
  database: dbName
});

db.connect(err => {
  if (err) {
    throw err;
  }
  console.log("Connected to Database...");
});

export default db;
