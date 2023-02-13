import express from "express";
import {
  getPostsFeed,
  getUserPosts,
  postLikesUpdate,
} from "../controllers/postController.js";
import { verify as verifyToken } from "jsonwebtoken";

const router = express.Router();

router.get("/", verifyToken, getPostsFeed);
router.get("/:id/posts", verifyToken, getUserPosts);

router.patch("/:id/likes", verifyToken, postLikesUpdate);

export default router;
