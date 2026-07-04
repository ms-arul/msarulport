import { motion } from "framer-motion";
import { useActiveSection, SECTIONS } from "../ActiveSectionContext";

/**
 * Vertical dot indicator on the right side of the page.
 * Highlights the currently active section with a glowing dot
 * and shows section labels on hover.
 */
const ScrollDots = () => {
  const { activeSection } = useActiveSection();

  const handleClick = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="scroll-dots-wrapper">
      <div className="flex flex-col items-center gap-4">
        {SECTIONS.map((section) => {
          const isActive = activeSection === section.id;
          return (
            <button
              key={section.id}
              onClick={() => handleClick(section.id)}
              className="scroll-dot-btn group relative"
              aria-label={`Go to ${section.label}`}
            >
              {/* tooltip */}
              <div className="scroll-dot-tooltip">
                <span
                  className="text-[10px] font-bold uppercase tracking-wider whitespace-nowrap"
                  style={{ color: section.color }}
                >
                  {section.label}
                </span>
              </div>

              {/* glow ring for active */}
              {isActive && (
                <motion.div
                  layoutId="scroll-dot-ring"
                  className="absolute inset-[-4px] rounded-full"
                  style={{
                    border: `1.5px solid ${section.color}50`,
                    boxShadow: `0 0 8px ${section.color}30`,
                  }}
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}

              {/* dot */}
              <motion.div
                className="relative z-10 rounded-full transition-all duration-300"
                animate={{
                  width: isActive ? 10 : 6,
                  height: isActive ? 10 : 6,
                  background: isActive ? section.color : "rgba(255,255,255,0.2)",
                  boxShadow: isActive
                    ? `0 0 12px ${section.color}80`
                    : "0px 0px 0px rgba(0,0,0,0)",
                }}
                transition={{ duration: 0.3 }}
              />
            </button>
          );
        })}

        {/* decorative line */}
        <div
          className="w-[1px] h-6 mt-1"
          style={{
            background: "linear-gradient(to bottom, rgba(255,255,255,0.1), transparent)",
          }}
        />
      </div>
    </div>
  );
};

export default ScrollDots;
