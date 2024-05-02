import express from "express";
import authenticationRoute from "./components/authentication/authentication-route";
import userRoute from "./components/users/users-route";
import accountRoute from "./components/accounts/accounts-route";
import transactionsRoute from "./components/transactions/transactions-route";
import typeRoute from "./components/types/types-route";

export default function api() {
  const app = express.Router();

  authenticationRoute(app);
  userRoute(app);
  accountRoute(app);
  transactionsRoute(app);
  typeRoute(app);

  return app;
}
