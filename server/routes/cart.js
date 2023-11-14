const express = require('express');
const router = express.Router();
const Cart = require('../models/cart');

router.post('/', async (req, res) => {
  try {
    const { userId, medicineId, quantity } = req.body;
    const cart = await Cart.create({ userId, medicineId, quantity });
    res.status(201).json(cart);
  } catch (error) {
    console.error('Error creating cart:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.get('/', async (req, res) => {
  try {
    const carts = await Cart.find();
    res.status(200).json(carts);
  } catch (error) {
    console.error('Error getting cart items:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const cart = await Cart.findById(req.params.id);
    if (!cart) {
      return res.status(404).json({ error: 'Cart not found' });
    }
    res.status(200).json(cart);
  } catch (error) {
    console.error('Error getting cart item by ID:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const { userId, medicineId, quantity } = req.body;
    const cart = await Cart.findByIdAndUpdate(
      req.params.id,
      { userId, medicineId, quantity },
      { new: true }
    );
    if (!cart) {
      return res.status(404).json({ error: 'Cart not found' });
    }
    res.status(200).json(cart);
  } catch (error) {
    console.error('Error updating cart item by ID:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const cart = await Cart.findByIdAndDelete(req.params.id);
    if (!cart) {
      return res.status(404).json({ error: 'Cart not found' });
    }
    res.status(204).end();
  } catch (error) {
    console.error('Error deleting cart item by ID:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;

