import { query } from "../Db/index.js";
import crypto from "crypto";

export const generateRefreshToken = () => {
  return crypto.randomBytes(64).toString("hex");
};

const hashToken = (token) => {
  return crypto.createHash("sha256").update(token).digest("hex");
};

export const saveRefreshToken = async (userId, token, expiresInDays = 7) => {
  const expiresAt = new Date();
  expiresAt.setDate(expiresAt.getDate() + expiresInDays);

  const hashedToken = hashToken(token);

  const text = `
    INSERT INTO refresh_tokens (user_id, token, expires_at)
    VALUES ($1, $2, $3)
    RETURNING *
  `;
  const values = [userId, hashedToken, expiresAt];

  const result = await query(text, values);
  return result.rows[0];
};

export const findRefreshToken = async (token) => {
  const hashedToken = hashToken(token);

  const text = `
    SELECT rt.*, u.email, u.name
    FROM refresh_tokens rt
    JOIN users u ON rt.user_id = u.id
    WHERE rt.token = $1 AND rt.expires_at > NOW()
  `;
  const result = await query(text, [hashedToken]);
  return result.rows[0];
};

export const deleteRefreshToken = async (token) => {
  const hashedToken = hashToken(token);
  const text = "DELETE FROM refresh_tokens WHERE token = $1";
  await query(text, [hashedToken]);
};

export const deleteAllUserRefreshTokens = async (userId) => {
  const text = "DELETE FROM refresh_tokens WHERE user_id = $1";
  await query(text, [userId]);
};

export const cleanExpiredTokens = async () => {
  const text = "DELETE FROM refresh_tokens WHERE expires_at < NOW()";
  const result = await query(text);
  return result.rowCount;
};
