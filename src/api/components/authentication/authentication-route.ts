import express from "express";

import * as authenticationControllers from "./authentication-controller";
import authenticationValidator from "./authentication-validator";
import celebrate from "../../../core/celebrate-wrappers";

const route = express.Router();

const authenticationRoute = (app: express.Router) => {
  app.use("/authentication", route);

  route.post(
    "/login",
    celebrate(authenticationValidator.login),
    authenticationControllers.login
  );
};

export default authenticationRoute;
