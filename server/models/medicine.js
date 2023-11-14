const mongoose = require('mongoose');

const MedicineSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
  description: { type: String, required: true },
  quantity: { type: Number, required: true },
  amount: { type: Number, required: true },
  imageUrl: { type: String, required: true },
});

module.exports = mongoose.model('Medicine', MedicineSchema);


