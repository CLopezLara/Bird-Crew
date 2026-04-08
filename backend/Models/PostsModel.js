import { query } from "../Db/index.js";

export const savePost = async (title, content, author, delta) => {
  const text = ` insert into posts (title, content, author, delta) values ($1, $2, $3, $4) returning *`;
  const values = [title, content, author, delta];
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

export const updatePost = async (id, title, content, author, delta) => {
  const text = `update posts set title = $1, content = $2, author = $3, delta = $4 where id = $5 returning *`;
  const values = [title, content, author, delta, id];
  await query(text, values);
};

export const deletePostById = async (id) => {
  const text = `delete from posts where id = $1`;
  const values = [id];
  await query(text, values);
};
