import { useEffect, useRef } from "react";
import { useActiveSection } from "../ActiveSectionContext";

/**
 * Wrapper that registers a section element with the IntersectionObserver
 * context and provides consistent section styling.
 */
const SectionWrapper = ({ id, children, className = "", style = {} }) => {
  const ref = useRef(null);
  const { registerSection } = useActiveSection();

  useEffect(() => {
    registerSection(id, ref.current);
    return () => registerSection(id, null);
  }, [id, registerSection]);

  return (
    <section
      id={id}
      ref={ref}
      className={`relative ${className}`}
      style={style}
    >
      {children}
    </section>
  );
};

export default SectionWrapper;
