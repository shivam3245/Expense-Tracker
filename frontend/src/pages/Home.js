import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { APIUrl, handleError, handleSuccess } from '../utils';
import { ToastContainer } from 'react-toastify';
import ExpenseTable from './ExpenseTable';
import ExpenseForm from './ExpenseForm';
import ExpenseDetails from './ExpenseDetails';

function Home() {
    const [loggedInUser, setLoggedInUser] = useState('');
    const [expenses, setExpenses] = useState([]);
    const [expenseAmt, setExpenseAmt] = useState(0);
    const [incomeAmt, setIncomeAmt] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        setLoggedInUser(localStorage.getItem('loggedInUser'));
    }, []);

    useEffect(() => {
        const amounts = expenses.map((item) => item.amount);
        const income = amounts.filter((item) => item > 0).reduce((acc, item) => (acc += item), 0);
        const exp = amounts.filter((item) => item < 0).reduce((acc, item) => (acc += item), 0) * -1;

        setIncomeAmt(income);
        setExpenseAmt(exp);
    }, [expenses]);

    const handleLogout = (e) => {
        localStorage.removeItem('token');
        localStorage.removeItem('loggedInUser');
        handleSuccess('User Logged out');
        setTimeout(() => {
            navigate('/login');
        }, 1000);
    };

    const fetchExpenses = async () => {
        try {
            const url = `${APIUrl}/expenses`;
            const headers = {
                headers: {
                    'Authorization': localStorage.getItem('token'),
                },
            };
            const response = await fetch(url, headers);
            if (response.status === 403) {
                navigate('/login');
                return;
            }
            const result = await response.json();
            setExpenses(result.data);
        } catch (err) {
            handleError(err);
        }
    };

    const addExpenses = async (data) => {
        try {
            const url = `${APIUrl}/expenses`;
            const headers = {
                method: "POST",
                headers: {
                    'Authorization': localStorage.getItem('token'),
                    "Content-Type": 'application/json',
                },
                body: JSON.stringify(data),
            };
            const response = await fetch(url, headers);
            if (response.status === 403) {
                navigate('/login');
                return;
            }
            const result = await response.json();
            setExpenses(result.data);
            handleSuccess(result.message);
        } catch (err) {
            handleError(err);
        }
    };

    useEffect(() => {
        fetchExpenses();
    }, []);

    const handledeleteExpense = async (expenseId) => {
        try {
            const url = `${APIUrl}/expenses/${expenseId}`;
            const headers = {
                method: "DELETE",
                headers: {
                    'Authorization': localStorage.getItem('token'),
                    "Content-Type": 'application/json',
                },
            };
            const response = await fetch(url, headers);
            if (response.status === 403) {
                navigate('/login');
                return;
            }
            const result = await response.json();
            setExpenses(result.data);
            handleSuccess(result.message);
        } catch (err) {
            handleError(err);
        }
    };

    const handleEditExpense = (id, updatedExpense) => {
        setExpenses((prevExpenses) =>
            prevExpenses.map((expense) =>
                expense._id === id
                    ? { 
                        ...expense, 
                        text: updatedExpense.text, 
                        amount: parseFloat(updatedExpense.amount) 
                    }
                    : expense
            )
        );
    };
    

    return (
        <div className="flex flex-col p-6 max-w-4xl mx-auto">
            <div className="user-section flex justify-between items-center mb-4">
                <h1 className="text-2xl font-bold">Welcome <span className='text-purple-700'>{loggedInUser}</span></h1>
                <button className="bg-purple-600 text-white text-lg rounded-md py-1 px-2 md:py-2 md:px-4" onClick={handleLogout}>
                    Logout
                </button>
            </div>
            <ExpenseDetails incomeAmt={incomeAmt} expenseAmt={expenseAmt} />
            <ExpenseForm addExpenses={addExpenses} />
            <div className="overflow-y-auto max-h-60">
                <ExpenseTable expenses={expenses} handledeleteExpense={handledeleteExpense} handleEditExpense={handleEditExpense}/>
            </div>
            <ToastContainer />
        </div>
    );
}

export default Home;
