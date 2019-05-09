import {
  createReward,
  getRewards,
  getRewardById,
  updateReward,
  deleteReward
} from "../db/models/reward";

export async function create(obj) {
  let member = await createReward(obj);
  return member;
}

export async function getAll() {
  try {
    let members = await getRewards();
    if (members.length < 1) return "No members available";
    return members;
  } catch (e) {
    return e;
  }
}

export async function getReward(id) {
  try {
    let member = await getRewardById(id);
    return member;
  } catch (e) {
    return e;
  }
}

// export async function checkIfRewardExists(id) {
//   try {
//     let member = await getRewardByEmail(id);
//     return member;
//   } catch (e) {
//     return e;
//   }
// }

export async function update(id, obj) {
  try {
    let member = await updateReward(id, obj);
    return member;
  } catch (e) {
    return e;
  }
}

export async function remove(id) {
  try {
    let member = await deleteReward(id);
    return member;
  } catch (e) {
    return e;
  }
}
