import { query } from "../Db/index.js";

export const upsertUser = async (email, name) => {
  const text = `
    INSERT INTO users (email, name, role)
    VALUES ($1, $2, 'user')
    ON CONFLICT (email) 
    DO UPDATE SET 
      name = EXCLUDED.name
    RETURNING *
  `;
  const values = [email, name];
  const result = await query(text, values);
  return result.rows[0];
};

export const updateUserRole = async (userId, newRole) => {
  const validRoles = ["user", "admin"];
  if (!validRoles.includes(newRole)) {
    throw new Error("Invalid role");
  }

  const text = `
    UPDATE users 
    SET role = $2 
    WHERE id = $1 
    RETURNING *
  `;
  const result = await query(text, [userId, newRole]);
  return result.rows[0];
};

export const getAllUsers = async (limit = 100, offset = 0) => {
  const text = `
    SELECT id, email, name, role
    FROM users
    ORDER BY name DESC
    LIMIT $1 OFFSET $2
  `;
  const result = await query(text, [limit, offset]);
  return result.rows;
};

export const getUserById = async (userId) => {
  const text = `
    SELECT id, email, name, role
    FROM users
    WHERE id = $1
  `;
  const result = await query(text, [userId]);
  return result.rows[0];
};
