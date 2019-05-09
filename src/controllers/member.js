import {
  createMember,
  createMemberReward,
  getMembers,
  getRewardsByMember,
  getMemberById,
  updateMember,
  deleteMember,
  deleteRewardsByMember
} from "../db/models/member";

import { getRewardById } from "../db/models/reward";

export async function create(obj) {
  try {
    let member = await createMember(obj);
    return member;
  } catch (e) {
    return e;
  }
}

export async function addRewardToMember(obj) {
  try {
    let checkMemberReward = await getRewardsByMember(obj.memberId);
    if (checkMemberReward && checkMemberReward.length > 0) {
      return {
        errorMessage: `The Member with ID ${
          obj.memberId
        } is already associated with Reward ID ${obj.rewardId}`
      };
    }
    let checkMember = await getMemberById(obj.memberId);
    if (checkMember && checkMember.length < 1) {
      return { errorMessage: `No Member found with the ID ${obj.memberId}` };
    }
    let checkReward = await getRewardById(obj.rewardId);
    if (checkReward && checkReward.length < 1) {
      return { errorMessage: `No Reward found with the ID ${obj.rewardId}` };
    }
    let member = await createMemberReward(obj);
    return member;
  } catch (e) {
    return e;
  }
}

export async function getAll() {
  try {
    let members = await getMembers();
    if (members.length < 1) return "No members available";
    return members;
  } catch (e) {
    return e;
  }
}

export async function getMember(id) {
  try {
    let member = await getMemberById(id);
    let rewards = await getRewardsByMember(id);
    let memberData = {};
    if (member && member.length > 0) {
      memberData.member_id = member[0].id;
      memberData.member_name = member[0].member_name;
      memberData.rewards = rewards;
    } else {
      return member;
    }
    return memberData;
  } catch (e) {
    return e;
  }
}

export async function update(id, obj) {
  try {
    let member = await updateMember(id, obj);
    return member;
  } catch (e) {
    return e;
  }
}

export async function remove(id) {
  try {
    let member = await deleteMember(id);
    let reward = await deleteRewardsByMember(id);
    return member;
  } catch (e) {
    return e;
  }
}
