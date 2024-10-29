const mongoose = require('mongoose');
const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  portfolio: [{
    investmentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Investment' },
    amountInvested: Number,
    returns: Number
  }],
  progress: {
    levelsCompleted: { type: Number, default: 0 },
    achievements: [String]
  }
});

module.exports = mongoose.model('User', UserSchema);
