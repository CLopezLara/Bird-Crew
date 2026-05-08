import jwt from "jsonwebtoken";
import { config } from "../Config/Config.js";

export const requireRole = (allowedRoles) => {
  return (req, res, next) => {
    try {
      const accessToken = req.cookies.accessToken;

      if (!accessToken) {
        return res.status(401).json({
          message: "Sin autorizacion- No hay token",
          cookies: req.cookies,
        });
      }

      const decoded = jwt.verify(accessToken, config.tokenSecret);

      if (!allowedRoles.includes(decoded.role)) {
        return res.status(403).json({
          message: "Prohibido- Permisos insuficientes",
          requiredRole: allowedRoles,
          userRole: decoded.role,
        });
      }

      req.user = {
        userId: decoded.userId,
        email: decoded.email,
        role: decoded.role,
      };

      next();
    } catch (err) {
      if (err.name === "TokenExpiredError") {
        return res
          .status(401)
          .json({ message: "Token expirado", expired: true });
      }

      res.status(401).json({ message: "Sin autorizacion-Token invalido" });
    }
  };
};

export const requireAdmin = requireRole(["admin"]);
export const requireUser = requireRole(["admin", "user"]);
