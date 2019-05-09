import express from "express";
import * as Schemas from "../utilities/schemaDefinitions";
import * as rewardController from "../controllers/reward";
import { asyncCallbackMiddleware } from "../middleware/asyncCallback";

let router = express.Router();

// user retrieve all
router.get(
  "/rewards",
  asyncCallbackMiddleware(async (req, res) => {
    let rewards = await rewardController.getAll();
    if (rewards === undefined) {
      res.status(500).send("Internal Server Error.");
    } else if (rewards && rewards.length < 1) {
      res.status(404).send(`No rewards available.`);
    } else {
      res.status(200).send(rewards);
    }
  })
);

// user retrieve by id
router.get(
  "/rewards/:id",
  asyncCallbackMiddleware(async (req, res) => {
    let id = parseInt(req.params.id);
    const user = await rewardController.getReward(id);
    console.log("getRewardById ####################", user);
    if (user !== undefined) {
      res.status(200).send(user);
    } else {
      res.status(404).send(`No user available with the requested ID`);
    }
  })
);

// user create router
router.post(
  "/rewards",
  asyncCallbackMiddleware(async (req, res) => {
    console.log("This is USER Req Body:", req.body);
    let error = Schemas.rewardObjValidation(req.body);
    if (error !== null) {
      return (
        res
          .status(400)
          //.send(`${error.name} : ${error.details[0].message}`);
          .send(error)
      );
    }
    let reward = await rewardController.create(req.body);
    return res.status(201).send(reward);
    // if (reward !== undefined) {
    //   return res.status(201).send(reward);
    // } else {
    //   return res.status(400).send("User already exists with this ID.");
    // }
  })
);

// // course update router
// router.put(
//   "/rewards/:id",
//   asyncCallbackMiddleware(async (req, res) => {
//     let error = Schemas.rewardObjValidation(req.body);
//     if (error !== null) {
//       return res.send(`${error.name} : ${error.details[0].message}`);
//     }
//     let id = parseInt(req.params.id);
//     let obj = req.body;
//     let result = await rewardController.update(id, obj);
//     if (!result)
//       return res.status(404).send("No course found with requested courseId");
//     return res.status(200).send(result);
//   })
// );

// // course delete router
// router.delete(
//   "/rewards/:id",
//   asyncCallbackMiddleware(async (req, res) => {
//     let id = parseInt(req.params.id);
//     let result = await rewardController.remove(id);
//     if (!result)
//       return res.status(404).send("No course found with requested courseId");
//     return res.status(200).send(result);
//   })
// );

export default router;
