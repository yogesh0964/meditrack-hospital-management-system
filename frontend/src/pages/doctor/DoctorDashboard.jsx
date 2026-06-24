import { useState, useEffect } from "react";
import { CalendarCheck, FileText } from "lucide-react";
import { getAllAppointments } from "../../service/appointmentService";
import { getAllPrescriptions } from "../../service/prescriptionService";

export default function DoctorDashboard() {
  const [appointmentCount, setAppointmentCount] = useState(0);
  const [prescriptionCount, setPrescriptionCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([getAllAppointments(), getAllPrescriptions()])
      .then(([apptRes, presRes]) => {
        setAppointmentCount(apptRes.data.length);
        setPrescriptionCount(presRes.data.length);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const cards = [
    { label: "Total Appointments", value: appointmentCount, icon: CalendarCheck, color: "bg-blue-500" },
    { label: "Total Prescriptions", value: prescriptionCount, icon: FileText, color: "bg-emerald-500" },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Doctor Dashboard</h1>

      {loading ? (
        <p className="text-gray-500">Loading...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
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