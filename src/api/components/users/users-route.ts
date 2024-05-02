import express from "express";

import authenticationMiddleware from "../../middlewares/authentication-middleware";
import celebrate from "../../../core/celebrate-wrappers";
import * as usersControllers from "./users-controller";
import userValidator from "./users-validator";

const route = express.Router();

const userRoute = (app: express.Router) => {
  app.use("/users", route);

  // Get list of users
  route.get("/", authenticationMiddleware, usersControllers.getUsers);

  // Create user
  route.post(
    "/",
    authenticationMiddleware,
    celebrate(userValidator.createUser),
    usersControllers.createUser
  );

  // Get user detail
  route.get("/:id", authenticationMiddleware, usersControllers.getUser);

  // Update user
  route.put(
    "/:id",
    authenticationMiddleware,
    celebrate(userValidator.updateUser),
    usersControllers.updateUser
  );

  // Delete user
  route.delete("/:id", authenticationMiddleware, usersControllers.deleteUser);
};

export default userRoute;
