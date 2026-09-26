import { getAuth } from "firebase-admin/auth";

import { app } from "../config/firebase.js"
import { findOneUser, createUser } from "../repositories/user.repositories.js";
import { deleteSession, setSession } from "../repositories/session.repositories.js";
import { SESSION_TTL, COOKIE_OPTIONS } from "../lib/constant.js";


export async function login(req, res) {
    try {
        const { token } = req.body;

        const decoded = await getAuth(app).verifyIdToken(token);
        let user = await findOneUser(decoded.uid);

        if (!user) {
            user = await createUser(decoded);
        }

        const sessionId = crypto.randomUUID();

        await setSession(user._id, sessionId, decoded);

        res.cookie("session", sessionId, {
            ...COOKIE_OPTIONS,
            maxAge: SESSION_TTL * 1000
        });

        return res.status(200).json({
            message: "Logged In Successfuly",
            user
        })

    } catch (error) {
        console.error("[Login Error]", error);

        return res.status(500).json({
            message: "Internal server error"
        });
    }
}

export async function logout(req, res) {
    try {
        const sessionId = req.cookies?.session;

        if (sessionId) {
            await deleteSession(sessionId);
        }

        res.clearCookie("session", COOKIE_OPTIONS);

        return res.status(200).json({
            message: "Logged Out Successfuly"
        });

    } catch (error) {
        console.error("[Logout Error]", error);

        return res.status(500).json({
            message: "Internal server error"
        });
    }
}