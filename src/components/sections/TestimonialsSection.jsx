import { motion } from "framer-motion";

import TestimonialSlider from "../TestimonialSlider";
import SectionWrapper from "./SectionWrapper";

/* ═══════════════════════════════════
   TESTIMONIALS SECTION — blur-to-sharp "focus pull" cinematic entrance
═══════════════════════════════════ */
const TestimonialsSection = () => {
  return (
    <SectionWrapper
      id="testimonials"
      className="min-h-screen flex items-center justify-center bg-primary/30 py-24 lg:py-32 text-center"
    >
      {/* ambient glow */}
      <div
        className="pointer-events-none absolute top-1/3 left-[20%] w-[300px] h-[300px] rounded-full opacity-[0.06]"
        style={{
          background: "radial-gradient(circle, #A78BFA 0%, transparent 70%)",
          filter: "blur(80px)",
        }}
      />

      <div className="container mx-auto px-4 relative z-10 w-full flex flex-col justify-center">
        <motion.h2
          initial={{ opacity: 0, y: 40, filter: "blur(12px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="h2 mb-8 xl:mb-0"
        >
          What clients <span className="text-accent">say.</span>
        </motion.h2>

        {/* slider */}
        <motion.div
          initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        >
          <TestimonialSlider />
        </motion.div>
      </div>
    </SectionWrapper>
  );
};

export default TestimonialsSection;
