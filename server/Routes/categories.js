const express = require('express');
const { body, validationResult } = require('express-validator');
const Category = require('../models/Categories');
const Post = require("../models/Post");

const router = express.Router();

// GET /api/categories - Get all categories
router.get("/used", async (req, res) => {
  try {
    const usedCategoryIds = await Post.distinct("category");
    console.log("Used category IDs:", usedCategoryIds);

    const categories = await Category.find({ _id: { $in: usedCategoryIds } });
    console.log("Fetched categories:", categories);

    res.json(categories);
  } catch (err) {
    console.error("Error fetching used categories:", err);
    res.status(500).json({ error: "Server error" });
  }
});


// POST /api/categories - Create a new category
router.post(
  '/',
  body('name').notEmpty().withMessage('Category name is required'),
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    try {
      const category = new Category({ name: req.body.name });
      await category.save();
      res.status(201).json(category);
    } catch (err) {
      next(err);
    }
  }
);

module.exports = router;