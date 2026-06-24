import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { Plus, Trash2, Pencil, X, Search } from "lucide-react";
import {
  getAllDoctors,
  saveDoctor,
  updateDoctor,
  deleteDoctor,
  searchDoctor,
} from "../../service/doctorService";
import { getAllDepartments } from "../../service/departmentService";

const emptyForm = {
  doctorName: "",
  specialization: "",
  email: "",
  phone: "",
  department: { id: "" },
};

export default function Doctors() {
  const [doctors, setDoctors] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const loadDoctors = async () => {
    setLoading(true);
    try {
      const res = await getAllDoctors();
      setDoctors(res.data);
    } catch (err) {
      toast.error("Failed to load doctors");
    } finally {
      setLoading(false);
    }
  };

  const loadDepartments = async () => {
    try {
      const res = await getAllDepartments();
      setDepartments(res.data);
    } catch (err) {
      toast.error("Failed to load departments");
    }
  };

  useEffect(() => {
    loadDoctors();
    loadDepartments();
  }, []);

  const handleSearch = async () => {
    if (!searchTerm.trim()) {
      loadDoctors();
      return;
    }
    try {
      const res = await searchDoctor(searchTerm);
      setDoctors(res.data);
    } catch (err) {
      toast.error("Search failed");
    }
  };

  const openAddForm = () => {
    setForm(emptyForm);
    setEditingId(null);
    setShowForm(true);
  };

  const openEditForm = (doctor) => {
    setForm({
      doctorName: doctor.doctorName,
      specialization: doctor.specialization,
      email: doctor.email,
      phone: doctor.phone,
      department: { id: doctor.department?.id || "" },
    });
    setEditingId(doctor.id);
    setShowForm(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);

    const payload = {
      doctorName: form.doctorName,
      specialization: form.specialization,
      email: form.email,
      phone: form.phone,
      department: form.department.id ? { id: Number(form.department.id) } : null,
    };

    try {
      if (editingId) {
        await updateDoctor(editingId, payload);
        toast.success("Doctor updated");
      } else {
        await saveDoctor(payload);
        toast.success("Doctor added");
      }
      setShowForm(false);
      setForm(emptyForm);
      setEditingId(null);
      loadDoctors();
    } catch (err) {
      toast.error("Failed to save doctor");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete this doctor?")) return;
    try {
      await deleteDoctor(id);
      toast.success("Doctor deleted");
      loadDoctors();
    } catch (err) {
      toast.error("Failed to delete doctor");
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Doctors</h1>
        <button
          onClick={openAddForm}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          <Plus size={18} />
          Add Doctor
        </button>
      </div>

      {/* Search bar */}
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          placeholder="Search doctor by name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          className="flex-1 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={handleSearch}
          className="bg-gray-200 px-4 py-2 rounded-lg hover:bg-gray-300 transition flex items-center gap-2"
        >
          <Search size={18} />
        </button>
      </div>

      {showForm && (
        <form
          onSubmit={handleSubmit}
          className="bg-white p-5 rounded-xl shadow mb-6 grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Doctor Name
            </label>
            <input
              type="text"
              required
              value={form.doctorName}
              onChange={(e) => setForm({ ...form, doctorName: e.target.value })}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Specialization
            </label>
            <input
              type="text"
              required
              value={form.specialization}
              onChange={(e) =>
                setForm({ ...form, specialization: e.target.value })
              }
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              required
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Phone
            </label>
            <input
              type="text"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Department
            </label>
            <select
              value={form.department.id}
              onChange={(e) =>
                setForm({ ...form, department: { id: e.target.value } })
              }
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">-- Select Department --</option>
              {departments.map((d) => (
                <option key={d.id} value={d.id}>
                  {d.departmentName}
                </option>
              ))}
            </select>
          </div>

          <div className="md:col-span-2 flex gap-3">
            <button
              type="submit"
              disabled={saving}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
            >
              {saving ? "Saving..." : editingId ? "Update Doctor" : "Save Doctor"}
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
        {loading ? (
          <p className="p-6 text-center text-gray-500">Loading...</p>
        ) : doctors.length === 0 ? (
          <p className="p-6 text-center text-gray-500">No doctors found.</p>
        ) : (
          <table className="w-full text-left">
            <thead className="bg-gray-50 text-gray-600 text-sm">
              <tr>
                <th className="px-4 py-3">Name</th>
                <th className="px-4 py-3">Specialization</th>
                <th className="px-4 py-3">Department</th>
                <th className="px-4 py-3">Email</th>
                <th className="px-4 py-3">Phone</th>
                <th className="px-4 py-3 w-24">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {doctors.map((doc) => (
                <tr key={doc.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 font-medium">{doc.doctorName}</td>
                  <td className="px-4 py-3">{doc.specialization}</td>
                  <td className="px-4 py-3">{doc.department?.departmentName || "-"}</td>
                  <td className="px-4 py-3 text-gray-600">{doc.email}</td>
                  <td className="px-4 py-3 text-gray-600">{doc.phone}</td>
                  <td className="px-4 py-3 flex gap-2">
                    <button
                      onClick={() => openEditForm(doc)}
                      className="text-blue-500 hover:text-blue-700"
                    >
                      <Pencil size={18} />
                    </button>
                    <button
                      onClick={() => handleDelete(doc.id)}
                      className="text-red-500 hover:text-red-700"
                    >
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