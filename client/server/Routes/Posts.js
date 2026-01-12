const express = require('express');
const { body, param, validationResult } = require('express-validator');
const Post = require('../models/Post');
const router = express.Router();
const slugify = require("slugify");
const multer = require("multer");
const path = require("path");

// Multer setup for image uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname))
});
const upload = multer({ storage });

// Search posts by title or content
router.get('/search', async (req, res, next) => {
  const { q } = req.query;
  try {
    const results = await Post.find({
      $or: [
        { title: new RegExp(q, 'i') },
        { content: new RegExp(q, 'i') }
      ]
    }).populate('author category');
    res.json(results);
  } catch (err) {
    next(err);
  }
});

// GET all posts
router.get('/', async (req, res, next) => {
  try {
    const posts = await Post.find().populate('author category');
    res.json(posts);
  } catch (err) {
    next(err);
  }
});

// GET a specific post
router.get('/:id', param('id').isMongoId(), async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id).populate('author category');
    if (!post) return res.status(404).json({ error: 'Post not found' });
    res.json(post);
  } catch (err) {
    next(err);
  }
});

// ✅ POST a new blog post with optional image
// ✅ POST a new blog post with optional image
router.post(
  '/',
  upload.single("image"),
  [
    body('title').notEmpty().withMessage('Title is required'),
    body('content').notEmpty().withMessage('Content is required'),
    body('author').isMongoId().withMessage('Valid author ID is required'),
    body('category').isMongoId().withMessage('Valid category ID is required')
  ],
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    try {
      const postData = {
        title: req.body.title,
        content: req.body.content,
        author: req.body.author,
        category: req.body.category,
        slug: slugify(req.body.title, { lower: true, strict: true }),

        // ✅ Use uploaded image OR pasted URL OR fallback
        featuredImage: req.file
          ? `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`
          : req.body.featuredImage || 'default-post.jpg'
      };

      const post = new Post(postData);
      await post.save();
      res.status(201).json(post);
    } catch (err) {
      console.error("Error creating post:", err.message);
      next(err);
    }
  }
);

// POST a comment
router.post(
  '/:id/comments',
  [
    param('id').isMongoId(),
    body('content').notEmpty().withMessage('Comment content is required')
  ],
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    try {
      const post = await Post.findById(req.params.id);
      if (!post) return res.status(404).json({ error: 'Post not found' });

      const userId = req.user?.id || null;
      const newComment = {
        user: userId,
        content: req.body.content
      };

      post.comments.push(newComment);
      await post.save();

      res.status(201).json(post.comments);
    } catch (err) {
      next(err);
    }
  }
);

// PUT update post
router.put(
  '/:id',
  [
    param('id').isMongoId(),
    body('title').optional().isString(),
    body('content').optional().isString(),
    body('category').optional().isMongoId(),
    body('author').optional().isMongoId()
  ],
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    try {
      const post = await Post.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!post) return res.status(404).json({ error: 'Post not found' });
      res.json(post);
    } catch (err) {
      next(err);
    }
  }
);

// DELETE post
router.delete('/:id', param('id').isMongoId(), async (req, res, next) => {
  try {
    const post = await Post.findByIdAndDelete(req.params.id);
    if (!post) return res.status(404).json({ error: 'Post not found' });
    res.json({ message: 'Post deleted successfully' });
  } catch (err) {
    next(err);
  }
});

module.exports = router;