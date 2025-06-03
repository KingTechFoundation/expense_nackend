const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const expenseController = require('../controllers/expenseController');


const validateExpense = [
  check('date').isDate().withMessage('Date must be a valid date'),
  check('description')
    .isString()
    .notEmpty()
    .withMessage('Description must be a non-empty string')
    .trim(),
  check('category')
    .isIn(['materials', 'labor', 'transport', 'salary', 'other'])
    .withMessage(
      'Category must be one of: materials, labor, transport, salary, other'
    ),
  check('amount')
    .isNumeric()
    .withMessage('Amount must be a number')
    .custom((value) => value >= 0)
    .withMessage('Amount must be a non-negative number'),
  check('payment_method')
    .isIn(['Cash', 'Mobile Money', 'Bank'])
    .withMessage('Payment method must be one of: Cash, Mobile Money, Bank'),
  check('received_by')
    .isString()
    .notEmpty()
    .withMessage('Received by must be a non-empty string')
    .trim(),
];

// Routes
router.post('/', validateExpense, expenseController.createExpense);
router.get('/', expenseController.getAllExpenses);
router.get('/:id', expenseController.getExpenseById);
router.put('/:id', validateExpense, expenseController.updateExpense);
router.delete('/:id', expenseController.deleteExpense);

module.exports = router;
