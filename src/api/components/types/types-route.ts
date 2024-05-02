import express from "express";

import authenticationMiddleware from "../../middlewares/authentication-middleware";
import celebrate from "../../../core/celebrate-wrappers";
import * as typesControllers from "./types-controller";
import typesValidator from "./types-validator";

const route = express.Router();

const typeRoute = (app: express.Router) => {
  app.use("/types", route);

  // Get list of types
  route.get("/", authenticationMiddleware, typesControllers.getTypes);

  // Create type
  route.post(
    "/",
    authenticationMiddleware,
    celebrate(typesValidator.createType),
    typesControllers.createType
  );

  // Get type detail
  route.get("/:id", authenticationMiddleware, typesControllers.getType);

  // Update type
  route.put(
    "/:id",
    authenticationMiddleware,
    celebrate(typesValidator.updateType),
    typesControllers.updateType
  );

  // Delete type
  route.delete("/:id", authenticationMiddleware, typesControllers.deleteType);
};

export default typeRoute;
