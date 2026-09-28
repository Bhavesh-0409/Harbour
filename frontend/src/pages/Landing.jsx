import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Shell from "@/components/Shell";
import Orb from "@/components/Orb";
import { Button } from "@/components/ui/button";

const points = [
  ["One short form", "Tell us once. You won't repeat your story to every office."],
  ["A reason for every route", "You'll see why we chose a team, in plain words."],
  ["Urgent means now", "If something sounds serious, you skip the wait."],
];

export default function Landing() {
  return (
    <Shell width="max-w-4xl">
      <section className="flex flex-col items-center pt-6 text-center">
        <Orb />
        <motion.h1
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
          className="mt-10 text-4xl font-extrabold leading-[1.1] tracking-tight sm:text-6xl"
        >
          Take a breath.<br />We'll find the right help.
        </motion.h1>
        <p className="mt-5 max-w-md text-lg leading-relaxed text-navy-soft">
          Share what's going on. We'll connect you to the right team, and tell you why.
        </p>
        <Link to="/intake" className="mt-9">
          <Button size="lg">Get started</Button>
        </Link>
        <p className="mt-4 text-sm text-navy-mute">Takes about two minutes.</p>
      </section>

      <section className="mt-24 grid gap-10 sm:grid-cols-3">
        {points.map(([t, d]) => (
          <div key={t}>
            <h3 className="font-bold">{t}</h3>
            <p className="mt-2 text-[15px] leading-relaxed text-navy-soft">{d}</p>
          </div>
        ))}
      </section>
    </Shell>
  );
}
