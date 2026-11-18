const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema(
  {
    customerName: {
      type: String,
      required: [true, 'Customer name is required'],
      trim: true,
    },
    service: {
      type: String,
      required: [true, 'Service is required'],
      trim: true,
    },
    dateTime: {
      type: String,
      required: [true, 'Date and time are required'],
      trim: true,
    },
    status: {
      type: String,
      enum: ['Pending', 'Confirmed', 'Cancelled'],
      default: 'Pending',
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Appointment', appointmentSchema);