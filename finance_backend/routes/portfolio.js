const express = require('express');
const Investment = require('../models/Investment');
const User = require('../models/User');
const router = express.Router();

router.post('/add', async (req, res) => {
  try {
    const { userId, investmentId, amountInvested } = req.body;
    const user = await User.findById(userId);
    
    user.portfolio.push({ investmentId, amountInvested, returns: 0 });
    await user.save();
    
    res.json({ message: 'Investment added to portfolio' });
  } catch (error) {
    res.status(500).json({ error: 'Error adding investment to portfolio' });
  }
});



router.put('/update/:id', async (req, res) => {
    try {
      const { amountInvested } = req.body;
      const updatedInvestment = await User.findOneAndUpdate(
        { _id: req.userId, "portfolio._id": req.params.id },
        { $set: { "portfolio.$.amountInvested": amountInvested } },
        { new: true }
      );
      res.json(updatedInvestment);
    } catch (error) {
      res.status(500).json({ error: 'Error updating investment' });
    }
  });

  router.delete('/delete/:id', async (req, res) => {
    try {
      const updatedUser = await User.findByIdAndUpdate(
        req.userId,
        { $pull: { portfolio: { _id: req.params.id } } },
        { new: true }
      );
      res.json(updatedUser);
    } catch (error) {
      res.status(500).json({ error: 'Error deleting investment' });
    }
  });
  

router.get('/calculate-returns', async (req, res) => {
    try {
      const user = await User.findById(req.userId).populate('portfolio.investmentId');
      user.portfolio.forEach(item => {
        const randomGrowthRate = Math.random() * (item.investmentId.riskLevel === 'high' ? 0.2 : 0.1);
        item.returns = item.amountInvested * (1 + randomGrowthRate);
      });
      await user.save();
      
      res.json(user.portfolio);
    } catch (error) {
      res.status(500).json({ error: 'Error calculating returns' });
    }
  });
  module.exports = router;
  