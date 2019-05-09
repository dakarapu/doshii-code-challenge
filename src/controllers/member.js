import {
  createMember,
  createMemberReward,
  getMembers,
  getRewardsByMember,
  getMemberById,
  updateMember,
  deleteMember
} from "../db/models/member";

export async function create(obj) {
  let member = await createMember(obj);
  return member;
}

export async function addRewardToMember(obj) {
  let member = await createMemberReward(obj);
  return member;
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
    //return member;
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
    return member;
  } catch (e) {
    return e;
  }
}
