import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

import Circles from "../Circles";
import { projects, default as ProjectCard } from "../WorkSlider";
import SectionWrapper from "./SectionWrapper";

import {
  BsCode,
  BsBrush,
  BsLayers,
  BsGrid,
  BsPhone,
  BsCpu,
} from "react-icons/bs";
import { HiOutlineFolder } from "react-icons/hi";
import { RiLinkedinFill } from "react-icons/ri";

const CATEGORIES = [
  { label: "All", Icon: BsGrid },
  { label: "Web Dev", Icon: BsCode },
  { label: "Android", Icon: BsPhone },
  { label: "LLM", Icon: BsCpu },
  { label: "UI/UX", Icon: BsBrush },
  { label: "Design", Icon: BsLayers },
];

/* ═══════════════════════════════════
   WORK SECTION — reveal curtain wipe
═══════════════════════════════════ */
const WorkSection = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    setShowAll(false);
  }, [activeCategory]);

  const filtered =
    activeCategory === "All"
      ? projects
      : projects.filter((p) => p.category.toLowerCase() === activeCategory.toLowerCase());

  const projectsToShow = showAll ? filtered : filtered.slice(0, 4);

  return (
    <SectionWrapper id="work" className="min-h-screen flex items-center justify-center bg-primary/30 py-24 lg:py-32">
      <Circles />

      {/* ambient glow */}
      <div
        className="pointer-events-none absolute top-1/3 right-[-100px] w-[400px] h-[400px] rounded-full opacity-[0.07]"
        style={{
          background: "radial-gradient(circle, #F13024 0%, transparent 70%)",
          filter: "blur(80px)",
        }}
      />
      <div
        className="pointer-events-none absolute bottom-1/4 left-[-80px] w-[300px] h-[300px] rounded-full opacity-[0.06]"
        style={{
          background: "radial-gradient(circle, #7c3aed 0%, transparent 70%)",
          filter: "blur(70px)",
        }}
      />

      <div className="container mx-auto px-4 relative z-10 w-full">
        <div className="flex flex-col xl:flex-row gap-10 xl:gap-14 xl:items-center">

          {/* ══════ LEFT PANEL ══════ */}
          <motion.div
            initial={{ opacity: 0, x: -50, scale: 0.95 }}
            whileInView={{ opacity: 1, x: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="xl:w-[300px] flex-shrink-0 flex flex-col text-center xl:text-left"
          >
            {/* label badge */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="inline-flex items-center gap-2 mb-4 self-center xl:self-start"
            >
              <div
                className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest"
                style={{
                  background: "rgba(241,48,36,0.1)",
                  border: "1px solid rgba(241,48,36,0.25)",
                  color: "#F13024",
                }}
              >
                Portfolio
              </div>
            </motion.div>

            {/* heading */}
            <h2 className="h2 xl:mt-2 leading-tight mb-4">
              My{" "}
              <span
                className="text-accent relative inline-block"
                style={{ textShadow: "0 0 40px rgba(241,48,36,0.4)" }}
              >
                work
                <motion.svg
                  className="absolute -bottom-1 left-0 w-full overflow-visible"
                  viewBox="0 0 80 6"
                  fill="none"
                  initial={{ pathLength: 0, opacity: 0 }}
                  whileInView={{ pathLength: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: 0.6 }}
                >
                  <motion.path
                    d="M2 4 C20 1, 45 5, 65 2 C72 1, 76 3, 78 2"
                    stroke="#F13024"
                    strokeWidth="2"
                    strokeLinecap="round"
                    fill="none"
                  />
                </motion.svg>
              </span>{" "}
              <span className="text-accent">.</span>
            </h2>

            <p className="text-white/55 text-sm leading-relaxed mb-6 max-w-[320px] mx-auto xl:mx-0">
              Crafting innovative digital experiences through full‑stack
              development, UI/UX design, and creative brand solutions.
            </p>

            <div className="flex justify-center xl:justify-start mb-8">
              <motion.a
                href="https://in.linkedin.com/in/arul-prakash-a3694a2ba"
                target="_blank"
                rel="noreferrer noopener"
                className="inline-flex items-center gap-2.5 px-4 py-2 rounded-xl text-xs font-bold text-white/50 hover:text-white transition-all duration-300 border border-white/5 hover:border-accent/40 bg-white/2 hover:bg-accent/5"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <RiLinkedinFill className="text-lg text-accent" />
                <span>More Projects on LinkedIn</span>
              </motion.a>
            </div>

            {/* ── FILTER TABS ── */}
            <div className="flex flex-col gap-2 mb-8">
              <p className="text-[10px] uppercase tracking-widest text-white/30 font-bold mb-1 text-center xl:text-left">
                Filter by
              </p>
              {CATEGORIES.map(({ label, Icon }) => {
                const isActive = activeCategory === label;
                const count =
                  label === "All"
                    ? projects.length
                    : projects.filter((p) => p.category.toLowerCase() === label.toLowerCase()).length;
                return (
                  <motion.button
                    key={label}
                    onClick={() => setActiveCategory(label)}
                    whileTap={{ scale: 0.97 }}
                    className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium text-left transition-all duration-300"
                    style={{
                      background: isActive
                        ? "rgba(241,48,36,0.12)"
                        : "rgba(255,255,255,0.02)",
                      border: isActive
                        ? "1px solid rgba(241,48,36,0.3)"
                        : "1px solid rgba(255,255,255,0.05)",
                      color: isActive ? "#fff" : "rgba(255,255,255,0.45)",
                    }}
                  >
                    <Icon
                      className="text-base flex-shrink-0"
                      style={{ color: isActive ? "#F13024" : "rgba(255,255,255,0.3)" }}
                    />
                    <span className="flex-1">{label}</span>
                    <span
                      className="text-[10px] font-black px-1.5 py-0.5 rounded-md min-w-[20px] text-center"
                      style={{
                        background: isActive ? "rgba(241,48,36,0.2)" : "rgba(255,255,255,0.06)",
                        color: isActive ? "#F13024" : "rgba(255,255,255,0.3)",
                      }}
                    >
                      {count}
                    </span>
                  </motion.button>
                );
              })}
            </div>

            {/* ── project counter ── */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.8 }}
              className="hidden xl:flex items-center gap-3"
            >
              <div className="h-[1px] flex-1 bg-gradient-to-r from-accent/40 to-transparent" />
              <span className="text-white/30 text-xs font-mono">
                {filtered.length} project{filtered.length !== 1 ? "s" : ""}
              </span>
            </motion.div>

            {/* ── stat pills ── */}
            <div className="hidden xl:flex flex-col gap-3 mt-6">
              {[
                { label: "Total Projects", value: projects.length + "+" },
                { label: "Live Deployments", value: "4" },
                { label: "Happy Clients", value: "19+" },
              ].map((s) => (
                <div
                  key={s.label}
                  className="flex items-center justify-between px-4 py-2.5 rounded-xl"
                  style={{
                    background: "rgba(255,255,255,0.02)",
                    border: "1px solid rgba(255,255,255,0.05)",
                  }}
                >
                  <span className="text-white/40 text-xs">{s.label}</span>
                  <span
                    className="font-black text-sm"
                    style={{
                      background: "linear-gradient(135deg, #F13024, #ff6b5b)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                    }}
                  >
                    {s.value}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* ══════ RIGHT: GRID ══════ */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="flex-1"
          >
            {/* grid */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeCategory}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.35 }}
                className="grid grid-cols-1 sm:grid-cols-2 gap-5"
              >
                {projectsToShow.map((project, i) => (
                  <ProjectCard key={project.id} project={project} index={i} />
                ))}

                {/* empty state */}
                {filtered.length === 0 && (
                  <div className="col-span-2 flex flex-col items-center justify-center py-24 gap-3 text-white/30">
                    <HiOutlineFolder className="text-5xl" />
                    <p className="text-sm font-medium">No projects in this category yet</p>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>

            {/* Show More / Show Less Button */}
            {filtered.length > 4 && (
              <div className="flex justify-center mt-6">
                <motion.button
                  onClick={() => setShowAll(!showAll)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-2 px-6 py-2.5 rounded-full text-xs font-black uppercase tracking-widest text-white border border-accent/40 bg-accent/10 hover:bg-accent/25 transition-all duration-300 shadow-[0_0_15px_rgba(241,48,36,0.15)] hover:shadow-[0_0_25px_rgba(241,48,36,0.3)]"
                >
                  {showAll ? "Show Less" : "Show More"}
                </motion.button>
              </div>
            )}

            {/* bottom link for more projects */}
            <div className="flex justify-center mt-8">
              <motion.a
                href="https://in.linkedin.com/in/arul-prakash-a3694a2ba"
                target="_blank"
                rel="noreferrer noopener"
                className="inline-flex items-center gap-2.5 px-4 py-2.5 rounded-xl text-xs font-bold text-white/50 hover:text-white transition-all duration-300 border border-white/5 hover:border-accent/40 bg-white/2 hover:bg-accent/5"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <RiLinkedinFill className="text-lg text-accent" />
                <span>For more projects, visit my LinkedIn profile</span>
              </motion.a>
            </div>

            {/* mobile stats row */}
            <div className="xl:hidden flex gap-4 mt-6 flex-wrap justify-center">
              {[
                { label: "Projects", value: projects.length + "+" },
                { label: "Live", value: "4" },
                { label: "Clients", value: "19+" },
              ].map((s) => (
                <div
                  key={s.label}
                  className="flex flex-col items-center px-5 py-3 rounded-xl"
                  style={{
                    background: "rgba(255,255,255,0.02)",
                    border: "1px solid rgba(255,255,255,0.05)",
                  }}
                >
                  <span
                    className="font-black text-xl"
                    style={{
                      background: "linear-gradient(135deg, #F13024, #ff6b5b)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                    }}
                  >
                    {s.value}
                  </span>
                  <span className="text-white/40 text-[10px] uppercase tracking-widest font-semibold">
                    {s.label}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>

        </div>
      </div>
    </SectionWrapper>
  );
};

export default WorkSection;
