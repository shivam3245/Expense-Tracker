import React from 'react';

const ExpenseTable = ({ expenses, handledeleteExpense }) => {
    return (
        <div className="expense-list max-h-60 overflow-y-auto border border-gray-300 rounded-lg bg-white shadow-md">
            {expenses?.length > 0 ? (
                expenses.map((expense, index) => (
                    <div key={index} className="expense-item flex justify-between items-center py-2 px-4 border-b border-gray-300">
                       <div className=''>
                        <button
                            className="delete-button bg-red-600 text-white text-sm rounded-md px-2 py-1 mr-2 hover:bg-red-500"
                            onClick={() => handledeleteExpense(expense._id)}>
                            Delete
                        </button>
                        <button className='bg-blue-700 text-white text-sm rounded-md px-2 py-1 mr-2 hover:bg-blue-500'>Edit</button>
                        </div>
                        <div className="expense-description font-semibold">{expense.text}</div>
                        <div
                            className="expense-amount font-bold"
                            style={{ color: expense.amount > 0 ? '#00CC00' : '#c0392b' }}
                        >
                            ₹{expense.amount}
                        </div>
                    </div>
                ))
            ) : (
                <div className="text-center p-4">No expenses found</div>
            )}
        </div>
    );
};

export default ExpenseTable;
