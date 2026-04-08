import express from "express";
import {
  CreateNewPost,
  DeletePost,
  EditPost,
  ReadPost,
  ReadPostById,
} from "../Controllers/postsController.js";
import { checkSchema } from "express-validator";
import { PostValidationSchema } from "../Middleware/PostValidationSchema.js";
import { ErrorHandler } from "../Middleware/FormValidationErrorHandler.js";
import { cleanContent } from "../Middleware/PostContentValidation.js";
import { requireAdmin, requireUser } from "../Middleware/RoleAuth.js";

const router = express.Router();

router.post(
  "/api/posts",
  requireAdmin,
  checkSchema(PostValidationSchema),
  ErrorHandler,
  cleanContent,
  CreateNewPost,
);
router.put(
  "/api/posts/:id",
  requireAdmin,
  checkSchema(PostValidationSchema),
  ErrorHandler,
  cleanContent,
  EditPost,
);
router.get("/api/posts", requireUser, ReadPost);
router.get("/api/posts/:id", requireUser, ReadPostById);
router.delete("/api/posts", requireAdmin, DeletePost);
export default router;
