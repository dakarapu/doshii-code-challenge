import db from "../connection";

export async function createReward(obj) {
  return new Promise((resolve, reject) => {
    let post = { id: obj.id, reward_name: obj.name };
    let sql = "INSERT INTO reward SET ?";
    db.query(sql, post, (err, result) => {
      if (err) reject(err);
      resolve(result);
    });
  });
}

export async function getRewards() {
  return new Promise((resolve, reject) => {
    let sql = `SELECT * FROM reward`;
    db.query(sql, (err, result) => {
      if (err) reject(err);
      resolve(result);
    });
  });
}

export async function getRewardById(id) {
  return new Promise((resolve, reject) => {
    let sql = `SELECT * FROM reward WHERE id = ${id} limit 1`;
    db.query(sql, (err, result) => {
      if (err) reject(err);
      resolve(result);
    });
  });
}

export async function deleteReward(id) {
  return new Promise((resolve, reject) => {
    let sql = `DELETE FROM reward WHERE id=${id}`;
    db.query(sql, (err, res) => {
      if (err) reject(err);
      resolve(res);
    });
  });
}

export async function deleteRewardsByMember(id) {
  return new Promise((resolve, reject) => {
    let sql = `DELETE FROM member_reward WHERE reward_id=${id}`;
    db.query(sql, (err, res) => {
      if (err) reject(err);
      resolve(res);
    });
  });
}

export async function truncateRewardTable() {
  return new Promise((resolve, reject) => {
    let sql = `TRUNCATE reward`;
    db.query(sql, (err, res) => {
      if (err) reject(err);
      resolve(res);
    });
  });
}
