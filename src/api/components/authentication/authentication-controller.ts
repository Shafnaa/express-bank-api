import { RateLimiterRedis } from "rate-limiter-flexible";
import { errorResponder, errorTypes } from "../../../core/errors";
import * as authenticationServices from "./authentication-service";
import { Request, Response, NextFunction } from "express";
import { createClient } from "redis";

const redisClient = createClient({
  password: "NLN8cA7leKVUIIbkOA0KZL9Kme3ymvQ1",
  socket: {
    host: "redis-10205.c302.asia-northeast1-1.gce.redns.redis-cloud.com",
    port: 10205,
  },
  disableOfflineQueue: true,
});

const maxConsecutiveFailsByUsername = 5;

const limiterConsecutiveFailsByUsername = new RateLimiterRedis({
  storeClient: redisClient,
  useRedisPackage: true,
  keyPrefix: "login_fail_consecutive_username",
  points: maxConsecutiveFailsByUsername,
  duration: 60 * 30, // Store number for 30 minutes since first fail
  blockDuration: 60 * 30, // Block for 30 minutes
});

/**
 * Handle login request
 * @param {object} request - Express request object
 * @param {object} response - Express response object
 * @returns {object} Response object or pass an error to the next route
 */
export async function login(request: Request, response: Response) {
  await redisClient.connect();
  const { email, password } = request.body;
  const rlResUsername = await limiterConsecutiveFailsByUsername.get(email);
  try {
    if (
      rlResUsername !== null &&
      rlResUsername.consumedPoints > maxConsecutiveFailsByUsername
    ) {
      const retrySecs = Math.round(rlResUsername.msBeforeNext / 1000) || 1;

      console.log(`User ${email} can retry after ${retrySecs} seconds`);

      throw errorResponder(
        errorTypes.FORBIDDEN,
        `Try again after ${retrySecs} seconds`
      );
    } else {
      // Check login credentials
      const loginSuccess = await authenticationServices.checkLoginCredentials(
        email,
        password
      );

      if (!loginSuccess) {
        await limiterConsecutiveFailsByUsername.consume(email);

        console.log(
          `User ${email} make mistake ${
            (rlResUsername?.consumedPoints || 0) + 1
          } times`
        );

        throw errorResponder(
          errorTypes.INVALID_CREDENTIALS,
          `Wrong email or password. Try ${
            (rlResUsername?.consumedPoints || 0) + 1
          }`
        );
      }

      if (rlResUsername !== null && rlResUsername.consumedPoints > 0) {
        // Reset on successful authorisation
        await limiterConsecutiveFailsByUsername.delete(email);
      }

      console.log(`User ${email} has successfully logged in`);

      await redisClient.disconnect();

      return response.status(200).json(loginSuccess);
    }
  } catch (error) {
    await redisClient.disconnect();

    return response.status(443).send(error);
  }
}
