import express from "express";
import {
  addVideo,
  updateVideo,
  deleteVideo,
  getVideo,
  getAllVideos,
  getAllVideosUser,
  addView,
  trend,
  random,
  sub,
  getByTag,
  search,
  latestVideo,
  getAllVideoByCategory,
  selectEmoji,
  getSelectedEmoji,
  buyVideo,
  checkPurchasedUsers,
} from "../controllers/video.js";
import { verifyToken } from "../verifyToken.js";

const router = express.Router();

// Create, update, and delete a video
router.post("/", verifyToken, addVideo);
router.put("/:id", verifyToken, updateVideo);
router.delete("/:id", verifyToken, deleteVideo);

// Fetch a video and all videos
router.get("/find/:id", getVideo);
router.get("/getAllVideos", getAllVideos);
router.get("/getAllVideosUser/:id", getAllVideosUser);

// Update view count
router.put("/view/:id", addView);

// Trending and random videos
router.get("/trend", trend);
router.get("/random", random);

// Subscription videos
router.get("/sub", verifyToken, sub);

// Get videos by tags and search
router.get("/tags", getByTag);
router.get("/search", search);

// Latest and category-specific videos
router.get("/latestVideo", latestVideo);
router.get("/:category", getAllVideoByCategory);

// Select and fetch selected emoji
router.put("/selectEmoji/:id", verifyToken, selectEmoji);
router.get("/selectedEmoji/:id", getSelectedEmoji);

//Check if a video is bought
router.get("/checkPurchasedUsers/:videoId/:userId", checkPurchasedUsers);

//Buy a video
router.put("/buyVideo/:videoId/:userId", buyVideo);

export default router;
