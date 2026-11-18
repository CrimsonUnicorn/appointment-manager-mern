const mongoose = require('mongoose');
const Appointment = require('../models/Appointment');

const seedInitialAppointments = async () => {
    const count = await Appointment.countDocuments();
    if (count === 0) {
        await Appointment.insertMany([
            {
                customerName: 'Alex Morgan',
                service: 'Consultation',
                dateTime: '2026-11-02 10:00',
                status: 'Pending',
            },
            {
                customerName: 'Jamie Lee',
                service: 'Follow-up',
                dateTime: '2026-11-02 11:30',
                status: 'Confirmed',
            },
            {
                customerName: 'Taylor Smith',
                service: 'Review',
                dateTime: '2026-11-03 14:00',
                status: 'Cancelled',
            },
        ]);
        console.log('Seeded 3 initial appointments');
    }
};

const connectDB = async () => {
    const uri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/appointment_manager';
    await mongoose.connect(uri);
    console.log('MongoDB connected successfully');
    await seedInitialAppointments();
};

module.exports = connectDB;