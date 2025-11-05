import { Mail, CheckCircle2, Clock, TrendingUp } from "lucide-react";

export default function StatsOverview({ stats }) {
  const cards = [
    {
      label: "Sent",
      value: stats.sent,
      icon: Mail,
      color: "from-sky-500 to-cyan-500",
    },
    {
      label: "Accepted",
      value: stats.accepted,
      icon: CheckCircle2,
      color: "from-emerald-500 to-lime-500",
    },
    {
      label: "Pending",
      value: stats.pending,
      icon: Clock,
      color: "from-amber-500 to-orange-500",
    },
    {
      label: "Conversion",
      value: `${stats.conversion}%`,
      icon: TrendingUp,
      color: "from-violet-500 to-fuchsia-500",
    },
  ];

  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map(({ label, value, icon: Icon, color }) => (
        <div
          key={label}
          className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs uppercase tracking-wide text-slate-500">{label}</p>
              <p className="text-2xl font-semibold text-slate-800 mt-1">{value}</p>
            </div>
            <div className={`h-10 w-10 rounded-lg bg-gradient-to-br ${color} text-white grid place-items-center`}>
              <Icon className="h-5 w-5" />
            </div>
          </div>
        </div>
      ))}
    </section>
  );
}
