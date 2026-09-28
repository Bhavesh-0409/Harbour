import { cn } from "@/lib/utils";
export const Card = ({ className, ...p }) => (
  <div className={cn("rounded-xl2 border border-mist-line/70 bg-white/80 p-6 shadow-soft backdrop-blur", className)} {...p} />
);
