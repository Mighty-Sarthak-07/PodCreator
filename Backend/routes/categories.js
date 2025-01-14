const express = require("express");
const router = express.Router();
const Category = require("../models/category");

router.post("/add-category", async (req, res) => {
  try {
    const { categoryName } = req.body;
    if (!categoryName) {
      return res.status(400).json({ message: "Category name is required" });
    }
    const existingCategory = await Category.findOne({ categoryName });
    if (existingCategory) {
      return res.status(400).json({ message: "Category already exists" });
    }
    const newCategory = new Category({ categoryName });
    await newCategory.save();
    res.status(201).json({ message: "Category added successfully!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to add category" });
  }
});

router.get("/get-categories", async (req, res) => {
  try {
    const categories = await Category.find();
    res.status(200).json({ data: categories });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch categories" });
  }
});

module.exports = router;
