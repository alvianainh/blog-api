const pool = require('./db');

const createPost = async (userId, title, content) => {
  const result = await pool.query(
    'INSERT INTO posts (user_id, title, content) VALUES ($1, $2, $3) RETURNING *',
    [userId, title, content]
  );
  return result.rows[0];
};

const getAllPosts = async (page = 1, limit = 10) => {
  const offset = (page - 1) * limit;

  const result = await pool.query('SELECT * FROM posts ORDER BY created_at DESC LIMIT $1 OFFSET $2', [limit, offset]);

  return result.rows;
};

const getTotalItems = async () => {
  const result = await pool.query('SELECT COUNT(*) FROM posts');
  return result.rows[0].count;
};

const getPostById = async (id) => {
  const result = await pool.query('SELECT * FROM posts WHERE id = $1', [id]);
  return result.rows[0];
};

const updatePost = async (id, userId, title, content) => {
  const result = await pool.query(
    'UPDATE posts SET title = $1, content = $2 WHERE id = $3 AND user_id = $4 RETURNING *',
    [title, content, id, userId]
  );
  return result.rows[0];
};

const deletePost = async (id, userId) => {
  const result = await pool.query(
    'DELETE FROM posts WHERE id = $1 AND user_id = $2 RETURNING *',
    [id, userId]
  );
  return result.rowCount > 0;
};

module.exports = { createPost, getAllPosts, getPostById, updatePost, deletePost, getTotalItems };