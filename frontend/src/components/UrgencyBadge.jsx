import { cn } from "@/lib/utils";

const styles = {
  low: "bg-mist text-navy-soft",
  medium: "bg-brand/10 text-brand",
  high: "bg-navy text-white",
  crisis: "bg-neon text-navy shadow-glow",
};
const labels = { low: "Low", medium: "Moderate", high: "High priority", crisis: "Immediate" };

export default function UrgencyBadge({ level }) {
  return (
    <span className={cn("inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold", styles[level])}>
      {labels[level] || level}
    </span>
  );
}
