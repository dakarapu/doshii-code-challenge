import express from "express";
import * as Schemas from "../utilities/schemaDefinitions";
import * as MemberController from "../controllers/member";
import { asyncCallbackMiddleware } from "../middleware/asyncCallback";

let router = express.Router();

// homepage
router.get(
  "/",
  asyncCallbackMiddleware(async (req, res) => {
    res.status(200).send("Welcome to homepage!!");
  })
);

// user retrieve all
router.get(
  "/members",
  asyncCallbackMiddleware(async (req, res) => {
    let members = await MemberController.getAll();
    if (members === undefined) {
      res.status(500).send("Internal Server Error.");
    } else if (members && members.length < 1) {
      res.status(404).send(`No members available.`);
    } else {
      res.status(200).send(members);
    }
  })
);

// user retrieve by id
router.get(
  "/members/:id",
  asyncCallbackMiddleware(async (req, res) => {
    let id = parseInt(req.params.id);
    const user = await MemberController.getMember(id);
    if (user !== undefined) {
      res.status(200).send(user);
    } else {
      res.status(404).send(`No user available with the requested ID`);
    }
  })
);

// user create router
router.post(
  "/members",
  asyncCallbackMiddleware(async (req, res) => {
    let error = Schemas.memberObjValidation(req.body);
    if (error !== null) {
      return res.status(400).send(error);
    }
    let member = await MemberController.create(req.body);
    if (member === undefined || member.hasOwnProperty("errno")) {
      return res.status(500).send(`${member.code}: ${member.sqlMessage}`);
    } else {
      return res.status(201).send("Member created Successfully");
    }
  })
);

// addReward  router
router.post(
  "/members/:memberId/rewards/:rewardId",
  asyncCallbackMiddleware(async (req, res) => {
    let reqObj = {
      memberId: req.params.memberId,
      rewardId: req.params.rewardId
    };
    let error = Schemas.memberRewardObjValidation(reqObj);
    if (error !== null) {
      return res.status(400).send(error);
    }
    let member = await MemberController.addRewardToMember(reqObj);

    if (member && member.hasOwnProperty("errorMessage")) {
      return res.status(500).send(member.errorMessage);
    }
    return res.status(201).send("Successfully added Reward to the Member.");
  })
);

// user delete router
router.delete(
  "/members/:id",
  asyncCallbackMiddleware(async (req, res) => {
    let id = parseInt(req.params.id);
    let result = await MemberController.remove(id);
    if (result && result.affectedRows === 0) {
      return res.status(404).send(`No Member found with requested Id ${id}`);
    }
    return res.status(200).send(`Successfully deleted Member with ID ${id}`);
  })
);

export default router;
