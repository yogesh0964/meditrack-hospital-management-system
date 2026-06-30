import { Menu } from "lucide-react";

export default function Topbar({ title, user, onMenuClick }) {
  const initials = user && user.name ? user.name.charAt(0).toUpperCase() : "?";

  return (
    <header className="bg-white border-b border-gray-200 px-4 sm:px-6 py-3.5 flex items-center justify-between sticky top-0 z-20">
      <div className="flex items-center gap-3">
        <button
          onClick={onMenuClick}
          className="lg:hidden text-gray-500 hover:text-gray-800 -ml-1 p-1"
        >
          <Menu size={22} />
        </button>
        <h2 className="text-base sm:text-lg font-semibold text-gray-800">{title}</h2>
      </div>

      <div className="flex items-center gap-2.5">
        <div className="hidden sm:block text-right">
          <p className="text-sm font-medium text-gray-800 leading-tight">{user ? user.name : ""}</p>
          <p className="text-xs text-gray-400 leading-tight">{user ? user.role : ""}</p>
        </div>
        <div className="w-9 h-9 rounded-full bg-gray-800 text-white flex items-center justify-center text-sm font-semibold">
          {initials}
        </div>
      </div>
    </header>
  );
}
