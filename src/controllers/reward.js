import {
  createReward,
  getRewards,
  getRewardById,
  updateReward,
  deleteReward,
  deleteRewardsByMember
} from "../db/models/reward";

export async function create(obj) {
  try {
    let reward = await createReward(obj);
    return reward;
  } catch (e) {
    return e;
  }
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

export async function remove(id) {
  try {
    let reward = await deleteReward(id);
    let rewardMember = await deleteRewardsByMember(id);
    return reward;
  } catch (e) {
    return e;
  }
}
