import express from "express";
import {
  CreateNewPost,
  DeletePost,
  EditPost,
  GetDeletePresignedUrl,
  GetPutPresignedUrl,
  ReadPost,
  ReadPostById,
} from "../Controllers/postsController.js";
import { checkSchema } from "express-validator";
import { PostValidationSchema } from "../Middleware/ValidationSchemas/PostValidationSchema.js";
import { ErrorHandler } from "../Middleware/ValidationSchemas/ErrorHandler.js";
import { cleanContent } from "../Middleware/ValidationSchemas/PostContentValidation.js";
import { requireAdmin, requireUser } from "../Middleware/RoleAuth.js";
import { UpdatePostValidationSchema } from "../Middleware/ValidationSchemas/UpdatePostValidationSchema.js";
import { ParamsIDValidator } from "../Middleware/ValidationSchemas/ParamsIDValidator.js";
import { PresignedUrlQuerySchema } from "../Middleware/ValidationSchemas/PresignedUrlQuerySchema.js";
import { DeletePresignedUrlQuerySchema } from "../Middleware/ValidationSchemas/DeletePresignedUrlSchema.js";
import { csrfMiddleware } from "../Middleware/Csrf.js";

const router = express.Router();

router.post(
  "/api/posts",
  csrfMiddleware,
  requireAdmin,
  checkSchema(PostValidationSchema),
  ErrorHandler,
  cleanContent,
  CreateNewPost,
);
router.patch(
  "/api/posts/:id",
  csrfMiddleware,
  requireAdmin,
  checkSchema(UpdatePostValidationSchema),
  checkSchema(ParamsIDValidator),
  ErrorHandler,
  cleanContent,
  EditPost,
);
router.get("/api/posts", requireUser, ReadPost);
router.get(
  "/api/posts/:id",
  requireUser,
  checkSchema(ParamsIDValidator),
  ErrorHandler,
  ReadPostById,
);
router.delete(
  "/api/posts/:id",
  csrfMiddleware,
  requireAdmin,
  checkSchema(ParamsIDValidator),
  ErrorHandler,
  DeletePost,
);
router.get(
  "/api/posts/presigned-url/upload",
  requireAdmin,
  checkSchema(PresignedUrlQuerySchema),
  ErrorHandler,
  GetPutPresignedUrl,
);
router.get(
  "/api/posts/presigned-url/delete",
  requireAdmin,
  checkSchema(DeletePresignedUrlQuerySchema),
  ErrorHandler,
  GetDeletePresignedUrl,
);
export default router;
