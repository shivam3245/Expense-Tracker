import React, { useState } from 'react';
import { handleError } from '../utils';

function ExpenseForm({ addExpenses }) {
    const [expenseInfo, setExpenseInfo] = useState({
        amount: '',
        text: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setExpenseInfo((prev) => ({ ...prev, [name]: value }));
    };

    const handleExpense = (e) => {
        e.preventDefault();
        const { text, amount } = expenseInfo;
        if (!text || !amount) {
            handleError('All fields are required');
            return;
        }

        addExpenses(expenseInfo);
        setExpenseInfo({ text: '', amount: '' });
    };

    return (
        <div className="flex items-center justify-center pb-2 bg-gray-100">
            <div className="bg-white p-8 rounded-lg w-full max-w-md shadow-lg">
                <h1 className="mb-5 text-2xl font-bold text-center">Expense Tracker</h1>
                <form onSubmit={handleExpense} className="flex flex-col gap-4">
                    <div>
                        <label htmlFor="text" className="text-xl">Expense Detail</label>
                        <input
                            onChange={handleChange}
                            type="text"
                            name="text"
                            placeholder="Enter your Expense Description"
                            value={expenseInfo.text}
                            className="w-full text-sm p-2 border-b border-black focus:outline-none"
                        />
                    </div>
                    <div>
                        <label htmlFor="amount" className="text-xl">Amount</label>
                        <input
                            onChange={handleChange}
                            type="number"
                            name="amount"
                            placeholder="Enter expense amount (-ve for expense, +ve for income)"
                            value={expenseInfo.amount}
                            className="w-full text-sm p-2 border-b text-black border-black focus:outline-none"
                        />
                        <h1>Note: If it is expense add amount using (-) sign</h1>
                    </div>
                    <button type="submit" className="bg-purple-600 text-white text-xl rounded py-2 mt-4 hover:bg-purple-700">
                        Add Expense
                    </button>
                </form>
            </div>
        </div>
    );
}

export default ExpenseForm;
