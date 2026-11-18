const STATUS_OPTIONS = ['All', 'Pending', 'Confirmed', 'Cancelled'];

export default function FilterBar({ statusFilter, onStatusChange, searchTerm, onSearchChange }) {
    return (
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
            <div className="flex flex-wrap gap-2">
                {STATUS_OPTIONS.map((status) => {
                    const active = statusFilter === status;
                    return (
                        <button
                            key={status}
                            type="button"
                            onClick={() => onStatusChange(status)}
                            className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition cursor-pointer ${active
                                    ? 'bg-slate-900 text-white shadow-xs'
                                    : 'bg-white text-slate-700 border border-slate-300 hover:bg-slate-100'
                                }`}
                        >
                            {status}
                        </button>
                    );
                })}
            </div>

            <input
                type="text"
                placeholder="Search by customer name..."
                value={searchTerm}
                onChange={(e) => onSearchChange(e.target.value)}
                className="w-full sm:w-64 px-3.5 py-2 text-sm bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
        </div>
    );
}