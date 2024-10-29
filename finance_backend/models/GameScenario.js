const mongoose = require('mongoose');

const GameScenarioSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  objective: String,
  potentialOutcomes: [String]
});

module.exports = mongoose.model('GameScenario', GameScenarioSchema);
