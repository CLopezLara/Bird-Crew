import rateLimit from "express-rate-limit";

export const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: { message: "Demasiadas solicitudes, intentelo mas tarde" },
  standardHeaders: true,
  legacyHeaders: false,
});

export const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  message: { message: "Demasiadas solicitudes, intentelo mas tarde" },
  standardHeaders: true,
  legacyHeaders: false,
});

export const protectedRoutesLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: { message: "Demasiadas solicitudes, intentelo mas tarde" },
  standardHeaders: true,
  legacyHeaders: false,
});

export const subscribeLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: { message: "Demasiadas solicitudes, intentelo mas tarde" },
  standardHeaders: true,
  legacyHeaders: false,
});
