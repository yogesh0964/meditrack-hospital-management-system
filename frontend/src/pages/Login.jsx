import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";
import { ShieldCheck, Stethoscope, User } from "lucide-react";
import { loginUser } from "../service/authService";
import { useAuth } from "../context/AuthContext";

const roleOptions = [
  { key: "ADMIN", label: "Admin", icon: ShieldCheck, color: "#185FA5", border: "border-blue-600", text: "text-blue-700", bg: "bg-blue-50" },
  { key: "DOCTOR", label: "Doctor", icon: Stethoscope, color: "#0F6E56", border: "border-teal-600", text: "text-teal-700", bg: "bg-teal-50" },
  { key: "PATIENT", label: "Patient", icon: User, color: "#534AB7", border: "border-violet-600", text: "text-violet-700", bg: "bg-violet-50" },
];

const roleButtonColor = {
  ADMIN: "bg-blue-600 hover:bg-blue-700",
  DOCTOR: "bg-teal-600 hover:bg-teal-700",
  PATIENT: "bg-violet-600 hover:bg-violet-700",
};

export default function Login() {
  const [selectedRole, setSelectedRole] = useState("PATIENT");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await loginUser({ email, password });
      const authData = res.data;

      if (authData.role !== selectedRole) {
        const niceLabel = roleOptions.find((r) => r.key === selectedRole);
        toast.error(
          "This account is not registered as " +
            (niceLabel ? niceLabel.label : selectedRole) +
            ". Please select the correct role."
        );
        setLoading(false);
        return;
      }

      login(authData);
      toast.success("Welcome " + authData.name + "!");

      if (authData.role === "ADMIN") navigate("/admin");
      else if (authData.role === "DOCTOR") navigate("/doctor");
      else navigate("/patient");

    } catch (err) {
      console.error(err);
      toast.error("Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F7F9FB] flex items-center justify-center px-4">
      <div className="bg-white shadow-sm border border-gray-100 rounded-2xl p-8 w-full max-w-md">
        <div className="text-center mb-6">
          <h1 className="text-xl font-bold text-gray-900">MediTrack</h1>
          <p className="text-sm text-gray-500 mt-1">Choose your role to sign in</p>
        </div>

        <div className="grid grid-cols-3 gap-2.5 mb-6">
          {roleOptions.map((role) => {
            const Icon = role.icon;
            const isActive = selectedRole === role.key;
            return (
              <button
                key={role.key}
                type="button"
                onClick={() => setSelectedRole(role.key)}
                className={
                  "flex flex-col items-center gap-1.5 py-4 rounded-xl border-2 transition-colors " +
                  (isActive ? role.border + " " + role.bg : "border-gray-200 bg-white hover:bg-gray-50")
                }
              >
                <Icon size={22} className={isActive ? role.text : "text-gray-400"} />
                <span className={"text-xs font-medium " + (isActive ? role.text : "text-gray-500")}>
                  {role.label}
                </span>
              </button>
            );
          })}
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-gray-200 rounded-lg px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Password</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-gray-200 rounded-lg px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={
              "w-full text-white py-2.5 rounded-lg text-sm font-medium transition-colors disabled:opacity-50 " +
              roleButtonColor[selectedRole]
            }
          >
            {loading
              ? "Signing in..."
              : "Sign in as " + (roleOptions.find((r) => r.key === selectedRole) || {}).label}
          </button>
        </form>

        <p className="text-center text-sm text-gray-500 mt-5">
          Don't have an account?{" "}
          <Link to="/register" className="text-blue-600 font-medium">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}