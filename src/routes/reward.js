import express from "express";
import * as Schemas from "../utilities/schemaDefinitions";
import * as rewardController from "../controllers/reward";
import { asyncCallbackMiddleware } from "../middleware/asyncCallback";

let router = express.Router();

// user retrieve all
router.get(
  "/rewards",
  asyncCallbackMiddleware(async (req, res) => {
    let members = await rewardController.getAll();
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
  "/rewards/:id",
  asyncCallbackMiddleware(async (req, res) => {
    let id = parseInt(req.params.id);
    const user = await rewardController.getMember(id);
    console.log("getMemberById ####################", user);
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
    let error = Schemas.memberObjValidation(req.body);
    if (error !== null) {
      return (
        res
          .status(400)
          //.send(`${error.name} : ${error.details[0].message}`);
          .send(error)
      );
    }
    let member = await rewardController.create(req.body);
    return res.status(201).send(member);
    // if (member !== undefined) {
    //   return res.status(201).send(member);
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
