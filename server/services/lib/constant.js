
export const SESSION_TTL = 7 * 24 * 60 * 60; // in seconds

export const COOKIE_OPTIONS = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/"
};
