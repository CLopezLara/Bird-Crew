import express from "express";
import {
  authUrl,
  authToken,
  loggedIn,
  logout,
  refreshAccessToken,
} from "../Controllers/authController.js";

const router = express.Router();

router.get("/auth/url", authUrl);

router.get("/auth/token", authToken);

router.get("/auth/logged_in", loggedIn);

router.post("/auth/refresh", refreshAccessToken);

router.post("/auth/logout", logout);

export default router;
