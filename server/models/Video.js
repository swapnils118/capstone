import mongoose from "mongoose";

const VideoSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    imgUrl: {
      type: String,
      required: true,
    },
    videoUrl: {
      type: String,
      required: true,
    },
    views: {
      type: Number,
      default: 0,
    },
    tags: {
      type: [String],
      default: [],
    },
    category: {
      type: [String],
      default: [],
    },
    likes: {
      type: [String],
      default: [],
    },
    dislikes: {
      type: [String],
      default: [],
    },
    selectedEmoji: {
      type: String,
      default: "",
    },
    videoType: {
      type: String,
      enum: ["Free", "Paid"],
      default: "Free",
    },
    price: {
      type: Number, // Store price as a number
      default: 0,
      get: (v) => (v / 100).toFixed(2), // Format price to have two decimal places when retrieved
      set: (v) => Math.round(v * 100), // Convert price to cents before saving
    },
    usersPurchased: {
      type: [String],
      default: [],
    },
  },
  { timestamps: true }
);

export default mongoose.model("Video", VideoSchema);
