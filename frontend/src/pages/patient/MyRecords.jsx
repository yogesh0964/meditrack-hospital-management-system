import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { Download, FileText, Stethoscope } from "lucide-react";
import { getAllRecords } from "../../service/medicalRecordService";
import { getAllPrescriptions, downloadPrescriptionPdf } from "../../service/prescriptionService";
import { useAuth } from "../../context/AuthContext";

export default function MyRecords() {
  const { user } = useAuth();
  const [records, setRecords] = useState([]);
  const [prescriptions, setPrescriptions] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadData = async () => {
    setLoading(true);
    try {
      const recRes = await getAllRecords();
      const presRes = await getAllPrescriptions();

      const myEmail = user ? user.email : "";

      const myRecords = recRes.data.filter((r) => {
        return r.patient && r.patient.email === myEmail;
      });
      const myPrescriptions = presRes.data.filter((p) => {
        return p.patient && p.patient.email === myEmail;
      });

      setRecords(myRecords);
      setPrescriptions(myPrescriptions);
    } catch (err) {
      toast.error("Failed to load records");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

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
      <h1 className="text-2xl font-bold text-gray-800 mb-6">My Records</h1>

      {/* Medical Records */}
      <div className="mb-8">
        <h2 className="text-lg font-semibold text-gray-700 mb-3 flex items-center gap-2">
          <Stethoscope size={20} /> Medical History
        </h2>
        <div className="bg-white rounded-xl shadow overflow-hidden">
          {loading && <p className="p-6 text-center text-gray-500">Loading...</p>}
          {!loading && records.length === 0 && (
            <p className="p-6 text-center text-gray-500">No medical records found.</p>
          )}
          {!loading && records.length > 0 && (
            <table className="w-full text-left">
              <thead className="bg-gray-50 text-gray-600 text-sm">
                <tr>
                  <th className="px-4 py-3">Date</th>
                  <th className="px-4 py-3">Diagnosis</th>
                  <th className="px-4 py-3">Treatment</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {records.map((r) => (
                  <tr key={r.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3 text-gray-600">{r.recordDate}</td>
                    <td className="px-4 py-3 font-medium">{r.diagnosis}</td>
                    <td className="px-4 py-3">{r.treatment}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {/* Prescriptions */}
      <div>
        <h2 className="text-lg font-semibold text-gray-700 mb-3 flex items-center gap-2">
          <FileText size={20} /> Prescriptions
        </h2>
        <div className="bg-white rounded-xl shadow overflow-hidden">
          {loading && <p className="p-6 text-center text-gray-500">Loading...</p>}
          {!loading && prescriptions.length === 0 && (
            <p className="p-6 text-center text-gray-500">No prescriptions found.</p>
          )}
          {!loading && prescriptions.length > 0 && (
            <table className="w-full text-left">
              <thead className="bg-gray-50 text-gray-600 text-sm">
                <tr>
                  <th className="px-4 py-3">Doctor</th>
                  <th className="px-4 py-3">Medicine</th>
                  <th className="px-4 py-3">Dosage</th>
                  <th className="px-4 py-3 w-20">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {prescriptions.map((p) => (
                  <tr key={p.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3 font-medium">
                      {p.doctor ? p.doctor.doctorName : "-"}
                    </td>
                    <td className="px-4 py-3">{p.medicine}</td>
                    <td className="px-4 py-3 text-gray-600">{p.dosage}</td>
                    <td className="px-4 py-3">
                      <button
                        onClick={() => handleDownload(p.id)}
                        className="text-blue-500 hover:text-blue-700"
                        title="Download PDF"
                      >
                        <Download size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}