import { query } from "../Db/index.js";

export const savePost = async (
  title,
  content,
  author,
  delta,
  image_url,
  image_key,
) => {
  const text = ` insert into posts (title, content, author, delta, image_url, image_key) values ($1, $2, $3, $4, $5, $6) returning *`;
  const values = [title, content, author, delta, image_url, image_key];
  const result = await query(text, values);
  return result.rows[0];
};

export const getAllPosts = async () => {
  const text = `select * from posts order by created_at desc`;
  const result = await query(text);
  return result.rows;
};

export const getPostById = async (id) => {
  const text = `select * from posts where id = $1`;
  const values = [id];
  const result = await query(text, values);
  return result.rows[0];
};

export const updatePost = async (id, update) => {
  const key = Object.keys(update);
  const value = Object.values(update);

  const changes = key.map((key, index) => `${key} = $${index + 1}`).join(", ");

  const text = `update posts set ${changes} where id = $${key.length + 1} returning *`;
  const values = [...value, id];
  await query(text, values);
};

export const deletePostById = async (id) => {
  const text = `delete from posts where id = $1`;
  const values = [id];
  await query(text, values);
};
