import { useState, useEffect } from "react";
import { Stethoscope, Users, CalendarCheck, FileText } from "lucide-react";
import { getReportData } from "../../service/dashboardService";

export default function AdminDashboard() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getReportData()
      .then((res) => setStats(res.data))
      .catch(() => setStats(null))
      .finally(() => setLoading(false));
  }, []);

  const cards = [
    { label: "Total Doctors", value: stats?.["Total Doctors"] ?? 0, icon: Stethoscope, color: "bg-blue-500" },
    { label: "Total Patients", value: stats?.["Total Patients"] ?? 0, icon: Users, color: "bg-emerald-500" },
    { label: "Total Appointments", value: stats?.["Total Appointments"] ?? 0, icon: CalendarCheck, color: "bg-amber-500" },
    { label: "Total Prescriptions", value: stats?.["Total Prescriptions"] ?? 0, icon: FileText, color: "bg-violet-500" },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Dashboard Overview</h1>

      {loading ? (
        <p className="text-gray-500">Loading stats...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {cards.map((card) => {
            const Icon = card.icon;
            return (
              <div
                key={card.label}
                className="bg-white rounded-xl shadow p-5 flex items-center gap-4"
              >
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