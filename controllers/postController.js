const postModel = require('../models/post');

const createPost = async (req, res) => {
  const { title, content } = req.body;
  const userId = req.user.userId;

  try {
    const newPost = await postModel.createPost(userId, title, content);
    res.status(201).json(newPost);
  } catch (err) {
    res.status(500).send('Server Error');
  }
};


const getAllPosts = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const items = await postModel.getAllPosts(page, limit);
    const totalItems = await postModel.getTotalItems(); 
    const totalPages = Math.ceil(totalItems / limit); 

    res.json({
      data: items,
      totalItems: totalItems,
      totalPages: totalPages,
      currentPage: page,
      itemsPerPage: limit,
    });
  } catch (err) {
    next(err); 
  }
};


const getPostById = async (req, res) => {
  const { id } = req.params;

  try {
    const post = await postModel.getPostById(id);
    if (!post) {
      return res.status(404).send('Post not found');
    }
    res.json(post);
  } catch (err) {
    res.status(500).send('Server Error');
  }
};

const updatePost = async (req, res) => {
  const { id } = req.params;
  const { title, content } = req.body;
  const userId = req.user.userId;

  try {
    const updatedPost = await postModel.updatePost(id, userId, title, content);
    if (!updatedPost) {
      return res.status(404).send('Post not found or unauthorized');
    }
    res.json(updatedPost);
  } catch (err) {
    res.status(500).send('Server Error');
  }
};


const deletePost = async (req, res) => {
  const { id } = req.params;
  const userId = req.user.userId;

  try {
    const deleted = await postModel.deletePost(id, userId);
    if (!deleted) {
      return res.status(404).send('Post not found or unauthorized');
    }
    res.json({ message: 'Post deleted successfully' });
  } catch (err) {
    res.status(500).send('Server Error');
  }
};


module.exports = { createPost, getAllPosts, getPostById, updatePost, deletePost };
