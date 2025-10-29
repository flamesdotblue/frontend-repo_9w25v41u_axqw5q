import React, { useMemo, useState } from 'react';
import { Users, BookOpen, GraduationCap, Calendar, Download, Check, X, Plus } from 'lucide-react';

export default function Dashboard({ user }) {
  if (!user) return null;
  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-8">
      <Greeting name={user.name} role={user.role} />
      {user.role === 'admin' && <AdminPanel />}
      {user.role === 'teacher' && <TeacherPanel teacherName={user.name} />}
      {user.role === 'student' && <StudentPanel studentName={user.name} />}
    </div>
  );
}

function Greeting({ name, role }) {
  return (
    <div className="flex items-center justify-between">
      <div>
        <h2 className="text-2xl font-semibold">Welcome, {name}</h2>
        <p className="text-sm text-zinc-500 capitalize">{role} dashboard</p>
      </div>
    </div>
  );
}

// Admin Panel: lightweight, local-only demo of CRUD-like management
function AdminPanel() {
  const [teachers, setTeachers] = useState([{ id: 1, name: 'A. Sharma', email: 'asharma@college.edu' }]);
  const [students, setStudents] = useState([{ id: 1, name: 'R. Kumar', roll: 'CSE2023-001', email: 'rkumar@college.edu', className: 'CSE-A' }]);
  const [classes, setClasses] = useState([{ id: 1, name: 'CSE-A', year: '3' }]);
  const [subjects, setSubjects] = useState([{ id: 1, name: 'Data Structures', className: 'CSE-A' }]);

  return (
    <div className="space-y-8">
      <SummaryCards
        stats={[
          { label: 'Teachers', value: teachers.length, icon: Users, color: 'bg-indigo-50 text-indigo-700' },
          { label: 'Students', value: students.length, icon: GraduationCap, color: 'bg-emerald-50 text-emerald-700' },
          { label: 'Classes', value: classes.length, icon: BookOpen, color: 'bg-amber-50 text-amber-700' },
          { label: 'Subjects', value: subjects.length, icon: BookOpen, color: 'bg-purple-50 text-purple-700' },
        ]}
      />

      <div className="grid md:grid-cols-2 gap-6">
        <EntityCard title="Manage Teachers" onAdd={(data) => setTeachers((p) => [...p, { id: Date.now(), ...data }])}>
          {teachers.map((t) => (
            <ItemRow key={t.id} title={t.name} subtitle={t.email} onDelete={() => setTeachers((p) => p.filter((x) => x.id !== t.id))} />
          ))}
        </EntityCard>

        <EntityCard title="Manage Students" onAdd={(data) => setStudents((p) => [...p, { id: Date.now(), ...data }])}>
          {students.map((s) => (
            <ItemRow key={s.id} title={`${s.name} • ${s.roll}`} subtitle={`${s.email} • ${s.className}`} onDelete={() => setStudents((p) => p.filter((x) => x.id !== s.id))} />
          ))}
        </EntityCard>

        <EntityCard title="Manage Classes" onAdd={(data) => setClasses((p) => [...p, { id: Date.now(), ...data }])}>
          {classes.map((c) => (
            <ItemRow key={c.id} title={c.name} subtitle={`Year ${c.year}`} onDelete={() => setClasses((p) => p.filter((x) => x.id !== c.id))} />
          ))}
        </EntityCard>

        <EntityCard title="Manage Subjects" onAdd={(data) => setSubjects((p) => [...p, { id: Date.now(), ...data }])}>
          {subjects.map((s) => (
            <ItemRow key={s.id} title={s.name} subtitle={s.className} onDelete={() => setSubjects((p) => p.filter((x) => x.id !== s.id))} />
          ))}
        </EntityCard>
      </div>
    </div>
  );
}

function SummaryCards({ stats }) {
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((s, i) => (
        <div key={i} className={`rounded-xl border border-zinc-200 p-4 flex items-center gap-3 ${s.color}`}>
          <s.icon className="shrink-0" size={22} />
          <div>
            <div className="text-xs uppercase tracking-wide text-zinc-500">{s.label}</div>
            <div className="text-2xl font-semibold">{s.value}</div>
          </div>
        </div>
      ))}
    </div>
  );
}

function EntityCard({ title, onAdd, children }) {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({});
  const handleAdd = () => {
    if (!Object.values(form).some(Boolean)) return;
    onAdd(form);
    setForm({});
    setOpen(false);
  };
  return (
    <div className="rounded-xl border border-zinc-200 bg-white p-4">
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-medium">{title}</h3>
        <button onClick={() => setOpen((v) => !v)} className="inline-flex items-center gap-2 text-sm px-3 py-1.5 rounded-md border border-zinc-300 hover:bg-zinc-50">
          <Plus size={16} /> Add
        </button>
      </div>
      {open && (
        <div className="grid sm:grid-cols-2 gap-2 mb-3">
          <input className="px-3 py-2 text-sm rounded-md border border-zinc-300" placeholder="Name"
            value={form.name || ''} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))} />
          {title.includes('Students') && (
            <>
              <input className="px-3 py-2 text-sm rounded-md border border-zinc-300" placeholder="Roll No"
                value={form.roll || ''} onChange={(e) => setForm((f) => ({ ...f, roll: e.target.value }))} />
              <input className="px-3 py-2 text-sm rounded-md border border-zinc-300 sm:col-span-2" placeholder="Email"
                value={form.email || ''} onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))} />
              <input className="px-3 py-2 text-sm rounded-md border border-zinc-300 sm:col-span-2" placeholder="Class"
                value={form.className || ''} onChange={(e) => setForm((f) => ({ ...f, className: e.target.value }))} />
            </>
          )}
          {title.includes('Teachers') && (
            <input className="px-3 py-2 text-sm rounded-md border border-zinc-300" placeholder="Email"
              value={form.email || ''} onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))} />
          )}
          {title.includes('Classes') && (
            <input className="px-3 py-2 text-sm rounded-md border border-zinc-300" placeholder="Year"
              value={form.year || ''} onChange={(e) => setForm((f) => ({ ...f, year: e.target.value }))} />
          )}
          {title.includes('Subjects') && (
            <input className="px-3 py-2 text-sm rounded-md border border-zinc-300" placeholder="Class"
              value={form.className || ''} onChange={(e) => setForm((f) => ({ ...f, className: e.target.value }))} />
          )}
          <div className="sm:col-span-2 flex justify-end gap-2">
            <button onClick={() => setOpen(false)} className="px-3 py-2 text-sm rounded-md border border-zinc-300">Cancel</button>
            <button onClick={handleAdd} className="px-3 py-2 text-sm rounded-md bg-indigo-600 text-white">Save</button>
          </div>
        </div>
      )}
      <div className="divide-y">
        {React.Children.count(children) ? children : (
          <p className="text-sm text-zinc-500">No records yet.</p>
        )}
      </div>
    </div>
  );
}

function ItemRow({ title, subtitle, onDelete }) {
  return (
    <div className="flex items-center justify-between py-2">
      <div>
        <div className="font-medium text-sm">{title}</div>
        {subtitle && <div className="text-xs text-zinc-500">{subtitle}</div>}
      </div>
      <button onClick={onDelete} className="text-sm text-red-600 hover:underline">Delete</button>
    </div>
  );
}

// Teacher Panel: mark attendance for a date
function TeacherPanel({ teacherName }) {
  const [date, setDate] = useState(() => new Date().toISOString().slice(0, 10));
  const [className, setClassName] = useState('CSE-A');
  const [subject, setSubject] = useState('Data Structures');
  const [records, setRecords] = useState([
    { id: 1, name: 'R. Kumar', status: 'Present' },
    { id: 2, name: 'S. Patel', status: 'Absent' },
    { id: 3, name: 'M. Singh', status: 'Present' },
  ]);

  const toggle = (id) => setRecords((prev) => prev.map((r) => (r.id === id ? { ...r, status: r.status === 'Present' ? 'Absent' : 'Present' } : r)));

  const presentCount = records.filter((r) => r.status === 'Present').length;

  return (
    <div className="space-y-4">
      <div className="rounded-xl border border-zinc-200 bg-white p-4">
        <div className="grid md:grid-cols-4 gap-3">
          <div>
            <label className="block text-xs text-zinc-500 mb-1">Date</label>
            <div className="relative">
              <Calendar size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" />
              <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="w-full pl-9 pr-3 py-2 text-sm rounded-md border border-zinc-300" />
            </div>
          </div>
          <div>
            <label className="block text-xs text-zinc-500 mb-1">Class</label>
            <input value={className} onChange={(e) => setClassName(e.target.value)} className="w-full px-3 py-2 text-sm rounded-md border border-zinc-300" />
          </div>
          <div>
            <label className="block text-xs text-zinc-500 mb-1">Subject</label>
            <input value={subject} onChange={(e) => setSubject(e.target.value)} className="w-full px-3 py-2 text-sm rounded-md border border-zinc-300" />
          </div>
          <div className="flex items-end">
            <button className="w-full bg-indigo-600 text-white rounded-md px-3 py-2 text-sm">Save Attendance</button>
          </div>
        </div>
      </div>

      <div className="rounded-xl border border-zinc-200 overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-zinc-50">
            <tr>
              <th className="text-left px-4 py-2">Student</th>
              <th className="text-left px-4 py-2">Status</th>
              <th className="px-4 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {records.map((r) => (
              <tr key={r.id} className="border-t">
                <td className="px-4 py-2">{r.name}</td>
                <td className="px-4 py-2">
                  <span className={`inline-flex items-center gap-1 px-2 py-1 rounded text-xs ${r.status === 'Present' ? 'bg-emerald-50 text-emerald-700' : 'bg-red-50 text-red-700'}`}>
                    {r.status === 'Present' ? <Check size={14} /> : <X size={14} />} {r.status}
                  </span>
                </td>
                <td className="px-4 py-2 text-center">
                  <button onClick={() => toggle(r.id)} className="px-3 py-1.5 rounded-md border border-zinc-300 hover:bg-zinc-50">Toggle</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="text-sm text-zinc-600">Present: {presentCount} / {records.length}</div>
    </div>
  );
}

// Student Panel: summary with percentage and export
function StudentPanel({ studentName }) {
  const [summary] = useState([
    { subject: 'Data Structures', total: 20, present: 18 },
    { subject: 'Algorithms', total: 18, present: 15 },
    { subject: 'DBMS', total: 22, present: 21 },
  ]);

  const overall = useMemo(() => {
    const totals = summary.reduce((acc, s) => ({ total: acc.total + s.total, present: acc.present + s.present }), { total: 0, present: 0 });
    const pct = totals.total ? Math.round((totals.present / totals.total) * 100) : 0;
    return { ...totals, pct };
  }, [summary]);

  const downloadCSV = () => {
    const header = 'Subject,Total Days,Present Days,Percentage\n';
    const rows = summary.map((s) => `${s.subject},${s.total},${s.present},${Math.round((s.present / s.total) * 100)}`).join('\n');
    const csv = header + rows + `\nOverall,${overall.total},${overall.present},${overall.pct}`;
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${studentName}-attendance.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      <div className="grid sm:grid-cols-3 gap-4">
        <div className="rounded-xl border border-zinc-200 p-4 bg-white">
          <div className="text-xs text-zinc-500">Total Days</div>
          <div className="text-2xl font-semibold">{overall.total}</div>
        </div>
        <div className="rounded-xl border border-zinc-200 p-4 bg-white">
          <div className="text-xs text-zinc-500">Present Days</div>
          <div className="text-2xl font-semibold text-emerald-700">{overall.present}</div>
        </div>
        <div className="rounded-xl border border-zinc-200 p-4 bg-white">
          <div className="text-xs text-zinc-500">Attendance %</div>
          <div className="text-2xl font-semibold">{overall.pct}%</div>
        </div>
      </div>

      <div className="rounded-xl border border-zinc-200 overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-zinc-50">
            <tr>
              <th className="text-left px-4 py-2">Subject</th>
              <th className="text-left px-4 py-2">Total</th>
              <th className="text-left px-4 py-2">Present</th>
              <th className="text-left px-4 py-2">% </th>
            </tr>
          </thead>
          <tbody>
            {summary.map((s) => (
              <tr key={s.subject} className="border-t">
                <td className="px-4 py-2">{s.subject}</td>
                <td className="px-4 py-2">{s.total}</td>
                <td className="px-4 py-2">{s.present}</td>
                <td className="px-4 py-2">{Math.round((s.present / s.total) * 100)}%</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <button onClick={downloadCSV} className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-indigo-600 text-white">
        <Download size={16} /> Download CSV
      </button>
    </div>
  );
}
