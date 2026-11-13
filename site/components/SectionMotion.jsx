import { useReducedMotion, motion } from "framer-motion";
import React from "react";
const entrances = {
  services: {
    opacity: 0,
    y: 44,
    rotateX: 8,
  },
  work: {
    opacity: 0,
    x: -64,
  },
  voices: {
    opacity: 0,
    y: -34,
  },
  team: {
    opacity: 0,
    scale: 0.88,
    y: 34,
  },
  contact: {
    opacity: 0,
    scale: 0.97,
  },
  capabilities: {
    opacity: 0,
    y: 54,
  },
  process: {
    opacity: 0,
    x: 24,
  },
};
const SectionMotion = ({ children, kind, index = 0, className = "", id }) => {
  const reduced = useReducedMotion();
  return (
    <motion.div
      data-testid={id}
      data-motion={kind}
      className={`section-motion motion-${kind} ${className}`}
      initial={reduced ? false : entrances[kind]}
      whileInView={{
        opacity: 1,
        x: 0,
        y: 0,
        rotateX: 0,
        scale: 1,
      }}
      viewport={{
        once: true,
        amount: 0.12,
      }}
      transition={{
        duration: reduced ? 0 : 0.85,
        delay: reduced ? 0 : index * 0.07,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {children}
    </motion.div>
  );
};
export { SectionMotion };
