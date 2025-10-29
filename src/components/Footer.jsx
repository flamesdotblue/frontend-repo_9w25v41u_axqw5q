import React from 'react';

export default function Footer() {
  return (
    <footer className="w-full border-t border-zinc-200 bg-white/70 backdrop-blur mt-10">
      <div className="max-w-6xl mx-auto px-4 py-6 text-sm text-zinc-500 flex flex-col sm:flex-row items-center justify-between gap-2">
        <p>
          © {new Date().getFullYear()} CampusAttend. All rights reserved.
        </p>
        <p className="text-xs">
          Secure, role-based attendance management for colleges.
        </p>
      </div>
    </footer>
  );
}
