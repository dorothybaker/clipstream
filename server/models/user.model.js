import { Schema, model } from "mongoose";

const UserSchema = new Schema(
  {
    fullName: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    subcribers: [{ type: Schema.Types.ObjectId, ref: "User", default: [] }],
    subscribingTo: [{ type: Schema.Types.ObjectId, ref: "User", default: [] }],
    image: { type: String },
  },
  { timestamps: true }
);

const User = model("User", UserSchema);

export default User;
