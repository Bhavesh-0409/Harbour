import { cva } from "class-variance-authority";
import { cn } from "@/lib/utils";

const button = cva(
  "inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-all duration-300 disabled:opacity-40 disabled:pointer-events-none",
  {
    variants: {
      variant: {
        primary: "bg-navy text-white hover:bg-brand hover:shadow-glow",
        soft: "bg-mist text-brand hover:bg-neon-soft/50",
        ghost: "text-navy-soft hover:text-navy hover:bg-mist",
        outline: "border border-mist-line text-navy hover:border-brand",
      },
      size: { md: "h-12 px-7 text-[15px]", sm: "h-9 px-4 text-sm", lg: "h-14 px-9 text-base" },
    },
    defaultVariants: { variant: "primary", size: "md" },
  }
);

export function Button({ className, variant, size, ...props }) {
  return <button className={cn(button({ variant, size }), className)} {...props} />;
}
