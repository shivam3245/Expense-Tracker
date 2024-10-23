import React from 'react'

const ExpenseTable = ({ expenses }) => {
  console.log("expensetabell-->", expenses);
  
  return (
    <div className='expense-list'>
      {
        expenses?.map((expense, index) => (
          <div key={index} className='expense-item'>
            <button className='delete-button'>X</button>
            <div className='expense-description'>{expense.text}</div>
            <div className='expense-amount' 
            style={{color:expense.amount >0? "#27ae60": "#e74c3c"}}>
                {expense.amount}
            </div>
          </div>
        ))
      }
    </div>
  );
}

export default ExpenseTable;
