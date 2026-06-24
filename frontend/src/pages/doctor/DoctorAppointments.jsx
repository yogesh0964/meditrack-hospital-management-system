import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { CheckCircle, XCircle, Clock } from "lucide-react";
import {
  getAllAppointments,
  updateAppointment,
} from "../../service/appointmentService";

const statusColors = {
  PENDING: "bg-amber-100 text-amber-700",
  CONFIRMED: "bg-blue-100 text-blue-700",
  COMPLETED: "bg-emerald-100 text-emerald-700",
  CANCELLED: "bg-red-100 text-red-700",
};

export default function DoctorAppointments() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadAppointments = async () => {
    setLoading(true);
    try {
      const res = await getAllAppointments();
      setAppointments(res.data);
    } catch (err) {
      toast.error("Failed to load appointments");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAppointments();
  }, []);

  const handleStatusChange = async (appt, newStatus) => {
    try {
      await updateAppointment(appt.id, { ...appt, status: newStatus });
      toast.success(`Marked as ${newStatus}`);
      loadAppointments();
    } catch (err) {
      toast.error("Failed to update status");
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Appointments</h1>

      <div className="bg-white rounded-xl shadow overflow-hidden">
        {loading ? (
          <p className="p-6 text-center text-gray-500">Loading...</p>
        ) : appointments.length === 0 ? (
          <p className="p-6 text-center text-gray-500">No appointments yet.</p>
        ) : (
          <table className="w-full text-left">
            <thead className="bg-gray-50 text-gray-600 text-sm">
              <tr>
                <th className="px-4 py-3">Patient</th>
                <th className="px-4 py-3">Doctor</th>
                <th className="px-4 py-3">Date</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3 w-40">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {appointments.map((a) => (
                <tr key={a.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 font-medium">{a.patient?.patientName || "-"}</td>
                  <td className="px-4 py-3">{a.doctor?.doctorName || "-"}</td>
                  <td className="px-4 py-3 text-gray-600">
                    {a.appointmentDate ? new Date(a.appointmentDate).toLocaleString() : "-"}
                  </td>
                  <td className="px-4 py-3">
                    <span className={`text-xs px-2 py-1 rounded-full font-medium ${statusColors[a.status] || "bg-gray-100 text-gray-600"}`}>
                      {a.status || "PENDING"}
                    </span>
                  </td>
                  <td className="px-4 py-3 flex gap-2">
                    <button
                      title="Confirm"
                      onClick={() => handleStatusChange(a, "CONFIRMED")}
                      className="text-blue-500 hover:text-blue-700"
                    >
                      <Clock size={18} />
                    </button>
                    <button
                      title="Complete"
                      onClick={() => handleStatusChange(a, "COMPLETED")}
                      className="text-emerald-500 hover:text-emerald-700"
                    >
                      <CheckCircle size={18} />
                    </button>
                    <button
                      title="Cancel"
                      onClick={() => handleStatusChange(a, "CANCELLED")}
                      className="text-red-500 hover:text-red-700"
                    >
                      <XCircle size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}