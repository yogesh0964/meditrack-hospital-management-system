import { useState, useEffect } from "react";
import { CalendarCheck, FileText, Stethoscope } from "lucide-react";
import { getAllAppointments } from "../../service/appointmentService";
import { getAllRecords } from "../../service/medicalRecordService";
import { getAllPrescriptions } from "../../service/prescriptionService";
import { useAuth } from "../../context/AuthContext";

export default function PatientDashboard() {
  const { user } = useAuth();
  const [appointmentCount, setAppointmentCount] = useState(0);
  const [recordCount, setRecordCount] = useState(0);
  const [prescriptionCount, setPrescriptionCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadStats = async () => {
      try {
        const apptRes = await getAllAppointments();
        const recRes = await getAllRecords();
        const presRes = await getAllPrescriptions();

        const myEmail = user ? user.email : "";

        const myAppointments = apptRes.data.filter((a) => {
          return a.patient && a.patient.email === myEmail;
        });
        const myRecords = recRes.data.filter((r) => {
          return r.patient && r.patient.email === myEmail;
        });
        const myPrescriptions = presRes.data.filter((p) => {
          return p.patient && p.patient.email === myEmail;
        });

        setAppointmentCount(myAppointments.length);
        setRecordCount(myRecords.length);
        setPrescriptionCount(myPrescriptions.length);
      } catch (err) {
        // ignore
      } finally {
        setLoading(false);
      }
    };
    loadStats();
  }, []);

  const cards = [
    { label: "My Appointments", value: appointmentCount, icon: CalendarCheck, color: "bg-blue-500" },
    { label: "Medical Records", value: recordCount, icon: Stethoscope, color: "bg-emerald-500" },
    { label: "Prescriptions", value: prescriptionCount, icon: FileText, color: "bg-violet-500" },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 mb-6">
        Welcome, {user ? user.name : "Patient"}
      </h1>

      {loading && <p className="text-gray-500">Loading...</p>}

      {!loading && (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          {cards.map((card) => {
            const Icon = card.icon;
            return (
              <div key={card.label} className="bg-white rounded-xl shadow p-5 flex items-center gap-4">
                <div className={`${card.color} text-white p-3 rounded-lg`}>
                  <Icon size={24} />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-800">{card.value}</p>
                  <p className="text-sm text-gray-500">{card.label}</p>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}