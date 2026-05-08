import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import { config } from "./Config/Config.js";
import Authrouter from "./Routes/Auth.js";
import ContactRoutes from "./Routes/ContactRoutes.js";
import postRoutes from "./Routes/PostRoutes.js";
import subscribeRoutes from "./Routes/SubscribeRoutes.js";
import { contactLimiter, subscribeLimiter } from "./Middleware/RateLimiter.js";

const port = process.env.PORT || 8000;
const app = express();

if (!config.clientUrl || !config.tokenSecret || !config.clientId) {
  console.error("Faltan variables de entorno");
  process.exit(1);
}

app.use(helmet());

if (process.env.NODE_ENV === "production") {
  app.use((req, res, next) => {
    if (req.header("x-forwarded-proto") !== "https") {
      res.redirect(`https://${req.header("host")}${req.url}`);
    } else {
      next();
    }
  });
}

app.use(
  cors({
    origin: config.clientUrl,
    credentials: true,
    allowedHeaders: ["Content-Type", "X-CSRF-Token"],
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  }),
);

app.use(cookieParser());

app.use(express.json());

app.use("/api/contact", contactLimiter);
app.use("/api/subscribe", subscribeLimiter);
app.use("/api/unsubscribe", subscribeLimiter);
app.use(Authrouter);
app.use(ContactRoutes);
app.use(postRoutes);
app.use(subscribeRoutes);
app.listen(port);
