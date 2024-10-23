

const addExpenses=(req,res)=>{
    res.send("addExpense")
}

const fetchExpenses=(req,res)=>{
    res.send('addExpenses')
}

const deleteExpenses=(req,res)=>{
    res.send("deleeExpenses")
}

module.exports={
    addExpenses,
    fetchExpenses,
    deleteExpenses
}