import redis from "../../../shared/redis/redis.js";

export async function getSession(sessionId) {
    try {
        const session = await redis.get(`session-${sessionId}`);

        return session;

    } catch (error) {
        console.error("[getSession]", error);
        throw error;
    }
}
