import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Clock, Undo2, ShieldCheck } from "lucide-react";
import Shell from "@/components/Shell";
import UrgencyBadge from "@/components/UrgencyBadge";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { api } from "@/lib/api";

export default function Result() {
  const { id } = useParams();
  const [c, setC] = useState(null);

  useEffect(() => { api.getCase(id).then(setC); }, [id]);
  if (!c) return <Shell><p className="pt-20 text-center text-navy-mute">One moment…</p></Shell>;

  const share = (approved) => api.shareSummary(id, approved).then(setC);
  const revoke = () => api.revoke(id).then(setC);

  return (
    <Shell>
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="space-y-6">
        <p className="text-navy-soft">You're all set. Here's where we're sending you.</p>
        <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">{c.department}</h1>
        <div className="flex flex-wrap items-center gap-4">
          <UrgencyBadge level={c.urgency} />
          <span className="flex items-center gap-2 text-navy-soft">
            <Clock size={16} /> About {c.wait_minutes} min wait
          </span>
        </div>

        <Card className="border-neon/40">
          <h2 className="font-bold">Why this team</h2>
          <p className="mt-3 text-[17px] leading-relaxed text-navy-soft">{c.reason}</p>
        </Card>

        <Card>
          <div className="flex items-start gap-3">
            <ShieldCheck className="mt-1 shrink-0 text-brand" size={20} />
            <div className="flex-1">
              <h2 className="font-bold">Share a short summary</h2>
              <p className="mt-2 text-[15px] leading-relaxed text-navy-soft">{c.summary}</p>
              <p className="mt-2 text-sm text-navy-mute">Only this summary travels with your referral, not your full message.</p>
              <div className="mt-5 flex flex-wrap gap-3">
                {c.status === "revoked" ? (
                  <span className="text-sm font-semibold text-navy-soft">Referral withdrawn.</span>
                ) : c.summary_shared ? (
                  <Button variant="outline" size="sm" onClick={revoke}><Undo2 size={15} /> Withdraw referral</Button>
                ) : (
                  <>
                    <Button size="sm" onClick={() => share(true)}>Approve and share</Button>
                    <Button size="sm" variant="ghost" onClick={revoke}>Not now</Button>
                  </>
                )}
              </div>
            </div>
          </div>
        </Card>

        <Link to="/" className="inline-block text-sm font-semibold text-brand hover:underline">Back to start</Link>
      </motion.div>
    </Shell>
  );
}
