import "dotenv/config"
import express,{json} from "express";
import cors from "cors";
import {urlRouter} from "./src/router/urlRouter.js";
import { connectRedisDb } from "./src/config/redisDb.js";

  (async function(){
    try{
      const {env: { FRONTEND_SERVER_URL, PORT } = {} } = process || {};
  await connectRedisDb();
  const app = express();
  app.use(cors({origin: FRONTEND_SERVER_URL}));
  app.use(json());
  app.use("/", urlRouter);
  app.listen(PORT,function () {
    console.log("Server Started Listening");
  });
    }
    catch (error) {
      console.log(error);
    }
}
  )();