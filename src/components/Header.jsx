import { Settings, Bell, User } from "lucide-react";

export default function Header() {
  return (
    <header className="sticky top-0 z-20 backdrop-blur supports-[backdrop-filter]:bg-white/60 bg-white/80 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-lg bg-gradient-to-br from-indigo-500 to-violet-500" />
          <div>
            <h1 className="text-lg font-semibold text-slate-800">Invitation Dashboard</h1>
            <p className="text-xs text-slate-500">Monitor invitations and design templates</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button className="p-2 rounded-md hover:bg-slate-100 text-slate-600" aria-label="Notifications">
            <Bell className="h-5 w-5" />
          </button>
          <button className="p-2 rounded-md hover:bg-slate-100 text-slate-600" aria-label="Settings">
            <Settings className="h-5 w-5" />
          </button>
          <div className="h-8 w-8 rounded-full bg-gradient-to-tr from-rose-500 to-orange-400 grid place-items-center text-white">
            <User className="h-4 w-4" />
          </div>
        </div>
      </div>
    </header>
  );
}
