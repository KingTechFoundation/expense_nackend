const express = require('express');
const cors = require('cors');
require('dotenv').config();
const connectDB = require('./config/db');
const expenseRoutes = require('./routes/expenseRoutes');
const authRoutes = require('./routes/authRoutes');
const authController = require('./controllers/authController');

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/expenses', authController.protect, expenseRoutes);

app.get('/', (req, res) => {
  res.send('Expense Tracker API Running...');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
