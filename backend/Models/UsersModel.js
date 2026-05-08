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

export const getUserById = async (userId) => {
  const text = `
    SELECT id, email, name, role
    FROM users
    WHERE id = $1
  `;
  const result = await query(text, [userId]);
  return result.rows[0];
};
