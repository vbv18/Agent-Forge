import redis from "../../../../shared/redis/redis.js";
import { SESSION_TTL } from "../../../lib/constant.js";

export async function setSession(userId, sessionId, { name, email, avatar }) {
  await redis.set(
    `session-${sessionId}`,
    JSON.stringify({
      userId,
      name,
      email,
      avatar,
    }),
    "EX",
    SESSION_TTL,
  );
}

export async function deleteSession(sessionId) {
  await redis.del(`session-${sessionId}`);
}
