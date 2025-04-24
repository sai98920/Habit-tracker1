const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');
require('dotenv').config(); // Load environment variables

const habitRoutes = require('./routes/habitRoutes');
const authRoutes = require('./routes/authRoutes');
// const profileRoutes = require('./routes/profile');

const app = express();

// Middleware
app.use(cors({
    origin: 'http://localhost:5173', // frontend URL
    credentials: true // allow cookies to be sent
}));
app.use(express.json());
app.use(cookieParser());

// Routes
app.use('/api', habitRoutes);
app.use('/api', authRoutes);
// app.use('/api/user', profileRoutes);

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('✅ MongoDB connected'))
    .catch(err => console.error('❌ MongoDB connection error:', err));

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 Server is running on port ${PORT}`);
});
