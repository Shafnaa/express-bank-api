import { port, env } from "./core/config";
import server from "./core/server";

const app = server.listen(port, () => {
  console.log(`Server runs at port ${port} in ${env} environment`);
});

// process.on("uncaughtException", (err) => {
//   console.error("Uncaught exception.");

//   // Shutdown the server gracefully
//   app.close(() => process.exit(1));

//   // If a graceful shutdown is not achieved after 1 second,
//   // shut down the process completely
//   setTimeout(() => process.abort(), 1000).unref();
//   process.exit(1);
// });
