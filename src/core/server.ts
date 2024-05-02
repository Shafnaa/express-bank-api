import bodyParser from "body-parser";
import cors from "cors";
import express, { NextFunction, Request, Response } from "express";
import passport from "passport";

import { api } from "./config";
import routes from "../api";
import { errorResponder, errorHandler, errorTypes } from "./errors";

const app = express();

// Useful if behind a reverse proxy (Heroku, Bluemix, AWS ELB, Nginx, etc).
// It shows the real origin IP in the Heroku or Cloudwatch logs.
app.enable("trust proxy");

// Enable cross origin resource sharing to all origins by default
app.use(cors());

// Enable passport for API authorization
app.use(passport.initialize());

// Middleware that transforms the raw string of req.body into JSON
app.use(bodyParser.json());

// Needed to use multipart/form-data for file uploads
app.use(bodyParser.urlencoded({ extended: false }));

// Health check endpoints
app.get("/status", (_, response) => response.status(200).end());
app.head("/status", (_, response) => response.status(200).end());

// API routes
app.use(`${api.prefix}`, routes());

// Handle 404 route
app.use((request, response, next) =>
  next(errorResponder(errorTypes.ROUTE_NOT_FOUND, "Route not found"))
);

// Error loggers
app.use((error: any, request: any, response: any, next: NextFunction) => {
  const ctx: any = {
    code: error.code,
    status: error.status,
    description: error.description,
  };

  // Log the user id who makes this request based on the API session token
  if (request.user) {
    ctx.user_id = request.user.userId || request.user.username || null;
  }

  // If this error is thrown by our code execution, then also log the stack trance
  if (error.stack) {
    ctx.stack = error.stack;
  }

  return next(error);
});

// Handle library error, e.g. JOI, Sequelize, etc.
app.use(errorHandler);

// Send error response to the caller
app.use(
  (error: any, request: Request, response: Response, next: NextFunction) =>
    response.status(error.status || 500).json({
      statusCode: error.status || 500,
      error: error.code || "UNKNOWN_ERROR",
      description: error.description || "Unknown error",
      message: error.message || "An error has occurred",
      // Handle JOI validation error
      ...(error.validationErrors && {
        validation_errors: error.validationErrors,
      }),
    })
);

export default app;
