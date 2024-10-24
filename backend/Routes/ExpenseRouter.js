const { fetchExpenses, addExpenses, deleteExpenses, updateExpenses } = require('../Controllers/ExpenseController');

const router = require('express').Router();

router.get('/', fetchExpenses)

router.post('/', addExpenses)

router.delete('/:expenseId', deleteExpenses)

router.put('/:expenseId', updateExpenses)

module.exports=router;