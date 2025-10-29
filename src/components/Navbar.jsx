import React from 'react';
import { GraduationCap, Shield, Users, LogOut, Settings } from 'lucide-react';

const roleIconMap = {
  admin: Shield,
  teacher: Users,
  student: GraduationCap,
};

export default function Navbar({ user, onLogout }) {
  const RoleIcon = user ? roleIconMap[user.role] ?? Users : GraduationCap;
  return (
    <header className="w-full sticky top-0 z-20 bg-white/70 backdrop-blur border-b border-zinc-200">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-lg bg-indigo-600 text-white flex items-center justify-center shadow">
            <GraduationCap size={20} />
          </div>
          <div>
            <h1 className="text-lg font-semibold">CampusAttend</h1>
            <p className="text-xs text-zinc-500 -mt-0.5">College Attendance Manager</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {user ? (
            <div className="hidden sm:flex items-center gap-2 px-2.5 py-1.5 rounded-md bg-zinc-100 text-zinc-700 text-sm">
              <RoleIcon size={16} />
              <span className="capitalize">{user.role}</span>
            </div>
          ) : (
            <div className="hidden sm:flex items-center gap-2 px-2.5 py-1.5 rounded-md bg-zinc-100 text-zinc-700 text-sm">
              <Settings size={16} />
              <span>Secure Login</span>
            </div>
          )}

          {user && (
            <button
              onClick={onLogout}
              className="inline-flex items-center gap-2 px-3 py-2 text-sm rounded-md border border-zinc-200 hover:bg-zinc-50 transition"
              aria-label="Logout"
            >
              <LogOut size={16} /> Logout
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
