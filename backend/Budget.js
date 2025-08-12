const mongoose = require('mongoose');

const BudgetSchema = new mongoose.Schema({
  totalBudget: { 
    type: Number, 
    required: true,
    min: 0
  },
  amountSpent: { 
    type: Number, 
    default: 0,
    min: 0
  },
  month: {
    type: String,
    required: true,
    unique: true // Only one budget per month
  },
  year: {
    type: Number,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  userId: String // optional, for future login
});

// Calculate remaining budget
BudgetSchema.virtual('remainingBudget').get(function() {
  return this.totalBudget - this.amountSpent;
});

// Calculate percentage spent
BudgetSchema.virtual('percentageSpent').get(function() {
  return this.totalBudget > 0 ? (this.amountSpent / this.totalBudget) * 100 : 0;
});

module.exports = mongoose.model('Budget', BudgetSchema);
