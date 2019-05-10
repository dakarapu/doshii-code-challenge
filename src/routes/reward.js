import express from "express";
import * as Schemas from "../utilities/schemaDefinitions";
import * as RewardController from "../controllers/reward";
import { asyncCallbackMiddleware } from "../middleware/asyncCallback";

let router = express.Router();

// reward retrieve all
router.get(
  "/rewards",
  asyncCallbackMiddleware(async (req, res) => {
    let rewards = await RewardController.getAll();
    if (rewards === undefined) {
      res.status(500).send("Internal Server Error.");
    } else if (rewards && rewards.length < 1) {
      res.status(404).send(`No rewards available.`);
    } else {
      res.status(200).send(rewards);
    }
  })
);

// reward retrieve by id
router.get(
  "/rewards/:id",
  asyncCallbackMiddleware(async (req, res) => {
    let id = parseInt(req.params.id);
    const reward = await RewardController.getReward(id);
    if (reward !== undefined && reward.length > 0) {
      res.status(200).send(reward);
    } else {
      res.status(404).send(`No Reward available with the requested ID ${id}`);
    }
  })
);

// reward create router
router.post(
  "/rewards",
  asyncCallbackMiddleware(async (req, res) => {
    let error = Schemas.rewardObjValidation(req.body);
    if (error !== null) {
      return res.status(400).send(error);
    }
    let reward = await RewardController.create(req.body);
    if (reward === undefined || reward.hasOwnProperty("errno")) {
      return res.status(500).send(`${reward.code}: ${reward.sqlMessage}`);
    } else {
      return res.status(201).send("Reward created Successfully.");
    }
  })
);

// course delete router
router.delete(
  "/rewards/:id",
  asyncCallbackMiddleware(async (req, res) => {
    let id = parseInt(req.params.id);
    let result = await RewardController.remove(id);
    if (result && result.affectedRows === 0) {
      return res.status(404).send(`No Reward found with requested Id ${id}`);
    }
    return res.status(200).send(`Successfully deleted Reward with ID ${id}`);
  })
);

export default router;
