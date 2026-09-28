import { Phone, MessageCircle } from "lucide-react";
import { motion } from "framer-motion";
import Shell from "@/components/Shell";
import Orb from "@/components/Orb";

// TODO: swap in your campus's own numbers before the demo.
const lines = [
  { icon: Phone, name: "Call or text 988", note: "Suicide & Crisis Lifeline (US), free, 24/7", href: "tel:988" },
  { icon: MessageCircle, name: "Text HOME to 741741", note: "Crisis Text Line, free, 24/7", href: "sms:741741?body=HOME" },
  { icon: Phone, name: "Campus safety", note: "Add your campus emergency number", href: "tel:911" },
];

export default function Crisis() {
  return (
    <Shell>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }} className="flex flex-col items-center text-center">
        <Orb size={180} label={false} />
        <h1 className="mt-8 text-3xl font-extrabold tracking-tight sm:text-4xl">You don't have to wait.</h1>
        <p className="mt-3 max-w-md text-lg leading-relaxed text-navy-soft">
          What you shared matters. A person can talk with you right now. A staff member is also being alerted.
        </p>
        <div className="mt-10 w-full max-w-md space-y-3">
          {lines.map(({ icon: I, name, note, href }) => (
            <a key={name} href={href}
              className="flex items-center gap-4 rounded-2xl border border-mist-line bg-white p-5 text-left shadow-soft transition hover:border-neon hover:shadow-glow">
              <span className="grid h-11 w-11 place-items-center rounded-full bg-navy text-neon"><I size={18} /></span>
              <span><span className="block font-bold">{name}</span><span className="text-sm text-navy-soft">{note}</span></span>
            </a>
          ))}
        </div>
        <p className="mt-8 text-sm text-navy-mute">If you're in immediate danger, call your local emergency number.</p>
      </motion.div>
    </Shell>
  );
}
