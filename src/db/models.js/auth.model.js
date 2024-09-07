import { model, Schema } from "mongoose";

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    name: {
      type: String,
      required: true,
      minlength: 3,
    },

    password: {
      type: String,
      required: true,
      minlength: 8,
    },
    role: { type: String, default: "user" },
  },
  { timestamps: true }
);

const User = model("User", userSchema);

export default User;
