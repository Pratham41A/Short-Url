import { createClient } from "redis";
const { env: { REDIS_DB_URL } = {} } = process || {};
//Connection Idle for 5 Seconds -> Send Packets -> If Disconnected -> Reconnect 5 Times -> 1, 2, 3, 4, 5 Seconds -> Stop Reconnecting 
export const redisDbClient = createClient({
  url: REDIS_DB_URL,

  socket: {
    reconnectStrategy: (retries) => {
      return Math.min((retries + 1) * 1000, 5000);
    },
    keepAlive: 5000,
  },
});

redisDbClient.on("connect", () => console.log("REDIS connect"));
redisDbClient.on("ready", () => console.log("REDIS ready"));
redisDbClient.on("reconnecting", () => console.log("REDIS reconnecting"));
redisDbClient.on("error", (error) => console.error("REDIS error", error));
redisDbClient.on("end", () => console.log("REDIS end"));

export async function connectRedisDb() {
  const {isOpen} = redisDbClient || {};
  if (!isOpen) {
    await redisDbClient.connect();
  }
}