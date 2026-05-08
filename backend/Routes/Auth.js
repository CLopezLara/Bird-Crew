import express from "express";
import {
  authUrl,
  authToken,
  loggedIn,
  logout,
  refreshAccessToken,
} from "../Controllers/authController.js";
import {
  authLimiter,
  protectedRoutesLimiter,
} from "../Middleware/RateLimiter.js";

const router = express.Router();

router.get("/auth/url", protectedRoutesLimiter, authUrl);

router.get("/auth/token", authLimiter, authToken);

router.get("/auth/logged_in", protectedRoutesLimiter, loggedIn);

router.post("/auth/refresh", protectedRoutesLimiter, refreshAccessToken);

router.post("/auth/logout", protectedRoutesLimiter, logout);

export default router;
