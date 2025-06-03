const mongoose = require('mongoose');

const expenseSchema = new mongoose.Schema(
  {
    date: {
      type: Date,
      required: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    category: {
      type: String,
      required: true,
      enum: ['materials', 'labor', 'transport', 'salary', 'other'], 
    },
    amount: {
      type: Number,
      required: true,
      min: 0,
    },
    payment_method: {
      type: String,
      required: true,
      enum: ['Cash', 'Mobile Money', 'Bank'],
    },
    received_by: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true, 
  }
);

module.exports = mongoose.model('Expense', expenseSchema);
