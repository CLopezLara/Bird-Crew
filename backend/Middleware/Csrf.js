export const csrfMiddleware = (req, res, next) => {
  const method = req.method.toUpperCase();

  if (["GET", "OPTIONS", "HEAD"].includes(method)) return next();

  if (req.headers.origin !== process.env.CLIENT_URL) {
    return res.status(403).json({
      message: "Origen invalido",
    });
  }

  const headerToken = req.headers["x-csrf-token"];
  const cookieToken = req.cookies?.csrfToken;

  if (!headerToken || !cookieToken || headerToken !== cookieToken) {
    return res.status(403).json({ message: "token csrf invalido" });
  }

  return next();
};
