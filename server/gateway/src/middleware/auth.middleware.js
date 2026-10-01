import { getSession } from "../repositories/session.repositories.js"

export default async function authMiddleware(req, res, next) {
    try {
        const sessionId = req.cookies?.session;

        if (!sessionId) {
            return res.status(400).json({
                message: "Session not found!"
            });
        }

        const session = await getSession(sessionId);

        if (!session) {
            return res.status(400).json({
                message: "Session Expired"
            });
        }

        req.user = JSON.parse(session);

        next();

    } catch (error) {
        return res.status(500).json({
            message: "[Auth-Middleware Error] " + error
        });
    }
}
