import redis from "../../../../shared/redis/redis.js";
import { SESSION_TTL } from "../../../lib/constant.js";


export async function setSession(userId, sessionId, { name, email, avatar }) {
    try {
        await redis.set(`session-${sessionId}`, JSON.stringify({
            userId,
            name,
            email,
            avatar
        }), "EX", SESSION_TTL);

    } catch (error) {
        console.error("[setSession]", error);
        throw error;
    }
}

export async function deleteSession(sessionId) {
    try {
        await redis.del(`session-${sessionId}`);

    } catch (error) {
        console.error("[deleteSession]", error);
        throw error;
    }
}
