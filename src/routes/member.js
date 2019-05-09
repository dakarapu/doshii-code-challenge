import express from "express";
import * as Schemas from "../utilities/schemaDefinitions";
import * as memberController from "../controllers/member";
import { asyncCallbackMiddleware } from "../middleware/asyncCallback";

let router = express.Router();

// retrieve the current login user with authorization
router.get(
  "/members/me",
  asyncCallbackMiddleware(async (req, res) => {
    let id = req.user._id;
    const user = await memberController.getUser(id);
    if (user !== undefined && user.length > 0) {
      // for security reasons we are just responding with below properties
      let { firstName, lastName, email, phone, role } = user;
      res.status(200).send({ firstName, lastName, email, phone, role });
    } else {
      res.status(404).send(`No user available with the requested ID`);
    }
  })
);

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
    const user = await memberController.getUser(id);
    if (user !== undefined || user.length > 0) {
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
    let error = Schemas.userObjValidation(req.body);
    if (error !== null) {
      return (
        res
          .status(400)
          //.send(`${error.name} : ${error.details[0].message}`);
          .send(error)
      );
    }
    let user = await memberController.checkIfUserExists(req.body.email);
    if (user && user.hasOwnProperty("message")) {
      user = await memberController.create(req.body);
      return res.status(201).send(user.response);
    } else {
      return res.status(400).send("User already exists with this email.");
    }
  })
);

// user update router
router.put(
  "/members/:id",
  asyncCallbackMiddleware(async (req, res) => {
    let error = Schemas.userObjValidation(req.body);
    if (error !== null) {
      return res
        .status(400)
        .send(`${error.name} : ${error.details[0].message}`);
    }
    let id = parseInt(req.params.id);
    let obj = req.body;
    let result = await memberController.update(id, obj);
    if (!result)
      return res.status(404).send("No user found with requested userId");
    return res.status(200).send(result);
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
