import {
  createMember,
  getMembers,
  getMemberById,
  //getMemberByEmail,
  updateMember,
  //searchAndUpdateMember,
  deleteMember
} from "../db/models/member";

export async function create(obj) {
  let member = await createMember(obj);
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
    return member;
  } catch (e) {
    return e;
  }
}

// export async function checkIfMemberExists(id) {
//   try {
//     let member = await getMemberByEmail(id);
//     return member;
//   } catch (e) {
//     return e;
//   }
// }

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
