import queryString from "query-string";
import crypto from "crypto";

export const config = {
  clientId: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  authUrl: "https://accounts.google.com/o/oauth2/v2/auth",
  tokenUrl: "https://oauth2.googleapis.com/token",
  redirectUrl: process.env.REDIRECT_URL,
  clientUrl: process.env.CLIENT_URL,
  tokenSecret: process.env.TOKEN_SECRET,
  accessTokenExpiration: 15 * 60 * 1000,
  refreshTokenExpiration: 7,
};

export const generateState = () => {
  return crypto.randomBytes(32).toString("hex");
};

export const buildAuthParams = (state) =>
  queryString.stringify({
    client_id: config.clientId,
    redirect_uri: config.redirectUrl,
    response_type: "code",
    scope: "openid profile email",
    access_type: "offline",
    state,
    prompt: "select_account",
  });

export const getTokenParams = (code) =>
  queryString.stringify({
    client_id: config.clientId,
    client_secret: config.clientSecret,
    code,
    grant_type: "authorization_code",
    redirect_uri: config.redirectUrl,
  });

export const getCookieOptions = (maxAge) => ({
  maxAge,
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
});
