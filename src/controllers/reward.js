//import "@babel/polyfill";
import * as RewardModel from "../db/models/reward";

export async function create(obj) {
  try {
    let reward = await RewardModel.createReward(obj);
    return reward;
  } catch (e) {
    return e;
  }
}

export async function getAll() {
  try {
    let rewards = await RewardModel.getRewards();
    return rewards;
  } catch (e) {
    return e;
  }
}

export async function getReward(id) {
  try {
    let reward = await RewardModel.getRewardById(id);
    return reward;
  } catch (e) {
    return e;
  }
}

export async function remove(id) {
  try {
    let reward = await RewardModel.deleteReward(id);
    let rewardMember = await RewardModel.deleteRewardsByMember(id);
    return reward;
  } catch (e) {
    return e;
  }
}
