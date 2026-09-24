import mongoose from "mongoose";

const userSchema = new Mongoose.Schema({
    firebaseUid: { type: String, unique: true },
    name: String,
    email: String,
    avatar: String
}, {
    timestamps: true
});

const UserModel = mongoose.model("users", userSchema);

export default UserModel;