const express = require('express');
const router = express.Router();
const Order = require('../models/order');
const Cart = require('../models/cart');

router.get('/user/:userId', async (req, res) => {
    try {
      const userId = req.params.userId;
  
      const orders = await Order.find({ userId }).populate('medicineId');
  
      res.json(orders);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

router.get('/add/:userId', async (req, res) => {
    try {
      const userId = req.params.userId;

      const cartItems = await Cart.find({ userId });
  
      const orders = await Promise.all(cartItems.map(cartItem => {
        return Order.create({
          userId: cartItem.userId,
          medicineId: cartItem.medicineId,
          quantity: cartItem.quantity,
        });
      }));
  
      await Cart.deleteMany({ userId });
  
      res.status(201).json(orders);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });
  

router.get('/', async (req, res) => {
  try {
    const orders = await Order.find();
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/:orderId', async (req, res) => {
  try {
    const order = await Order.findById(req.params.orderId);
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    res.json(order);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.put('/:orderId', async (req, res) => {
  try {
    const order = await Order.findByIdAndUpdate(req.params.orderId, req.body, {
      new: true,
    });
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    res.json(order);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.delete('/:userId', async (req, res) => {
    const userId = req.params.userId;
  
    try {
      const result = await Order.deleteMany({ userId });
  
      if (result.deletedCount === 0) {
        return res.status(404).json({ message: 'No orders found for the specified user' });
      }
  
      res.json({ message: 'Orders deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  

module.exports = router;
