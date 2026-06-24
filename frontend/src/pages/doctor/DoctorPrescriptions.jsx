import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { Plus, Trash2, Download, X } from "lucide-react";
import { getAllPrescriptions, savePrescription, deletePrescription, downloadPrescriptionPdf } from "../../service/prescriptionService";
import { getAllDoctors } from "../../service/doctorService";
import { getAllPatients } from "../../service/patientService";

const emptyForm = {
  medicine: "",
  dosage: "",
  notes: "",
  doctor: { id: "" },
  patient: { id: "" },
};

export default function DoctorPrescriptions() {
  const [prescriptions, setPrescriptions] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);

  const loadAll = async () => {
    setLoading(true);
    try {
      const presRes = await getAllPrescriptions();
      const docRes = await getAllDoctors();
      const patRes = await getAllPatients();
      setPrescriptions(presRes.data);
      setDoctors(docRes.data);
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);

    const payload = {
      medicine: form.medicine,
      dosage: form.dosage,
      notes: form.notes,
      doctor: form.doctor.id ? { id: Number(form.doctor.id) } : null,
      patient: form.patient.id ? { id: Number(form.patient.id) } : null,
    };

    try {
      await savePrescription(payload);
      toast.success("Prescription added");
      setForm(emptyForm);
      setShowForm(false);
      loadAll();
    } catch (err) {
      toast.error("Failed to save prescription");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    const ok = confirm("Delete this prescription?");
    if (!ok) return;
    try {
      await deletePrescription(id);
      toast.success("Prescription deleted");
      loadAll();
    } catch (err) {
      toast.error("Failed to delete");
    }
  };

  const handleDownload = async (id) => {
    try {
      const res = await downloadPrescriptionPdf(id);
      const blob = new Blob([res.data], { type: "application/pdf" });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "prescription_" + id + ".pdf";
      link.click();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      toast.error("Failed to download PDF");
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Prescriptions</h1>
        <button onClick={() => setShowForm(!showForm)} className="flex items-center gap-2 bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition">
          {showForm ? <X size={18} /> : <Plus size={18} />}
          {showForm ? "Cancel" : "Add Prescription"}
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="bg-white p-5 rounded-xl shadow mb-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Patient</label>
            <select required value={form.patient.id} onChange={(e) => setForm({ ...form, patient: { id: e.target.value } })} className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500">
              <option value="">-- Select Patient --</option>
              {patients.map((p) => (
                <option key={p.id} value={p.id}>{p.patientName}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Doctor</label>
            <select required value={form.doctor.id} onChange={(e) => setForm({ ...form, doctor: { id: e.target.value } })} className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500">
              <option value="">-- Select Doctor --</option>
              {doctors.map((d) => (
                <option key={d.id} value={d.id}>{d.doctorName}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Medicine</label>
            <input type="text" required value={form.medicine} onChange={(e) => setForm({ ...form, medicine: e.target.value })} className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Dosage</label>
            <input type="text" required value={form.dosage} onChange={(e) => setForm({ ...form, dosage: e.target.value })} placeholder="e.g. 1 tablet twice a day" className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500" />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
            <textarea value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} rows={2} className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"></textarea>
          </div>
          <div className="md:col-span-2">
            <button type="submit" disabled={saving} className="bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition disabled:opacity-50">
              {saving ? "Saving..." : "Save Prescription"}
            </button>
          </div>
        </form>
      )}

      <div className="bg-white rounded-xl shadow overflow-hidden">
        {loading && <p className="p-6 text-center text-gray-500">Loading...</p>}
        {!loading && prescriptions.length === 0 && <p className="p-6 text-center text-gray-500">No prescriptions yet.</p>}
        {!loading && prescriptions.length > 0 && (
          <table className="w-full text-left">
            <thead className="bg-gray-50 text-gray-600 text-sm">
              <tr>
                <th className="px-4 py-3">Patient</th>
                <th className="px-4 py-3">Doctor</th>
                <th className="px-4 py-3">Medicine</th>
                <th className="px-4 py-3">Dosage</th>
                <th className="px-4 py-3 w-24">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {prescriptions.map((p) => (
                <tr key={p.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 font-medium">{p.patient ? p.patient.patientName : "-"}</td>
                  <td className="px-4 py-3">{p.doctor ? p.doctor.doctorName : "-"}</td>
                  <td className="px-4 py-3">{p.medicine}</td>
                  <td className="px-4 py-3 text-gray-600">{p.dosage}</td>
                  <td className="px-4 py-3 flex gap-2">
                    <button onClick={() => handleDownload(p.id)} className="text-blue-500 hover:text-blue-700" title="Download PDF">
                      <Download size={18} />
                    </button>
                    <button onClick={() => handleDelete(p.id)} className="text-red-500 hover:text-red-700" title="Delete">
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