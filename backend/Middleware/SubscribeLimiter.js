import rateLimit from "express-rate-limit";

const subscribeLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: { message: "Demasiadas solicitudes, intentelo mas tarde" },
  standardHeaders: true,
  legacyHeaders: false,
});

export default subscribeLimiter;
