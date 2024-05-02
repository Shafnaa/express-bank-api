import jwt from "jsonwebtoken";

import { secret } from "../core/config";

export function generateToken(email: string, userId: number): string {
  // Sign the JWT token with user info and set the expiration date
  return jwt.sign(
    {
      email,
      userId,
    },
    secret.jwt,
    {
      expiresIn: secret.jwtExpiresIn,
    }
  );
}
