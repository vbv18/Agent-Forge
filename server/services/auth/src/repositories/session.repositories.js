import redis from "../../../../shared/redis/redis.js";


export async function setSession(userId, sessionId, { name, email, avatar }) {
    try {
        await redis.set(`session-${sessionId}`, JSON.stringify({
            userId,
            name,
            email,
            avatar
        }), "EX", 7 * 24 * 60 * 60);

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
