import { useState } from 'react';

export default function AppointmentForm({ onAdd }) {
    const [form, setForm] = useState({
        customerName: '',
        service: '',
        dateTime: '',
        status: 'Pending',
    });
    const [errors, setErrors] = useState({});
    const [submitting, setSubmitting] = useState(false);

    const validate = () => {
        const newErrors = {};
        if (!form.customerName.trim()) newErrors.customerName = 'Customer name is required';
        if (!form.service.trim()) newErrors.service = 'Service is required';
        if (!form.dateTime.trim()) newErrors.dateTime = 'Date & time is required';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validate()) return;

        setSubmitting(true);
        try {
            const formattedDateTime = form.dateTime.replace('T', ' ');
            await onAdd({ ...form, dateTime: formattedDateTime });
            setForm({ customerName: '', service: '', dateTime: '', status: 'Pending' });
            setErrors({});
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="bg-white p-5 rounded-xl shadow-sm border border-slate-200 mb-6"
        >
            <h2 className="text-base font-semibold text-slate-800 mb-4">New Appointment</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1">Customer Name *</label>
                    <input
                        type="text"
                        placeholder="e.g. Alex Morgan"
                        value={form.customerName}
                        onChange={(e) => setForm({ ...form, customerName: e.target.value })}
                        className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    {errors.customerName && <p className="text-xs text-red-600 mt-1">{errors.customerName}</p>}
                </div>

                <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1">Service *</label>
                    <input
                        type="text"
                        placeholder="e.g. Consultation"
                        value={form.service}
                        onChange={(e) => setForm({ ...form, service: e.target.value })}
                        className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    {errors.service && <p className="text-xs text-red-600 mt-1">{errors.service}</p>}
                </div>

                <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1">Date & Time *</label>
                    <input
                        type="datetime-local"
                        value={form.dateTime}
                        onChange={(e) => setForm({ ...form, dateTime: e.target.value })}
                        className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    {errors.dateTime && <p className="text-xs text-red-600 mt-1">{errors.dateTime}</p>}
                </div>

                <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1">Status</label>
                    <select
                        value={form.status}
                        onChange={(e) => setForm({ ...form, status: e.target.value })}
                        className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="Pending">Pending</option>
                        <option value="Confirmed">Confirmed</option>
                        <option value="Cancelled">Cancelled</option>
                    </select>
                </div>

                <div className="flex items-end">
                    <button
                        type="submit"
                        disabled={submitting}
                        className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white text-sm font-medium rounded-lg transition cursor-pointer"
                    >
                        {submitting ? 'Adding...' : '+ Add Appointment'}
                    </button>
                </div>
            </div>
        </form>
    );
}