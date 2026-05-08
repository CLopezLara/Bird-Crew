import { query } from "../Db/index.js";

export const subscribeUser = async (id) => {
  const text = `UPDATE users
                set subscribed = true, subscribed_at = NOW()
                where id = $1 AND subscribed = false 
                Returning id,subscribed,subscribed_at`;

  const values = [id];
  const result = await query(text, values);
  return result.rows[0];
};

export const unsubscribeUser = async (id) => {
  const text = `UPDATE users
                set subscribed = false, subscribed_at = null
                where id = $1 AND subscribed = true 
                Returning id,subscribed, subscribed_at`;
  const values = [id];
  const result = await query(text, values);
  return result.rows[0];
};

export const getSubscribedUsers = async () => {
  const text = `SELECT email
                FROM users
                WHERE subscribed = true`;
  const result = await query(text);
  return result.rows;
};
