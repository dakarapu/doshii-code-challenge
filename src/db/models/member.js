import db from "../connection";

export async function createMember(obj) {
  return new Promise((resolve, reject) => {
    let post = { id: obj.id, member_name: obj.name };
    let sql = "INSERT INTO member SET ?";
    db.query(sql, post, (err, result) => {
      if (err) reject(err);
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
      resolve(result);
    });
  });
}

export async function getMembers() {
  return new Promise((resolve, reject) => {
    let sql = `SELECT * FROM member`;
    db.query(sql, (err, result) => {
      if (err) reject(err);
      resolve(result);
    });
  });
}

export async function getMemberById(id) {
  return new Promise((resolve, reject) => {
    let sql = `select * from member WHERE id = ${id}`;
    db.query(sql, (err, res) => {
      if (err) reject(err);
      resolve(res);
    });
  });
}

export async function getRewardsByMember(id) {
  return new Promise((resolve, reject) => {
    let sql = `SELECT member_reward.member_id, reward.id, reward.reward_name 
    FROM member_reward 
    INNER JOIN reward
    ON member_reward.reward_id=reward.id 
    WHERE member_id = ${id}`;
    db.query(sql, (err, res) => {
      if (err) reject(err);
      resolve(res);
    });
  });
}

export async function deleteMember(id) {
  return new Promise((resolve, reject) => {
    let sql = `DELETE FROM member WHERE id=${id}`;
    db.query(sql, (err, res) => {
      if (err) reject(err);
      resolve(res);
    });
  });
}

export async function deleteRewardsByMember(id) {
  return new Promise((resolve, reject) => {
    let sql = `DELETE FROM member_reward WHERE member_id=${id}`;
    db.query(sql, (err, res) => {
      if (err) reject(err);
      resolve(res);
    });
  });
}

export async function truncateMemberTable() {
  return new Promise((resolve, reject) => {
    let sql = `TRUNCATE member`;
    db.query(sql, (err, res) => {
      if (err) reject(err);
      resolve(res);
    });
  });
}

export async function truncateMemberRewardTable() {
  return new Promise((resolve, reject) => {
    let sql = `TRUNCATE member_reward`;
    db.query(sql, (err, res) => {
      if (err) reject(err);
      resolve(res);
    });
  });
}
