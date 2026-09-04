import { createClient } from "redis";
const { env: { REDIS_DB_URL } = {} } = process || {};
//Connection Idle for 5 Seconds -> Send Packets -> If Disconnected -> Reconnect 5 Times -> 1, 2, 3, 4, 5 Seconds -> Stop Reconnecting 
export const redisDbClient = createClient({
  url: REDIS_DB_URL,

  socket: {
    reconnectStrategy: function (retries) {
      return Math.min((retries + 1) * 1000, 5000);
    },
    keepAlive: 5000,
  },
});

export async function connectRedisDb() {
  const {isOpen} = redisDbClient || {};
  if (!isOpen) {
    await redisDbClient.connect();
  }
}