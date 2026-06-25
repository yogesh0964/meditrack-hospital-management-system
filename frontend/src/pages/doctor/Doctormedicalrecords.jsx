import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { Plus, Trash2, Pencil, X } from "lucide-react";
import {
  getAllRecords,
  saveRecord,
  updateRecord,
  deleteRecord,
} from "../../service/medicalRecordService";
import { getAllPatients } from "../../service/patientService";

const emptyForm = {
  diagnosis: "",
  treatment: "",
  recordDate: "",
  patient: { id: "" },
};

export default function DoctorMedicalRecords() {
  const [records, setRecords] = useState([]);
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);

  const loadAll = async () => {
    setLoading(true);
    try {
      const recRes = await getAllRecords();
      const patRes = await getAllPatients();
      setRecords(recRes.data);
      setPatients(patRes.data);
    } catch (err) {
      toast.error("Failed to load data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAll();
  }, []);

  const openAddForm = () => {
    setForm(emptyForm);
    setEditingId(null);
    setShowForm(true);
  };

  const openEditForm = (record) => {
    setForm({
      diagnosis: record.diagnosis || "",
      treatment: record.treatment || "",
      recordDate: record.recordDate || "",
      patient: { id: record.patient ? record.patient.id : "" },
    });
    setEditingId(record.id);
    setShowForm(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);

    const payload = {
      diagnosis: form.diagnosis,
      treatment: form.treatment,
      recordDate: form.recordDate,
      patient: form.patient.id ? { id: Number(form.patient.id) } : null,
    };

    try {
      if (editingId) {
        await updateRecord(editingId, payload);
        toast.success("Medical record updated");
      } else {
        await saveRecord(payload);
        toast.success("Medical record added");
      }
      setShowForm(false);
      setForm(emptyForm);
      setEditingId(null);
      loadAll();
    } catch (err) {
      toast.error("Failed to save record");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    const ok = confirm("Delete this medical record?");
    if (!ok) return;
    try {
      await deleteRecord(id);
      toast.success("Record deleted");
      loadAll();
    } catch (err) {
      toast.error("Failed to delete record");
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Medical Records</h1>
        <button onClick={openAddForm} className="flex items-center gap-2 bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition">
          <Plus size={18} />
          Add Record
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="bg-white p-5 rounded-xl shadow mb-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Patient</label>
            <select
              required
              value={form.patient.id}
              onChange={(e) => setForm({ ...form, patient: { id: e.target.value } })}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            >
              <option value="">-- Select Patient --</option>
              {patients.map((p) => (
                <option key={p.id} value={p.id}>{p.patientName} ({p.email})</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Record Date</label>
            <input
              type="date"
              required
              value={form.recordDate}
              onChange={(e) => setForm({ ...form, recordDate: e.target.value })}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Diagnosis</label>
            <input
              type="text"
              required
              value={form.diagnosis}
              onChange={(e) => setForm({ ...form, diagnosis: e.target.value })}
              placeholder="e.g. Viral Fever"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Treatment</label>
            <input
              type="text"
              required
              value={form.treatment}
              onChange={(e) => setForm({ ...form, treatment: e.target.value })}
              placeholder="e.g. Rest + Paracetamol"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          <div className="md:col-span-2 flex gap-3">
            <button
              type="submit"
              disabled={saving}
              className="bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition disabled:opacity-50"
            >
              {saving ? "Saving..." : editingId ? "Update Record" : "Save Record"}
            </button>
            <button
              type="button"
              onClick={() => {
                setShowForm(false);
                setEditingId(null);
              }}
              className="bg-gray-200 px-4 py-2 rounded-lg hover:bg-gray-300 transition"
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      <div className="bg-white rounded-xl shadow overflow-hidden">
        {loading && <p className="p-6 text-center text-gray-500">Loading...</p>}
        {!loading && records.length === 0 && (
          <p className="p-6 text-center text-gray-500">No medical records yet.</p>
        )}
        {!loading && records.length > 0 && (
          <table className="w-full text-left">
            <thead className="bg-gray-50 text-gray-600 text-sm">
              <tr>
                <th className="px-4 py-3">Patient</th>
                <th className="px-4 py-3">Date</th>
                <th className="px-4 py-3">Diagnosis</th>
                <th className="px-4 py-3">Treatment</th>
                <th className="px-4 py-3 w-24">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {records.map((r) => (
                <tr key={r.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 font-medium">{r.patient ? r.patient.patientName : "-"}</td>
                  <td className="px-4 py-3 text-gray-600">{r.recordDate}</td>
                  <td className="px-4 py-3">{r.diagnosis}</td>
                  <td className="px-4 py-3">{r.treatment}</td>
                  <td className="px-4 py-3 flex gap-2">
                    <button onClick={() => openEditForm(r)} className="text-blue-500 hover:text-blue-700">
                      <Pencil size={18} />
                    </button>
                    <button onClick={() => handleDelete(r.id)} className="text-red-500 hover:text-red-700">
                      <Trash2 size={18} />
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