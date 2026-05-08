import express from "express";
import { subscribe, unsubscribe } from "../Controllers/subscribeController.js";
import { csrfMiddleware } from "../Middleware/Csrf.js";
import { requireUser } from "../Middleware/RoleAuth.js";

const router = express.Router();

router.post("/api/subscribe", csrfMiddleware, requireUser, subscribe);
router.post("/api/unsubscribe", csrfMiddleware, requireUser, unsubscribe);

export default router;
