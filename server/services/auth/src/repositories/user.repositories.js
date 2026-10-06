import UserModel from "../models/user.model.js";

export async function findOneUser(firebaseUid) {
  const user = await UserModel.findOne({
    firebaseUid,
  });

  return user;
}

export async function createUser({ firebaseUid, name, email, avatar }) {
  const user = await UserModel.create({
    firebaseUid,
    name,
    email,
    avatar,
  });

  return user;
}
