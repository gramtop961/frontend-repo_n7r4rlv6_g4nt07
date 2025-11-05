import { useMemo, useState } from "react";
import Header from "./components/Header";
import StatsOverview from "./components/StatsOverview";
import TemplateDesigner from "./components/TemplateDesigner";
import InvitationTable from "./components/InvitationTable";

export default function App() {
  const [template, setTemplate] = useState({
    primaryColor: "#6366F1",
    imageUrl: "",
    soundUrl: "",
  });

  const stats = useMemo(() => {
    const sent = 1240;
    const accepted = 812;
    const pending = 318;
    const conversion = Math.round((accepted / sent) * 100);
    return { sent, accepted, pending, conversion };
  }, []);

  return (
    <div className="min-h-screen bg-slate-50">
      <Header />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        <StatsOverview stats={stats} />
        <TemplateDesigner template={template} onChange={setTemplate} />
        <InvitationTable />
      </main>
    </div>
  );
}
