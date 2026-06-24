import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { Calendar } from "lucide-react";
import { bookAppointment, getAllAppointments } from "../../service/appointmentService";
import { getAllDoctors } from "../../service/doctorService";
import { getAllPatients } from "../../service/patientService";
import { useAuth } from "../../context/AuthContext";

export default function BookAppointment() {
  const { user } = useAuth();
  const [doctors, setDoctors] = useState([]);
  const [patients, setPatients] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [form, setForm] = useState({
    doctorId: "",
    patientId: "",
    appointmentDate: "",
  });

  const loadData = async () => {
    setLoading(true);
    try {
      const docRes = await getAllDoctors();
      const patRes = await getAllPatients();
      const apptRes = await getAllAppointments();
      setDoctors(docRes.data);
      setPatients(patRes.data);

      const myEmail = user ? user.email : "";
      const myAppointments = apptRes.data.filter((a) => {
        return a.patient && a.patient.email === myEmail;
      });
      setAppointments(myAppointments);
    } catch (err) {
      toast.error("Failed to load data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);

    const payload = {
      doctor: form.doctorId ? { id: Number(form.doctorId) } : null,
      patient: form.patientId ? { id: Number(form.patientId) } : null,
      appointmentDate: form.appointmentDate,
      status: "PENDING",
    };

    try {
      await bookAppointment(payload);
      toast.success("Appointment booked!");
      setForm({ doctorId: "", patientId: "", appointmentDate: "" });
      loadData();
    } catch (err) {
      toast.error("Failed to book appointment");
    } finally {
      setSaving(false);
    }
  };

  const statusColors = {
    PENDING: "bg-amber-100 text-amber-700",
    CONFIRMED: "bg-blue-100 text-blue-700",
    COMPLETED: "bg-emerald-100 text-emerald-700",
    CANCELLED: "bg-red-100 text-red-700",
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Book Appointment</h1>

      <form onSubmit={handleSubmit} className="bg-white p-5 rounded-xl shadow mb-8 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Select Your Patient Profile</label>
          <select
            required
            value={form.patientId}
            onChange={(e) => setForm({ ...form, patientId: e.target.value })}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-violet-500"
          >
            <option value="">-- Select Patient --</option>
            {patients.map((p) => (
              <option key={p.id} value={p.id}>{p.patientName} ({p.email})</option>
            ))}
          </select>
          <p className="text-xs text-gray-400 mt-1">
            Select the profile matching your name/email
          </p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Select Doctor</label>
          <select
            required
            value={form.doctorId}
            onChange={(e) => setForm({ ...form, doctorId: e.target.value })}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-violet-500"
          >
            <option value="">-- Select Doctor --</option>
            {doctors.map((d) => (
              <option key={d.id} value={d.id}>
                {d.doctorName} ({d.specialization})
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Date & Time</label>
          <input
            type="datetime-local"
            required
            value={form.appointmentDate}
            onChange={(e) => setForm({ ...form, appointmentDate: e.target.value })}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-violet-500"
          />
        </div>

        <div className="md:col-span-2">
          <button
            type="submit"
            disabled={saving}
            className="flex items-center gap-2 bg-violet-600 text-white px-4 py-2 rounded-lg hover:bg-violet-700 transition disabled:opacity-50"
          >
            <Calendar size={18} />
            {saving ? "Booking..." : "Book Appointment"}
          </button>
        </div>
      </form>

      <h2 className="text-xl font-semibold text-gray-800 mb-4">My Appointments</h2>

      <div className="bg-white rounded-xl shadow overflow-hidden">
        {loading && <p className="p-6 text-center text-gray-500">Loading...</p>}
        {!loading && appointments.length === 0 && (
          <p className="p-6 text-center text-gray-500">No appointments booked yet.</p>
        )}
        {!loading && appointments.length > 0 && (
          <table className="w-full text-left">
            <thead className="bg-gray-50 text-gray-600 text-sm">
              <tr>
                <th className="px-4 py-3">Doctor</th>
                <th className="px-4 py-3">Date</th>
                <th className="px-4 py-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {appointments.map((a) => (
                <tr key={a.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 font-medium">
                    {a.doctor ? a.doctor.doctorName : "-"}
                  </td>
                  <td className="px-4 py-3 text-gray-600">
                    {a.appointmentDate ? new Date(a.appointmentDate).toLocaleString() : "-"}
                  </td>
                  <td className="px-4 py-3">
                    <span className={`text-xs px-2 py-1 rounded-full font-medium ${statusColors[a.status] || "bg-gray-100 text-gray-600"}`}>
                      {a.status || "PENDING"}
                    </span>
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