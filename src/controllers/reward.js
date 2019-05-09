import {
  createReward,
  getRewards,
  getRewardById,
  updateReward,
  deleteReward
} from "../db/models/reward";

export async function create(obj) {
  let reward = await createReward(obj);
  return reward;
}

export async function getAll() {
  try {
    let rewards = await getRewards();
    if (rewards.length < 1) return "No rewards available";
    return rewards;
  } catch (e) {
    return e;
  }
}

export async function getReward(id) {
  try {
    let reward = await getRewardById(id);
    return reward;
  } catch (e) {
    return e;
  }
}

// export async function checkIfRewardExists(id) {
//   try {
//     let reward = await getRewardByEmail(id);
//     return reward;
//   } catch (e) {
//     return e;
//   }
// }

export async function update(id, obj) {
  try {
    let reward = await updateReward(id, obj);
    return reward;
  } catch (e) {
    return e;
  }
}

export async function remove(id) {
  try {
    let reward = await deleteReward(id);
    return reward;
  } catch (e) {
    return e;
  }
}
