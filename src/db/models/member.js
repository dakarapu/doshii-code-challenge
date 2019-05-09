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

export async function createMember(obj) {
  return new Promise((resolve, reject) => {
    let post = { id: obj.id, member_name: obj.name };
    let sql = "INSERT INTO member SET ?";
    db.query(sql, post, (err, result) => {
      if (err) reject(err);
      console.log(result);
      resolve(result);
    });
  });
}

export async function createMemberReward(obj) {
  return new Promise((resolve, reject) => {
    let post = { member_id: obj.memberId, reward_id: obj.rewardId };
    let sql = "INSERT INTO member_reward SET ?";
    db.query(sql, post, (err, result) => {
      if (err) reject(err);
      console.log(result);
      resolve(result);
    });
  });
}

// find all member by query
export async function getMembers() {
  return new Promise((resolve, reject) => {
    let sql = `SELECT * FROM member`;
    db.query(sql, (err, result) => {
      if (err) reject(err);
      console.log(result);
      resolve(result);
    });
  });
}

// find a member by ID
export async function getMemberById(id) {
  return new Promise((resolve, reject) => {
    //let sql = `SELECT * FROM member WHERE id = ${id} limit 1`;
    let sql = `SELECT member_reward.member_id, member.member_name, reward.reward_name 
    FROM member_reward 
    INNER JOIN member 
    ON member_reward.member_id=member.id
    INNER JOIN reward
    ON member_reward.reward_id=reward.id 
    WHERE member_id = ${id}`;
    db.query(sql, (err, result) => {
      if (err) reject(err);
      console.log(result);
      resolve(result);
    });
  });
}

export async function deleteMember(id) {
  const result = await Member.findOneAndRemove({ memberId: id });
  return result;
}
