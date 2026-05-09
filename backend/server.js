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
import path from "path";
import { fileURLToPath } from "url";
import { POST } from "./Routes/Electrizante.js";
const port = process.env.PORT || 8000;
const app = express();

if (!config.clientUrl || !config.tokenSecret || !config.clientId) {
  console.error("Faltan variables de entorno");
  process.exit(1);
}

app.use(helmet());

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
app.post("/tilin", POST);
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname, "../build")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../build/index.html"));
});
app.listen(port);
