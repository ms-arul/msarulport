import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HiChevronUp } from "react-icons/hi2";

/**
 * ScrollToTop - A premium floating button at the bottom-right corner.
 * Appears only when user scrolls down. Smoothly scrolls the window to the top.
 */
const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      // Show button if page is scrolled beyond 300px
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    const homeEl = document.getElementById("home");
    if (homeEl) {
      homeEl.scrollIntoView({ behavior: "smooth", block: "start" });
    } else {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.5, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.5, y: 20 }}
          whileHover={{ scale: 1.1, y: -2 }}
          whileTap={{ scale: 0.9 }}
          onClick={scrollToTop}
          className="fixed bottom-[90px] right-6 xl:bottom-8 xl:right-8 z-50 w-12 h-12 rounded-full flex items-center justify-center cursor-pointer transition-all duration-300"
          style={{
            background: "linear-gradient(135deg, rgba(241, 48, 36, 0.9) 0%, rgba(199, 32, 25, 0.9) 100%)",
            border: "1px solid rgba(255, 255, 255, 0.15)",
            boxShadow: "0 8px 32px rgba(241, 48, 36, 0.4), 0 0 0 1px rgba(255, 255, 255, 0.05) inset",
            backdropFilter: "blur(8px)",
          }}
          aria-label="Scroll to top"
        >
          {/* Subtle pulse ring */}
          <span
            className="absolute inset-0 rounded-full border border-accent/40 animate-ping opacity-75"
            style={{ animationDuration: "3s" }}
          />
          <HiChevronUp className="text-white text-xl relative z-10 stroke-[2]" />
        </motion.button>
      )}
    </AnimatePresence>
  );
};

export default ScrollToTop;
