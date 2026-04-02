import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import authLimiter from "./Middleware/Authlimiter.js";
import { config } from "./Config/Config.js";
import router from "./Routes/Auth.js";
import adminRoutes from "./Routes/AdminRoutes.js";
import ContactRoutes from "./Routes/ContactRoutes.js";
import contactLimiter from "./Middleware/ContactLimiter.js";
import postRoutes from "./Routes/PostRoutes.js";

const port = process.env.PORT || 8000;
const app = express();

if (!config.clientUrl || !config.tokenSecret || !config.clientId) {
  console.error("Missing required environment variables");
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
  }),
);

app.use(cookieParser());

app.use(express.json());

app.use("/auth", authLimiter);
app.use("/api/contact", contactLimiter);

app.use(router);
app.use(adminRoutes);
app.use(ContactRoutes);
app.use(postRoutes);
app.listen(port, () => console.log(`Backend corriendo en puerto: ${port}`));
