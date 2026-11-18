const STATUS_BADGE = {
    Pending: 'bg-amber-100 text-amber-800 border-amber-200',
    Confirmed: 'bg-emerald-100 text-emerald-800 border-emerald-200',
    Cancelled: 'bg-rose-100 text-rose-800 border-rose-200',
};

export default function AppointmentList({ appointments, loading, onStatusUpdate }) {
    if (loading) {
        return (
            <div className="bg-white p-8 rounded-xl border border-slate-200 text-center text-sm text-slate-500">
                Loading appointments...
            </div>
        );
    }

    if (!appointments.length) {
        return (
            <div className="bg-white p-8 rounded-xl border border-slate-200 text-center text-sm text-slate-500">
                No appointments match the current filter.
            </div>
        );
    }

    return (
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-slate-50 border-b border-slate-200 text-xs font-semibold text-slate-600 uppercase tracking-wider">
                            <th className="py-3.5 px-4">Customer</th>
                            <th className="py-3.5 px-4">Service</th>
                            <th className="py-3.5 px-4">Date & Time</th>
                            <th className="py-3.5 px-4">Status</th>
                            <th className="py-3.5 px-4">Update Status</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200 text-sm">
                        {appointments.map((apt) => (
                            <tr key={apt._id} className="hover:bg-slate-50 transition">
                                <td className="py-3.5 px-4 font-medium text-slate-900">{apt.customerName}</td>
                                <td className="py-3.5 px-4 text-slate-700">{apt.service}</td>
                                <td className="py-3.5 px-4 text-slate-600 font-mono text-xs">{apt.dateTime}</td>
                                <td className="py-3.5 px-4">
                                    <span
                                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${STATUS_BADGE[apt.status] || 'bg-slate-100 text-slate-800'
                                            }`}
                                    >
                                        {apt.status}
                                    </span>
                                </td>
                                <td className="py-3.5 px-4">
                                    <select
                                        value={apt.status}
                                        onChange={(e) => onStatusUpdate(apt._id, e.target.value)}
                                        className="px-2.5 py-1.5 text-xs border border-slate-300 rounded-lg bg-white text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
                                    >
                                        <option value="Pending">Pending</option>
                                        <option value="Confirmed">Confirmed</option>
                                        <option value="Cancelled">Cancelled</option>
                                    </select>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}