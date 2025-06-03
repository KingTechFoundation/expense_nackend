const Expense = require('../models/Expense');
const { validationResult } = require('express-validator');


exports.createExpense = async (req, res) => {
  try {
    
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { date, description, category, amount, payment_method, received_by } =
      req.body;

  
    const expense = new Expense({
      date,
      description,
      category,
      amount,
      payment_method,
      received_by,
    });

  
    await expense.save();

    res.status(201).json({
      message: 'Expense created successfully',
      expense,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Server error while creating expense',
      error: error.message,
    });
  }
};


exports.getAllExpenses = async (req, res) => {
  try {
    const expenses = await Expense.find().sort({ date: -1 });
    res.status(200).json({
      message: 'Expenses retrieved successfully',
      expenses,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Server error while retrieving expenses',
      error: error.message,
    });
  }
};


exports.getExpenseById = async (req, res) => {
  try {
    const expense = await Expense.findById(req.params.id);
    if (!expense) {
      return res.status(404).json({
        message: 'Expense not found',
      });
    }
    res.status(200).json({
      message: 'Expense retrieved successfully',
      expense,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Server error while retrieving expense',
      error: error.message,
    });
  }
};


exports.updateExpense = async (req, res) => {
  try {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { date, description, category, amount, payment_method, received_by } =
      req.body;

    const expense = await Expense.findByIdAndUpdate(
      req.params.id,
      { date, description, category, amount, payment_method, received_by },
      { new: true, runValidators: true }
    );

    if (!expense) {
      return res.status(404).json({
        message: 'Expense not found',
      });
    }

    res.status(200).json({
      message: 'Expense updated successfully',
      expense,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Server error while updating expense',
      error: error.message,
    });
  }
};


exports.deleteExpense = async (req, res) => {
  try {
    const expense = await Expense.findByIdAndDelete(req.params.id);
    if (!expense) {
      return res.status(404).json({
        message: 'Expense not found',
      });
    }
    res.status(200).json({
      message: 'Expense deleted successfully',
    });
  } catch (error) {
    res.status(500).json({
      message: 'Server error while deleting expense',
      error: error.message,
    });
  }
};
