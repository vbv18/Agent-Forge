import redis from "../../../shared/redis/redis.js";

export async function getSession(sessionId) {
  const session = await redis.get(`session-${sessionId}`);

  return session;
}
