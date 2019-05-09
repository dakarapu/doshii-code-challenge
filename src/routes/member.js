import express from "express";
import * as Schemas from "../utilities/schemaDefinitions";
import * as memberController from "../controllers/member";
import { asyncCallbackMiddleware } from "../middleware/asyncCallback";

let router = express.Router();

// user retrieve all
router.get(
  "/members",
  asyncCallbackMiddleware(async (req, res) => {
    let members = await memberController.getAll();
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
    const user = await memberController.getMember(id);
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
    console.log("This is USER Req Body:", req.body);
    let error = Schemas.memberObjValidation(req.body);
    if (error !== null) {
      return (
        res
          .status(400)
          //.send(`${error.name} : ${error.details[0].message}`);
          .send(error)
      );
    }
    let member = await memberController.create(req.body);
    return res.status(201).send(member);
    // if (member !== undefined) {
    //   return res.status(201).send(member);
    // } else {
    //   return res.status(400).send("User already exists with this ID.");
    // }
  })
);

// addReward  router
router.post(
  "/member/:memberId/reward/:rewardId",
  asyncCallbackMiddleware(async (req, res) => {
    console.log("This is USER Req Body:", req.params);
    let reqObj = {
      memberId: req.params.memberId,
      rewardId: req.params.rewardId
    };
    let error = Schemas.memberRewardObjValidation(reqObj);
    if (error !== null) {
      return (
        res
          .status(400)
          //.send(`${error.name} : ${error.details[0].message}`);
          .send(error)
      );
    }
    let member = await memberController.addRewardToMember(reqObj);
    return res.status(201).send(member);
    // if (member !== undefined) {
    //   return res.status(201).send(member);
    // } else {
    //   return res.status(400).send("User already exists with this ID.");
    // }
  })
);

// user delete router
router.delete(
  "/members/:id",
  asyncCallbackMiddleware(async (req, res) => {
    let id = parseInt(req.params.id);
    let result = await memberController.remove(id);
    if (!result)
      return res.status(404).send("No user found with requested userId");
    return res.status(200).send(result);
  })
);

export default router;
