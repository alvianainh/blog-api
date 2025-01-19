const express = require('express');
const { createPost, getAllPosts, getPostById, updatePost, deletePost } = require('../controllers/postController');
const { authenticateJWT } = require('../middlewares/authMiddleware'); 
const router = express.Router();

router.post('/', authenticateJWT, createPost);
router.get('/', getAllPosts);
router.get('/:id', getPostById);
router.put('/:id', authenticateJWT, updatePost);
router.delete('/:id', authenticateJWT, deletePost);

module.exports = router; 
