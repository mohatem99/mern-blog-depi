import { Router } from "express";
import { auth } from "../../middlewares/auth.middleware.js";
import {
  createPost,
  getPost,
  getPosts,
  deletePost,
  updatePost,
} from "./posts.controller.js";
const router = Router();
router.route("/").post(createPost).get(getPosts);
router.route("/:id").get(getPost).delete(auth, deletePost).put(updatePost);
export default router;
