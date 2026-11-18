import { useState, useEffect, useCallback } from 'react';
import {
  getAppointments,
  createAppointment,
  updateAppointmentStatus,
} from './services/appointments/appointment';
import AppointmentForm from './components/AppointmentForm';
import FilterBar from './components/FilterBar';
import AppointmentList from './components/AppointmentList';

export default function App() {
  const [appointments, setAppointments] = useState([]);
  const [statusFilter, setStatusFilter] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const loadAppointments = useCallback(async () => {
    try {
      setLoading(true);
      const data = await getAppointments({ status: statusFilter, search: searchTerm });
      setAppointments(data);
      setError('');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [statusFilter, searchTerm]);

  useEffect(() => {
    loadAppointments();
  }, [loadAppointments]);

  const handleAdd = async (payload) => {
    try {
      await createAppointment(payload);
      await loadAppointments();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleStatusUpdate = async (id, newStatus) => {
    try {
      await updateAppointmentStatus(id, newStatus);
      await loadAppointments();
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 py-8 px-4 sm:px-6">
      <div className="max-w-5xl mx-auto">
        <header className="mb-6">
          <h1 className="text-2xl font-bold text-slate-900">Appointment Manager</h1>
          <p className="text-sm text-slate-600 mt-1">
            Schedule customer sessions, filter by status, and update progress in real time.
          </p>
        </header>

        {error && (
          <div className="mb-4 p-3.5 rounded-lg bg-red-50 border border-red-200 text-red-700 text-sm">
            {error}
          </div>
        )}

        <AppointmentForm onAdd={handleAdd} />

        <FilterBar
          statusFilter={statusFilter}
          onStatusChange={setStatusFilter}
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
        />

        <AppointmentList
          appointments={appointments}
          loading={loading}
          onStatusUpdate={handleStatusUpdate}
        />
      </div>
    </div>
  );
}