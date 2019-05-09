import express from "express";
import * as Schemas from "../utilities/schemaDefinitions";
import * as rewardController from "../controllers/reward";
import { asyncCallbackMiddleware } from "../middleware/asyncCallback";
let router = express.Router();

/* GET home page. */
router.get("/", (req, res) => {
  res.send("Welcome to homepage!!");
});

// course retrieve all
router.get(
  "/rewards",
  // middleware function to handle this callback
  asyncCallbackMiddleware(async (req, res) => {
    let rewards = await rewardController.getAll();
    if (rewards === undefined) {
      res.status(500).send("Internal Server Error.");
    } else if (rewards && rewards.length < 1) {
      res.status(404).send(`No course availables`);
    } else {
      res.status(200).send(rewards);
    }
  })
);

// course retrieve by id
router.get(
  "/rewards/:id",
  asyncCallbackMiddleware(async (req, res) => {
    const course = await rewardController.getCourse(req.params.id);
    if (course !== undefined || course.length > 0) {
      res.status(200).send(course);
    } else {
      res.status(404).send(`No course available with the requested ID`);
    }
  })
);

// course create router
router.post(
  "/rewards",
  asyncCallbackMiddleware(async (req, res) => {
    let error = Schemas.rewardObjValidation(req.body);
    if (error !== null) {
      return res.send(`${error.name} : ${error.details[0].message}`);
    }

    try {
      let result = await rewardController.create(req.body);
      if (result.error) return res.status(400).send(result.error);
      return res.status(201).send(result.response);
    } catch (e) {
      return res.status(500).send("Internal Server Error.");
    }
  })
);

// course update router
router.put(
  "/rewards/:id",
  asyncCallbackMiddleware(async (req, res) => {
    let error = Schemas.rewardObjValidation(req.body);
    if (error !== null) {
      return res.send(`${error.name} : ${error.details[0].message}`);
    }
    let id = parseInt(req.params.id);
    let obj = req.body;
    let result = await rewardController.update(id, obj);
    if (!result)
      return res.status(404).send("No course found with requested courseId");
    return res.status(200).send(result);
  })
);

// course delete router
router.delete(
  "/rewards/:id",
  asyncCallbackMiddleware(async (req, res) => {
    let id = parseInt(req.params.id);
    let result = await rewardController.remove(id);
    if (!result)
      return res.status(404).send("No course found with requested courseId");
    return res.status(200).send(result);
  })
);

export default router;
