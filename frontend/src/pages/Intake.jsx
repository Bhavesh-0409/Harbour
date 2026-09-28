import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Shell from "@/components/Shell";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { api } from "@/lib/api";

const categories = [
  ["wellbeing", "My wellbeing"],
  ["academic", "Classes or grades"],
  ["financial", "Money"],
  ["housing", "Housing"],
  ["health", "Physical health"],
  ["other", "Something else"],
];
const moods = [
  [1, "Okay"],
  [2, "A bit heavy"],
  [3, "Struggling"],
  [4, "Overwhelmed"],
];

const Chip = ({ active, ...p }) => (
  <button
    type="button"
    className={cn(
      "rounded-full border px-5 py-2.5 text-sm font-semibold transition-all duration-300",
      active ? "border-brand bg-brand text-white shadow-glow" : "border-mist-line bg-white text-navy-soft hover:border-brand"
    )}
    {...p}
  />
);

const field =
  "w-full resize-none rounded-2xl border border-mist-line bg-mist/60 p-4 text-[15px] leading-relaxed placeholder:text-navy-mute transition focus:border-brand focus:bg-white";

export default function Intake() {
  const nav = useNavigate();
  const [f, setF] = useState({ category: "", message: "", context: "", mood: 0 });
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState("");
  const set = (k) => (v) => setF((s) => ({ ...s, [k]: v }));
  const ready = f.category && f.message.trim().length > 5 && f.mood;

  async function submit(e) {
    e.preventDefault();
    setBusy(true);
    setErr("");
    try {
      const c = await api.submitIntake(f);
      nav(c.urgency === "crisis" ? `/now/${c.id}` : `/route/${c.id}`);
    } catch {
      setErr("We couldn't send that. Check your connection and try again.");
      setBusy(false);
    }
  }

  return (
    <Shell>
      <motion.form initial={{ opacity: 0 }} animate={{ opacity: 1 }} onSubmit={submit} className="space-y-10">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">What's going on?</h1>
          <p className="mt-3 text-navy-soft">Share as much or as little as you like. You only do this once.</p>
        </div>

        <Card className="space-y-9">
          <div>
            <p className="mb-3 font-semibold">What is this about?</p>
            <div className="flex flex-wrap gap-2.5">
              {categories.map(([k, l]) => (
                <Chip key={k} active={f.category === k} onClick={() => set("category")(k)}>{l}</Chip>
              ))}
            </div>
          </div>

          <div>
            <label htmlFor="msg" className="mb-3 block font-semibold">Tell us what happened</label>
            <textarea id="msg" rows={4} className={field} value={f.message}
              onChange={(e) => set("message")(e.target.value)} placeholder="In your own words." />
          </div>

          <div>
            <label htmlFor="ctx" className="mb-3 block font-semibold">Anything else we should know? <span className="font-normal text-navy-mute">Optional</span></label>
            <textarea id="ctx" rows={2} className={field} value={f.context}
              onChange={(e) => set("context")(e.target.value)} placeholder="How long it's been going on, what you've tried." />
          </div>

          <div>
            <p className="mb-3 font-semibold">How are you feeling right now?</p>
            <div className="flex flex-wrap gap-2.5">
              {moods.map(([v, l]) => (
                <Chip key={v} active={f.mood === v} onClick={() => set("mood")(v)}>{l}</Chip>
              ))}
            </div>
          </div>
        </Card>

        {err && <p role="alert" className="text-sm font-medium text-brand-deep">{err}</p>}
        <div className="flex flex-wrap items-center gap-5">
          <Button size="lg" disabled={!ready || busy}>{busy ? "Finding the right team…" : "Find my team"}</Button>
          <p className="text-sm text-navy-mute">Only the team we route you to will see this.</p>
        </div>
      </motion.form>
    </Shell>
  );
}
