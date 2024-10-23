const { fetchExpenses, addExpenses, deleteExpenses } = require('../Controllers/ExpenseController');

const router = require('express').Router();

router.get('/', fetchExpenses)

router.post('/', addExpenses)

router.delete('/:expenseID', deleteExpenses)

module.exports=router;