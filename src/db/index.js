//import mongoose from "mongoose";
import mysql from "mysql";
import config from "config";

const { host, username, password, dbName } = config.get("database");

const db = function() {
  try {
    const connection = mysql.createConnection({
      host: host,
      user: username,
      password: "",
      database: dbName
    });
    connection.connect();

    // let createDB = await connection.query(
    //   "CREATE DATABASE IF NOT EXISTS doshii"
    // );
    // let memberTable = await connection.query(
    //   "CREATE TABLE IF NOT EXISTS member (id INT NOT NULL PRIMARY KEY,member_name VARCHAR(200))"
    // );
    // let rewardTable = await connection.query(
    //   "CREATE TABLE IF NOT EXISTS reward (id INT NOT NULL PRIMARY KEY,reward_name VARCHAR(200))"
    // );
    // let memberRewardTable = await connection.query(
    //   "CREATE TABLE IF NOT EXISTS member_reward (id int NOT NULL AUTO_INCREMENT,member_id INT NOT NULL,reward_id INT NOT NULL,PRIMARY KEY (id),FOREIGN KEY (member_id) REFERENCES member(id),FOREIGN KEY (reward_id) REFERENCES reward(id))"
    // );

    return connection;
  } catch (e) {
    throw e;
  }

  // mongoose
  //   .connect(`mongodb://${host}/${db}`)
  //   .then(() => {
  //     console.info("Connection to Database is established...");
  //   })
  //   .catch(err => {
  //     console.error("Error connecting to MongoDB: ", err);
  //     process.exit(1); // exiting app process if can't make database connection
  //   });
};

export default db;
