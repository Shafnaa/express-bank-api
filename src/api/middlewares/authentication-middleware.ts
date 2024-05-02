import passport from "passport";
import passportJWT from "passport-jwt";

import { secret } from "../../core/config";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
// Authenticate user based on the JWT token
passport.use(
  "user",
  new passportJWT.Strategy(
    {
      jwtFromRequest: passportJWT.ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: secret.jwt,
    },
    async (payload, done) => {
      const user = await prisma.user.findUnique({
        where: { id: payload.user_id, email: payload.email },
      });

      return user ? done(null, user) : done(null, false);
    }
  )
);

export default passport.authenticate("user", { session: false });
