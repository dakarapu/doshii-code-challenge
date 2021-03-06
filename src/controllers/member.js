import * as MemberModel from "../db/models/member";
import * as RewardModel from "../db/models/reward";

export async function create(obj) {
  try {
    let member = await MemberModel.createMember(obj);
    return member;
  } catch (e) {
    return e;
  }
}

export async function addRewardToMember(obj) {
  try {
    let checkMemberReward = await MemberModel.getRewardsByMember(obj.memberId);
    if (
      checkMemberReward &&
      checkMemberReward.length > 0 &&
      checkMemberReward.id === obj.rewardId &&
      checkMemberReward.member_id === obj.memberId
    ) {
      return {
        errorMessage: `The Member with ID ${
          obj.memberId
        } is already associated with Reward ID ${obj.rewardId}`
      };
    }
    let checkMember = await MemberModel.getMemberById(obj.memberId);
    if (checkMember && checkMember.length < 1) {
      return { errorMessage: `No Member found with the ID ${obj.memberId}` };
    }
    let checkReward = await RewardModel.getRewardById(obj.rewardId);
    if (checkReward && checkReward.length < 1) {
      return { errorMessage: `No Reward found with the ID ${obj.rewardId}` };
    }
    let member = await MemberModel.createMemberReward(obj);
    return member;
  } catch (e) {
    return e;
  }
}

export async function getAll() {
  try {
    let members = await MemberModel.getMembers();
    return members;
  } catch (e) {
    return e;
  }
}

export async function getMember(id) {
  try {
    let member = await MemberModel.getMemberById(id);
    let rewards = await MemberModel.getRewardsByMember(id);
    let memberData = {};
    if (member && member.length > 0) {
      memberData.rewards = [];
      memberData.member_id = member[0].id;
      memberData.member_name = member[0].member_name;
      if (rewards && rewards.length > 0) {
        memberData.rewards = rewards;
      }
      return memberData;
    } else {
      return memberData;
    }
  } catch (e) {
    return e;
  }
}

export async function remove(id) {
  try {
    let member = await MemberModel.deleteMember(id);
    let reward = await MemberModel.deleteRewardsByMember(id);
    return member;
  } catch (e) {
    return e;
  }
}
