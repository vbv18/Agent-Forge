import UserModel from "../models/user.model.js";

export async function findOneUser(firebaseUid) {
    try {
        const user = await UserModel.findOne({
            firebaseUid
        })

        return user;

    } catch (error) {
        console.error("[findOneUser]", error);
        throw error;
    }
}

export async function createUser({ firebaseUid, name, email, avatar }) {
    try {
        const user = await UserModel.create({
            firebaseUid,
            name,
            email,
            avatar
        })

        return user;

    } catch (error) {
        console.error("[createUser]", error);
        throw error;
    }
}