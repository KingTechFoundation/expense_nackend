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
const allowedOrigins = [
  'https://glowing-croquembouche-57bd48.netlify.app',
  'http://localhost:5173', // For local development
];


app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (e.g., Postman, curl)
      if (!origin) return callback(null, true);
      if (allowedOrigins.indexOf(origin) === -1) {
        const msg =
          'The CORS policy for this site does not allow access from the specified Origin.';
        return callback(new Error(msg), false);
      }
      return callback(null, true);
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true, // Support cookies or Authorization headers
  })
);
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
