import { useMemo, useState } from "react";
import { CheckCircle2, Clock, Mail, Search } from "lucide-react";

const mockInvitations = [
  { id: "INV-1001", email: "alex@example.com", status: "Accepted", date: "2025-11-01" },
  { id: "INV-1002", email: "maria@example.com", status: "Pending", date: "2025-11-02" },
  { id: "INV-1003", email: "lee@example.com", status: "Accepted", date: "2025-11-02" },
  { id: "INV-1004", email: "jordan@example.com", status: "Pending", date: "2025-11-03" },
  { id: "INV-1005", email: "sam@example.com", status: "Sent", date: "2025-11-03" },
];

const StatusBadge = ({ status }) => {
  const styles = {
    Sent: "bg-sky-50 text-sky-700 border-sky-200",
    Accepted: "bg-emerald-50 text-emerald-700 border-emerald-200",
    Pending: "bg-amber-50 text-amber-700 border-amber-200",
  };
  const Icon = status === "Accepted" ? CheckCircle2 : status === "Pending" ? Clock : Mail;
  return (
    <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-md text-xs border ${styles[status]}`}>
      <Icon className="h-3.5 w-3.5" /> {status}
    </span>
  );
};

export default function InvitationTable() {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("All");

  const rows = useMemo(() => {
    return mockInvitations.filter((r) => {
      const matchQuery = r.email.toLowerCase().includes(query.toLowerCase()) || r.id.toLowerCase().includes(query.toLowerCase());
      const matchFilter = filter === "All" ? true : r.status === filter;
      return matchQuery && matchFilter;
    });
  }, [query, filter]);

  return (
    <section className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
        <h3 className="font-semibold text-slate-800">Recent Invitations</h3>
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="h-4 w-4 text-slate-400 absolute left-2 top-1/2 -translate-y-1/2" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by email or ID"
              className="pl-8 pr-3 py-2 rounded-md border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="px-3 py-2 rounded-md border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            {['All','Sent','Accepted','Pending'].map(f => (
              <option key={f} value={f}>{f}</option>
            ))}
          </select>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="text-left text-slate-500">
              <th className="pb-2 pr-4 font-medium">ID</th>
              <th className="pb-2 pr-4 font-medium">Email</th>
              <th className="pb-2 pr-4 font-medium">Status</th>
              <th className="pb-2 pr-4 font-medium">Date</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.id} className="border-t border-slate-100">
                <td className="py-3 pr-4 font-medium text-slate-800">{r.id}</td>
                <td className="py-3 pr-4 text-slate-700">{r.email}</td>
                <td className="py-3 pr-4"><StatusBadge status={r.status} /></td>
                <td className="py-3 pr-4 text-slate-600">{new Date(r.date).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
