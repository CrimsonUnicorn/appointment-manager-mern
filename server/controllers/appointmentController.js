const Appointment = require('../models/Appointment');

// @desc    Get all appointments (supports ?status= & ?search=)
// @route   GET /api/appointments
const getAppointments = async (req, res) => {
    try {
        const { status, search } = req.query;
        const filter = {};

        if (status && status !== 'All') {
            filter.status = status;
        }

        if (search && search.trim()) {
            filter.customerName = { $regex: search.trim(), $options: 'i' };
        }

        const appointments = await Appointment.find(filter).sort({ createdAt: -1 });
        res.status(200).json(appointments);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching appointments', error: error.message });
    }
};

// @desc    Create a new appointment
// @route   POST /api/appointments
const createAppointment = async (req, res) => {
    try {
        const { customerName, service, dateTime, status } = req.body;

        if (!customerName?.trim() || !service?.trim() || !dateTime?.trim()) {
            return res.status(400).json({
                message: 'Customer name, service, and date/time are all required.',
            });
        }

        const newAppointment = await Appointment.create({
            customerName: customerName.trim(),
            service: service.trim(),
            dateTime: dateTime.trim(),
            status: status || 'Pending',
        });

        res.status(201).json(newAppointment);
    } catch (error) {
        res.status(400).json({ message: 'Failed to create appointment', error: error.message });
    }
};

// @desc    Update appointment status
// @route   PATCH /api/appointments/:id/status
const updateAppointmentStatus = async (req, res) => {
    try {
        const { status } = req.body;
        const validStatuses = ['Pending', 'Confirmed', 'Cancelled'];

        if (!validStatuses.includes(status)) {
            return res.status(400).json({ message: 'Invalid status value.' });
        }

        const updated = await Appointment.findByIdAndUpdate(
            req.params.id,
            { status },
            { new: true, runValidators: true }
        );

        if (!updated) {
            return res.status(404).json({ message: 'Appointment not found.' });
        }

        res.status(200).json(updated);
    } catch (error) {
        res.status(400).json({ message: 'Failed to update status', error: error.message });
    }
};

module.exports = {
    getAppointments,
    createAppointment,
    updateAppointmentStatus,
};