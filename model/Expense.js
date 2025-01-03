const mongoose = require('mongoose');

const expenseSchema = new mongoose.Schema({
    username: {type: String, required: true,},
    date: { type: Date, required: true },
    category: { type: String, required: true },
    description: { type: String, required: true },
    amount: { type: Number, required: true },
});

module.exports = mongoose.model('Expense', expenseSchema);
