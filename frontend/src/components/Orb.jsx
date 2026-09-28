import { motion } from "framer-motion";

/** The one memorable thing: a slow breathing orb. */
export default function Orb({ size = 260, label = true }) {
  const rings = [1, 0.74, 0.5];
  return (
    <div className="flex flex-col items-center gap-6">
      <div className="relative grid place-items-center" style={{ width: size, height: size }}>
        {rings.map((s, i) => (
          <motion.span
            key={i}
            className="absolute rounded-full"
            style={{
              width: size * s,
              height: size * s,
              background:
                i === 2
                  ? "radial-gradient(circle at 35% 30%, #fff 0%, #B8F3FF 35%, #3CE0FF 70%, #2F6BFF 100%)"
                  : `rgba(47,107,255,${i === 0 ? 0.05 : 0.09})`,
              boxShadow: i === 2 ? "0 0 60px rgba(60,224,255,.55)" : "none",
            }}
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: i * 0.35 }}
          />
        ))}
      </div>
      {label && (
        <motion.p
          className="text-sm font-medium tracking-wide text-navy-mute"
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        >
          breathe in… and out
        </motion.p>
      )}
    </div>
  );
}
