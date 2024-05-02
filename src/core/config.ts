import dotenv from "dotenv";

// Set the NODE_ENV to 'development' by default.
process.env.NODE_ENV = (process.env.NODE_ENV || "development").toLowerCase();

// Environment variables should be saved in a file named `.env` in the `./config` directory.
// See `.env.example` for example.
const envFound = dotenv.config({ path: ".env" });
if (envFound.error) {
  throw new Error("⚠️ Couldn't find .env file ⚠️");
}

const api = { prefix: "/api" };
const database = {
  connection: process.env.DATABASE_URL!,
};
const port = process.env.PORT || 5000;
const secret = {
  jwt: process.env.JWT_SECRET || "JWT_SECRET",
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || "1d",
};

const env = process.env.NODE_ENV!;

export { api, database, port, secret, env };
