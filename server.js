import express from "express";
import cors from "cors";
import urlRouter from "./src/router/urlRouter.js";
import { connectRedisDb } from "./src/config/redisDb.js";
import { configDotenv } from "dotenv";





try {
  async function startServer(){
  configDotenv();
  await connectRedisDb();
  const app = express();
  app.use(cors());
  app.use(express.json());
  app.use("/api", urlRouter);

    app.use((error, req, res, next) => {
    
      res.status(error.status || 500).json({
        error: error.message || "Internal Server Error",
      });
    });

  app.listen(process.env.PORT, () => {

    console.log("App Listening On Port" + process.env.PORT);
  });
}
  startServer();
} catch (error) {
  console.error(error.message);
}


