import express from "express";

import authenticationMiddleware from "../../middlewares/authentication-middleware";
import celebrate from "../../../core/celebrate-wrappers";
import * as accountsControllers from "./accounts-controller";
import accountsValidator from "./accounts-validator";

const route = express.Router();

const accountRoute = (app: express.Router) => {
  app.use("/accounts", route);

  // Get list of accounts
  route.get("/", authenticationMiddleware, accountsControllers.getAccounts);

  // Create account
  route.post(
    "/",
    authenticationMiddleware,
    celebrate(accountsValidator.createAccount),
    accountsControllers.createAccount
  );

  // Get account detail
  route.get("/:id", authenticationMiddleware, accountsControllers.getAccount);

  // Update account
  route.put(
    "/:id",
    authenticationMiddleware,
    celebrate(accountsValidator.updateAccount),
    accountsControllers.updateAccount
  );

  // Delete account
  route.delete(
    "/:id",
    authenticationMiddleware,
    accountsControllers.deleteAccount
  );
};

export default accountRoute;
