import express from "express";
import {
  update,
  deleteUser,
  getUser,
  subscribe,
  unsubscribe,
  like,
  dislike,
  getAllUsers,
} from "../controllers/user.js";
import { verifyToken } from "../verifyToken.js";

const router = express.Router();

//get all users
router.get("/find/getAllUsers", getAllUsers);

//update user
router.put("/:id", verifyToken, update);

//delete user
router.delete("/:id", verifyToken, deleteUser);

//get a user
router.get("/find/:id", getUser);

//subscribe a user
router.put("/sub/:id", verifyToken, subscribe);

//unsubscribe a user
router.put("/unsub/:id", verifyToken, unsubscribe);

//like a video
router.put("/like/:videoId", verifyToken, like);

//dislike a video
router.put("/dislike/:videoId", verifyToken, dislike);

export default router;
