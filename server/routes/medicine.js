const express = require('express');
const router = express.Router();
const Medicine = require('../models/medicine');

router.post('/', async (req, res) => {
  try {
    const medicineData = req.body;
    const newMedicine = new Medicine(medicineData);
    const createdMedicine = await newMedicine.save();
    res.status(201).json(createdMedicine);
  } catch (error) {
    console.error('Error creating medicine:', error);
    if (error.name === 'ValidationError') {
      return res.status(400).json({ error: 'Validation Error', details: error.message });
    }
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.get('/', async (req, res) => {
  try {
    const medicines = await Medicine.find();
    res.json(medicines);
  } catch (error) {
    console.error('Error getting medicines:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.get('/:id', async (req, res) => {
  const medicineId = req.params.id;
  try {
    const medicine = await Medicine.findById(medicineId);
    if (!medicine) {
      return res.status(404).json({ error: 'Medicine not found' });
    }
    res.json(medicine);
  } catch (error) {
    console.error('Error getting medicine by ID:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.put('/:id', async (req, res) => {
  const medicineId = req.params.id;
  const updatedMedicineData = req.body;
  try {
    const updatedMedicine = await Medicine.findByIdAndUpdate(medicineId, updatedMedicineData, { new: true });
    if (!updatedMedicine) {
      return res.status(404).json({ error: 'Medicine not found' });
    }
    res.json(updatedMedicine);
  } catch (error) {
    console.error('Error updating medicine:', error);
    if (error.name === 'ValidationError') {
      return res.status(400).json({ error: 'Validation Error', details: error.message });
    }
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.delete('/:id', async (req, res) => {
  const medicineId = req.params.id;
  try {
    const deletedMedicine = await Medicine.findByIdAndDelete(medicineId);
    if (!deletedMedicine) {
      return res.status(404).json({ error: 'Medicine not found' });
    }
    res.json(deletedMedicine);
  } catch (error) {
    console.error('Error deleting medicine:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;


