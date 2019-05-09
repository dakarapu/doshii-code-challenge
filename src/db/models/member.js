//import mongoose from "mongoose";
import db from "../index";
import _ from "lodash";

export async function createMember(obj) {
  //let memberObj = _.pick(obj,['firstName','lastName','email','password','phone'])
  //the above variable can be used to replace in creating new Member instance
  // ex: const member = new Member(memberObj);
  console.log("DB create member: ", obj);

  try {
    let post = { id: req.body.id, name: req.body.name };
    let sql = "INSERT INTO member SET ?";
    db.query(sql, post, (err, result) => {
      if (err) throw err;
      console.log("##################################", result);
      return result;
    });
  } catch (e) {
    let errorList = [];
    for (let field in e.errors) {
      errorList.push(e.errors[field].message);
    }
    return { error: errorList };
  }
}

// find all member by query
export async function getMembers() {
  try {
    let sql = "SELECT * FROM members";
    const result = await db.query(sql);
    if (!result) return { message: "No records found" };
    return result;
  } catch (e) {
    return e.error;
  }
}

// find a member by ID
export async function getMemberById(id) {
  try {
    let sql = `SELECT * FROM members WHERE id = ${id}`;
    const result = await db.query(sql);
    if (!result) return { message: "No member found" };
    //return result;
  } catch (e) {
    return e.error;
  }
}

// find a member by email
export async function getMemberByEmail(emailId) {
  try {
    const result = await Member.findOne({ email: emailId });
    if (!result) return { message: "No member found" };
    return result;
  } catch (e) {
    return e.error;
  }
}

// this update function follows as by find and then save method
export async function searchAndUpdateMember(id) {
  const member = await Member.findById(id);
  if (!member) return;

  member.firstName = "Ravikanth";
  member.lastName = "Dakarapu";
  const result = await member.save();
  return result;
}

export async function updateMember(id, obj) {
  try {
    const result = await Member.findOneAndUpdate(
      { memberId: id },
      {
        $set: {
          firstName: obj.firstName,
          lastName: obj.lastName,
          email: obj.email,
          phone: obj.phone,
          role: obj.role
        }
      },
      { new: true }
    );
    return result;
  } catch (e) {
    return e.error;
  }
}

export async function deleteMember(id) {
  const result = await Member.findOneAndRemove({ memberId: id });
  return result;
}
