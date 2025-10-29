import React, { useState } from 'react';
import { Shield, Users, GraduationCap, Lock, Mail } from 'lucide-react';

export default function Login({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('student');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    // Optional domain restriction: change to your college domain
    const allowedDomain = '@college.edu';
    if (!email.endsWith(allowedDomain)) {
      setError(`Use your college email (${allowedDomain})`);
      return;
    }

    if (!email || !password) {
      setError('Email and password are required');
      return;
    }

    onLogin({ name: email.split('@')[0], email, role });
  };

  return (
    <div className="max-w-md w-full bg-white rounded-2xl shadow-xl border border-zinc-200 p-6 sm:p-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="h-10 w-10 rounded-lg bg-indigo-600 text-white flex items-center justify-center shadow">
          <Lock size={20} />
        </div>
        <div>
          <h2 className="text-xl font-semibold">Secure Login</h2>
          <p className="text-sm text-zinc-500">Access for verified campus users</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-zinc-700 mb-1">Email</label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" size={18} />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@college.edu"
              className="w-full pl-10 pr-3 py-2 rounded-md border border-zinc-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-zinc-700 mb-1">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            className="w-full px-3 py-2 rounded-md border border-zinc-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-zinc-700 mb-1">Role</label>
          <div className="grid grid-cols-3 gap-2">
            <RoleOption value="admin" icon={Shield} selected={role} setSelected={setRole} label="Admin" />
            <RoleOption value="teacher" icon={Users} selected={role} setSelected={setRole} label="Teacher" />
            <RoleOption value="student" icon={GraduationCap} selected={role} setSelected={setRole} label="Student" />
          </div>
        </div>

        {error && <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-md px-3 py-2">{error}</p>}

        <button
          type="submit"
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2.5 rounded-md transition"
        >
          Sign in
        </button>

        <p className="text-xs text-zinc-500 text-center">No public signup. Access is provisioned by the admin.</p>
      </form>
    </div>
  );
}

function RoleOption({ value, icon: Icon, selected, setSelected, label }) {
  const isActive = selected === value;
  return (
    <button
      type="button"
      onClick={() => setSelected(value)}
      className={`flex items-center justify-center gap-1.5 px-3 py-2 rounded-md border text-sm transition ${
        isActive ? 'bg-indigo-600 text-white border-indigo-600' : 'bg-white text-zinc-700 border-zinc-300 hover:bg-zinc-50'
      }`}
      aria-pressed={isActive}
    >
      <Icon size={16} />
      <span>{label}</span>
    </button>
  );
}
