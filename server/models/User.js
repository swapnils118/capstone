import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
    },
    img: {
      type: String,
    },
    subscribers: {
      type: Number,
      default: 0,
    },
    subscribedUsers: {
      type: [String],
    },
    fromGoogle: {
      type: Boolean,
      default: false,
    },
    membershipType: {
      type: String,
      default: "Free",
    },
    subscriptionStatus: {
      type: String,
      enum: ["active", "inactive"],
      default: "inactive",
    },
    subscriptionExpiration: {
      type: Date,
    },
  },
  { timestamps: true }
);

export default mongoose.model("User", UserSchema);
