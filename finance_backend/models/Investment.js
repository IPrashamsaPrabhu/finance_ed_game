const mongoose = require('mongoose');

const InvestmentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  type: { type: String, required: true }, // e.g., 'stock', 'bond', 'mutual fund'
  riskLevel: { type: String, required: true }, // e.g., 'low', 'medium', 'high'
  baseValue: { type: Number, required: true }
});

module.exports = mongoose.model('Investment', InvestmentSchema);
