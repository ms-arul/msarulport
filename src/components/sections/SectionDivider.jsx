import { motion } from "framer-motion";

/**
 * Decorative animated divider between sections.
 * Shows a gradient line with section number and name.
 */
const SectionDivider = ({ number, label, color = "#F13024" }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.8 }}
      transition={{ duration: 0.8 }}
      className="relative py-8 lg:py-12 flex items-center justify-center overflow-hidden"
    >
      {/* center glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200px] h-[200px] rounded-full pointer-events-none"
        style={{
          background: `radial-gradient(circle, ${color}15, transparent 70%)`,
          filter: "blur(40px)",
        }}
      />

      <div className="container mx-auto px-4 flex items-center gap-4 relative z-10">
        {/* left line */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="flex-1 h-[1px]"
          style={{
            background: `linear-gradient(to right, transparent, ${color}40)`,
            transformOrigin: "left",
          }}
        />

        {/* center label */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex items-center gap-3"
        >
          <span
            className="text-[10px] font-black font-mono tracking-[3px]"
            style={{ color: color + "60" }}
          >
            {number}
          </span>
          <div
            className="w-2 h-2 rounded-full"
            style={{
              background: color,
              boxShadow: `0 0 12px ${color}60`,
            }}
          />
          <span className="text-[10px] uppercase tracking-[3px] font-bold text-white/25">
            {label}
          </span>
        </motion.div>

        {/* right line */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="flex-1 h-[1px]"
          style={{
            background: `linear-gradient(to left, transparent, ${color}40)`,
            transformOrigin: "right",
          }}
        />
      </div>
    </motion.div>
  );
};

export default SectionDivider;
