const express = require('express');
const router = express.Router();
const Category = require('../models/category');

router.post('/', async (req, res) => {
  try {
    const { name, description } = req.body;
    const newCategory = new Category({ name, description });
    const savedCategory = await newCategory.save();
    res.json(savedCategory);
  } catch (error) {
    console.error('Error creating category:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

router.get('/', async (req, res) => {
  try {
    const categories = await Category.find();
    res.json(categories);
  } catch (error) {
    console.error('Error fetching categories:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

router.get('/:categoryId', async (req, res) => {
  try {
    const categoryId = req.params.categoryId;
    const category = await Category.findById(categoryId);
    
    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }
    
    res.json(category);
  } catch (error) {
    console.error('Error fetching category:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

router.put('/:categoryId', async (req, res) => {
  try {
    const categoryId = req.params.categoryId;
    const { name, description } = req.body;

    const existingCategory = await Category.findById(categoryId);
    if (!existingCategory) {
      return res.status(404).json({ message: 'Category not found' });
    }

    existingCategory.name = name || existingCategory.name;
    existingCategory.description = description || existingCategory.description;

    const updatedCategory = await existingCategory.save();
    res.json(updatedCategory);
  } catch (error) {
    console.error('Error updating category:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

router.delete('/:categoryId', async (req, res) => {
  try {
    const categoryId = req.params.categoryId;
    const deletedCategory = await Category.findByIdAndDelete(categoryId);
    
    if (!deletedCategory) {
      return res.status(404).json({ message: 'Category not found' });
    }
    
    res.json({ message: 'Category deleted successfully' });
  } catch (error) {
    console.error('Error deleting category:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
