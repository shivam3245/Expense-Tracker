import React, { useState } from 'react';

const ExpenseTable = ({ expenses, handledeleteExpense, handleEditExpense }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedExpense, setSelectedExpense] = useState(null);
    const [editedExpense, setEditedExpense] = useState({ text: '', amount: '' });

    const openEditModal = (expense) => {
        setSelectedExpense(expense);
        setEditedExpense({ text: expense.text, amount: expense.amount });
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedExpense(null);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        handleEditExpense(selectedExpense._id, editedExpense);
        closeModal();
    };

    return (
        <div>
            <div className="expense-list max-h-60 overflow-y-auto border border-gray-300 rounded-lg bg-white shadow-md">
                {expenses?.length > 0 ? (
                    expenses.map((expense, index) => (
                        <div key={index} className="expense-item py-2 px-4 border-b border-gray-300">
                            <div className="flex justify-between items-center">
                                <div className="flex items-center">
                                    <button
                                        className="delete-button bg-red-600 text-white text-sm rounded-md px-2 py-1 mr-2 hover:bg-red-500"
                                        onClick={() => handledeleteExpense(expense._id)}
                                    >
                                        Delete
                                    </button>
                                    <button
                                        className="bg-blue-700 text-white text-sm rounded-md px-2 py-1 mr-10 hover:bg-blue-500"
                                        onClick={() => openEditModal(expense)}
                                    >
                                        Edit
                                    </button>
                                    <div className="expense-description text-md md:text-lg font-semibold">
                                        {expense.text}
                                    </div>
                                </div>
     
                                <div
                                    className="expense-amount text-sm md:text-lg font-bold"
                                    style={{ color: expense.amount > 0 ? '#00CC00' : '#c0392b' }}
                                >
                                    ₹{expense.amount}
                                </div>
                            </div>
                        
                            <div className="text-sm text-gray-500 text-right">
                                {new Date(expense.updatedAt).toLocaleString()}
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="text-center p-4">No expenses found</div>
                )}
            </div>

            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white p-5 rounded-lg shadow-lg w-full max-w-md mx-4 sm:mx-6 lg:max-w-lg">
                        <h2 className="text-xl font-semibold mb-4">Edit Expense</h2>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700">Expense Detail</label>
                                <input
                                    type="text"
                                    name="text"
                                    value={editedExpense.text}
                                    onChange={(e) => setEditedExpense({ ...editedExpense, text: e.target.value })}
                                    className="w-full px-3 py-2 border border-gray-300 rounded"
                                    placeholder="Enter Expense Detail"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700">Amount</label>
                                <input
                                    type="number"
                                    name="amount"
                                    value={editedExpense.amount}
                                    onChange={(e) => setEditedExpense({ ...editedExpense, amount: e.target.value })}
                                    className="w-full px-3 py-2 border border-gray-300 rounded"
                                    placeholder="Enter Amount"
                                />
                            </div>
                            <div className="flex justify-end">
                                <button
                                    type="button"
                                    onClick={closeModal}
                                    className="bg-gray-300 text-gray-700 py-2 px-4 rounded mr-2"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="bg-blue-500 text-white py-2 px-4 rounded"
                                >
                                    Save Changes
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ExpenseTable;
