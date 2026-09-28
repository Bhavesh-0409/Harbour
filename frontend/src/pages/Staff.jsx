import { useEffect, useState, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Shell from "@/components/Shell";
import UrgencyBadge from "@/components/UrgencyBadge";
import { Card } from "@/components/ui/card";
import { api } from "@/lib/api";

const STAFF = "Dana (Counseling)"; // TODO: replace with real auth

export default function Staff() {
  const [cases, setCases] = useState([]);
  const [cap, setCap] = useState([]);
  const [open, setOpen] = useState(null);
  const [dept, setDept] = useState("");

  const load = useCallback(() => {
    api.listCases(dept).then(setCases).catch(() => {});
    api.capacity().then(setCap).catch(() => {});
  }, [dept]);

  // Polling keeps it simple. Swap for Supabase Realtime later.
  useEffect(() => { load(); const t = setInterval(load, 5000); return () => clearInterval(t); }, [load]);

  async function toggle(c) {
    if (open === c.id) return setOpen(null);
    const full = await api.openCase(c.id, STAFF);
    setCases((cs) => cs.map((x) => (x.id === c.id ? full : x)));
    setOpen(c.id);
  }

  const tile = (active) => `rounded-2xl border p-4 text-left transition ${active ? "border-brand shadow-glow" : "border-mist-line"}`;

  return (
    <Shell width="max-w-5xl">
      <h1 className="text-3xl font-extrabold tracking-tight">Incoming cases</h1>
      <p className="mt-2 text-navy-soft">Sorted by urgency. Every time a case is opened, it's logged.</p>

      <div className="mt-8 grid gap-3 sm:grid-cols-3 lg:grid-cols-4">
        <button onClick={() => setDept("")} className={tile(dept === "")}>
          <span className="block text-sm font-semibold">All teams</span>
        </button>
        {cap.map((d) => (
          <button key={d.department} onClick={() => setDept(d.department)} className={tile(dept === d.department)}>
            <span className="block text-sm font-semibold leading-tight">{d.department}</span>
            <span className="mt-1 block text-xs text-navy-mute">{d.waiting} waiting, about {d.wait_minutes} min</span>
          </button>
        ))}
      </div>

      <div className="mt-8 space-y-3">
        {cases.length === 0 && <p className="text-navy-mute">No cases yet. New referrals will appear here.</p>}
        {cases.map((c) => (
          <Card key={c.id} className="p-5">
            <button className="flex w-full items-center justify-between gap-4 text-left" onClick={() => toggle(c)}>
              <div>
                <p className="font-bold">{c.alias}</p>
                <p className="text-sm text-navy-soft">{c.department}</p>
              </div>
              <UrgencyBadge level={c.urgency} />
            </button>
            <AnimatePresence initial={false}>
              {open === c.id && (
                <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                  <div className="space-y-5 pt-5 text-[15px]">
                    <div><p className="font-semibold">Why it was routed here</p><p className="mt-1 text-navy-soft">{c.reason}</p></div>
                    <div><p className="font-semibold">Student summary</p><p className="mt-1 text-navy-soft">{c.summary_shared ? c.summary : "Not approved for sharing yet."}</p></div>
                    <div>
                      <p className="font-semibold">Who saw this</p>
                      <ul className="mt-2 space-y-1 text-navy-soft">
                        {c.views.map((v, i) => (
                          <li key={i} className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-neon" />{v.staff}, {new Date(v.opened_at).toLocaleString()}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </Card>
        ))}
      </div>
    </Shell>
  );
}
