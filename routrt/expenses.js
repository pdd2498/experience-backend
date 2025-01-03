const express = require('express');
const Expense = require('../model/Expense');
const jwt = require("jsonwebtoken");
const exportToCSV = require('../utils/csvExporter');
const router = express.Router();

// Fetch expenses with filtering
router.get('/',async (req, res) => {
    try {
        console.log("pass 3");
        const {token , startDate, endDate, category } = req.query;
        const filter = {};
        console.log("pass 4");

        if (token) filter.username = token;
        if (startDate) filter.date = { $gte: new Date(startDate) };
        if (endDate) filter.date = { ...filter.date, $lte: new Date(endDate) };
        if (category) filter.category = category;

        const expenses = await Expense.find(filter);
        res.json({ success: true, expenses });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: 'Error fetching expenses' });
    }
});

router.post('/', async (req, res) => {
    try {
        const {username , date, category, description, amount } = req.body;

        if (!date || !category || !description || !amount) {
            return res.status(400).json({ success: false, message: 'All fields are required' });
        }

        const expense = new Expense({username ,  date, category, description, amount });
        await expense.save();

        res.json({ success: true, message: 'Expense added successfully', expense });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: 'Error adding expense' });
    }
});

// Export expenses to CSV
router.get('/export', async (req, res) => {
    try {
        const { startDate, endDate, category } = req.query;
        const filter = {};

        if (startDate) filter.date = { $gte: new Date(startDate) };
        if (endDate) filter.date = { ...filter.date, $lte: new Date(endDate) };
        if (category) filter.category = category;

        const expenses = await Expense.find(filter);
        const csv = exportToCSV(expenses);

        res.header('Content-Type', 'text/csv');
        res.attachment('expenses.csv');
        res.send(csv);
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: 'Error exporting expenses' });
    }
});

module.exports = router;
