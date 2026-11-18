require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const appointmentRoutes = require('./routes/appointmentRoutes');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.get('/api/health', (req, res) => res.json({ status: 'OK' }));
app.use('/api/appointments', appointmentRoutes);

// Start Server
const PORT = process.env.PORT || 5000;

connectDB()
    .then(() => {
        app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
    })
    .catch((err) => {
        console.error('Database connection failed:', err.message);
        process.exit(1);
    });