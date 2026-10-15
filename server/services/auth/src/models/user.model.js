import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    firebaseUid: { type: String, unique: true, sparse: true },
    name: String,
    email: { type: String, index: true },
    avatar: String,
  },
  {
    timestamps: true,
  },
);

const UserModel = mongoose.model("users", userSchema);

export default UserModel;
