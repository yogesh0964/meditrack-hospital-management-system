import { Link, useLocation } from "react-router-dom";
import { LogOut, X } from "lucide-react";

const themes = {
  blue: {
    bg: "bg-[#1E3A8A]",
    bgActive: "bg-white/15",
    bgHover: "hover:bg-white/10",
    border: "border-white/10",
    accent: "text-blue-300",
  },
  teal: {
    bg: "bg-[#0F4C46]",
    bgActive: "bg-white/15",
    bgHover: "hover:bg-white/10",
    border: "border-white/10",
    accent: "text-teal-300",
  },
  violet: {
    bg: "bg-[#3B1E6E]",
    bgActive: "bg-white/15",
    bgHover: "hover:bg-white/10",
    border: "border-white/10",
    accent: "text-violet-300",
  },
};

export default function Sidebar({ navItems, panelLabel, theme, isOpen, onClose, onLogout }) {
  const location = useLocation();
  const t = themes[theme] || themes.blue;

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-30 lg:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={`fixed lg:static z-40 top-0 left-0 h-full w-72 ${t.bg} text-white flex flex-col
        transform transition-transform duration-200 ease-out
        ${isOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0`}
      >
        <div className={`px-6 py-5 flex items-center justify-between border-b ${t.border}`}>
          <div>
            <p className="text-xl font-bold tracking-tight">MediTrack</p>
            <p className={`text-xs font-medium ${t.accent} mt-0.5`}>{panelLabel}</p>
          </div>
          <button onClick={onClose} className="lg:hidden text-white/70 hover:text-white">
            <X size={20} />
          </button>
        </div>

        <nav className="flex-1 px-3 py-5 space-y-1 overflow-y-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={onClose}
                className={`flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-sm font-medium transition-colors
                ${isActive ? t.bgActive : t.bgHover} ${isActive ? "text-white" : "text-white/80"}`}
              >
                <Icon size={18} strokeWidth={2} />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>

        <div className={`p-3 border-t ${t.border}`}>
          <button
            onClick={onLogout}
            className={`flex items-center gap-3 px-3.5 py-2.5 w-full rounded-lg text-sm font-medium text-white/80 ${t.bgHover} transition-colors`}
          >
            <LogOut size={18} />
            <span>Log out</span>
          </button>
        </div>
      </aside>
    </>
  );
}
