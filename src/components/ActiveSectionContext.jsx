import { createContext, useContext, useState, useCallback, useEffect, useRef } from "react";

const ActiveSectionContext = createContext({
  activeSection: "home",
  setActiveSection: () => {},
  registerSection: () => {},
});

export const SECTIONS = [
  { id: "home", label: "Home", color: "#F13024" },
  { id: "about", label: "About", color: "#61DAFB" },
  { id: "services", label: "Services", color: "#FBBF24" },
  { id: "work", label: "Work", color: "#34D399" },
  { id: "testimonials", label: "Testimonials", color: "#A78BFA" },
  { id: "contact", label: "Contact", color: "#F24E1E" },
];

export function ActiveSectionProvider({ children }) {
  const [activeSection, setActiveSection] = useState("home");
  const observerRef = useRef(null);
  const sectionsRef = useRef(new Map());

  const registerSection = useCallback((id, element) => {
    if (!element) {
      sectionsRef.current.delete(id);
      return;
    }
    sectionsRef.current.set(id, element);
  }, []);

  useEffect(() => {
    // Clean up previous observer
    if (observerRef.current) observerRef.current.disconnect();

    const observer = new IntersectionObserver(
      (entries) => {
        // Find the entry with the largest intersection ratio
        let best = null;
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (!best || entry.intersectionRatio > best.intersectionRatio) {
              best = entry;
            }
          }
        });
        if (best) {
          setActiveSection(best.target.id);
        }
      },
      {
        threshold: [0.1, 0.3, 0.5, 0.7],
        rootMargin: "-10% 0px -10% 0px",
      }
    );

    observerRef.current = observer;

    // Observe all registered sections
    sectionsRef.current.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <ActiveSectionContext.Provider
      value={{ activeSection, setActiveSection, registerSection }}
    >
      {children}
    </ActiveSectionContext.Provider>
  );
}

export function useActiveSection() {
  return useContext(ActiveSectionContext);
}
