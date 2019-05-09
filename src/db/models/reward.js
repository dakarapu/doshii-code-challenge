//import mongoose from "mongoose";
//import db from "../index";
import mysql from "mysql";
import _ from "lodash";
import config from "config";

const { host, username, password, dbName } = config.get("database");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "doshii"
});

db.connect(err => {
  if (err) {
    throw err;
  }
  console.log("MySql Connected...");
});

export async function createReward(obj) {
  return new Promise((resolve, reject) => {
    let post = { id: obj.id, reward_name: obj.name };
    let sql = "INSERT INTO reward SET ?";
    db.query(sql, post, (err, result) => {
      if (err) reject(err);
      console.log(result);
      resolve(result);
    });
  });
}

// find all member by query
export async function getRewards() {
  return new Promise((resolve, reject) => {
    let sql = `SELECT * FROM reward`;
    db.query(sql, (err, result) => {
      if (err) reject(err);
      console.log(result);
      resolve(result);
    });
  });
}

// find a member by ID
export async function getRewardById(id) {
  return new Promise((resolve, reject) => {
    let sql = `SELECT * FROM reward WHERE id = ${id} limit 1`;
    db.query(sql, (err, result) => {
      if (err) reject(err);
      console.log(result);
      resolve(result);
    });
  });
}

export async function deleteReward(id) {
  const result = await Reward.findOneAndRemove({ memberId: id });
  return result;
}
