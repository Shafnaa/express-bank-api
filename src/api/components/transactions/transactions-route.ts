import express from "express";

import authenticationMiddleware from "../../middlewares/authentication-middleware";
import celebrate from "../../../core/celebrate-wrappers";
import * as transactionsControllers from "./transactions-controller";
import transactionsValidator from "./transactions-validator";

const route = express.Router();

const transactionsRoute = (app: express.Router) => {
  app.use("/transactions", route);

  // Get list of transactions
  route.get(
    "/",
    authenticationMiddleware,
    transactionsControllers.getTransactions
  );

  // Create transaction
  route.post(
    "/",
    authenticationMiddleware,
    celebrate(transactionsValidator.createTransaction),
    transactionsControllers.createTransaction
  );

  // Get transaction detail
  route.get(
    "/:id",
    authenticationMiddleware,
    transactionsControllers.getTransaction
  );

  // Update transaction
  route.put(
    "/:id",
    authenticationMiddleware,
    celebrate(transactionsValidator.updateTransaction),
    transactionsControllers.updateTransaction
  );

  // Delete transaction
  route.delete(
    "/:id",
    authenticationMiddleware,
    transactionsControllers.deleteTransaction
  );
};

export default transactionsRoute;
