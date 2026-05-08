import express from "express";
import SendContactEmail from "../Controllers/contactController.js";
import { checkSchema } from "express-validator";
import { FormValidationSchema } from "../Middleware/ValidationSchemas/FormValidationSchema.js";
import { ErrorHandler } from "../Middleware/ValidationSchemas/ErrorHandler.js";
const router = express.Router();

router.post(
  "/api/contact",
  checkSchema(FormValidationSchema),
  ErrorHandler,
  SendContactEmail,
);

export default router;
