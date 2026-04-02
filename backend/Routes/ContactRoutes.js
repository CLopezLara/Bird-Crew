import express from "express";
import SendContactEmail from "../Controllers/contactController.js";
import { checkSchema } from "express-validator";
import { FormValidationSchema } from "../Middleware/FormValidationSchema.js";
import { ErrorHandler } from "../Middleware/FormValidationErrorHandler.js";
const router = express.Router();

router.post(
  "/api/contact",
  checkSchema(FormValidationSchema),
  ErrorHandler,
  SendContactEmail
);

export default router;
