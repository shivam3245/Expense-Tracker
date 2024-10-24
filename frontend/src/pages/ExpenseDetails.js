import React from 'react';

function ExpenseDetails({ incomeAmt, expenseAmt }) {
    return (
        <div className="bg-gray-300 p-4 rounded-lg mb-4">
            <div className='flex justify-center'>
            <h2 className="sm:text-xs md:text-xl font-bold">Your Balance Amount <span className='text-blue-700'>₹{incomeAmt - expenseAmt}</span></h2>
            </div>
            <div className="flex justify-between sm:text-xs md:text-xl font-bold">
                <div className="text-black">
                    Income <span className="ml-2  text-[#00CC00]">₹{incomeAmt}</span>
                </div>
                <div className="text-black">
                    Expense <span className="ml-2 text-red-600">₹{expenseAmt}</span>
                </div>
            </div>
        </div>
    );
}

export default ExpenseDetails;
